const Rant = require('../models/rantModel');

exports.getRants = async (req, res) => {
  try {
    const rants = await Rant.find().sort({ createdAt: -1 });
    res.json(rants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addRant = async (req, res) => {
  const { name, message } = req.body;

  const newRant = new Rant({
    name,
    message
  });

  try {
    const savedRant = await newRant.save();
    res.status(201).json(savedRant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
