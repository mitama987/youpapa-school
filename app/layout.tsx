import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shikumi-lake.vercel.app";
const GA_ID = "G-SVXN7W24K8";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "シクミ｜副業×AI×自動化スクール（無料）｜月10万の始め方",
    template: "%s｜シクミ",
  },
  description:
    "副業×AI×自動化で月10万を目指す無料オンラインスクール「シクミ」。リサーチ→商品→販売→集客の4ステップを、チェックリストで進捗管理しながら実践。記事・掲示板つき。",
  openGraph: {
    type: "website",
    siteName: "シクミ",
    title: "シクミ｜副業×AI×自動化スクール（無料）｜月10万の始め方",
    description:
      "副業×AI×自動化で月10万を目指す無料オンラインスクール「シクミ」。",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "シクミ｜副業×AI×自動化スクール（無料）",
    description:
      "副業×AI×自動化で月10万を目指す無料オンラインスクール「シクミ」。",
  },
  robots: { index: true, follow: true },
};

// data-theme を React マウント前に適用して FOUC を防ぐ。yps:theme 互換。
const themeInit = `(function(){try{var t=localStorage.getItem('yps:theme');if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
