"use client";

import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-blue-200 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-950">Virtual Gallery</h3>
                        <p className="text-blue-950/70">
                            A modern platform for artists to showcase their work and connect with art enthusiasts.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-blue-950">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/explore" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    Explore Art
                                </Link>
                            </li>
                            <li>
                                <Link href="/upload" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    Upload Artwork
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-galleries" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    My Galleries
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-blue-950">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-blue-950/70 hover:text-blue-950 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-blue-950">Connect</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-950/70 hover:text-blue-950 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-950/70 hover:text-blue-950 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-950/70 hover:text-blue-950 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-blue-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-blue-950/70">
                            © {new Date().getFullYear()} Virtual Gallery. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="/privacy" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 