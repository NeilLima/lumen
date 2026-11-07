export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import "./globals.css";
import AuthGuard from "@/components/auth/AuthGuard";
import InstallPrompt from "@/components/shared/InstallPrompt/InstallPromptComp";

export const metadata: Metadata = {
  title: "Lumen - Gestão Financeira",
  description: "Plataforma de gestão financeira pessoal",
  manifest: "/manifest.json",
  icons: {
    icon: "/lumen-icon.svg",
    apple: "/lumen-icon.svg",
  },
  openGraph: {
    title: "Lumen - Gestão Financeira",
    description: "Plataforma de gestão financeira pessoal",
    images: ["/lumen-icon.svg"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lumen - Gestão Financeira",
    description: "Plataforma de gestão financeira pessoal",
    images: ["/lumen-icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/lumen-icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <AuthGuard>{children}</AuthGuard>
        <InstallPrompt />
      </body>
    </html>
  );
}