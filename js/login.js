//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("botonis").addEventListener("click", boton);
  var contra = document.getElementById("inputpassword");
  var email = document.getElementById("inputemail");
  var validation = document.getElementsByClassName("validations");
  validation[0].addEventListener("keypress", detectemail);
  validation[1].addEventListener("keypress", detectpassword);
  function detectemail() {
    document.getElementById("inputemail").style.border = "none";
  }

  function detectpassword() {
    document.getElementById("inputpassword").style.border = "none";
  }

  function boton() {
    if (email.value.length > 0 && contra.value.length > 0) {
      location.href = "../index.html";
    } else {
      if (email.value.length < 1 && contra.value.length < 1) {
        document.getElementById("inputemail").style.border = "thin solid red";
        document.getElementById("inputpassword").style.border = "thin solid red";
      } else if (contra.value.length < 1) {
        document.getElementById("inputpassword").style.border = "thin solid red";
      } else {
        if (email.value.length < 1) {
          document.getElementById("inputemail").style.border = "thin solid red";
        }
      }
    }
  }
});
