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
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-green-600 rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-700">Loading pest data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-600 py-8">
          <p>{error}</p>
          <button
            onClick={loadPestData}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (pests.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p>No pest data available.</p>
          <button
            onClick={loadPestData}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Track <span className="text-green-600">Pests & Diseases</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verified data from Global Biodiversity Information Facility (GBIF)
        </p>
      </header>

      <section className="max-w-2xl mx-auto mb-12">
        <SearchBar />
      </section>

    
    </main>
  );
}
