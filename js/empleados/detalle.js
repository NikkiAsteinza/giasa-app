const detalleContainer = document.getElementById("worker-feedback-list");
const nombreContainer = document.querySelector(".b-empleado-main__nombre");
const goToPage = localStorage.getItem("rol")===  "admin"? "feedback_detalle.html":"valoracion.html";

let mappedFeedback, mappedSite, cliente, obra;

if (localStorage.getItem("token")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get("id");

  fetch("http://localhost:8000/operarios/id/" + id).then((res) =>
  res.json().then((res) => {
    console.log("----------------------------Operario: ");
    console.log(res);
    const nombreCompleto= res[0].nombre+" "+res[0].apellido_1 +" "+res[0].apellido_2;
    nombreContainer.innerHTML = nombreCompleto;
  
  }))
  
  fetch("http://localhost:8000/evaluaciones/id_op/" + id).then((res2) =>
    res2.json().then((res2) => {
      console.log("----------------------------Mapped feedback: ");
      
      mappedFeedback = res2.map((result) => ({
        id : result._id,
        id_supervisor: result.id_supervisor,
        id_operario: result.id_operario,
        evaluacion: result.evaluacion,
        descripcion: result.descripcion,
        fecha: result.createdAt
      }));
      console.log(mappedFeedback);
      printWorkerFeedback(mappedFeedback);
    })
  );
}

function printWorkerFeedback(mappedFeedback) {
  mappedFeedback.forEach((feedback) => {
    console.log("---------------- 1. Feedback id supervisor");
    console.log(feedback.id_supervisor);
    console.log("---------------- 2. Mapped site: ");
    getCurrentSite(feedback.id_supervisor);

    
  });

  function getCurrentSite(idSupervisor) {
    fetch("http://localhost:8000/obras/sup/" + idSupervisor).then((res) =>
      res.json().then((res) => {
        obra = res;
        console.log(obra);
        fetch("http://localhost:8000/clientes/nombre/" + obra.cliente).then(
          (res2) =>
            res2.json().then((res2) => {
              cliente = res2;
              console.log(cliente);
              mappedFeedback.forEach((feedbackEntry) => {
                const url = window.location.origin+"/pages/"+goToPage;
                detalleContainer.innerHTML += `<a href="${url}?id=${feedbackEntry.id}&idOp=${feedbackEntry.id_operario}&cliente=${cliente.nombre}&obra=${obra.nombre}"><div data-cliente="${cliente.nombre}" data-obra="${obra.nombre}" class="b-empleado-main__item unique-row">
                  <div class="b-empleado-main__item-punt">
                    <img src="../_resources/star.png" class="star" />
                    <p class="b-empleado-main__valor white">${feedbackEntry.evaluacion}</p>
                  </div>
                  <div class="b-empleado-main__nombre-fecha">
                    <p class="b-empleado-main__nombre en-filtro">${cliente.nombre}</p>
                    <p class="b-empleado-main__fecha">${feedbackEntry.fecha}</p>
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
              </div></a>`;
              });
            })
        );
      })
    );
  }
}

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
    etiquetasP.forEach((p) => {
      p.textContent = "Nombre Obra";
    });
    etiquetasA.forEach((a) => {
      a.setAttribute("href", "obra_detalle.html");
    });
  }
});

botonCliente.addEventListener("click", () => {
  if (botonCliente.classList.contains("filtro-inactivo")) {
    botonCliente.classList.remove("filtro-inactivo");
    botonCliente.classList.add("filtro-activo");
    botonObra.classList.remove("filtro-activo");
    botonObra.classList.add("filtro-inactivo");
    etiquetasP.forEach((p) => {
      p.textContent = "Nombre Cliente";
    });
    etiquetasA.forEach((a) => {
      a.setAttribute("href", "cliente_detalle.html");
    });
  }
});
