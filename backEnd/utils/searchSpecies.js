const axios = require('axios');
const INAT_API = 'https://api.inaturalist.org/v1';


async function searchSpecies(name) {
  if (!name) return null;
  try {
    const { data } = await axios.get(`${INAT_API}/taxa`, {
      params: { q: name, per_page: 1 },
      timeout: 5000,
    });
    return data.results?.[0] || null;
  } catch (error) {
    console.error('❌ Error in searchSpecies:', error.message);
    return null;
  }
}

module.exports = searchSpecies;