import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import LayoutPublic from "../../components/LayoutPublic";
import Link from "next/link";

export default function Contactus() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  return (
    <LayoutPublic>
      <main className="bg-red-100" style={{ paddingTop: "97px" }}>
          <div className="wrapper max-w-7xl mx-auto py-20 flex items-center justify-center gap-5">
             <Link href="/">Home</Link> <SlArrowRight className="text-[.5em]" /> Contact
          </div>
      </main>
    </LayoutPublic>
  );
}
