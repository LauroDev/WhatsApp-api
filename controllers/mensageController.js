
const {body , validationResult} = require('express-validator')
const path = require('path');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const mensageController = {
    index: async (req, res) => {
        console.log(req.body);
        return res.status(200);
    },
    enviar: async (req,res) =>{
        const errors = validationResult(req).formatWith(({
          msg
        }) =>{
          return msg;
        });
      
        if(!errors.isEmpty()){
          return res.status(422).json({
            status:false,
            message:errors.mapped()
          });
        }
      
        const number = req.body.number + '@c.us';
        const message = req.body.message;

         await global.cliente
        .sendText(number, message)
        .then((result) => {
          res.status(200).json({
            status:true,
            message:'mensagem enviada',
            response: result
          }); 
        }).catch(err =>{
          res.status(500).json({
            status:false,
            message:'mensagem não enviada',
            response: err.text
          }); 
        })
        .catch((erro) => {
          res.status(500).json({
            status:false,
            message:'Error when sending: ',
            response: erro.text
          }); 
        });
      
    },
    enviarArquivo: async(req,res)=>{
        const number = req.body.number + '@c.us';
        const doc = req.body.file;
        const ext = req.body.ext;
        await global.cliente
        .sendFile(
          number,
          global.url + '/' + 'docs/' + doc + '.'+ ext,
          'documento_'+doc,
          'mensagem da api com documento'
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    },
    logar: async(req,res)=>{
      const login=req.body.login;
      const password=req.body.password;
      console.log(req.body);
      console.log(process.env.USER_LOGIN , login ,  process.env.USER_PASSWORD , password);
      if(login === process.env.USER_LOGIN && password === process.env.USER_PASSWORD){
      //auth ok
       const id = 1; //esse id viria do banco de dados
       const token = jwt.sign({ id }, process.env.SECRET, {
         expiresIn: 300 // expires in 5min
       });
       return res.json({ auth: true, token: token, sucesso:true });
        }
      res.status(500).json({message: 'Login inválido!'});
    },
    error: async(req,res)=>{
      return res.render('error');
    }
    
};

module.exports = mensageController;

