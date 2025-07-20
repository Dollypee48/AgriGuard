exports.validatePestKey = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).json({ 
      error: 'Invalid species ID format. Must be numeric GBIF species key.' 
    });
  }
  
  next();
};