$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
class Presupuesto {
  constructor(proyecto, versiones, fechaCreacion, estatus) {
    this.proyecto = proyecto,
      this.versiones = versiones,
      this.fechaCreacion = fechaCreacion
    this.estatus = estatus
  }
}


async function agregar() {
  const fecha = new Date();
  swal({
    text: 'Ingrese el nombre del presupuesto a crear',
    content: "input",
    button: {
      text: "Crear!",
    },
  }).then(async name => {
    if (!name) throw null;
    let newPresupuesto = new Presupuesto(
      name,
      '1',
      fecha.toLocaleDateString(),
      true
    )
    let resultado = await fetch("http://localhost:3000/newPresupuesto", {
      method: 'post',
      headers: {
        "Accept": "application/json, text/plain, *,*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPresupuesto)
    })
      .then(result => {
        result.json()
          .then(data => {
            console.log(data);
            if (result) {
              swal({
                text: "Se ha creado el presupuesto correctamente",
                icon: "success",
              });
              location.href="/generarPresupuesto/" + data ;// /presupuesto con id
            }
          })
      })
  })
}


async function eliminar(id, proyecto) {
  console.log(proyecto)
  console.log(id)
  try {
    swal({
      buttons: {
        cancel: true,
        confirm: {
          text: "Aceptar",
          value: "ok"
        },
      },
      text: "¿Seguro que quieres eliminar el presupuesto del proyecto: " + proyecto + " ?",
      icon: "info"
    })
      .then(async (value) => {
        switch (value) {
          case "ok":
            let resultado = await fetch("http://localhost:3000/presupuesto/delete/" + id, { // /eliminar presupuesto
              method: 'get',
              headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
              }
            })
            swal({
              text: "Presupuesto eliminado correctamente",
              icon: "success"
            });
            setTimeout(() => {
              location.href = '/presupuestos'
            }, 1500);
        }
      })
  } catch (error) {
    throw console.log(error)
  }

}