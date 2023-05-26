const empleadoDetallePage = "empleado-detalle.html";
const empleadoValoracionPage = "feedback_detalle.html";

const mainContainer = "data-container";
const buscaOperario = document.getElementById("buscaOperario");
const nombreUsuario = document.getElementById("signedInUser");

let filteredMappedWorkers, mappedWorkers, mappedFeedback, endPoint, mappedObra;

nombreUsuario.innerText = "Hola " + camelize(localStorage.getItem("name"));

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  console.log(success);

  if (success) {
    const successMessageContainer = document.createElement("div");
    successMessageContainer.classList.add("success-message-container");

    const successMessage = document.createElement("div");
    successMessage.textContent = "¡Evaluación enviada correctamente!";
    successMessage.classList.add("success-message");

    successMessageContainer.appendChild(successMessage);
    document.body.appendChild(successMessageContainer);
    success = false;
    setTimeout(() => {
      successMessage.classList.add("oculto");
    }, 5000);
  }
});

buscaOperario.addEventListener("keypress", function(e)  {
  if (e.key === "Enter") 
 {const filteredWorkers= filterOperariosByName(mappedWorkers, buscaOperario.value);
  printMappedWorkers(filteredWorkers)}
});
function filterOperariosByName(operarios, name) {
 return operarios.filter(
    (operario) =>
      operario.nombre.toLowerCase().includes(name.toLowerCase()) ||
      operario.apellido_1.toLowerCase().includes(name.toLowerCase()) ||
      operario.apellido_2.toLowerCase().includes(name.toLowerCase())
  );
  
}

if (localStorage.getItem("token")) {
  const rol = localStorage.getItem("rol");
  if (rol) {
    switch (rol) {
      case "admin":
        endPoint = "http://localhost:8000/operarios";
        getWorkers(endPoint);
        break;
      case "no_admin":
        fetch(
          "http://localhost:8000/obras/sup/" + localStorage.getItem("id")
        ).then((res) =>
          res.json().then((res) => {
            console.log("Id de la obra del supervisor:" + res._id);
            // mappedObra = res.map((result) => ({
            //   id: result._id,
            // }));
            endPoint = "http://localhost:8000/operarios/obra/" + res._id;
            getWorkers(endPoint);
          })
        );
        break;
    }
  }
}
function camelize(str) {
  let firstChar = str[0].toUpperCase();
  return firstChar + str.slice(1);
}
function getWorkers(endPoint) {
  fetch(endPoint).then((res) =>
    res.json().then((res) => {
      console.log(res);
      mappedWorkers = res.map((result) => ({
        id: result._id,
        dni: result.dni,
        nombre: result.nombre,
        apellido_1: result.apellido_1,
        apellido_2: result.apellido_2,
        categoria: result.categoria,
        obra_actual: result.obra_actual,
        obras: result.obras,
      }));

      printMappedWorkers(mappedWorkers);
    })
  );
}

let mediaValoracion;

async function printMappedWorkers(mappedWorkers) {
  const container = document.getElementById(mainContainer);
  container.innerHTML = "";

  for (const worker of mappedWorkers) {
    try {
      const feedbackResponse = await fetch("http://localhost:8000/evaluaciones/id/" + worker.id);
      const feedbackData = await feedbackResponse.json();
      const mappedFeedback = feedbackData
  ? feedbackData.map(result => ({
      id_usuario: result.id_usuario,
      id_operario: result.id_operario,
      evaluacion: result.evaluacion,
      comentario: result.comentario,
      fecha_evaluacion: result.fecha_evaluacion,
    }))
  : [];

      const mediaResponse = await fetch("http://localhost:8000/evaluaciones/midEval/" + worker.id);
      const mediaData = await mediaResponse.json();
      mediaValoracion = typeof mediaData === "string" ? mediaData.toLowerCase() : mediaData;

      let workerIdCopy = "";
      if (localStorage.getItem("rol") === "admin") {
        workerIdCopy = `<p class="b-empleado-main__fecha worker-id-copy">${worker.id}</p>`;
      }

      container.innerHTML += `<a href="${
        localStorage.getItem("rol") === "admin"
          ? empleadoDetallePage
          : empleadoValoracionPage
      }?id=${worker.id}&obraActual=${
        worker.obra_actual
      }&val=${mediaValoracion}"><div class="b-empleado-main__item unique-row">
    <img width=45 height=45 class="usuario-imagen" src="../_resources/usuario.png" alt="">  
    <div class="b-empleado-main__nombre-fecha">
      <p class="b-empleado-main__nombre en-filtro">${worker.nombre} ${
        worker.apellido_1
      } ${worker.apellido_2}</p>
      ${workerIdCopy}
    </div>
    <div class="b-empleado-main__item-punt">
      <img width=20 height=20 src="../_resources/star.png" />
      <p class="b-empleado-main__valor white">${mediaValoracion}</p>
    </div>
  </div>
</div></a>`;

    } catch (error) {
      console.error("Error al obtener la información del trabajador:", error);
    }
  }
}

