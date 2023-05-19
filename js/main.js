const empleadoDetallePage = "empleado-detalle.html";
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
    switch (rol) {
      case "admin":
        fetch("http://localhost:8000/operarios").then((res) =>
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

        break;
      case "no_admin":
        fetch(
          "http://localhost:8000/obras/sup/" + localStorage.getItem("id")
        ).then((res) =>
          res.json().then((res) => {
            console.log(res);
            mappedObra = res.map((result) => ({
              id: _id,
              nombre: result.nombre,
            }));

            fetch("http://localhost:8000/operarios/obra/" + mappedObra.id).then(
              (res) =>
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
                })
            );

            printMappedWorkers(mappedWorkers);
          })
        );
        break;
      case "dev":
        //window.location = window.location.origin+"/pages/dev.html";
        break;
    }
  }
}

function printMappedWorkers(mappedWorkers) {
  const container = document.getElementById(mainContainer);
  container.innerHTML=""
  mappedWorkers.forEach((user) => {
    let mappedFeedback;
    fetch("http://localhost:8000/evaluaciones/id/" + user.id).then((res) =>
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
      ? mappedFeedback.filter((e) => e.id_operario == user.id)
      : mediaMessage;
    container.innerHTML += `<a href="${empleadoDetallePage}?id=${user.id}">
      <div class="carta-empleado unique-row">
        <div class="carta-header">
          <p class="empleado-nombre">${user.nombre} ${user.apellido_1} ${user.apellido_2}</p>
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
