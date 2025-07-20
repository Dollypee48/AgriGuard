const axios = require('axios');
const INAT_API = 'https://api.inaturalist.org/v1';

async function fetchOccurrences(taxonId, limit = 10) {
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
      timeout: 5000
    });
    return data.results || [];
  } catch (err) {
    console.error('Error in fetchOccurrences:', err.message);
    return [];
  }
}

module.exports = fetchOccurrences;
