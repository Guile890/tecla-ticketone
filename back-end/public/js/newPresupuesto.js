async function cancelar(){
    console.log('dentro de cancelar')
    try {
        swal({
          buttons: {
            cancel: true,
            confirm: {
              text: "Aceptar",
              value: "ok"
            },
          },
          text: "¿Seguro que cancelar el avance del presupuesto?",
          icon: "info"
        })
          .then(async (value) => {
            switch (value) {
              case "ok":
                swal({
                  text: "No se ha guardado ningún cambio",
                  icon: "info"
                });
                setTimeout(() => {
                  location.href = '/presupuestos'
                }, 1500);
            }
          })
      }
      catch (error) {
        throw console.log(error)
      }
}