import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 base-200">
      <h1 className="text-3xl font-bold text-center mb-4  text-black">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 text-center">Effective Date: 12/02/2025</p>

      <div className="mt-6 space-y-4 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to <strong>levdevtinder.site</strong>. By using our website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. Use of Our Website</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to use our website.</li>
            <li>All content on this website is for **educational and learning purposes** only.</li>
            <li>You agree **not** to misuse our services, including attempting to hack, spam, or distribute harmful content.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Account Registration & Security</h2>
          <p>When you create an account, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and up-to-date information.</li>
            <li>Keep your login credentials secure and **not share them with others**.</li>
            <li>Take full responsibility for all activities under your account.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Payments & Transactions</h2>
          <p>
            Payments on our website are securely processed via **Razorpay**. By making a payment, you agree to Razorpay’s policies. We do not store your financial details.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All content, including text, graphics, and logos, is **our property** and protected by copyright laws.</li>
            <li>You may **not** copy, distribute, or modify our content without permission.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
          <p>
            We are **not responsible** for any damages, losses, or issues that arise from using our website. Use our services at your own risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Changes to These Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Continued use of our website means you accept the new terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>If you have any questions, feel free to contact us:</p>
          <p>📧 Email: <a href="mailto:alankar010499@gmail.com" className="text-blue-500 underline">alankar010499@gmail.com</a></p>
          <p>📞 Phone: <a href="tel:+917380639666" className="text-blue-500 underline">7380639666</a></p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
