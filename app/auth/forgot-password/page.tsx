'use client';

import { BackButton } from '@/components/common/BackButton';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useState, Suspense } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function ForgotPasswordContent() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
            });
            if (error) throw error;
            setSuccessMessage("Check your email for the reset link");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
            <BackButton href="/auth/login" label="Back to Login" />

            <div className="w-full max-w-md">
                <Card className="bg-gray-900 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Reset Password</CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            Enter your email to receive a reset link.
                        </CardDescription>
                        {(message || successMessage || error) && (
                            <div className={`mt-4 p-3 rounded-lg text-sm text-center ${error || (message && message.includes('Could not'))
                                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                : 'bg-green-500/10 border border-green-500/20 text-green-400'
                                }`}>
                                {error || successMessage || message}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form className="animate-in flex flex-col gap-6" onSubmit={handleResetPassword}>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function ForgotPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordContent />
        </Suspense>
    );
}
