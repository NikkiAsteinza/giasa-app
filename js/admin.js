
if(localStorage.getItem("token")) {

    let mappedWorkers, mappedFeedback;

    fetch("http://localhost:8000/operarios").then((res)=> res.json().then(res=>{
    
    console.log(res);
     mappedWorkers = res.map((result)=>({
        id: result._id,
        dni: result.dni, 
        nombre:result.nombre, 
        apellido_1:result.apellido_1,
        apellido_2:result.apellido_2,
        categoria:result.categoria,
        obra_actual:result.obra_actual,
        obras:result.obras
    }));
    
    fetch("http://localhost:8000/evaluaciones").then((res)=> res.json().then(res=>
    {
        console.log(res);
         mappedFeedback = res.map((result)=>({
            id_usuario : result.id_usuario,
            id_operario: result.id_operario,
            evaluacion : result.evaluacion,
            comentario : result.comentario, 
            fecha_evaluacion: result.fecha_evaluacion,
        }));
    }));
    
    printMappedWorkers(mappedWorkers,mappedFeedback,"data-container","empleado_detalle.html")
}));

const logoutButton = document.getElementById("logout");

function logout(){

    console.log("logout")
    localStorage.removeItem("token");
    window.location = "http://127.0.0.1:5500/index.html";

}
logoutButton.addEventListener('click',logout);

function printMappedWorkers(mappedWorkers,mappedFeedback, containerID, goToPage){
    const container = document.getElementById(containerID);
    mappedWorkers.forEach(user => {
        const mediaMessage = "N/A";
        const valoracion = mappedFeedback?
            mappedFeedback.filter((e) => e.id_operario == user.id):
            mediaMessage;
        container.innerHTML += `<a href="${goToPage}">
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

}
