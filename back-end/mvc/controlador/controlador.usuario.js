const modeloUsuarios = require('../modelo/modelo.usuario')

// insertar nuevo usuario
module.exports.insertUsuario = async (usuario) => {
    try{
        let resultado = await this.verificarExistencia(usuario)
        if(resultado){
            return true //existe el usuario
        }else{
            await modeloUsuarios.insertUsuario(usuario)
            return false // no existe y lo inserta
        }
        
    }
    catch(error){
        throw new Error ('Ha ocurrido un problema')
    }
}


module.exports.verificarExistencia = async(usuario) =>{
    try{
        let resultado = await modeloUsuarios.verificarExistencia(usuario)
        return resultado;
    }
    catch(error){
        throw new Error ('Ha ocurrido un problema')
    }
}
module.exports.getInfoUser = async (credenciales) => {
    try {
        let resultado =  await modeloUsuarios.getInfoUser(credenciales)
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}

module.exports.generarToken = async(credenciales) =>{
    try {
        let resultado = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
            }, process.env.SECRET_KET
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }

}