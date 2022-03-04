var express = require('express');
var router = express.Router();
const mensagemController = require('../controllers/mensageController');
const {body , validationResult} = require('express-validator')
const token = require('../auth/token');
/* GET home page. */
router.post('/',token ,mensagemController.index);

router.post('/send-message', token,[
  body('number').notEmpty(),
  body('message').notEmpty(),
], mensagemController.enviar);

router.get('/*', mensagemController.error);


router.post('/send-message-file', token,[
  body('number').notEmpty(),
  body('file').notEmpty(),
], mensagemController.enviarArquivo);

router.post('/logar-api' ,[
  body('login').notEmpty(),
  body('password').notEmpty(),
],  mensagemController.logar );

module.exports = router;
