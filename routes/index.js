var express = require('express');
var router = express.Router();
const mensagemController = require('../controllers/mensageController');
const {body , validationResult} = require('express-validator')

/* GET home page. */
router.post('/', mensagemController.index);

router.post('/send-message', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], mensagemController.enviar);

module.exports = router;
