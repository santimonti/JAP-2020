//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var json = {};
document.addEventListener("DOMContentLoaded", function (e) {

    if (localStorage.getItem("profile")) {
        json = JSON.parse(localStorage.getItem("profile"))

        document.getElementById("names").value = json.name
        document.getElementById("age").value = json.age
        document.getElementById("mail").value = json.mail
        document.getElementById("lastNames").value = json.lastNames
    }






});
document.addEventListener("DOMContentLoaded", function (e) {});


function info() {
    var name;
    var lastNames;
    var age;
    var mail;


    if (localStorage.getItem("profile")) {
        let received = JSON.parse(localStorage.getItem("profile"))
        if (document.getElementById("names").innerHTML.length == 0 && document.getElementById("names").value != received.names) {
            name = document.getElementById("names").value;
            json.name = name;
            console.log(json)
        }

        if (document.getElementById("lastNames").innerHTML.length == 0 && document.getElementById("lastNames").value != received.lastNames) {
            lastNames = document.getElementById("lastNames").value;
            json.lastNames = lastNames;
        }
        if (document.getElementById("age").innerHTML.length == 0 && document.getElementById("age").value != received.age) {
            age = document.getElementById("age").value;
            json.age = age;
        }
        if (document.getElementById("mail").innerHTML.length == 0 && document.getElementById("mail").value != received.mail) {
            mail = document.getElementById("mail").value;
            json.mail = mail;

        }
    } else {
        name = document.getElementById("names").value;
        json.name = name;
        lastNames = document.getElementById("lastNames").value;
        json.lastNames = lastNames;
        age = document.getElementById("age").value;
        json.age = age;
        mail = document.getElementById("mail").value;
        json.mail = mail;
    }
    localStorage.setItem("profile", JSON.stringify(json))

}