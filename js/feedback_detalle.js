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

  const feedbackId = urlParams.get("id");
  const feedbackCliente = urlParams.get("cliente");
  const feedbackObra = urlParams.get("obra");

  const evaluacionObra = document.getElementById("evaluacion-obra");
  evaluacionObra.innerText = feedbackObra;

  const evaluacionCliente = document.getElementById("evaluacion-cliente");
  evaluacionCliente.innerText = feedbackCliente;

  const nombreObra = document.getElementById("evaluacion-obra");
  nombreObra.innerText = feedbackObra;
}