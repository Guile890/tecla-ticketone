const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db/conexion')
//Definicion del modelo de usuario
const Presupuesto = sequelize.define('Presupuesto', {
    idPresupuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    proyecto: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    versiones: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    estatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Presupuesto

module.exports.getPresupuestos = async () => {
    let resultado = await sequelize.query('SELECT * FROM presupuestos WHERE estatus = 1 order by idPresupuesto asc')
    return resultado[0]
}
module.exports.newPresupuesto = async (data) =>{
    console.log('valor a agregar',data)
    try {
        let resultado = await Presupuesto.create(({
            proyecto: data.proyecto, versiones: data.versiones, fechaCreacion: data.fechaCreacion,
            estatus: data.estatus
        }))
        return true
    }
    catch (error) {
        throw console.log(error)
    }
}



module.exports.insertUsuario = async (data) => {
    try {
        let resultado = await Usuario.create(({
            nombre: data.nombre, apellidos: data.apellidos, email: data.email,
            password: data.password, celular: data.celular
        }))
        return resultado
    }
    catch (error) {
        throw console.log(error)
    }

}

module.exports.deletePresupuesto = async (id) => {
    try{
        let resultado = await sequelize.query('UPDATE presupuestos SET estatus = 0 where idPresupuesto ='+id)
        return true
    }catch(error){
        throw console.log(error)
    }
}

