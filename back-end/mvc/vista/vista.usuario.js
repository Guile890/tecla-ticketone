const controladorUsuarios = require('../controlador/controlador.usuario')
const express = require('express')
const app = express()

const midd = require('../../midd/midd');
const cors = require('cors');

const middJsonAuth = require('../../midd/midd.jsonAuth')


//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());


module.exports = (app) => {
    app.get('/',  async (req, res)=> {
        res.json('ok')
    })   
    //vistas del modulo de usuario
    // vista para login
    app.get('/login', async(req,res)=> {
        try {
            res.render('login');
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })
    app.get('/registro', async(req,res)=> {
        try {
            res.render('registro');
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })



    //end points del modulo de usuario
    
    // insert usuario
    app.post("/usuario", cors(midd.corsOptions), async function (req, res) {
        
        let usuario = req.body
        try {
            let usuarios = await controladorUsuarios.insertUsuario(usuario);
            res.send(usuarios);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

    app.post("/login",cors(midd.corsOptions), async function (req,res){
        let credenciales = req.body
        try{
            let resultado = await controladorUsuarios.verificarExistencia(credenciales)
            if(resultado){
                let userInfo = await controladorUsuarios.getInfoUser(credenciales)
                let token = await controladorUsuarios.generarToken(credenciales)
                res.json({token: token, userInfo: userInfo})
            }else{
                throw new Error (err)
            }           
        }catch(error){
            res.status(500).json({ error: error.message })
        }
    })
}

