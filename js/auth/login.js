const mainContainer = document.getElementById("main-container");

if(!localStorage.getItem("token")) {
    mainContainer.innerHTML = '<form id="login-form"><div><input id="user" type="text" placeholder="usuario" class="b-form-element"/><input id="password" type="password" placeholder="contraseña" class="b-form-element"/></div><a id="login-button" class="b-form-element button">Login</a></form>';
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", tryLogin);
}
else{
    console.log("signed id")
    mainContainer.innerHTML = '<div class="info"><p>Ya has iniciado sesión</p></div>'
}


async function tryLogin() {
    const res = await fetch("http://localhost:8000/usuarios/login/", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         user: document.getElementById("user").value,
         password: document.getElementById("password").value,
       }),
     });
   
     const response = await res.json();
     localStorage.setItem("token", response.token);
     localStorage.setItem("rol",response.rol)
     localStorage.setItem("id",response.id)
     console.log(response);
     window.location = window.location.origin+"/pages/main.html"
   }
