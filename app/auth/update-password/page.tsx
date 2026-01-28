'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function UpdatePasswordContent() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const message = searchParams.get('message');

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            // Notify other components like Sidebar to refresh auth state
            window.dispatchEvent(new Event("auth-role-change"));

            router.push("/?message=Password updated successfully");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md">
                <Card className="bg-gray-900 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Update Password</CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            Enter your new password below.
                        </CardDescription>
                        {message && (
                            <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm text-center">
                                {message}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form className="animate-in flex flex-col gap-6" onSubmit={handleUpdatePassword}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-gray-300">New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/20 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function UpdatePassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePasswordContent />
        </Suspense>
    );
}
