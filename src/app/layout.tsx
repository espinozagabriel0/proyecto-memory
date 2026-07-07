import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import ThemeProvider from "@/theme/theme-provider";
import { Toaster } from "react-hot-toast";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeMemory",
  description: "Pokemon Card Memory Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${onest.className} antialiased`}>
        <Toaster position="top-right" />
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <div className="container mx-auto">
              <main className="px-3">
                <div className="max-w-[80rem] mx-auto">{children}</div>
              </main>
              <footer></footer>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
