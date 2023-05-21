const textarea = document.querySelector('textarea');
const acceptButton = document.getElementById('acceptButton');

if(localStorage.getItem("rol")=="no-admin"){
  textarea.addEventListener('focus', function() {
    adjustHeight(this);
    acceptButton.className +=" back-button"
    acceptButton.style.display='flex';
  });
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
  const evaluacionValor = document.getElementById("evaluacion-valor");

  const botonAtrasFeedback = document.getElementById("feedbackAtras");
  botonAtrasFeedback.setAttribute("href","./empleado-detalle.html?id="+idOp+"&obraActual="+obraActual)


  fetch("http://localhost:8000/evaluaciones/id/" + id).then((res) =>
  res.json().then((res) => {
    console.log(res);
    feedback = res;
    evaluacionDescripcion.innerText = feedback.descripcion;
    evaluacionValor.innerText = feedback.evaluacion;
  }))
}
function configureStars() {
  const stars = document.getElementsByClassName("interactive-star");
  for (i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", () => {
      if (stars[i].getAttribute("class") === "staroff") {
        turnYellow(stars[i]);
      } else {
        for (j = i * 1; j < stars.length; j++) {
          turnGray(stars[j]);
        }
      }
    });
  }
  const dato = document.getElementById("evaluacion-valor");
}
acceptButton.addEventListener("click", async function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const obra = urlParams.get("obraActual");
  const operario = urlParams.get("id");
  

  console.log("accept button clicked")
  const res = await fetch("http://localhost:8000/evaluaciones", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_operario:operario,
      evaluacion:document.getElementById("evaluacion-valor").value,
      descripcion: document.getElementById("evaluacion-descripcion").value,
      id_supervisor: localStorage.getItem("id"),
      id_obra: obra
    }),
  });

  const response = await res.json();
  console.log(response)
  location.reload();
})
