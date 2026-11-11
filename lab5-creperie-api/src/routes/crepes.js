const express = require('express');
const crepesController = require('../controllers/crepesController');

const router = express.Router();

router.get('/', crepesController.getAllCrepes);
router.get('/:id', crepesController.getCrepeById);
router.post('/', crepesController.createCrepe);
router.patch('/:id', crepesController.updateCrepe);
router.delete('/:id', crepesController.deleteCrepe);

module.exports = router;
