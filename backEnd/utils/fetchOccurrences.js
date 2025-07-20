const axios2 = require('axios');

async function fetchOccurrences(taxonId, limit = 10) {
  if (!taxonId) return [];
  try {
    const { data } = await axios2.get(`${INAT_API}/observations`, {
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
    console.error('❌ Error in fetchOccurrences:', error.message);
    return [];
  }
}

module.exports = fetchOccurrences;
