const User = require("../models/userModel");

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addFavorite = async (req, res) => {
  const { countryCode } = req.body;
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favorites.includes(countryCode)) {
      user.favorites.push(countryCode);
      await user.save();
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFavorite = async (req, res) => {
  const { countryCode } = req.body;
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter((code) => code !== countryCode);
    await user.save();

    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
