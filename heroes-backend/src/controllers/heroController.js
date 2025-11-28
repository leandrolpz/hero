const Hero = require('../models/Hero');
const Power = require('../models/Power');

// Criar herói
exports.createHero = async (req, res) => {
  try {
    if (req.body.powers && req.body.powers.length) {
      const count = await Power.countDocuments({ _id: { $in: req.body.powers } });
      if (count !== req.body.powers.length) {
        return res.status(400).json({ error: 'Um ou mais powers não existem' });
      }
    }

    const hero = new Hero(req.body);
    await hero.save();

    // populate moderno do Mongoose
    await hero.populate('powers');

    res.status(201).json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar heróis
exports.getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().populate('powers');
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar por ID
exports.getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id).populate('powers');
    if (!hero) return res.status(404).json({ error: 'Herói não encontrado' });
    res.json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar
exports.updateHero = async (req, res) => {
  try {
    if (req.body.powers) {
      const count = await Power.countDocuments({ _id: { $in: req.body.powers } });
      if (count !== req.body.powers.length) {
        return res.status(400).json({ error: 'Um ou mais powers não existem' });
      }
    }

    const hero = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('powers');

    if (!hero) return res.status(404).json({ error: 'Herói não encontrado' });

    res.json(hero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar
exports.deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ error: 'Herói não encontrado' });
    res.json({ message: 'Herói deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
