import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { getCachedData, setCachedData, invalidateCache, CACHE_KEYS } from "@/lib/cache";

const artworkSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  galleryId: z.string().optional(),
  tags: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, imageUrl, galleryId, tags } = artworkSchema.parse(body);

    // Create artwork
    const artwork = await prisma.artwork.create({
      data: {
        title,
        description,
        imageUrl,
        userId: session.user.id,
        galleryId: galleryId || null,
        tags: tags
          ? {
              connectOrCreate: tags.split(",").map((tag) => ({
                where: { name: tag.trim() },
                create: { name: tag.trim() },
              })),
            }
          : undefined,
      },
      include: {
        user: true,
        gallery: true,
        tags: true,
      },
    });

    // Invalidate relevant caches
    await invalidateCache("artworks:*");
    if (galleryId) {
      await invalidateCache(CACHE_KEYS.userGalleries(session.user.id));
    }

    return NextResponse.json(artwork);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Artwork creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const galleryId = searchParams.get("galleryId");
    const userId = searchParams.get("userId");
    const tag = searchParams.get("tag");

    const filters = JSON.stringify({ galleryId, userId, tag });
    const cacheKey = CACHE_KEYS.artworks(page, limit, filters);

    // Try to get from cache first
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const where = {
      ...(galleryId && { galleryId }),
      ...(userId && { userId }),
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
    };

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          user: true,
          gallery: true,
          tags: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.artwork.count({ where }),
    ]);

    const response = {
      artworks,
      total,
      pages: Math.ceil(total / limit),
      page,
    };

    // Cache the response
    await setCachedData(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Artwork fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 