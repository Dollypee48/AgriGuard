import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PestCard from '../components/PestCard';
import Map from '../components/Map';
import { fetchPestOccurrences } from '../utils/api';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [pestData, setPestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const species = searchParams.get('species') || 'Phylloxera';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPestOccurrences(species);
        if (Array.isArray(data)) {
          setPestData(data);
        } else {
          setError('Unexpected data format received.');
          setPestData([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load pest data.');
        setPestData([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [species]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Pest <span className="text-green-600">Dashboard</span>
      </h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading pest data...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <>
          {showMap && pestData.length > 0 && <Map pestData={pestData} />}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {species} <span className="text-green-600">Occurrences</span> ({pestData.length})
            </h2>

            {pestData.length === 0 ? (
              <div className="text-gray-500">No reports found for this species.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pestData.map((pest) => (
                  <PestCard key={pest.id} pest={pest} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
