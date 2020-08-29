//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var usuario = "";

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
      location.href = "index.html";
      localStorage.setItem("user", email.value);
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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  localStorage.setItem("user", profile.getEmail());
  localStorage.setItem("photo", profile.getImageUrl());
  location.href = "index.html";
}
