//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let cTotal = 0;
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
    let currencyCost = element.unitCost;

    if (element.currency == "USD") {
      currencyCost *= 40;
    }


    cTotal += currencyCost * element.count;
    document.getElementById("pTotal").innerHTML = cTotal;
    HTMLAppletElement +=
      `
  
  <tr>
                <td data-th="Producto">
                  <div class="row">
                    <div class="col-sm-2 "><img src="${element.src}" alt="Pino tree" class="img-responsive"  height="200px" width="200px"/></div>
                    <div class="col-sm-6 offset-sm-2">
                      <h4 class="nomargins">${element.name}</h4>
                      
                    </div>
                  </div>
                </td>
                <td data-th="Precio" class="col-sm-1 text-center" ><span> ${element.currency} $</span>
        <span class="font-weight-bold"> ${element.unitCost} </span>
        </td>
                <td data-th="Cantidad" class="col-sm-1">
                  <input type="number" id="cantidad${i}" class="form-control text-center col-sm-8" value="${
        element.count
      }" onchange="price(${i},${currencyCost})" />
                </td>
                <td data-th="Subtotal en pesos"  class="text-center"><strong id="prices${i}"> ${currencyCost * element.count}</strong></td>
                
              </tr>
  
  
  
  
  
  
  `;
    document.getElementById("Products").innerHTML = HTMLAppletElement;

  }
}

function price(i, unit) {
  let cuenta = document.getElementById("cantidad" + i).value * unit;

  let antesCuenta = document.getElementById("prices" + i).innerHTML;
  console.log(document.getElementById("prices" + i).innerHTML)
  document.getElementById("prices" + i).innerHTML = cuenta;


  cTotal += cuenta - antesCuenta;

  document.getElementById("pTotal").innerHTML = cTotal;
  priceSend({
    "value": "option1"
  });
}

function priceSend(send) {
  if (send.value == "option1") {
    document.getElementById("costSend").innerHTML = cTotal * 0.15
    document.getElementById("pTotal").innerHTML = cTotal;
    document.getElementById("pTotal").innerHTML = cTotal + parseInt(document.getElementById("costSend").innerHTML)




  } else if (send.value == "option2") {
    document.getElementById("costSend").innerHTML = cTotal * 0.05
    document.getElementById("pTotal").innerHTML = cTotal;
    document.getElementById("pTotal").innerHTML = cTotal + parseInt(document.getElementById("costSend").innerHTML)


  } else {
    document.getElementById("costSend").innerHTML = " GRATIS"
    document.getElementById("pTotal").innerHTML = cTotal;
  }

}

document.addEventListener("DOMContentLoaded", function (e) {});