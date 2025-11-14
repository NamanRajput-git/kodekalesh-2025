"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-lg mb-3">Hawkeye</h5>
            <p className="text-gray-600 text-sm">
              Advanced financial fraud detection and analytics platform powered
              by AI and machine learning.
            </p>
          </div>
          <div>
            <h6 className="font-bold mb-3">Product</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-3">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#6f42c1] text-sm transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-3">Government of India</h6>
            <div className="flex items-center mb-2">
              <span className="mr-2">🇮🇳</span>
              <span className="text-gray-600 text-sm">
                Built with UX4G Design System 2.0
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              <div>Powered by NeGD | MeitY</div>
              <div className="mt-1">Government of India®</div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 my-6" />
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Hawkeye. All rights reserved. | Privacy Policy | Terms of
            Service
          </p>
        </div>
      </div>
    </footer>
  );
}
