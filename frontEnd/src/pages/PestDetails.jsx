import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPestDetails, fetchPestOccurrences } from '../utils/api';
import Map from '../components/Map';

const PestDetails = () => {
  const { species } = useParams();
  const [pestDetails, setPestDetails] = useState(null);
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetails = async () => {
      if (!species || typeof species !== 'string') {
        setError('Invalid pest species provided.');
        setLoading(false);
        return;
      }

      try {
        const details = await fetchPestDetails(species);

        if (!details || details.error) {
          throw new Error(details?.error || 'Pest not found');
        }

        setPestDetails(details);

        const pestId = details._id || details.id;
        if (pestId) {
          const occurrenceData = await fetchPestOccurrences(pestId);
          setOccurrences(occurrenceData || []);
        } else {
          setOccurrences([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch pest details.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [species]);

  if (loading) return <div className="p-4">Loading pest details...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Pest Details: {species}</h2>

      {pestDetails && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <p><strong>Scientific Name:</strong> {pestDetails.scientificName || 'N/A'}</p>
          <p><strong>Description:</strong> {pestDetails.description || 'N/A'}</p>
          <p><strong>Kingdom:</strong> {pestDetails.kingdom || 'N/A'}</p>
          <p><strong>Phylum:</strong> {pestDetails.phylum || 'N/A'}</p>
          <p><strong>Class:</strong> {pestDetails.class || 'N/A'}</p>
          <p><strong>Order:</strong> {pestDetails.order || 'N/A'}</p>
          <p><strong>Family:</strong> {pestDetails.family || 'N/A'}</p>
          <p><strong>Genus:</strong> {pestDetails.genus || 'N/A'}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Occurrence Locations</h3>
      {occurrences.length > 0 ? (
        <Map data={occurrences} />
      ) : (
        <p className="text-gray-600">No occurrence data available for this pest.</p>
      )}
    </div>
  );
};

export default PestDetails;
