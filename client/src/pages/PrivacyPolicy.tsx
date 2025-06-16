import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - VidYT</title>
        <meta name="description" content="Learn about how VidYT protects your privacy and handles your data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices." />
        <meta name="keywords" content="privacy policy, data protection, user privacy, VidYT privacy, video downloader privacy" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              At VidYT, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our video downloading service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>YouTube URLs that you submit for processing</li>
                <li>Your email address (if you choose to contact us)</li>
                <li>Any feedback or comments you provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage patterns and preferences</li>
                <li>Download history and statistics</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To process your video download requests</li>
              <li>To improve our service and user experience</li>
              <li>To communicate with you about updates and changes</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Email: privacy@vidyt.com
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 