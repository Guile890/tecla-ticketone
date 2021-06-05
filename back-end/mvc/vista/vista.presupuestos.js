const controladorPresupuestos = require('../controlador/controlador.presupuesto')
const express = require('express')
const app = express()

const midd = require('../../midd/midd');
const cors = require('cors');


//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
module.exports = (app) => {

    //vistas
    app.get('/newPresupuesto', async(req,res)=> {
        try {
            res.render('newPresupuesto');
        }catch (err){
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })

    //end-point para listar presupuestos
    app.get('/presupuestos', async(req,res)=> {
        try {
            let resultado = await controladorPresupuestos.listarPresupuestos()
            res.render('presupuestos', {results:resultado});
        }catch (err){
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })

}