const detalleContainer = document.getElementById("worker-feedback-list");
const nombreContainer = document.querySelector(".b-empleado-main__nombre");

const goToPage = "feedback_detalle.html";
const url = "./" + goToPage;

const botonObra = document.getElementById("obra");
const botonCliente = document.getElementById("cliente");

let mappedFeedback, mappedSite, cliente, obra;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (localStorage.getItem("token")) {
  configureStars();

  const workerIdData = document.getElementById("workerId");
  workerIdData.innerText = id;
  const workerIdCopy = document.getElementById("workerIdCopy");
  workerIdCopy.addEventListener("click", function () {
    copyContent(id);
  });

  fetch("https://giasa-api.vercel.app/operarios/id/" + id).then((res) =>
    res.json().then((res) => {
      console.log("----------------------------Operario: ");
      console.log(res);
      const nombreCompleto =
        res[0].nombre + " " + res[0].apellido_1 + " " + res[0].apellido_2;
      nombreContainer.innerHTML = nombreCompleto;
    })
  );

  fetch("https://giasa-api.vercel.app/evaluaciones/id_op/" + id).then((res2) =>
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

        toggleCrearValoracionButton();
        printWorkerFeedback(mappedFeedback);
      }
    })
  );
}

async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

function toggleCrearValoracionButton(feedback) {
  const crearValoracionButton = document.getElementById("nuevoRegistro");

  if (localStorage.getItem("rol") == "no_admin") {
    crearValoracionButton.classList.add("hidden");
  } else {
    crearValoracionButton.setAttribute("href", `${url}?idOp=${id}`);
  }
}

function printWorkerFeedback(mappedFeedback) {
  mappedFeedback.forEach((feedback) => {
    console.log("---------------- 1. Feedback id supervisor");
    console.log(feedback.id_supervisor);
    console.log("---------------- 2. Feedback id obra");
    console.log(feedback.obra);
    console.log("---------------- 3. Mapped site: ");
    fetch("https://giasa-api.vercel.app/obras/sup/" + feedback.id_supervisor).then(
      (res) =>
        res.json().then((res) => {
          obra = res;
          console.log(obra);

          detalleContainer.innerHTML += `<a href="${url}?id=${feedback.id}&idOp=${feedback.id_operario}&cliente=${obra.cliente}&obra=${obra.nombre}&obraActual=${obra._id}"><div data-cliente="${obra.cliente}" data-obra="${obra.nombre}" class="b-empleado-main__item unique-row">
          <img  width=40 height=40 class="feedback-imagen" src="../_resources/checklist.png" alt="">  
          <div class="b-empleado-main__nombre-fecha">
            <p class="b-empleado-main__nombre en-filtro">${obra.nombre}</p>
            <p class="b-empleado-main__fecha">${feedback.fecha}</p>
          </div>
          <div class="b-empleado-main__item-punt">
          <img width=20 height=20 src="../_resources/star.png"/>
          <p class="b-empleado-main__valor white">${feedback.evaluacion}</p>
        </div>
        </div>
      </div></a>`;
        })
    );
  });
}
function configureStars() {
  const stars = document.getElementsByClassName("interactive-star");
  media = urlParams.get("val");
  console.log(media);
  ceilMedia = Math.ceil(media);

  for (i = 0; i < ceilMedia - 1; i++) {
    stars[i].classList.remove("staroff");
    stars[i].classList.add("star");
  }
  const dato = document.getElementById("evaluacion-valor");
  dato.innerText = media;
}

botonObra.addEventListener("click", () => {
  toggleFiltro(botonObra, botonCliente, obra.nombre);
});

botonCliente.addEventListener("click", () => {
  toggleFiltro(botonCliente, botonObra, obra.cliente);
});
function toggleFiltro(botonActivo, botonInactivo, valor) {
  if (botonActivo.classList.contains("filtro-inactivo")) {
    botonActivo.classList.remove("filtro-inactivo");
    botonActivo.classList.add("filtro-activo");
    botonInactivo.classList.remove("filtro-activo");
    botonInactivo.classList.add("filtro-inactivo");
    const etiquetasP = document.querySelectorAll("p.en-filtro");
    etiquetasP.forEach((p) => {
      p.innerHTML = valor;
    });
  }
}
