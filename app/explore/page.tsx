"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArtworkCard } from "@/components/artwork-card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ExplorePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [tag, setTag] = useState(searchParams.get("tag") || "");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["artworks", search, tag],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                page: pageParam.toString(),
                limit: "12",
                ...(search && { search }),
                ...(tag && tag !== "all" && { tag }),
            });

            const response = await fetch(`/api/artwork?${params}`);
            if (!response.ok) {
                throw new Error("Failed to fetch artworks");
            }
            return response.json();
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (tag) params.set("tag", tag);
        router.push(`/explore?${params.toString()}`);
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading artworks...</p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Error</h2>
                <p className="text-muted-foreground">Failed to load artworks</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <Input
                        placeholder="Search artworks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                </form>
                <Select value={tag} onValueChange={setTag}>
                    <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                        <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tags</SelectItem>
                        <SelectItem value="digital">Digital Art</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="sculpture">Sculpture</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((page) =>
                    page.artworks.map((artwork: any) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))
                )}
            </div>

            {hasNextPage && (
                <div className="text-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300"
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load more"}
                    </Button>
                </div>
            )}

            {!hasNextPage && data?.pages[0].artworks.length > 0 && (
                <div className="text-center text-muted-foreground">
                    No more artworks to load
                </div>
            )}

            {data?.pages[0].artworks.length === 0 && (
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-blue-950">No artworks found</h2>
                    <p className="text-blue-950/70">
                        Try adjusting your search or filters
                    </p>
                </div>
            )}
        </div>
    );
} 