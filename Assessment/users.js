let orderTable = document.querySelector(".order-table-wrapper");
let allDataWrapper = document.querySelector(".all-data-wrapper");

let searchBox = document.querySelector(".search_box");
let filterSubmit = document.querySelector(".filter_wrapper");

let resetBox = document.querySelector(".reset");

function getDataFrombackend() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", userUrl, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      response = JSON.parse(xhttp.responseText);
      createTable(response);
    }
  };
}

const createTable = (tableData) => {
  allDataWrapper.textContent = "";
  tableData.map((response) => {
    let data = document.createElement("div");
    data.classList.add("table-data");
    let id = document.createElement("div");
    id.textContent = response.id;
    id.classList.add("id");
    data.appendChild(id);
    let profilePicDiv = document.createElement("div");
    profilePicDiv.classList.add("profile_pic");
    let profilePic = document.createElement("img");
    profilePic.src = response.profilePic;
    profilePicDiv.appendChild(profilePic);
    data.appendChild(profilePicDiv);

    let fullName = document.createElement("div");
    fullName.textContent = response.fullName;
    fullName.classList.add("fullName");
    data.appendChild(fullName);

    let dateofBirth = document.createElement("div");
    dateofBirth.textContent = response.dob;
    dateofBirth.classList.add("date-of-birth");
    data.appendChild(dateofBirth);

    let gender = document.createElement("div");
    gender.textContent = response.gender;
    gender.classList.add("gender");
    data.appendChild(gender);

    let location = document.createElement("div");
    location.textContent = `${response.currentCity} , ${response.currentCountry}`;
    location.classList.add("location");
    data.appendChild(location);
    allDataWrapper.appendChild(data);
    orderTable.appendChild(allDataWrapper);
  });
};

const filterData = () => {
  let filter = searchBox.value.toUpperCase();
  if (!filter.trim()) {
    createTable(response);
    return;
  } else if (filter.length > 1) {
    searchBox.value = "";
    let myTable = allDataWrapper;
    let tr = myTable.getElementsByClassName("table-data");
    for (var i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("div")[2];
      if (td) {
        let textValue = td.textContent || td.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  } else {
    alert("Please Enter atleast two characters");
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  getDataFrombackend();
  checkLogin();

  filterSubmit.addEventListener("submit", function (e) {
    e.preventDefault();
    filterData();
  });
});
