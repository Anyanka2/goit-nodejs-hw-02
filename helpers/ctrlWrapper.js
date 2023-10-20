const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      return await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
