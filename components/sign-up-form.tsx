"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

export function SignUpForm(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpFormContent {...props} />
    </Suspense>
  );
}
function SignUpFormContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/songs`,
        },
      });
      if (error) throw error;

      // Notify other components like Sidebar to refresh auth state
      window.dispatchEvent(new Event("auth-role-change"));

      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-gray-900 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Join the Circle</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Create an account to save your favorite songs.
          </CardDescription>
          {message && (
            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-blue-400 text-sm text-center mt-4">
              {message}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password" className="text-gray-300">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/20 p-2 rounded">{error}</p>}
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-white hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
