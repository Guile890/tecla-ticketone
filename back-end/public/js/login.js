class Loggeo{
    constructor(email,password){
        this.email = email,
        this.password = password
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
const form = document.getElementById('loginForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let credenciales = new Loggeo(
        event.target['GET-emails'].value,
        event.target['GET-pass'].value,

    );
    if ((credenciales.email == null || registro.email == "") || (credenciales.password == null || credenciales.password == "")){
        swal({
            text: "El formulario es inválido, verifica la información",
            button: "Ok",
        });       
    }else{
        try {
            console.log('valor a agregar',credenciales)
            let resultado = await fetch("http://localhost:3000/login",{
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credenciales)
            })
            let respuesta = await resultado.json();
            if(respuesta === 'Usuario o contraseña incorrecta'){
                swal({
                    text: "Usuario o contraseña incorrecta",
                    icon: "error",
                    button: "Ok",
                });
            }else{
                swal({
                    text: "Usuario o contraseña incorrecta",
                    icon: "success",
                    button: "Ok",
                });

            }

        } catch (error) {
            swal({
                text: "Error al intentar ingresar, intenta de nuevo",
                button: "Ok",
            });
            console.log('valor de resultado',resultado)
        }
    }
   
    
})