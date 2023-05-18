const detalleContainer = document.getElementById("worker-feedback-list");
const goToPage = "feedback_detalle.html";

let mappedFeedback, mappedSite,cliente, obra;

if(localStorage.getItem("token")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get('id')
  fetch("http://localhost:8000/evaluaciones/id/"+id).then((res)=> res.json().then(res=>{
    console.log("----------------------------Mapped feedback: ");
    console.log(res);
    mappedFeedback = res.map((result)=>({
      id_supervisor :result.id_supervisor,
      id_operario:result.id_operario,
      evaluacion : result.evaluacion,
      descripcion : result.descripcion,
    }));

    printWorkerFeedback(mappedFeedback)
  }));
}





function printWorkerFeedback(mappedFeedback){
  
  mappedFeedback.forEach(feedback => {
    console.log("---------------- 1. Feedback id supervisor")
    console.log(feedback.id_supervisor);
    console.log("---------------- 2. Mapped site: ");
    getCurrentSite(feedback.id_supervisor);
    console.log("---------------- 3. Client: ");
    getCurrentClient(obra)
    console.log(obra)


    mappedFeedback.forEach(user => {
        const mediaMessage = "N/A";
        const valoracion = mappedFeedback?
            mappedFeedback.filter((e) => e.id_operario == user.id):
            mediaMessage;
        detalleContainer.innerHTML += `<div data-cliente="${cliente}" data-obra="${obra}" class="b-empleado-main__item unique-row">
        <div class="b-empleado-main__item-punt">
          <img src="../_resources/star.png" class="star" />
          <p class="b-empleado-main__valor white">4.0</p>
        </div>
        <div class="b-empleado-main__nombre-fecha">
          <p class="b-empleado-main__nombre en-filtro">Nombre Cliente</p>
          <p class="b-empleado-main__fecha">20/04/19</p>
        </div>
        <!-- <div class="b-empleado-main__link">
          <a href="cliente_detalle.html" ><svg class="b-empleado-main__link--icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="30"
              fill="none"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M.586 3.666c-.781-.839-.781-2.199 0-3.037a1.9 1.9 0 0 1 2.828 0l12 12.886c.757.813.784 2.122.06 2.97L3.414 29.371c-.746.874-2.014.801-2.828 0s-.746-2.188 0-3.062l10.646-11.211L.586 3.666z"
                fill="#fff"
              />
            </svg>
          </a>
        </div> -->
      </div>
    </div>`;
    });
  })

  function getCurrentSite(idSupervisor){
    fetch("http://localhost:8000/obras/sup/"+idSupervisor).then((res)=> res.json().then(res=>
    {
        console.log(res);
        mappedSite = res.map((result)=>({
          nombre : result.nombre,
          id : result._id,
        }));
        obra = mappedSite.id;
  }));
  }

  function getCurrentClient(clientId){
    fetch("http://localhost:8000/clientes/nombre/"+clientId).then((res)=> res.json().then(res=>
    {
        console.log(res);
        cliente = res;
    })); 
  }
};



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
const etiquetasA = document.querySelectorAll(".link-detalle");

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
