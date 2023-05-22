const textarea = document.querySelector('textarea');
const acceptButton = document.getElementById('acceptButton');
const evaluacionValor = document.getElementById("evaluacion-valor");

if(localStorage.getItem("rol")=="no_admin" || localStorage.getItem("rol") == "admin"){
  textarea.addEventListener('focus', function() {
    adjustHeight(this);
    acceptButton.className +=" back-button"
    acceptButton.style.display='flex';
  });
}

if(localStorage.getItem("rol")=="no_admin"){
  configureStars()
}

function adjustHeight(textarea) {
  textarea.style.border = '1px solid #ccc';
  textarea.style.borderLeft = 'none';
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}


if (localStorage.getItem("token")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const id = urlParams.get("id");
  const obraActual = urlParams.get("obraActual");
  const idOp = urlParams.get("idOp");
  
  console.log(id);
  const feedbackCliente = urlParams.get("cliente");
  const feedbackObra = urlParams.get("obra");

  const evaluacionObra = document.getElementById("evaluacion-obra");
  evaluacionObra.innerText = feedbackObra;

  const evaluacionCliente = document.getElementById("evaluacion-cliente");
  evaluacionCliente.innerText = feedbackCliente;

  const nombreObra = document.getElementById("evaluacion-obra");
  nombreObra.innerText = feedbackObra;
  
  const evaluacionDescripcion = document.getElementById("evaluacion-descripcion");
  

  const botonAtrasFeedback = document.getElementById("feedbackAtras");
  botonAtrasFeedback.setAttribute("href","./empleado-detalle.html?id="+idOp+"&obraActual="+obraActual)


  fetch("http://localhost:8000/evaluaciones/id/" + id).then((res) =>
  res.json().then((res) => {
    console.log(res);
    if(!res){
    feedback = res;
    evaluacionDescripcion.innerText = feedback.descripcion;
    evaluacionValor.innerText = feedback.evaluacion;
    }else{
      feedback = null;
      evaluacionDescripcion.innerText = " ";
      evaluacionValor.innerText = " "; 
    }
  }))
}
function configureStars() {
  const stars = document.getElementsByClassName("interactive-star");
  console.log(stars);
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", () => {
      if (stars[i].getAttribute("class").includes("staroff")) {
        for (let j=0; j<=i; j++) {
          turnYellow(stars[j]);
        }
        evaluacionValor.innerText = i+1;
      } else {
        for (let j = stars.length-1; j > i; j--) {
          turnGray(stars[j]);
        }
        evaluacionValor.innerText = i+1;
      }
    });
  }
  // const dato = document.getElementById("evaluacion-valor");
  // console.log(dato);
  
}
function turnYellow(star) {
  star.classList.remove("staroff");
  star.classList.add("star");
  
}

function turnGray(star) {
  star.classList.remove("star");
  star.classList.add("staroff");
  
}

acceptButton.addEventListener("click", async function(){
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let obra = "";
  let operario = "";

  if (localStorage.getItem("rol") == "no-admin"){
    obra = urlParams.get("obraActual");
    operario = urlParams.get("id");
  }else{
    const miSelectorO = document.getElementsByClassName("selectorO");
    obra = miSelectorO.value;
    operario = urlParams.get("idOp")
  }
  

  console.log("accept button clicked")
  const res = await fetch("http://localhost:8000/evaluaciones", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_operario:operario,
      evaluacion:parseInt(evaluacionValor.textContent, 10),
      descripcion: document.getElementById("evaluacion-descripcion").value,
      id_supervisor: localStorage.getItem("id"),
      id_obra: obra
    }),
  });

  const response = await res.json();
  console.log(response)
  location.reload();
});


if (localStorage.getItem("rol") == "admin" || localStorage.getItem("rol") == "dev") {

  const pEmpleadoMainClave = document.getElementById("clave-cliente");
  pEmpleadoMainClave.classList.add("oculto");
  const pEmpleadoMainValor = document.getElementById("evaluacion-cliente");
  pEmpleadoMainValor.classList.add("oculto");

  const divDetalleMain = document.getElementById("detalle-main");

  const labelClientes = document.createElement("label");
  labelClientes.textContent = "Cliente: ";
  const selectorClientes = document.createElement("select");
  selectorClientes.setAttribute("class", "selectorC");
  labelClientes.appendChild(selectorClientes);


  const labelObras = document.createElement("label");
  labelObras.textContent = "Obra: ";
  const selectorObras = document.createElement("select");
  selectorObras.setAttribute("class", "selectorO");
  labelObras.appendChild(selectorObras);

  divDetalleMain.appendChild(labelClientes);
  //Rellenamos los datos de los clientes  
  //Creamos el primer elemento de los selectores con texto vacio
  const opcionVaciaC = document.createElement("option");
  opcionVaciaC.value = -1;
  opcionVaciaC.textContent = " "
  selectorClientes.appendChild(opcionVaciaC);
  fetch("http://localhost:8000/clientes/")
  .then(res => res.json())
  .then(clientes => {
    clientes.forEach(cliente => {
      const  opcionC = document.createElement("option");
      opcionC.value = cliente._id;
      opcionC.textContent = cliente.nombre;
      selectorClientes.appendChild(opcionC);
    });
  })
  .catch(error => console.log(error));
  
  divDetalleMain.appendChild(labelObras);
  //Rellenamos los datos de las obras
  const opcionVaciaO = document.createElement("option");
  opcionVaciaO.value = -1;
  opcionVaciaO.textContent = " "
  selectorObras.appendChild(opcionVaciaO);
  fetch("http://localhost:8000/obras/")
  .then(res => res.json())
  .then(obras => {
    obras.forEach(obra => {
      const  opcionO = document.createElement("option");
      opcionO.value = obra._id;
      opcionO.textContent = obra.nombre;
      selectorObras.appendChild(opcionO);
    });
  })
  .catch(error => console.log(error));

}else{
  const pEmpleadoMainClave = document.getElementById("clave-cliente");
  pEmpleadoMainClave.classList.remove("oculto");
  const pEmpleadoMainValor = document.getElementById("evaluacion-cliente");
  pEmpleadoMainValor.classList.remove("oculto");
}
