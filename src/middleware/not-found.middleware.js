const notFound = (req, res, next) => {
  return res.status(400).json({ message: "Router not found." });
};

export default notFound;
