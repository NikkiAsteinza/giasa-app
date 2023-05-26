const setClientButton = document.getElementById("setClientButton");
setClientButton.addEventListener("click", () => {
  const name = document.getElementById("nombre")?.value;
  fetch("https://giasa-api.vercel.app/clientes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: name,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
});

// if(localStorage.getItem("token")) {

let mappedClients;

fetch("https://giasa-api.vercel.app/clientes").then((res) =>
  res.json().then((res) => {
    console.log(res);
    mappedClients = res.map((result) => ({
      id: result._id,
      nombre: result.nombre,
    }));

    printMappedClients(mappedClients, "dropdown-clientes");
  })
);

function printMappedClients(mappedClients, containerID) {
  const container = document.getElementById(containerID);
  mappedClients.forEach((client) => {
    container.innerHTML += `<option id="${client.nombre}" value="${client.nombre}" data-id="${client.id}">${client.nombre}</option>`;
  });
}

const setSiteButton = document.getElementById("setSiteButton");

setSiteButton.addEventListener("click", function () {
  const clientValue =   document.getElementById("dropdown-clientes").value;
  const clientAddress = document.getElementById("direccion")?.value;
  fetch("https://giasa-api.vercel.app/obras", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cliente: document.getElementById(`${clientValue}`).getAttribute("data-id"),
      nombre: clientValue+"-"+clientAddress.replace(" ",""),
      pais: document.getElementById("pais")?.value,
      comunidad: document.getElementById("comunidad")?.value,
      provincia: document.getElementById("provincia")?.value,
      ciudad: document.getElementById("ciudad")?.value,
      municipio: document.getElementById("municipio")?.value,
      tipo_via: document.getElementById("via")?.value,
      direccion: clientAddress,
      numero: document.getElementById("numero")?.value,
      puerta: document.getElementById("puerta")?.value,
      codigo_postal: document.getElementById("codigo-postal")?.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
});