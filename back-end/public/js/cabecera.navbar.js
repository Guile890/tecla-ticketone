let logout = async () =>{
    localStorage.clear();
    swal({
        text: "Se ha finalizado sesión",
        icon: "success",
    });
    setTimeout(() => {
        location.href = '/login'
    }, 1300);
}

let botonLogout = document.getElementById('logout')
botonLogout.addEventListener('click', logout, false)