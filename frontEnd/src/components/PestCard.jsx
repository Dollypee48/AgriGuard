export default function PestCard({ pest }) {
  // Helper to format date nicely, fallback to 'Unknown'
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {pest.image ? (
        <img
          src={pest.image}
          alt={pest.species || 'Pest Image'}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">
        {pest.species || 'Unknown Species'}
      </h3>

      <p className="text-gray-600 mb-1">
        <strong>Scientific Name:</strong> {pest.scientificName || 'N/A'}
      </p>

      <p className="text-gray-600 mb-1">
        <strong>Location:</strong> {pest.place || 'Unknown'}
      </p>

      <p className="text-gray-600 mb-1">
        <strong>Date Observed:</strong> {formatDate(pest.date)}
      </p>

      <p className="text-gray-600 mb-1">
        <strong>Observer:</strong> {pest.observer || 'N/A'}
      </p>
    </div>
  );
}
