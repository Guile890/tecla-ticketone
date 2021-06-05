const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db/conexion')
//Definicion del modelo de usuario
const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    timestamps: true
})

module.exports = Usuario
module.exports.verificarExistencia = async (data) =>{
    console.log('entrando a modelo',data)
    let resultado = await Usuario.findOne({where: {email:data.email}})
    console.log('valor result',resultado)
    if (resultado === null){
        return false
    }else {
        return true
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

module.exports.getInfoUser = async (data) =>{
    try{
        let resultado = await Usuario.findOne({where: {email:data.email, password: data.password}})
        return resultado
    }
    catch(error) {
        throw console.log(error)
    }
}