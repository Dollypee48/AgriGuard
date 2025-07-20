import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-green-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">About <span className="text-green-600">FarmGuard</span></h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-700">
          FarmGuard is an intelligent pest and disease monitoring platform designed to help farmers, agricultural experts, and researchers identify, report, and track crop threats in real time.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to empower farmers with timely, accurate, and localized information on pests and plant diseases—using technology to reduce crop losses, increase yields, and boost food security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Search and explore pest and disease data for your region.</li>
            <li>Get detailed insights into threats based on scientific records.</li>
            <li>Contribute by reporting new sightings or outbreaks.</li>
            <li>Access up-to-date data from trusted agricultural APIs.</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-100 py-12 px-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Built for Impact</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Whether you're a smallholder farmer or part of a larger agricultural network, FarmGuard is your partner in safeguarding crops, increasing productivity, and driving sustainable farming practices.
        </p>
      </section>
    </main>
  );
}
