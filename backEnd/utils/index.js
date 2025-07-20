const searchSpeciesFn = require('./searchSpecies');
const fetchOccurrencesFn = require('./fetchOccurrences');
const fetchCommonPestsFn = require('./fetchCommonPests');

module.exports = {
  searchSpecies: searchSpeciesFn,
  fetchOccurrences: fetchOccurrencesFn,
  fetchCommonPests: fetchCommonPestsFn,
};