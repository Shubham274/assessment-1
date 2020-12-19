let orderTable = document.querySelector(".order-table-wrapper");
let allDataWrapper = document.querySelector(".all-data-wrapper");
let filterCheckBox = document.querySelectorAll(".checks");

let count = $("#count");

$(function () {
  $(".checks").on("click", function () {
    $(".all-data-wrapper .table-data").hide();
    var flag = 1;
    $("input:checkbox[name=name]:checked").each(function () {
      flag = 0;
      var value = $(this).val().toLowerCase();
      $(".all-data-wrapper .table-data").filter(function () {
        if ($(this).text().toLowerCase().indexOf(value) > -1) $(this).show();
      });
    });
    if (flag == 1) $(".all-data-wrapper .table-data").hide();
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
  xhttp.open("GET", orderUrl, true);
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
    var customerName = document.createElement("div");
    customerName.textContent = response.customerName;
    customerName.classList.add("customer_name");
    data.appendChild(customerName);
    var date = document.createElement("div");
    date.textContent = response.orderDate;
    date.classList.add("date");
    var next = document.createElement("br");
    date.appendChild(next);
    var timeSpan = document.createElement("span");
    timeSpan.textContent = response.orderTime;
    date.appendChild(timeSpan);
    data.appendChild(date);
    var price = document.createElement("div");
    price.textContent = response.amount;
    price.classList.add("div");
    data.appendChild(price);
    var status = document.createElement("div");
    status.textContent = response.orderStatus;
    status.classList.add("status");
    data.appendChild(status);
    allDataWrapper.appendChild(data);
    orderTable.appendChild(allDataWrapper);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  getDataFrombackend();
});
