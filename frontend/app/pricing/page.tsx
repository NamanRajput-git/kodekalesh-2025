"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 999,
      annualPrice: 9990,
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 10,000 transactions/month",
        "Basic fraud detection",
        "Email alerts",
        "Standard support",
        "Basic analytics dashboard",
      ],
      popular: false,
    },
    {
      name: "Professional",
      monthlyPrice: 4999,
      annualPrice: 49990,
      description: "For growing businesses with higher volume",
      features: [
        "Up to 100,000 transactions/month",
        "Advanced fraud detection",
        "Real-time alerts (Email, SMS, Push)",
        "Priority support",
        "Advanced analytics & reports",
        "API access",
        "Custom rules engine",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 19999,
      annualPrice: 199990,
      description: "For large organizations with custom needs",
      features: [
        "Unlimited transactions",
        "AI-powered fraud detection",
        "Multi-channel alerts",
        "24/7 dedicated support",
        "Custom analytics & dashboards",
        "Full API access",
        "Advanced rule builder",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, and bank transfers. Enterprise customers can also pay via invoice.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "What happens if I exceed my transaction limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional transaction credits.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your business needs
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-white shadow-sm">
              <button
                type="button"
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingPeriod === "monthly"
                    ? "bg-[#6f42c1] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingPeriod === "annual"
                    ? "bg-[#6f42c1] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setBillingPeriod("annual")}
              >
                Annual
                <span className="ml-2 px-2 py-0.5 bg-[#28a745] text-white text-xs rounded">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-sm border-2 h-full flex flex-col ${
                  plan.popular
                    ? "border-[#6f42c1] shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#6f42c1] text-white text-center py-2 rounded-t-lg">
                    <span className="px-3 py-1 bg-white text-[#6f42c1] text-sm font-semibold rounded">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ₹
                      {billingPeriod === "monthly"
                        ? plan.monthlyPrice.toLocaleString()
                        : plan.annualPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingPeriod === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors ${
                      plan.popular
                        ? "bg-[#6f42c1] text-white hover:bg-[#5a32a3]"
                        : "border-2 border-[#6f42c1] text-[#6f42c1] hover:bg-[#6f42c1] hover:text-white"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-12 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h5 className="text-xl font-semibold">Feature Comparison</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Starter
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Professional
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Monthly Transactions</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">10,000</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">100,000</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Fraud Detection</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Advanced</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">AI-Powered</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Alerts</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Email</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      Email, SMS, Push
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      Multi-channel
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Support</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Standard</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Priority</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      24/7 Dedicated
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Analytics</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Advanced</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">API Access</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">—</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">✓</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      Full Access
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Custom Rules</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">—</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">✓</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      Advanced Builder
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-center text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
