import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { AppSidebar } from "@/components/chat/app-sidebar";
import { DataStreamProvider } from "@/components/chat/data-stream-provider";
import { ChatShell } from "@/components/chat/shell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ActiveChatProvider } from "@/hooks/use-active-chat";

// Demo user (no auth required in demo mode)
const demoUser = {
  id: "demo-user",
  name: "Demo Customer",
  email: "demo@customer-service.local",
  type: "guest" as const,
};

// Mock session for demo mode
const mockSession = {
  user: demoUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="lazyOnload"
      />
      <DataStreamProvider>
        <Suspense fallback={<div className="flex h-dvh bg-sidebar" />}>
          <SidebarShell>{children}</SidebarShell>
        </Suspense>
      </DataStreamProvider>
    </>
  );
}

async function SidebarShell({ children }: { children: React.ReactNode }) {
  // In demo mode, always use demo user - no auth needed
  // Note: cookies() returns a ReadonlyHeaders in Next.js 15+, use .get() method
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <SessionProvider session={mockSession}>
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={demoUser} />
        <SidebarInset>
          <Toaster
            position="top-center"
            theme="system"
            toastOptions={{
              className:
                "!bg-card !text-foreground !border-border/50 !shadow-[var(--shadow-float)]",
            }}
          />
          <Suspense fallback={<div className="flex h-dvh" />}>
            <ActiveChatProvider>
              <ChatShell />
            </ActiveChatProvider>
          </Suspense>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
