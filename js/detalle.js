var showIcon = document.querySelector(".show-icon");
var text = document.querySelector(".b-empleado-main__observaciones__texto");

showIcon.addEventListener("click", function() {
  if (text.style.display === "none") {
    text.style.display = "block";
    showIcon.style.transform="scale(.7) rotate(90deg)"
  } else {
    text.style.display = "none";
    showIcon.style.transform="scale(.7) rotate(270deg)"
  }
});