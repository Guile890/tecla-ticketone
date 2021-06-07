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
    try {
         await Presupuesto.create(({
            proyecto: data.proyecto, versiones: data.versiones, fechaCreacion: data.fechaCreacion,
            estatus: data.estatus
        }))
        let id = await sequelize.query('Select max(idPresupuesto) as idPresupuesto from presupuestos');
        return id[0]
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

module.exports.obtenerInfoPresupuesto  = async (data) =>{
    let id = [
        data
    ]
    try {
        let resultado = await sequelize.query(`SELECT * FROM Presupuestos WHERE idPresupuesto = ?`,
        {replacements : id, type : sequelize.QueryTypes.SELECT})
        return resultado;
    } catch (error) {
        throw new Error ('Ocurrio un error')
    }
}

