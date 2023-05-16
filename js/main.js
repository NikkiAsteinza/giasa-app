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
    window.location = "http://127.0.0.1/pages/administracion.html";
  }
  else{
    window.location = "http://127.0.0.1/pages/empleado.html";
  }
  if(localStorage.getItem("token")) {

    getAllLibros();

}
}
const logginButton = document.getElementById("login-button");
logginButton.addEventListener("click", tryLogin);

