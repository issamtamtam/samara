import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Customer Service Admin",
  description: "Manage your customer service knowledge base",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
