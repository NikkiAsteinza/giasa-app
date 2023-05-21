const detalleContainer = document.getElementById("worker-feedback-list");
const nombreContainer = document.querySelector(".b-empleado-main__nombre");
const goToPage = "feedback_detalle.html";

const botonObra = document.getElementById("obra");
const botonCliente = document.getElementById("cliente");
const etiquetasP = document.querySelectorAll("p.en-filtro");
const etiquetasA = document.querySelectorAll(".link-detalle");

let mappedFeedback, mappedSite, cliente, obra;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (localStorage.getItem("token")) {
  configureStars();
  const id = urlParams.get("id");
  const workerIdData = document.getElementById("workerId");
  workerIdData.innerText = id;
 const workerIdCopy = document.getElementById('workerIdCopy');
 workerIdCopy.addEventListener("click", function(){
      copyContent(id); 
  })




  fetch("http://localhost:8000/operarios/id/" + id).then((res) =>
    res.json().then((res) => {
      console.log("----------------------------Operario: ");
      console.log(res);
      const nombreCompleto =
        res[0].nombre + " " + res[0].apellido_1 + " " + res[0].apellido_2;
      nombreContainer.innerHTML = nombreCompleto;
    })
  );

  fetch("http://localhost:8000/evaluaciones/id_op/" + id).then((res2) =>
    res2.json().then((res2) => {
      if (!res2) {
        console.log("---------------- 1. No feedback for user");
        const feedbackList = document.getElementById("worker-feedback-list");
        feedbackList.innerHTML +=
          "<p style='text-align:center;'>Este usuario aun no tiene valoraciones</p>";
      } else {
        mappedFeedback = res2.map((result) => ({
          id: result._id,
          id_supervisor: result.id_supervisor,
          id_operario: result.id_operario,
          evaluacion: result.evaluacion,
          descripcion: result.descripcion,
          fecha: result.createdAt,
          obra: result.id_obra,
        }));

        // toggleCrearValoracionButton();
        printWorkerFeedback(mappedFeedback);
      }
    })
  );
}

  async function copyContent(text){
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
// function toggleCrearValoracionButton(){
//   const crearValoracionButton = document.getElementById("crear-valoracion");

//   if(localStorage.getItem("rol")== "admin"){
//     crearValoracionButton.classList.add("hidden");
//   }
//   else{
//     const crearValoracionButton = document.getElementById("crear-valoracion");
//     crearValoracionButton.setAttribute("href","valoracion.html?"+id);
//   }
// }

function printWorkerFeedback(mappedFeedback) {
  mappedFeedback.forEach((feedback) => {
    console.log("---------------- 1. Feedback id supervisor");
    console.log(feedback.id_supervisor);
    console.log("---------------- 2. Feedback id obra");
    console.log(feedback.obra);
    console.log("---------------- 3. Mapped site: ");
    fetch("http://localhost:8000/obras/sup/" + feedback.id_supervisor).then(
      (res) =>
        res.json().then((res) => {
          obra = res;
          console.log(obra);
          const url = "./" + goToPage;
          detalleContainer.innerHTML += `<a href="${url}?id=${feedback.id}&idOp=${feedback.id_operario}&cliente=${obra.cliente}&obra=${obra.nombre}&obraActual=${obra._id}"><div data-cliente="${obra.cliente}" data-obra="${obra.nombre}" class="b-empleado-main__item unique-row">
          <div class="b-empleado-main__item-punt">
            <img src="../_resources/star.png" class="star" />
            <p class="b-empleado-main__valor white">${feedback.evaluacion}</p>
          </div>
          <div class="b-empleado-main__nombre-fecha">
            <p class="b-empleado-main__nombre en-filtro">${obra.nombre}</p>
            <p class="b-empleado-main__fecha">${feedback.fecha}</p>
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

        })
    );
  });
}
function configureStars() {
  const stars = document.getElementsByClassName("interactive-star");
  media =urlParams.get("val");
  console.log(media);
  ceilMedia= Math.ceil(media);

  for (i = 0; i < ceilMedia-1; i++) {
        stars[i].classList.remove("staroff");
        stars[i].classList.add("star");
  }
  const dato = document.getElementById("evaluacion-valor");
  dato.innerText = media;
}


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
