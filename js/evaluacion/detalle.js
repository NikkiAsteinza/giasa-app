const textarea = document.querySelector('textarea');
const acceptButton=document.querySelector('.accept-button');

textarea.addEventListener('focus', function() {
  adjustHeight(this);
  acceptButton.className +=" back-button"
  acceptButton.style.display='flex';
});


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
  
  const evaluacionDescripcion = document.getElementById("evaluacion-decripcion");
  const evaluacionValor = document.getElementById("evaluacion-valor");

  acceptButton.addEventListener("click", async function(){
    console.log("accept button clicked")
    const res = await fetch("http://localhost:8000/evaluaciones", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_operario:idOp,
        evaluacion:document.getElementById("evaluacion-valor"),
        descripcion: document.getElementById("evaluacion-decripcion"),
        id_supervisor: localStorage.getItem("id")
      }),
    });
  
    const response = await res.json();
    console.log(response)
    location.reload();
  })
  fetch("http://localhost:8000/evaluaciones/id/" + id).then((res) =>
  res.json().then((res) => {
    console.log(res);
    feedback = res;
    evaluacionDescripcion.innerText = feedback.descripcion;
    evaluacionValor.innerText = feedback.evaluacion;
  }))
}
