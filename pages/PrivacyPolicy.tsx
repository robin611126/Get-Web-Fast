import React from 'react';
import { Navbar } from '../components/LandingPage';
import { SEO } from '../lib/seo';
import { motion } from 'framer-motion';
import ScrollToTop from '../components/ScrollToTop';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#030014] min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
      <SEO
        title="Privacy Policy | Get Web Fast"
        description="Privacy Policy for Get Web Fast. Learn how we collect, use, and protect your information."
        url="https://www.getwebfast.in/privacy-policy"
      />
      <ScrollToTop />
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 border-b border-white/10 pb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-slate-400">Last updated: May 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white"
          >
            <p>
              This Privacy Policy explains how Get Web Fast ("we", "us", or "our") collects, uses, and protects the information you provide when you interact with our website at www.getwebfast.in or our lead generation forms on Meta (Facebook/Instagram).
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">1. Information we collect</h2>
            <p>We collect the following information when you fill out our contact or lead forms:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>Your full name</li>
              <li>Your WhatsApp or phone number</li>
              <li>Your city</li>
              <li>Your professional specialisation (e.g. type of doctor or clinic)</li>
              <li>Whether you currently have a website</li>
            </ul>
            <p className="mt-4">
              We may also collect basic usage data through our website such as pages visited, browser type, and device information via standard analytics tools.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">2. How we use your information</h2>
            <p>The information you provide is used solely to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>Contact you regarding the clinic website service you enquired about</li>
              <li>Send you information about our packages, pricing, and offerings</li>
              <li>Respond to your queries and provide customer support</li>
              <li>Improve our services and communication</li>
            </ul>
            <p className="mt-4">
              We will not use your information for any purpose unrelated to the service you requested without obtaining your separate consent.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">3. How we contact you</h2>
            <p>
              After you submit a form, we will reach out to you via WhatsApp or phone call using the number you provided. You may opt out of further communication at any time by replying "STOP" on WhatsApp or asking us to remove your details.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">4. Data sharing and third parties</h2>
            <p>
              We do not sell, rent, or trade your personal information to any third party under any circumstances.
            </p>
            <p className="mt-4">
              Your data is stored securely and may be accessed only by our team members who need it to fulfil the service. We do not share your data with advertisers or marketing agencies.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">5. Meta lead ads</h2>
            <p>
              When you submit your information through our Meta (Facebook or Instagram) lead ads, your data is collected via Meta's Instant Form feature and transferred to us in accordance with Meta's Lead Ad Terms. By submitting the form, you agree that we may contact you about our services. We comply with all applicable provisions of Meta's Lead Generation Terms of Service.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">6. Data retention</h2>
            <p>
              We retain your information only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. If you request deletion of your data, we will do so within 7 business days.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">7. Data security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. Your data is not stored on public servers and is accessible only to authorised team members.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">8. Your rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for us to contact you at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the details below.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">9. Cookies</h2>
            <p>
              Our website may use basic cookies to improve your browsing experience. These do not collect personally identifiable information. You can disable cookies through your browser settings at any time.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "last updated" date. Continued use of our services after changes are made constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Contact us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please reach out:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:getwebfast@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">getwebfast@gmail.com</a></li>
              <li><strong>Website:</strong> <a href="https://www.getwebfast.in" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">www.getwebfast.in</a></li>
            </ul>
            <p className="mt-8 text-sm text-slate-500 border-t border-white/10 pt-8">
              This policy applies to all users who interact with Get Web Fast through our website or Meta advertising forms.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
