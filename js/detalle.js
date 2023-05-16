// var showIcon = document.querySelector(".show-icon");
// var text = document.querySelector(".b-empleado-main__observaciones__texto");

// showIcon.addEventListener("click", function() {
//   if (text.style.display === "none") {
//     text.style.display = "block";
//     showIcon.style.transform="scale(.7) rotate(90deg)"
//   } else {
//     text.style.display = "none";
//     showIcon.style.transform="scale(.7) rotate(270deg)"
//   }
// });
const botonObra = document.getElementById("obra");
const botonCliente = document.getElementById("cliente");
const etiquetasP = document.querySelectorAll("p.en-filtro");
const etiquetasA = document.querySelectorAll("div.b-empleado-main__link a");

botonObra.addEventListener("click", () => {
  if (botonObra.classList.contains("filtro-inactivo")) {
    botonObra.classList.remove("filtro-inactivo");
    botonObra.classList.add("filtro-activo");
    botonCliente.classList.remove("filtro-activo");
    botonCliente.classList.add("filtro-inactivo");
    etiquetasP.forEach((p) => {p.textContent="Nombre Obra"});
    etiquetasA.forEach((a) => {a.setAttribute("href", "obra_detalle.html")});
  
}});

botonCliente.addEventListener("click", () => {
    if (botonCliente.classList.contains("filtro-inactivo")) {
        botonCliente.classList.remove("filtro-inactivo");
        botonCliente.classList.add("filtro-activo");
        botonObra.classList.remove("filtro-activo");
        botonObra.classList.add("filtro-inactivo");
        etiquetasP.forEach((p) => {p.textContent="Nombre Cliente"});
        etiquetasA.forEach((a) => {a.setAttribute("href", "cliente_detalle.html")});
      }
});
