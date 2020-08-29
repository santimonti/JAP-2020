const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
var category_prod = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
var value = document.getElementById("tableSearch").addEventListener("keyup", showProductList);

function showProductList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < category_prod.length; i++) {
    let prod = category_prod[i];
    value = document.getElementById("tableSearch").value.toLowerCase();
    let n = prod.name.toLowerCase().indexOf(value);
    if (
      (minPrice == undefined || (minPrice != undefined && parseInt(prod.cost) >= minPrice)) &&
      (maxPrice == undefined || (maxPrice != undefined && parseInt(prod.cost) <= maxPrice && e)) &&
      (value == undefined || n > -1)
    ) {
      htmlContentToAppend +=
        `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
        prod.imgSrc +
        `" alt="` +
        prod.description +
        `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
        prod.name +
        ` - U$S ` +
        prod.cost +
        ` </h4>
                            <small class="text-muted"> ` +
        prod.soldCount +
        ` vendidos</small>
                        </div>
                        <p class="mb-1">` +
        prod.description +
        `</p>
                    </div>
                </div>
            </a>
            `;
    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowProducts(sortCriteria, ProductsArray) {
  currentSortCriteria = sortCriteria;

  if (ProductsArray != undefined) {
    category_prod = ProductsArray;
  }

  category_prod = sortProducts(currentSortCriteria, category_prod);

  //Muestro las categorías ordenadas
  showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
    }
  });
});
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProductList();
  });

  document.getElementById("rangeFilterPrice").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if (minPrice != undefined && minPrice != "" && parseInt(minPrice) >= 0) {
      minPrice = parseInt(minPrice);
    } else {
      minPrice = undefined;
    }

    if (maxPrice != undefined && maxPrice != "" && parseInt(maxPrice) >= 0) {
      maxPrice = parseInt(maxPrice);
    } else {
      maxPrice = undefined;
    }

    showProductList();
  });
});
