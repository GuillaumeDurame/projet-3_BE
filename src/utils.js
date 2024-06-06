function handleNotFound(res) {
    res.status(400).json({ message: err.message });
  }
  
  module.exports = { handleNotFound };