//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var relatedProduct;
var productInfo;
//Obtiene el json del link
document.addEventListener("DOMContentLoaded", function (t) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;

      showProductInfo();
    }
  });
});
//Obtiene el json del link
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productComment = resultObj.data;
      //Si es diferente a undefined entra al if y muestra el comentario guardado en el seassion storage
      if (sessionStorage.getItem("comentario")) {
        //Agrega a la varuable productComment el objeto guardado en seasion storage (lo transforma a un objeto desde string)
        productComment.push(JSON.parse(sessionStorage.getItem("comentario")));
      }
      showProductComment();
    }
  });
});
//Obtiene el json del link
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      relatedProduct = resultObj.data;

      showRelated();
    }
  });
});

function showProductInfo() {
  let htmlContentToAppend = "";
  //Se usa la concadenacion de texto para añadir las variables del js con codigo html a mostrar
  htmlContentToAppend +=
    `
    <div class="container">
  <h1 class="elegantshd">` +
    productInfo.name +
    `</h1>
    
    <div class="row pl-3">
  <div id="carouselExampleIndicators" class="carousel slide carousel-fade img-thumbnail p-1   col-8 " data-interval="3000" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
  </ol>
  <div class="carousel-inner ">
    <div class="carousel-item active">
      <img class="d-block w-100" src="/img/prod1_1.jpg" alt="First slide onix">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/img/prod1_2.jpg" alt="Second slide onix">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/img/prod1_3.jpg" alt="Third slide onix">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/img/prod1_4.jpg" alt="fourth slide onix"
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>

</div>


<div class="col-4 col align-self-center">
<h4>Precio actual: </h4>

<h2 class="text-danger" style="font-family:Arial, Helvetica, sans-serif"><strong>
 US$ ` +
    productInfo.cost +
    ` </h2></strong>

  <P>Cantidad de ventas: <strong>  ` +
    productInfo.soldCount +
    `</P></strong>




<div id="accordion" class="pt-5 mt-5 ">
<div class="card">
  <a class="text-reset btn btn-lg btn-light " data-toggle="collapse" href="#collapseOne">
      
       Descripcion </a>
       
    
    <div id="collapseOne" class="collapse card-body" data-parent="#accordion">
      <div>
        ` +
    productInfo.description +
    `
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
<br>
<h4>Articulos relacionados</h2>
<div  class="container ">
    <div class="row" id="ads">
    <div id="rel"></div>
</div>
</div>
  `;
  //se asigna y se muestra en el codigo html

  document.getElementById("prodInner").innerHTML = htmlContentToAppend;
}
function showRelated() {
  let relatedInfo = "";
  //El for pasa por el largo de los productos relacionados
  for (let i = 0; i < productInfo.relatedProducts.length; i++) {
    //Se guarda en pos la posicion de los productos relacionados guardados en productInfo
    let pos = productInfo.relatedProducts[i];
    //Se le asigna la informacion de ese producto a la variable related
    let related = relatedProduct[pos];
    //Se escribe el codigo html con concadenacion de texto
    relatedInfo +=
      `
  <div class=" col-sm-4 ">
      <div class="card rounded">
          <div class="card-image">
          <span class="card-notify-badge "><h6>` +
      related.name +
      `</h6></span>
              
              <img class="img-fluid" src="` +
      relatedProduct[i].imgSrc +
      `" alt=" ` +
      relatedProduct[i].name +
      `" />
          </div>
          <div class="card-image-overlay m-auto">
              
              <span class="card-detail-badge">US$ ` +
      relatedProduct[i].cost +
      `</span>
              <span class="card-detail-badge">` +
      relatedProduct[i].soldCount +
      ` vendidos</span>
          </div>
          <div class="card-body text-center">
              <div class="ad-title m-auto">
                  
              </div>
              <a class="ad-btn" href="#">View</a>
          </div>
      </div>
  </div>


  
`;
  }
  document.getElementById("ads").innerHTML = relatedInfo;
}
//
function showProductComment() {
  let comments = "";
  //recorre por cada elemento en el arreglo
  productComment.forEach(function (ob) {
    for (var i = 0; i < 5; i++) {
      //Se repite 5 veces porque son 5 estrellas
      //Se usa el operador ternario  atajo al if
      var icoClass = i < ob.score ? "fa fa-star icon-a" : "fa fa-star-o icon-b"; //Si score es menor a i se muestra estrella vacia sino lo contrario
      comments += "<i class='" + icoClass + "'></i>"; // Concadenacion de estrellas
    }
    //cada comentario es añadido a el codigo
    comments +=
      `
      <li class="list-group-item ">
    <div class="row col-12">
     
      <div class="col-xs-10 col-md-11">
        <div>
          <div class="mic-info">
            By:
            <a href="#">` +
      ob.user +
      `</a>
           ` +
      ob.dateTime +
      `
          </div>
        </div>
        <div class="comment-text">` +
      ob.description +
      `</div>
        <div class="action">
         
        </div>
      </div>
    </div>
  </li><br>`;
  });
  //Asignando luego del for agrega a el tag prodComment el codigo html
  document.getElementById("prodComment").innerHTML = comments;
}

var count;

function starmark(item) {
  //Funcion que trabaja con el codigo html mientras se mueve el mouse en las estrellas
  count = item.id[0];
  //Se guardan las estrellas en la session storage
  sessionStorage.starRating = count;
  var subid = item.id.substring(1);
  for (var i = 0; i < 5; i++) {
    if (i < count) {
      document.getElementById(i + 1 + subid).style.color = "orange";
    } else {
      document.getElementById(i + 1 + subid).style.color = "black";
    }
  }
}
function result() {
  let commen = {
    score: sessionStorage.starRating,
    description: document.getElementById("comment").value,
    user: localStorage.getItem("user"),
    dateTime: Date(),
  };
  sessionStorage.setItem("comentario", JSON.stringify(commen));

  showProductComment();
  location.reload();
}
