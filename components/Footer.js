import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="wrapper max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-15">
          {/* Logo & Short Description */}
          <div className="flex-1">
            <Link href="/" className="font-blkchcry text-5xl text-white">
              FT
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
              Crafting premium digital experiences with modern design,
              performance, and precision. Built to grow your brand and scale
              your business.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white transition">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  SEO & Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  E-commerce Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Get updates on new services, discounts, and more.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 px-4 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FT — All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-white transition">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
