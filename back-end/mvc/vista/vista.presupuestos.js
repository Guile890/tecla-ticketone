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
    app.get('/generarPresupuesto', async(req,res)=> {
        try {
            res.render('newPresupuesto.ejs');
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

    //generar nuevo presupuesto
    app.post('/newPresupuesto', async(req,res)=> {
        let presupuesto = req.body
        try {
            let resultado = await controladorPresupuestos.newPresupuesto(presupuesto);
            console.log('resultado neeeew',resultado)
            res.json(resultado)
        }catch (err){
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })

     // ruta para eliminar producto
     app.get('/presupuesto/delete/:id', async (req,res)=>{
        let id = req.params.id;
        try {
            let resultado = await controladorPresupuestos.eliminarPresupuesto(id)
            if(resultado){
                res.redirect('/');
            }      
        }catch (err){
            res.status(400).json('No se puedo eliminar el producto')
        }
    })




}