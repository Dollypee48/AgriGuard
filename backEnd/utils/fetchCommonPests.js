const searchSpecies = require('./searchSpecies');
const fetchOccurrences = require('./fetchOccurrences');

async function fetchCommonPests() {
  const commonPests = [
    'Phylloxera',
    'Locusta migratoria',
    'Plutella xylostella',
    'Bemisia tabaci',
    'Tuta absoluta',
  ];

  const result = [];
  for (const name of commonPests) {
    const species = await searchSpecies(name);
    if (species) {
      const occurrences = await fetchOccurrences(species.id, 5);
      result.push({ species, occurrences });
    }
  }
  return result;
}

module.exports = fetchCommonPests;
