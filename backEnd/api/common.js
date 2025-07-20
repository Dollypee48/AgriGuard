// backEnd/api/common.js
const { fetchCommonPests } = require('../utils');  // up one level, into utils/

module.exports = async (req, res) => {
  try {
    const data = await fetchCommonPests();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in /api/common:', error);
    res.status(500).json({ error: 'Internal server error fetching common pests.' });
  }
};
