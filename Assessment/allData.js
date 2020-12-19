let orderUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";

let prodUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";

let userUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";

let loginUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login";

const checkLogin = () => {
  if (!localStorage.getItem("storedItem")) {
    window.location.href = "./index.html";
  }
};

const logout = () => {
  localStorage.clear();
  window.location.href = "./index.html";
};
