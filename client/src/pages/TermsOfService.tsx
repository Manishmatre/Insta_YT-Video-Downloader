import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - VidYT</title>
        <meta name="description" content="Read VidYT's Terms of Service to understand your rights and responsibilities when using our video downloading service." />
        <meta name="keywords" content="terms of service, terms and conditions, VidYT terms, video downloader terms" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By accessing or using VidYT, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily use VidYT for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              As a user of VidYT, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Use the service only for lawful purposes</li>
              <li>Respect copyright and intellectual property rights</li>
              <li>Not use the service for any illegal activities</li>
              <li>Not attempt to disrupt or compromise the service</li>
              <li>Not use automated scripts or bots</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Copyright and Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              VidYT respects intellectual property rights and expects users to do the same. You are responsible for ensuring you have the right to download any content. We do not condone or support copyright infringement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The materials on VidYT are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property</li>
              <li>Accuracy of downloaded content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              In no event shall VidYT or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Email: legal@vidyt.com
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService; 