//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var cartinfo = {};
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_DESAFIATE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartinfo = resultObj.data;
      showCartInfo();
    }
  });
});

function showCartInfo() {
  let HTMLAppletElement = "";
  for (let i = 0; i < cartinfo.articles.length; i++) {
    const element = cartinfo.articles[i];

    HTMLAppletElement +=
      `
  
  <tr>
                <td data-th="Producto">
                  <div class="row">
                    <div class="col-sm-2 "><img src="` +
      element.src +
      `" alt="Pino tree" class="img-responsive" /></div>
                    <div class="col-sm-8 offset-sm-2">
                      <h4 class="nomargins">` +
      element.name +
      `</h4>
                      
                    </div>
                  </div>
                </td>
                <td data-th="Precio" ><span class="small">` +
      element.currency +
      ` $</span>
        <span class="font-weight-bold"> ` +
      element.unitCost +
      ` </span>
        </td>
                <td data-th="Cantidad">
                  <input type="number" id="cantidad` +
      i +
      `" class="form-control text-center" value="` +
      element.count +
      `" />
                </td>
                <td data-th="Subtotal" id="prices` +
      i +
      `" class="text-center">200</td>
                <td class="actions" data-th="">
                  <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                  <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
                </td>
              </tr>
  
  
  
  
  
  
  `;
    let cantidad = "cantidad" + i;
    let prices = "prices" + i;
    document.getElementById("Products").innerHTML = HTMLAppletElement;
    document.getElementById(cantidad).addEventListener("change", price);
    function price() {
      alert("");
      document.getElementById(prices).innerHTML = document.getElementById(cantidad).value * element.unitCost;
    }
  }
}

document.addEventListener("DOMContentLoaded", function (e) {});
