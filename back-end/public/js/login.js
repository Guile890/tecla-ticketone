
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
    let registro = new Usuario(
        event.target['GET-emails'].value,
        event.target['GET-pass'].value,

    );
    if ((registro.descripcion == null || registro.descripcion == "") && (registro.precio == null || registro.precio == "") && (registro.existencia == null || registro.existencia == "")
        && (registro.imagen == null || registro.imagen == "") && (registro.categoria == null || registro.categoria == "")) {
        swal({
            text: "El formulario está vacío favor de verificar la información",
            button: "Ok",
        });
    }else{
        try {
            console.log('valor a agregar',registro)
            let resultado = await fetch("http://localhost:3000/producto",{
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registro)
            })
            if(resultado.ok){
                swal({
                    text: "Producto agregado correctamente",
                    icon: "success",
                    button: "Ok",
                });
            }
            // location.href = '/createProducto'
            console.log('resultadooo',resultado)
            return resultado;

        } catch (error) {
            swal({
                text: `${error.message}`,
                button: "Ok",
            });
            throw console.log(error)
    
        }
    }
   
    
})