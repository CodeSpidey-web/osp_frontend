"use client";
import React from 'react';
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import AboutBreadcrumb from "@/components/about/AboutBreadcrumb";
import AboutContent from "@/components/about/AboutContent";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <AboutBreadcrumb />
        <AboutContent />
      </main>
      <Modals />
      <Footer />
    </>
  );
}
