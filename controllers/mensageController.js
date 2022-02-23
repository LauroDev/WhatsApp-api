
const {body , validationResult} = require('express-validator')


const mensageController = {
    index: async (req, res) => {
        console.log(req.body);
        return res.status(200);
    },
    enviar: async (req,res) =>{
        console.log(req.body);
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
      
        const number = req.body.number;
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
          console.error('Error when sending: ', erro); //return object error
        });
      
      }
    
};
module.exports = mensageController;

