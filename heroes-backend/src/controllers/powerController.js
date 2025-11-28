const Power = require('../models/Power');

// Criar power
exports.createPower = async (req, res) => {
  try {
    const power = new Power(req.body);
    await power.save();
    res.status(201).json(power);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos
exports.getAllPowers = async (req, res) => {
  try {
    const powers = await Power.find().sort('name');
    res.json(powers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar por id
exports.getPowerById = async (req, res) => {
  try {
    const power = await Power.findById(req.params.id);
    if (!power) return res.status(404).json({ error: 'Power não encontrado' });
    res.json(power);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar
exports.updatePower = async (req, res) => {
  try {
    const power = await Power.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!power) return res.status(404).json({ error: 'Power não encontrado' });
    res.json(power);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar
exports.deletePower = async (req, res) => {
  try {
    const power = await Power.findByIdAndDelete(req.params.id);
    if (!power) return res.status(404).json({ error: 'Power não encontrado' });
    res.json({ message: 'Power deletado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
