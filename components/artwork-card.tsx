"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ArtworkCardProps {
    artwork: {
        id: string;
        title: string;
        description: string | null;
        imageUrl: string;
        user: {
            name: string | null;
        };
        gallery: {
            name: string;
        } | null;
    };
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: artwork.title,
                    text: artwork.description || "",
                    url: window.location.origin + `/artwork/${artwork.id}`,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        }
    };

    return (
        <Card className="overflow-hidden">
            <Link href={`/artwork/${artwork.id}`}>
                <div className="relative aspect-square">
                    <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </Link>
            <CardHeader>
                <Link href={`/artwork/${artwork.id}`}>
                    <h3 className="text-lg font-semibold hover:text-primary">
                        {artwork.title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground">
                    by {artwork.user.name}
                    {artwork.gallery && ` in ${artwork.gallery.name}`}
                </p>
            </CardHeader>
            <CardContent>
                <p className="text-sm line-clamp-2">{artwork.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : ""}
                >
                    <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                </Button>
            </CardFooter>
        </Card>
    );
} 