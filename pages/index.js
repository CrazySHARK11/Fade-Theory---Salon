import React from "react";
import Header from "../components/Header";
import Link from "next/link";
import LayoutPublic from "../components/LayoutPublic";

export default function Home() {
  return (
    <LayoutPublic>
      <main className="w-full bg-[url(/images/barber.jpg)] h-screen bg-cover">
        <div className="max-w-7xl mx-auto h-screen flex items-center justify-center flex-col gap-5">
          <p className="text-white italic" style={{ letterSpacing: "2em" }}>
            FADE THEORY
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
            For kings who know their worth.
          </h1>
          <div className="cta-group flex gap-9 items-center">
            <Link
              href="/services"
              className="font-medium bg-white px-6 py-3 rounded"
            >
              Book Today
            </Link>
            <Link href="/who-are-we" className="text-white">
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </LayoutPublic>
  );
}
