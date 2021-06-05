const modeloPresupuestos = require('../modelo/modelo.presupuesto')

//Listar prouctos
module.exports.listarPresupuestos = async ()=>{
    try {
        let resultado = await modeloPresupuestos.getPresupuestos()
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en productos.service')
    }
} 