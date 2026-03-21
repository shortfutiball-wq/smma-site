import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CourseProvider } from "@/components/course-context";
import { AnkiProvider } from "@/components/anki-context";
import { Toaster } from "sonner";
import HeaderButtons from "@/components/header-buttons";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} ${mono.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <CourseProvider>
          <AnkiProvider>
            <TooltipProvider>
              <div className="flex min-h-screen bg-saas-bg w-full">
                <AppSidebar />
                <main className="flex-1 w-full flex flex-col pl-32 pr-12 py-10">
                  <Toaster position="top-right" richColors />
                  <header className="flex items-center justify-end mb-12">
                    <HeaderButtons />
                  </header>
                  <div className="flex-1 relative">{children}</div>
                </main>
              </div>
            </TooltipProvider>
          </AnkiProvider>
        </CourseProvider>
      </ThemeProvider>
    </div>
  );
}
