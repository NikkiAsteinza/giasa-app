const textarea = document.getElementById("evaluacion-descripcion");
const acceptButton = document.getElementById("acceptButton");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const obra = urlParams.get("obraActual");

const obraActual = urlParams.get("obraActual");
const idOp = urlParams.get("idOp");
const id = urlParams.get("id");
const isNewEntry = urlParams.get("idSup");

function enableTextAreaOnFocus() {
  textarea.addEventListener("focus", function () {
    adjustHeight(this);
    acceptButton.classList.add("back-button");
    // acceptButton.style.display='flex';
    acceptButton.classList.remove("accept-button");
  });
}

function adjustHeight(textarea) {
  textarea.style.border = "1px solid #ccc";
  textarea.style.borderLeft = "none";
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

if (localStorage.getItem("token")) {
  if (localStorage.getItem("rol") == "admin") {
    if (isNewEntry) {
      enableTextAreaOnFocus();
      configureInteractiveStars();
    } else {
      configureStars();
    }
  } else {
    enableTextAreaOnFocus();
    configureInteractiveStars();


    const feedbackCliente = urlParams.get("cliente");
    const feedbackObra = urlParams.get("obra");

    const evaluacionObra = document.getElementById("evaluacion-obra");
    evaluacionObra.innerText = feedbackObra;

    const evaluacionCliente = document.getElementById("evaluacion-cliente");
    evaluacionCliente.innerText = feedbackCliente;

    const nombreObra = document.getElementById("evaluacion-obra");
    nombreObra.innerText = feedbackObra;

    const evaluacionDescripcion = document.getElementById(
      "evaluacion-descripcion"
    );
    const evaluacionValor = document.getElementById("evaluacion-valor");

    const botonAtrasFeedback = document.getElementById("feedbackAtras");
    botonAtrasFeedback.setAttribute(
      "href",
      "./empleado-detalle.html?id=" + idOp + "&obraActual=" + obraActual
    );

    fetch("http://localhost:8000/evaluaciones/id/" + id).then((res) =>
      res.json().then((res) => {
        console.log(res);
        feedback = res;
        evaluacionDescripcion.innerText = feedback.descripcion;
        evaluacionValor.innerText = feedback.evaluacion;
      })
    );
  }
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

function configureInteractiveStars() {
  const stars = document.getElementsByClassName("interactive-star");
  for(i = 0; i<stars.length; i++){
    stars[i].addEventListener("click", () => {
      if(stars.classList.includes("star")){
        for(j = stars[i].dataset.index; j<stars.length; j++){
              start[j].classList.remove("start")
              start[j].classList.add("staroff")
        }
      }
      else{
        for(k = 0; k< stars[i].dataset.index; k++){
          start[j].classList.remove("staroff")
          start[j].classList.add("star")
        }
      }

    });
  }
}

acceptButton.addEventListener("click", async function () {
  console.log("accept button clicked");
  const res = await fetch("http://localhost:8000/evaluaciones", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_operario: idOP,
      evaluacion: document.getElementById("evaluacion-valor").value,
      descripcion: document.getElementById("evaluacion-descripcion").value,
      id_supervisor: idSup,
      id_obra: obra,
    }),
  });

  const response = await res.json();
  console.log(response);
  location.reload();
});
