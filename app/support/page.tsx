"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
                    Support Virtual Gallery
                </h1>
                <p className="text-xl text-blue-950/70">
                    Help us keep the platform running and growing
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-4">Buy Me a Coffee</h2>
                    <p className="text-blue-950/70 mb-6">
                        Support our development efforts and help us create more features for artists and art enthusiasts.
                    </p>
                    <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300"
                        onClick={() => window.open("https://www.buymeacoffee.com/yourusername", "_blank")}
                    >
                        <Coffee className="mr-2 h-5 w-5" />
                        Buy Me a Coffee
                    </Button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-4">Other Ways to Support</h2>
                    <ul className="space-y-4 text-blue-950/70">
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            Share Virtual Gallery with your artist friends
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            Follow us on social media
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            Provide feedback and suggestions
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            Report bugs and issues
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-200 shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Our Vision</h2>
                <p className="text-blue-950/70 mb-6">
                    Virtual Gallery aims to create a vibrant community where artists can showcase their work,
                    connect with art enthusiasts, and grow their audience. Your support helps us maintain
                    and improve the platform, add new features, and keep it accessible to everyone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                        <h3 className="text-lg font-semibold text-blue-950 mb-2">Free Access</h3>
                        <p className="text-blue-950/70">Keep the platform free for all artists</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-lg font-semibold text-blue-950 mb-2">New Features</h3>
                        <p className="text-blue-950/70">Develop tools artists need</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-lg font-semibold text-blue-950 mb-2">Community</h3>
                        <p className="text-blue-950/70">Build a thriving art community</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 