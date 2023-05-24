const empleadoDetallePage = "empleado-detalle.html";
const empleadoValoracionPage = "feedback_detalle.html";

const mainContainer = "data-container";
const buscaOperario=document.getElementById("buscaOperario");
const nombreUsuario = document.getElementById("signedInUser");

let filteredMappedWorkers, mappedWorkers, mappedFeedback,endPoint,mappedObra;

nombreUsuario.innerText ="Hola "+ camelize(localStorage.getItem("name"));

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
        endPoint ="http://localhost:8000/operarios";
        getWorkers(endPoint);
        break;
      case "no_admin":
        
        fetch("http://localhost:8000/obras/sup/"+localStorage.getItem("id")).then((res) =>
            res.json().then((res) => {
              console.log("Id de la obra del supervisor:"+res._id);
              // mappedObra = res.map((result) => ({
              //   id: result._id,
              // }));
              endPoint ="http://localhost:8000/operarios/obra/"+res._id;
              getWorkers(endPoint);
            }));
            break;
        } 
    }
  }
  function camelize(str) {
    let firstChar = str[0].toUpperCase();
    return firstChar+str.slice(1);
  }
function getWorkers(endPoint){
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


    fetch("http://localhost:8000/evaluaciones/midEval/" + worker.id).then((res) =>
    res.json().then((res) => {
      if(res){
        console.log(res);
        mediaValoracion = typeof variable === 'string'? res.toLowerCase():res;
      }
      let workerIdCopy = "";
      if (localStorage.getItem("rol") === "admin") {
        workerIdCopy = `<p class="b-empleado-main__fecha worker-id-copy">${worker.id}</p>`;
      }
      container.innerHTML += `<a href="${ localStorage.getItem("rol") === "admin"? empleadoDetallePage : empleadoValoracionPage}?id=${worker.id}&obraActual=${worker.obra_actual}&val=${mediaValoracion}"><div class="b-empleado-main__item unique-row">
        <img width=45 height=45 class="usuario-imagen" src="../_resources/usuario.png" alt="">  
        <div class="b-empleado-main__nombre-fecha">
          <p class="b-empleado-main__nombre en-filtro">${worker.nombre} ${worker.apellido_1} ${worker.apellido_2}</p>
          ${workerIdCopy}
        </div>
        <div class="b-empleado-main__item-punt">
          <img width=20 height=20 src="../_resources/star.png" />
          <p class="b-empleado-main__valor white">${mediaValoracion}</p>
        </div>
      </div>
    </div></a>`;
   
    })
    
  );
});
}
