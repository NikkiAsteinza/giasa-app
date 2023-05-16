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
  console.log(response);
  if(response.rol === "admin")
  {
    window.location = window.location.origin+"/pages/administracion.html";
  }
  else{
    window.location = window.location.origin+"/pages/empleado.html";
  }
  if(localStorage.getItem("token")) {

    getAllLibros();

}
}
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", tryLogin);