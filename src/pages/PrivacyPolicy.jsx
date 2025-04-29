import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-4">Effective Date: 12/02/2025</p>

        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold">levdevtinder.site</span> (“we,” “our,” or “us”).
          We value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains what data we collect, how we use it, and how we keep it secure.
        </p>

        {/* Section: Information We Collect */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email Address</li>
        </ul>
        <p className="text-gray-700 mt-2">
          We do <span className="font-semibold">not</span> collect any other personal data
          or track information from third-party cookies.
        </p>

        {/* Section: How We Use Your Information */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Providing access to our educational and learning resources.</li>
          <li>Maintaining user accounts and login sessions.</li>
          <li>Processing payments securely through Razorpay.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          We do <span className="font-semibold">not</span> use your data for marketing or any commercial purposes.
        </p>

        {/* Section: Cookies & Session Management */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Cookies & Session Management
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>We use cookies <span className="font-semibold">only</span> to keep you logged in while you are actively using the website.</li>
          <li>These cookies do <span className="font-semibold">not</span> collect additional personal data or track browsing activity outside our website.</li>
          <li>Once you log out or close your browser, the session cookies expire.</li>
        </ul>

        {/* Section: Data Security & Protection */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Data Security & Protection
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><span className="font-semibold">Flexible SSL Encryption:</span> Ensures secure data transmission.</li>
          <li><span className="font-semibold">Secure Login Access:</span> Only the respective user can access their profile.</li>
          <li><span className="font-semibold">Restricted Data Sharing:</span> We only share necessary data with Razorpay for payment processing.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          We do <span className="font-semibold">not</span> sell, rent, or share your personal information with third parties for any other purposes.
        </p>

        {/* Section: Your Rights & Contact */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5. Your Rights & Contact
        </h2>
        <p className="text-gray-700">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Access and update your personal details.</li>
          <li>Request deletion of your account and associated data.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          For any requests, you can contact us at:
        </p>
        <p className="text-gray-700 mt-1">
          📧 <span className="font-semibold">Email:</span> alankar010499@gmail.com
        </p>
        <p className="text-gray-700">
          📞 <span className="font-semibold">Phone:</span> 7380639666
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
