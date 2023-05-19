const empleadoDetallePage = "empleado-detalle.html";
const empleadoValoracionPage = "valoracion.html";

const mainContainer = "data-container";
const buscaOperario=document.getElementById("buscaOperario")
let filteredMappedWorkers, mappedWorkers, mappedFeedback;

buscaOperario.addEventListener("input",()=>{
  filterOperariosByName(mappedWorkers, buscaOperario.value)
  printMappedWorkers(filteredMappedWorkers)
})
function filterOperariosByName(operarios, name) {
  filteredMappedWorkers= operarios.filter(operario =>
    operario.nombre.toLowerCase().includes(name.toLowerCase()) ||
    operario.apellido_1.toLowerCase().includes(name.toLowerCase()) ||
    operario.apellido_2.toLowerCase().includes(name.toLowerCase())
  );
}

if (localStorage.getItem("token")) {
  const rol = localStorage.getItem("rol");
  if (rol) {
    let endPoint;
    switch (rol) {
      case "admin":
        endPoint ="http://localhost:8000/operarios";
        break;
      case "no_admin":
        endPoint ="http://localhost:8000/operarios";
        break;
    }
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
}

function printMappedWorkers(mappedWorkers) {
  const container = document.getElementById(mainContainer);
  container.innerHTML=""
  mappedWorkers.forEach((worker) => {
    let mappedFeedback;
    fetch("http://localhost:8000/evaluaciones/id/" + worker.id).then((res) =>
      res.json().then((res) => {
        if(res){
          console.log(res);
          mappedFeedback = res.map((result) => ({
            id_usuario: result.id_usuario,
            id_operario: result.id_operario,
            evaluacion: result.evaluacion,
            comentario: result.comentario,
            fecha_evaluacion: result.fecha_evaluacion,
          }));
        }
      })
    );
    const mediaMessage = "N/A";
    const valoracion = mappedFeedback
      ? mappedFeedback.filter((e) => e.id_operario == worker.id)
      : mediaMessage;
    const targetUrl = localStorage.getItem("rol") === "admin"? empleadoDetallePage : empleadoValoracionPage;
    container.innerHTML += `<a href="${targetUrl}?id=${worker.id}?obraActual=${worker.obra_actual}">
      <div class="carta-empleado unique-row">
        <div class="carta-header">
          <p class="empleado-nombre">${worker.nombre} ${worker.apellido_1} ${worker.apellido_2}</p>
          <div class="carta-header-valoracion">
            <div class="empleado-valoracion">${valoracion}</div>
            <div class="empleado-estrellas">
              <div class="star"></div>
            </div>
          </div>
        </div>
        <img class="usuario-imagen" src="../_resources/usuario_giasa.png" alt="">
      </div>
      </a>`;
  });
}
