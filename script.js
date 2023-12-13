const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeIcon = document.querySelector(".cart-close");

cartIcon.addEventListener("click", function () {
  cart.classList.add("active");
});

closeIcon.addEventListener("click", function () {
  cart.classList.remove("active");
});
