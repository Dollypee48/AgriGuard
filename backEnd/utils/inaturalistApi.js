
const axios = require('axios');

const INAT_API = 'https://api.inaturalist.org/v1';

const searchSpecies = async (name) => {
  if (!name) return null;

  try {
    const { data } = await axios.get(`${INAT_API}/taxa`, {
      params: {
        q: name,
        per_page: 1,
      },
      timeout: 5000,
    });

    if (data.results?.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error('❌ Error searching species:', error.message);
    return null;
  }
};

const fetchOccurrences = async (taxonId, limit = 10) => {
  if (!taxonId) return [];

  try {
    const { data } = await axios.get(`${INAT_API}/observations`, {
      params: {
        taxon_id: taxonId,
        per_page: limit,
        geo: true,
        order_by: 'observed_on',
        order: 'desc',
      },
      timeout: 5000,
    });

    return data.results || [];
  } catch (error) {
    console.error('❌ Error fetching occurrences:', error.message);
    return [];
  }
};


const fetchCommonPests = async () => {
  // Hardcoded pest species names to search
  const commonPests = [
    'Phylloxera',
    'Locusta migratoria',
    'Plutella xylostella',
    'Bemisia tabaci',
    'Tuta absoluta',
  ];

  
  const pestData = [];

  for (const name of commonPests) {
    const species = await searchSpecies(name);
    if (species) {
      const occurrences = await fetchOccurrences(species.id, 5);
      pestData.push({
        species,
        occurrences,
      });
    }
  }

  return pestData;
};

module.exports = {
  searchSpecies,
  fetchOccurrences,
  fetchCommonPests,
};
