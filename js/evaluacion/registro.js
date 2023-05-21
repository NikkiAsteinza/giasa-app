const navegador = navigator.userAgent;
console.log(navegador);
moviles = [
  "Mobile",
  "iPhone",
  "iPod",
  "BlackBerry",
  "Opera Mini",
  "Sony",
  "MOT",
  "Nokia",
  "samsung",
];
let detector = false;
for (const i in moviles) {
  let compruebo = navegador.indexOf(moviles[i]);
  if (compruebo > -1) {
    detector = true;
  }
}
if (detector) {
  console.log("Estás en Móvil");
} else console.log("Estás en PC");



