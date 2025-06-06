import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArtworkCard } from "@/components/artwork-card";

export default async function Home() {
  const featuredArtworks = await prisma.artwork.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      gallery: true,
    },
  });

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Virtual Gallery</h1>
        <p className="text-xl text-muted-foreground">
          Discover and showcase amazing artwork from talented artists around the world
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Artworks</h2>
          <Link href="/explore" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>

      <section className="bg-muted p-8 rounded-lg">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-semibold">Start Sharing Your Art</h2>
          <p className="text-muted-foreground">
            Join our community of artists and showcase your work to the world.
            Create your gallery, upload your artwork, and connect with art enthusiasts.
          </p>
          <Link href="/register">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
