import Footer from "@/components/ui/layout/footer/Footer";
import Header from "@/components/ui/layout/header/Header";
import { H1 } from "@/components/ui/shared/text/H";
import React from "react";

export default function notFound() {
  return (
    <div className='flex flex-col relative w-full'>
      <div className='flex w-full'>
        <Header />
        <main className='w-full flex justify-center items-center'>
          <H1>This page is not found</H1>
        </main>
      </div>
      <Footer />
    </div>
  );
}
