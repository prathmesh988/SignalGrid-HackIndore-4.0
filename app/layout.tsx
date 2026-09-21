import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/layout/AppSidebar";
import TopHeader from "@/components/layout/TopHeader";

export const metadata: Metadata = {
  title: "SignalGrid — Decision Intelligence",
  description:
    "Connect the signals. Understand the conflict. Make the decision. Explainable financial decision intelligence for analysts, risk teams, and compliance.",
  keywords: [
    "financial decision intelligence",
    "signal grid",
    "fintech",
    "risk analysis",
    "explainable AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col flex-1 min-h-svh overflow-hidden bg-background">
              <TopHeader />
              <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
