'use client';

import { useState, useEffect } from 'react';

export type Environment = 'development' | 'preview' | null;

export function useEnvironment() {
  const [env, setEnv] = useState<Environment>(null);

  useEffect(() => {
    const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
    const isLocal = process.env.NODE_ENV === "development";

    if (vercelEnv === "preview") {
      setEnv("preview");
    } else if (isLocal) {
      setEnv("development");
    }
  }, []);

  return env;
}
