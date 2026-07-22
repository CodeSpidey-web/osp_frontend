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

import { CartProvider } from "@/lib/CartContext";

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
      </head>
      <body className="min-h-full flex flex-col rbt-header-sticky" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
        
        {/* Modernizer JS */}
        <Script src="/assets/js/vendor/modernizr.min.js" strategy="beforeInteractive" />
        {/* jQuery JS */}
        <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/jquery-ui.js" strategy="beforeInteractive" />
        {/* Bootstrap JS */}
        <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
        
        {/* Plugins */}
        <Script src="/assets/js/vendor/swiper.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/imageloaded.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/odometer.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/jquery-appear.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/mavo.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/jquery-ui.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/fancybox.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/countdown.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/jquery.waypoints.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/bootstrap-select.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/bootstrap-datepicker.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/elevatezoom.min.js" strategy="lazyOnload" />
        
        {/* Main JS */}
        <Script src="/assets/js/main.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
