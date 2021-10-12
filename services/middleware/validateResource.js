const validateResourceMW = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors.join(", ") });
  }
};

module.exports = validateResourceMW;
