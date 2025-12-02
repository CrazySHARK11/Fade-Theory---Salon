import React, { useEffect, useState } from "react";
import { SlUser, SlHeart } from "react-icons/sl";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth || { isAuthenticated: false, user: null });
  const profilePic = user?.profilePic ? `/uploads/profile/${user.profilePic}` : "images/profileimage.jpg"; 

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <header className="absolute w-full top-0">
      <div className=" bg-white border-b border-b-gray-300">
        <div className="wrapper max-w-7xl mx-auto py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="font-blkchcry text-5xl">
              FT
            </Link>

            <div className="menu flex gap-10">
              <Link href="/">Home</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/services">Services</Link>
              <Link href="/who-are-we">Who Are We</Link>
            </div>

            <div className="extras flex gap-5">
              <Link href="/user/wishlist">
                <SlHeart className="text-2xl" />
              </Link>
              {isClient ? (
                isAuthenticated ? (
                  <Link href={"/user"}>
                    <img
                      src={profilePic}
                      className="object-cover rounded-full"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </Link>
                ) : (
                  <Link href={"/login"}>
                    <SlUser className="text-2xl" />
                  </Link>
                )
              ) : (
                <div style={{ width: 30, height: 30 }} />
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
