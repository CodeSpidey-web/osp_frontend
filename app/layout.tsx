import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ocean Student Projects - Electronics Store",
  description: "Your one-stop shop for electronic components, Arduino, Raspberry Pi, and student project essentials in India",
};

import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";
import DebugToolbar from "@/components/DebugToolbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.css" />
        <link rel="stylesheet" href="/assets/css/plugins/fancybox.css" />
        <link rel="stylesheet" href="/assets/css/plugins/mavo.css" />
        <link rel="stylesheet" href="/assets/css/plugins/odometer.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animation.css" />
        <link rel="stylesheet" href="/assets/css/plugins/bootstrap-select.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/bootstrap-datepicker.min.css" />
        <link rel="stylesheet" href="/assets/css/style.min.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Fix popular category button text clipping to allow wrapping */
          .rbt-cat-box-5 .rbt-btn {
            white-space: normal !important;
            height: auto !important;
            line-height: 1.3 !important;
            padding: 8px 12px !important;
            min-height: 50px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: visible !important;
          }
        `}} />
      </head>
      <body className="min-h-full flex flex-col rbt-header-sticky" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <DebugToolbar />
          </CartProvider>
        </AuthProvider>
        
        {/* Modernizer JS */}
        <Script src="/assets/js/vendor/modernizr.min.js" strategy="beforeInteractive" />
        {/* jQuery JS */}
        <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/jquery-ui.js" strategy="beforeInteractive" />
        {/* Bootstrap JS */}
        <Script src="/assets/js/vendor/bootstrap.min.js" strategy="afterInteractive" />
        
        {/* Plugins */}
        <Script src="/assets/js/vendor/swiper.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/imageloaded.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/odometer.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/mavo.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/jquery-ui.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/fancybox.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/countdown.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/bootstrap-select.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/bootstrap-datepicker.min.js" strategy="afterInteractive" />
        
        {/* Main JS */}
        <Script src="/assets/js/main.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
