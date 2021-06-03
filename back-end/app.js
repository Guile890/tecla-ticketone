// importacion de modulos externos
const express = require('express')
const app = express()
require('dotenv').config()
const midd = require('./midd/midd');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// importacion de modulos internos
const vistaUsuarios = require('./mvc/vista/vista.usuario')
const vistaPresupuestos = require('./mvc/vista/vista.presupuestos');
const Presupuesto = require('./mvc/modelo/modelo.presupuesto')

// importacion db
const sequelize = require('./db/conexion')



//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//configuraciones globales
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// iniciar servidor 
async function inicioServidor(){
    try{
        await Presupuesto.sync({alter: true})
        await sequelize.authenticate();
        console.log('Conexión correcta con la db');
        app.listen(process.env.PORT,function(){
            console.log(`Servidor iniciado en ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err)
        console.log('no se pudo conectar con la bd ');
    }
  }
  inicioServidor();

  //Views
vistaUsuarios(app);
vistaPresupuestos(app);
