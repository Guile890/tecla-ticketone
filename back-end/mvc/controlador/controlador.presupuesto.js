const modeloPresupuestos = require('../modelo/modelo.presupuesto')

//Listar prouctos
module.exports.listarPresupuestos = async ()=>{
    try {
        let resultado = await modeloPresupuestos.getPresupuestos()
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en controlador.presupuestos')
    }
} 
// crear nuevo presupuesto 
module.exports.newPresupuesto = async(presupuesto) =>{
    try{
        let resultado = await modeloPresupuestos.newPresupuesto(presupuesto)
        return resultado
    }catch(err){
        throw new Error ('Ocurrio un problema en controlador.presupuestos')
    }
}

 //Eliminar un producto
 module.exports.eliminarPresupuesto = async (id) => {
    try {
        let resultado = await modeloPresupuestos.deletePresupuesto(id)        
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el presupuesto seleccionado')
    }
};

//obtener info del presupuesto by id
module.exports.obtenerInfoPresupuesto = async (id) => {
    try{
        let resultado = await modeloPresupuestos.obtenerInfoPresupuesto(id)
        return resultado;
    }catch(error){
        throw new Error ('No se pudo acceder el presupuesto seleccionado')
    }
}