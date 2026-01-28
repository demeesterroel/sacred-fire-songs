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

export function LoginForm(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Suspense>
      <LoginFormContent {...props} />
    </Suspense>
  );
}

function LoginFormContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Notify other components like Sidebar to refresh auth state
      window.dispatchEvent(new Event("auth-role-change"));

      router.push("/");
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
          <CardTitle className="text-3xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Welcome back to the Circle.
          </CardDescription>
          {message && (
            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-blue-400 text-sm text-center mt-4">
              {message}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/20 p-2 rounded">{error}</p>}
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-white hover:underline underline-offset-4"
              >
                Join the Circle
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
