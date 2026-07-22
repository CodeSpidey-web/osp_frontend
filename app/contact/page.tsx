"use client";
import React from 'react';
import dynamic from "next/dynamic";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactContent from "@/components/contact/ContactContent";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false });
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false });

export default function ContactPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper">
        <ContactBreadcrumb />
        <ContactContent />
      </main>
      <Modals />
      <Footer />
    </>
  );
}
