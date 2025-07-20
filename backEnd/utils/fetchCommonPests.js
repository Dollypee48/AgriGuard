const searchSpeciesUtil = require('./searchSpecies');
const fetchOccurrencesUtil = require('./fetchOccurrences');

/**
 * Fetch data for a set of common pest species
 * @returns {Array<{ species: Object, occurrences: Array }>}
 */
async function fetchCommonPests() {
  const commonPests = [
    'Phylloxera',
    'Locusta migratoria',
    'Plutella xylostella',
    'Bemisia tabaci',
    'Tuta absoluta',
  ];

  const pestData = [];
  for (const name of commonPests) {
    const species = await searchSpeciesUtil(name);
    if (species) {
      const occurrences = await fetchOccurrencesUtil(species.id, 5);
      pestData.push({ species, occurrences });
    }
  }

  return pestData;
}

module.exports = fetchCommonPests;

