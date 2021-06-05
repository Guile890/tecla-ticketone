// Clase Usuario
class Usuario{
    constructor(nombre,apellidos,email,password,celular){
        this.nombre = nombre,
        this.apellidos = apellidos,
        this.email = email,
        this.password = password,
        this.celular = celular
    }
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
const form = document.getElementById('formulario');

form.addEventListener('submit', async(event) =>{
    event.preventDefault();
    let usuario = new Usuario(
        event.target['GET-nombres'].value,
        event.target['GET-apellidos'].value,
        event.target['GET-emails'].value,
        event.target['GET-passwords'].value,
        event.target['GET-celulars'].value,
    );
    console.log('valor usuario ', usuario);
    if((usuario.nombre == null || usuario.nombre == "") || (usuario.apellidos == null || usuario.apellidos == "") || (usuario.email == null || usuario.email == "")
    || (usuario.password == null || usuario.password == "") || (usuario.celular == null || usuario.celular == "")){
        swal({
            text: "El formulario es inválido, verifica la información",
            button: "Ok",
        });
    }else{
        try{
            let resultado = await fetch("http://localhost:3000/usuario",{
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            console.log(resultado)
            if(resultado.ok){
                swal({
                    text: "Usuario registrado correctamente",
                    icon: "success",
                    button: "Ok",
                });
                setTimeout(() => {
                    location.href = '/login'
                }, 3000);
            }else{
                swal({
                    text: "El usuario ya existe",
                    icon: "error",
                    button: "Ok",
                });
            }
        }catch(error){
            swal({
                text: "Error al intentar registrar usuario, intenta de nuevo",
                button: "Ok",
            });
        }

    }
})