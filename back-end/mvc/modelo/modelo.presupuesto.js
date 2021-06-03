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
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true
})

module.exports = Presupuesto

module.exports.getPresupuestos = async () => {
    let resultado = await sequelize.query('SELECT * FROM presupuestos order by idPresupuesto asc')
    return resultado[0]
}