module.exports = {

    modeloLogin : Joi.object().keys({
        email:Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).with('email', 'password')

}