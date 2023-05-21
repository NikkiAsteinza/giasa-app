
if(localStorage.getItem("token")) {
    const header = document.getElementById("header");

    header.innerHTML += '<button id="logout" class="button cerrar-sesion"><span>Salir</span></button>';
    const logoutButton = document.getElementById("logout");
    
    function logout(){
    
        console.log("logout")
        localStorage.removeItem("token");
        window.location.href ="../index.html";
    
    }
    logoutButton.addEventListener('click',logout);
    console.log(localStorage);
}