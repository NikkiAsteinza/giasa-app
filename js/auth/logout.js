
if(localStorage.getItem("token")) {
    const header = document.getElementById("header");

    header.innerHTML += '<button id="logout" class="button cerrar-sesion">Salir</button>';
    const logoutButton = document.getElementById("logout");
    
     
    logoutButton.addEventListener('click',logout);
    console.log(localStorage);
}
export function logout(){
    
        
    console.log("logout")
    localStorage.removeItem("token");
    if (window.location.href.includes("index")){
        
        location.reload();
    } else 
    {window.location.href ="../index.html";}

}