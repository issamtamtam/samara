"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Demo user type
export type UserType = "guest" | "regular";

export interface DemoSessionUser {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

export interface DemoSession {
  user: DemoSessionUser;
  expires: string;
}

// Create demo auth context
const DemoAuthContext = createContext<{
  data: DemoSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
  update: (session: DemoSession | null) => void;
}>({
  data: null,
  status: "loading",
  update: () => {},
});

// Demo user for customer service
const demoUser: DemoSessionUser = {
  id: "demo-user",
  name: "Demo Customer",
  email: "demo@customer-service.local",
  type: "guest",
};

const demoSession: DemoSession = {
  user: demoUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    // In demo mode, immediately set demo session
    setSession(demoSession);
    setStatus("authenticated");
  }, []);

  const update = (newSession: DemoSession | null) => {
    setSession(newSession);
    setStatus(newSession ? "authenticated" : "unauthenticated");
  };

  return (
    <DemoAuthContext.Provider value={{ data: session, status, update }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoSession() {
  const context = useContext(DemoAuthContext);
  if (context.status === "loading") {
    return { data: null, status: "loading" as const };
  }
  return { data: context.data, status: context.status };
}

// Helper to get session (server-side compatible)
export function getDemoSession() {
  return demoSession;
}
