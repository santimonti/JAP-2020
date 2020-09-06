//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var relatedProduct;
var productInfo;
document.addEventListener("DOMContentLoaded", function (t) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;

      showProductInfo();
    }
  });
});
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productComment = resultObj.data;

      showProductComment();
    }
  });
});
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

  document.getElementById("prodInner").innerHTML = htmlContentToAppend;
}
function showRelated() {
  let relatedInfo = "";
  for (let i = 0; i < relatedProduct.length; i++) {
    let related = relatedProduct[i];
    if (i == productInfo.relatedProducts[0] || i == productInfo.relatedProducts[1]) {
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
  }
  document.getElementById("ads").innerHTML = relatedInfo;
}
function showProductComment() {
  let comments = "";
  productComment.forEach(function (ob) {
    for (var i = 0; i < 5; i++) {
      // We need 5 stars
      var icoClass = i < ob.score ? "fa fa-star icon-a" : "fa fa-star-o icon-b"; // full or empty star?
      comments += "<i class='" + icoClass + "'></i>"; // concatenate stars
    }
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
  </li><br>`; // and concatenate the cool movie name
  });
  document.getElementById("prodComment").innerHTML = comments; // Finally insert
}

var count;

function starmark(item) {
  count = item.id[0];
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
