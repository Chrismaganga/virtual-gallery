"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/components/upload-button";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    galleryId: z.string().optional(),
    tags: z.string().optional(),
});

export default function UploadPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            galleryId: "",
            tags: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!imageUrl) {
            toast({
                title: "Error",
                description: "Please upload an image",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/artwork", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to upload artwork");
            }

            toast({
                title: "Success!",
                description: "Your artwork has been uploaded.",
            });

            router.push("/my-galleries");
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (!session) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-950">Please sign in to upload artwork</h1>
                <Button
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300"
                >
                    Sign In
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
                    Upload Artwork
                </h1>
                <p className="text-blue-950/70">
                    Share your artwork with the world
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                        <UploadButton
                            onUploadComplete={(url) => {
                                setImageUrl(url);
                                setPreviewUrl(url.startsWith('http') ? url : `${window.location.origin}${url}`);
                            }}
                            onUploadError={(error) => {
                                toast({
                                    title: "Error",
                                    description: error.message,
                                    variant: "destructive",
                                });
                            }}
                        />

                        {previewUrl && (
                            <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-blue-950">Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter artwork title"
                                        {...field}
                                        className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-blue-950">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your artwork"
                                        className="resize-none border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="galleryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-blue-950">Gallery</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                                            <SelectValue placeholder="Select a gallery" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="new">Create New Gallery</SelectItem>
                                        {/* Add existing galleries here */}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-blue-950">Tags</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter tags separated by commas"
                                        {...field}
                                        className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Uploading..." : "Upload Artwork"}
                    </Button>
                </form>
            </Form>
        </div>
    );
} 