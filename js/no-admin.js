if(localStorage.getItem("token")) {

    let mappedWorkers, mappedFeedback;
    const mediaMessage = "N/A";

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
    

    const container = document.getElementById("data-container");
    
    mappedWorkers.forEach(user => {
        const valoracion = mappedFeedback?
            mappedFeedback.filter((e) => e.id_operario == user.id):
            mediaMessage;
        container.innerHTML += `<a href="valoracion.html">
        <div class="carta-empleado unique-row">
          <div class="carta-header">
            <h3 class="empleado-nombre">${user.nombre} ${user.apellido_1} ${user.apellido_2}</h3>
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
}));

}