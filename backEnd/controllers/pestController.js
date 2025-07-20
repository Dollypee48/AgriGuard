
// e.g. controllers/pestController.js
const { fetchCommonPests, searchSpecies, fetchOccurrences } = require('../utils');



const fetchPests = async (req, res) => {
  try {
    const pests = await fetchCommonPests();
    res.json(pests);
  } catch (error) {
    console.error('Error fetching pests:', error.message);
    res.status(500).json({ error: 'Failed to fetch pest data' });
  }
};

// Get pest details and occurrences by species name
const fetchPestDetailsBySearch = async (req, res) => {
  const { species } = req.query;

  if (!species) {
    return res.status(400).json({ error: 'Provide species query parameter' });
  }

  try {
    const speciesData = await searchSpecies(species);

    if (!speciesData) {
      return res.status(404).json({ error: 'Species not found' });
    }

    const occurrences = await fetchOccurrences(speciesData.id, 20);

    res.json({
      species: speciesData,
      occurrences,
    });
  } catch (error) {
    console.error('Error fetching pest details:', error.message);
    res.status(500).json({ error: 'Failed to fetch pest details' });
  }
};

module.exports = {
  fetchPests,
  fetchPestDetailsBySearch,
};
