const mainContainer = document.getElementById("main-container");
if (!localStorage.getItem("token")) {
  mainContainer.innerHTML =
    '<form id="login-form"><div><input id="user" type="text" placeholder="usuario" class="b-form-element"/><input id="password" type="password" placeholder="contraseña" class="b-form-element"/></div></form><a id="login-button" class="button">Login</a>';
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", tryLogin);
} else {
  console.log("signed id");
  //goToMain();
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
console.log(res.status);
  const response = await res.json();
  console.log(res.status,  response.token);
  if (res.status===200 && response.token){
  localStorage.setItem("token", response.token);
  localStorage.setItem("rol", response.rol);
  localStorage.setItem("id", response.id);
  localStorage.setItem("name", document.getElementById("user").value);
  console.log(response);
  goToMain();}
  else {
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Usuario y/o contraseña incorrectos";
    errorMessage.style.color = "red";
    mainContainer.appendChild(errorMessage);
  }
}
function goToMain(){
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(/index\.html$/, "pages/main.html");
  window.location.href = newPath;
}