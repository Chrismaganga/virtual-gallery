"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <Link href="/" className="font-bold text-xl">
                    Virtual Gallery
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <Link href="/explore">
                        <Button variant="ghost">Explore</Button>
                    </Link>
                    {session ? (
                        <>
                            <Link href="/upload">
                                <Button>Upload Artwork</Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => signOut()}
                                        className="text-red-600"
                                    >
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Link href="/auth/signin">
                            <Button>Sign in</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
} 