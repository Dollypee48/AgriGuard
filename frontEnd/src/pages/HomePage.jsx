import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import PestCard from '../components/PestCard';

export default function HomePage() {
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCommonPests = async () => {
    try {
      const response = await fetch('/api/pests/common');
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No pest data found.');
      }
      return data;
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  };

  const loadPestData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCommonPests();
      setPests(data);
    } catch (err) {
      setError(err.message || 'Failed to load pest data. Please try again later.');
      setPests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPestData();
  }, []);

  const renderPestContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin h-10 w-10 border-t-4 border-b-4 border-green-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">Loading pest data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-600 py-8">
          <p className="text-lg">{error}</p>
          <button
            onClick={loadPestData}
            className="mt-5 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (pests.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No pest data available.</p>
          <button
            onClick={loadPestData}
            className="mt-5 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pests.map((pest, index) => {
          const key =
            (typeof pest.id === 'string' || typeof pest.id === 'number')
              ? pest.id
              : (typeof pest._id === 'string' || typeof pest._id === 'number')
              ? pest._id.toString()
              : typeof pest.species === 'string'
              ? pest.species
              : index;

          return <PestCard key={key} pest={pest} />;
        })}
      </div>
    );
  };

  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* Section 1: Hero / Intro */}
        <section className="bg-green-50 py-16 px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Track <span className="text-green-600">Pests & Diseases</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Access verified and up-to-date pest and disease data to protect your crops and improve agricultural yields.
          </p>
        </section>

        {/* Section 2: Search */}
        <section className="py-12 px-4 bg-white shadow-md max-w-4xl mx-auto rounded-lg mt-10 w-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Search for Pests & Diseases</h2>
          <SearchBar />
        </section>

      </main>

    </>
  );
}
