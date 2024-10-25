import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanStackQueryProvider from "./libs/tanStackQueryProvider/tanStackQueryProvider";
import { ThemeProvider } from "./context/useTheme";
import Header from "./components/common/header";
import AppProgressbarProvider from "./libs/progressBarProvider/progressBarProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie App with TMDB API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackQueryProvider>
          <ThemeProvider>
            <Header />
            {children}
            <AppProgressbarProvider />
          </ThemeProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
