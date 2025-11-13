import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden">
          {/* Grid Background Pattern - Only in Hero Section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0",
              maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div>
                {/* Upcoming Events Button */}
                <div className="flex justify-start mb-8">
                  <button className="px-6 py-3 bg-purple-100 text-[#6f42c1] rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Latest Fraud Alerts
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Main Hero Content */}
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Deploy an{" "}
                    <span className="text-[#6f42c1]">Advanced</span> fraud detection system
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
                    Protect your business with real-time fraud detection powered by
                    advanced AI that identifies threats instantly and accurately
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/dashboard"
                      className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/pricing"
                      className="px-8 py-4 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors text-center"
                    >
                      View Pricing
                    </Link>
                  </div>
                </div>

              </div>

              {/* Right Side - Dashboard Snapshot */}
              <div className="hidden lg:block mt-4">
                <div className="relative">
                  {/* Desktop Dashboard Frame - Behind */}
                  <div className="relative scale-95 origin-top">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                      {/* Browser Chrome */}
                      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 bg-white rounded px-2 py-0.5 text-xs text-gray-500 text-center">
                          dashboard.hawkeye.com
                        </div>
                      </div>
                      {/* Dashboard Content */}
                      <div className="bg-gray-50 p-4">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Dashboard</h3>
                            <p className="text-xs text-gray-600">Welcome back! Here's your overview.</p>
                          </div>
                        </div>
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500 uppercase mb-1">Transactions</div>
                            <div className="text-xl font-bold text-[#6f42c1]">125K+</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500 uppercase mb-1">Fraud Detected</div>
                            <div className="text-xl font-bold text-[#dc3545]">342</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500 uppercase mb-1">Risk Score</div>
                            <div className="text-xl font-bold text-[#ffc107]">7.2</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500 uppercase mb-1">Alerts</div>
                            <div className="text-xl font-bold text-[#17a2b8]">28</div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                          <div className="text-xs text-gray-500 uppercase mb-2">Fraud Detection Trends</div>
                          <div className="h-24 bg-gradient-to-t from-[#6f42c1] to-purple-100 rounded flex items-end justify-around p-2">
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "40%" }}></div>
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "60%" }}></div>
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "80%" }}></div>
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "70%" }}></div>
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "90%" }}></div>
                            <div className="w-4 bg-[#6f42c1] rounded-t" style={{ height: "50%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Frame - In Front */}
                  <div className="absolute -right-8 top-12 z-10">
                    <div className="bg-black rounded-[2rem] p-2 shadow-2xl">
                      {/* Phone Screen */}
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status Bar */}
                        <div className="bg-gray-900 px-3 py-1 flex justify-between items-center text-white text-xs">
                          <span>9:30</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 border border-white rounded-sm">
                              <div className="w-3 h-1.5 bg-white rounded-sm m-0.5"></div>
                            </div>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                        </div>
                        {/* Mobile Dashboard Content */}
                        <div className="bg-gray-50 p-3" style={{ width: "200px", height: "320px" }}>
                          <div className="mb-3">
                            <h4 className="text-sm font-bold text-gray-900">Dashboard</h4>
                            <p className="text-xs text-gray-600">Fraud Overview</p>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">Transactions</div>
                              <div className="text-lg font-bold text-[#6f42c1]">125K+</div>
                            </div>
                            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">Fraud</div>
                              <div className="text-lg font-bold text-[#dc3545]">342</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500 mb-2">Trends</div>
                            <div className="h-20 bg-gradient-to-t from-[#6f42c1] to-purple-100 rounded flex items-end justify-around p-1">
                              <div className="w-3 bg-[#6f42c1] rounded-t" style={{ height: "30%" }}></div>
                              <div className="w-3 bg-[#6f42c1] rounded-t" style={{ height: "50%" }}></div>
                              <div className="w-3 bg-[#6f42c1] rounded-t" style={{ height: "70%" }}></div>
                              <div className="w-3 bg-[#6f42c1] rounded-t" style={{ height: "60%" }}></div>
                              <div className="w-3 bg-[#6f42c1] rounded-t" style={{ height: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        {/* Home Indicator */}
                        <div className="bg-gray-900 flex justify-center py-1">
                          <div className="w-12 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted By Section - Full Width */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-6">Trusted by</p>
              <div className="flex justify-center items-center">
                <Image
                  src="/govts.png"
                  alt="Government of India Digital Initiatives - Digital India, NeGD, NIC, @gov.in, AADHAAR, UPI, myGov"
                  width={1200}
                  height={80}
                  className="max-w-full h-auto object-contain opacity-80"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#6f42c1] mb-2">125K+</div>
                <p className="text-lg text-gray-700">Transactions Analyzed</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#6f42c1] mb-2">342</div>
                <p className="text-lg text-gray-700">Fraud Cases Detected</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#6f42c1] mb-2">98.5%</div>
                <p className="text-lg text-gray-700">Detection Accuracy</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Hawkeye Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What is Hawkeye</h2>
              <p className="text-xl text-gray-700 mb-8">
                Hawkeye is an advanced financial fraud detection platform designed to protect
                businesses from fraudulent transactions. Its goal is to create a secure and
                reliable fraud detection system that saves businesses millions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 text-[#6f42c1] border-2 border-[#6f42c1] rounded-lg font-semibold hover:bg-[#6f42c1] hover:text-white transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 text-[#6f42c1] border-2 border-[#6f42c1] rounded-lg font-semibold hover:bg-[#6f42c1] hover:text-white transition-colors"
                >
                  View Features
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 text-[#6f42c1] border-2 border-[#6f42c1] rounded-lg font-semibold hover:bg-[#6f42c1] hover:text-white transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What we offer Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What we offer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#6f42c1] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Detection</h3>
                <p className="text-gray-600">
                  Monitor transactions in real-time with advanced machine learning
                  algorithms that identify suspicious patterns instantly
                </p>
                <Link
                  href="/dashboard"
                  className="text-[#6f42c1] font-medium mt-2 inline-block hover:underline"
                >
                  Know more →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#6f42c1] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                <p className="text-gray-600">
                  Comprehensive dashboards and reports to understand fraud trends,
                  risk patterns, and transaction behaviors
                </p>
                <Link
                  href="/dashboard"
                  className="text-[#6f42c1] font-medium mt-2 inline-block hover:underline"
                >
                  Know more →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#6f42c1] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Layer Security</h3>
                <p className="text-gray-600">
                  Multiple security layers including device fingerprinting,
                  behavioral analysis, and location verification
                </p>
                <Link
                  href="/dashboard"
                  className="text-[#6f42c1] font-medium mt-2 inline-block hover:underline"
                >
                  Know more →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#6f42c1] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Processing</h3>
                <p className="text-gray-600">
                  Lightning-fast fraud detection with sub-second response times,
                  ensuring minimal impact on transaction flow
                </p>
                <Link
                  href="/dashboard"
                  className="text-[#6f42c1] font-medium mt-2 inline-block hover:underline"
                >
                  Know more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section - Success Stories */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Success Story 1 */}
              <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-100 rounded-lg p-4 mb-3">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="text-xs text-gray-600 mb-2">Financial Services</div>
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#6f42c1]">₹45M</div>
                        <div className="text-xs text-gray-600">Protected</div>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-center">Banking Sector</h4>
              </div>

              {/* Success Story 2 */}
              <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-100 rounded-lg p-4 mb-3">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold">E-Commerce</div>
                      <div className="text-xs text-gray-500">Live</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      <div className="text-xs text-gray-600">Transaction Volume</div>
                      <div className="text-xs font-bold text-[#6f42c1]">125K+ daily</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#6f42c1] rounded-full"></div>
                      <div>
                        <div className="text-xs font-semibold">99.2% Accuracy</div>
                        <div className="text-xs text-gray-500">Fraud Detection</div>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-center">Retail Platform</h4>
              </div>

              {/* Success Story 3 */}
              <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-100 rounded-lg p-4 mb-3">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold">Payment Gateway</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div className="text-xs font-semibold mb-2">
                      Real-time Fraud Prevention
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1 bg-gray-200 rounded">View Stats</button>
                      <button className="text-xs px-3 py-1 bg-[#6f42c1] text-white rounded">
                        Dashboard
                      </button>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-center">Payment Solutions</h4>
              </div>

              {/* Success Story 4 */}
              <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-100 rounded-lg p-4 mb-3">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold">Insurance</div>
                      <div className="text-xs text-gray-500">Protected</div>
                    </div>
                    <div className="text-xs mb-2">
                      AI-Powered Claim Verification
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-16 h-16 bg-[#6f42c1] rounded-full flex items-center justify-center text-white text-2xl">
                        🛡️
                      </div>
                    </div>
                    <button className="w-full text-xs px-3 py-2 bg-[#6f42c1] text-white rounded">
                      View Report
                    </button>
                  </div>
                </div>
                <h4 className="font-semibold text-center">Insurance Claims</h4>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/dashboard"
                className="text-[#6f42c1] font-semibold hover:underline"
              >
                View all Success Stories →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
