let form = document.querySelector(".login_form");
let storedItem = localStorage.getItem("storedItem");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  let data = {
    username: username,
    password: password,
  };
  if (username !== password) {
    alert("Please Enter Valid Credentials");
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", loginUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(data));
    localStorage.setItem("storedItem", JSON.stringify(data));
    window.location.assign("/Assessment/orders.html");
    alert("Login Successful");
  }
});
