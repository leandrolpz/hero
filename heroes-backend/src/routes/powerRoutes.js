const express = require('express');
const router = express.Router();
const powerController = require('../controllers/powerController');

router.post('/', powerController.createPower);
router.get('/', powerController.getAllPowers);
router.get('/:id', powerController.getPowerById);
router.put('/:id', powerController.updatePower);
router.delete('/:id', powerController.deletePower);

module.exports = router;
