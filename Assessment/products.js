let orderTable = document.querySelector(".order-table-wrapper");
let allDataWrapper = document.querySelector(".all-data-wrapper");

let count = $("#count");

$(function () {
  $(".checks").on("click", function () {
    var id = $(this).attr("id");
    if (id == "low") {
      if ($(this).is(":checked")) {
        $(".all-data-wrapper .table-data .stock").each(function () {
          $(this).parent().removeClass("remove2");
        });
      } else {
        $(".all-data-wrapper .table-data .stock").each(function () {
          if ($(this).text() < 100) {
            $(this).parent().addClass("remove2");
          }
        });
      }
    } else if (id == "expired") {
      if ($(this).is(":checked")) {
        $(".all-data-wrapper .table-data .date").each(function () {
          $(this).parent().removeClass("remove");
        });
      } else {
        $(".all-data-wrapper .table-data .date").each(function () {
          if (new Date($(this).text()) < new Date()) {
            $(this).parent().addClass("remove");
          }
        });
      }
    }

    var numOfVisibleRows = $(".all-data-wrapper .table-data").filter(
      function () {
        return $(this).css("display") !== "none";
      }
    ).length;
    count.text(numOfVisibleRows);
  });
});

function getDataFrombackend() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", prodUrl, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      response = JSON.parse(xhttp.responseText);
      createTable(response);
    }
  };
}

const createTable = (tableData) => {
  tableData.map((response) => {
    var data = document.createElement("div");
    data.classList.add("table-data");
    var id = document.createElement("div");
    id.textContent = response.id;
    id.classList.add("id");
    data.appendChild(id);
    var prodName = document.createElement("div");
    prodName.textContent = response.medicineName;
    prodName.classList.add("prod_name");
    data.appendChild(prodName);
    var medicineBrand = document.createElement("div");
    medicineBrand.textContent = response.medicineBrand;
    medicineBrand.classList.add("med_brand");
    data.appendChild(medicineBrand);
    var date = document.createElement("div");
    date.textContent = response.expiryDate;
    date.classList.add("date");
    data.appendChild(date);

    var price = document.createElement("div");
    price.textContent = response.unitPrice;
    price.classList.add("amount");
    data.appendChild(price);
    var stock = document.createElement("div");
    stock.textContent = response.stock;
    stock.classList.add("stock");
    data.appendChild(stock);
    allDataWrapper.appendChild(data);

    orderTable.appendChild(allDataWrapper);
  });
};

window.addEventListener("DOMContentLoaded", (event) => {
  checkLogin();
  getDataFrombackend();
});
