"use client";
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function Home() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="main-wrapper">
        <MainContent />
      </main>
      <Modals />
      <Footer />
    </>
  );
}
