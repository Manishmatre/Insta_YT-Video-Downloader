import { Helmet } from 'react-helmet-async';

const DMCA = () => {
  return (
    <>
      <Helmet>
        <title>DMCA Policy - VidYT</title>
        <meta name="description" content="Learn about VidYT's DMCA policy and how to report copyright infringement. We respect intellectual property rights and respond promptly to valid takedown requests." />
        <meta name="keywords" content="DMCA policy, copyright infringement, takedown request, VidYT DMCA, video downloader copyright" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">DMCA Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              VidYT respects intellectual property rights and expects users to do the same. We respond to notices of alleged copyright infringement as required by the Digital Millennium Copyright Act (DMCA).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Filing a DMCA Notice</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To file a copyright infringement notification with us, you will need to send a written communication that includes the following:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Your contact information (name, address, phone number, email)</li>
              <li>Description of the copyrighted work you believe has been infringed</li>
              <li>Description of where the material is located on our service</li>
              <li>A statement that you have a good faith belief that the use is not authorized</li>
              <li>A statement that the information in your notice is accurate</li>
              <li>A statement that you are authorized to act on behalf of the copyright owner</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Counter-Notification</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you believe your content was removed in error, you may file a counter-notification. Your counter-notification must include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Your contact information</li>
              <li>Identification of the removed content</li>
              <li>A statement under penalty of perjury that you have a good faith belief the content was removed by mistake</li>
              <li>Your consent to local federal court jurisdiction</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Repeat Infringers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We maintain a policy of terminating accounts of users who are repeat infringers of copyright or other intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please send all DMCA notices to:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                VidYT Copyright Agent<br />
                Email: dmca@vidyt.com<br />
                Address: [Your Company Address]
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Response Time</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We typically respond to valid DMCA notices within 1-2 business days. We will remove or disable access to the allegedly infringing material and notify the user of the action taken.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. False Claims</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default DMCA; 