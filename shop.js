
const productContainer = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


async function fetchProducts() {
  try {
    const response = await fetch("./real-luxury-products.json");

    if (!response.ok) {
      throw new Error("Unable to load products");
    }

    const data = await response.json();

    products = data.products;

    displayProducts(products);

  } catch (error) {
    console.log("Error fetching products:", error);

    productContainer.innerHTML = `
      <p>Unable to load products.</p>
    `;
  }
}


function displayProducts(productList) {

  productContainer.innerHTML = "";

  productList.forEach((product) => {

    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `

      <img src="${product.thumbnail}"
           alt="${product.title}"
           loading="lazy">

      <p class="product-brand">
        ${product.brand}
      </p>

      <h3>${product.title}</h3>

      <p class="product-price">
        ₹${product.price.toLocaleString("en-IN")}
      </p>

      <button class="add-to-cart">
        Add to Cart
      </button>

    `;


    const image = card.querySelector("img");

    image.addEventListener("error", () => {
      image.style.visibility = "hidden";
    });


    const button = card.querySelector(".add-to-cart");

    button.addEventListener("click", () => {

      addToCart(product.id);

      button.innerText = "Added to Cart ✓";

      setTimeout(() => {
        button.innerText = "Add to Cart";
      }, 1000);

    });

    productContainer.appendChild(card);

  });
}


function addToCart(productId) {

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) return;

  const existingProduct = cart.find(
    (item) => item.id === productId
  );

  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image: product.thumbnail,
      quantity: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

}


function updateCartCount() {

  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  if (cartCount) {
    cartCount.innerText = totalQuantity;
  }

}


function filterProducts(category) {

  if (category === "all") {

    displayProducts(products);
    return;

  }

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  displayProducts(filteredProducts);

}


fetchProducts();
updateCartCount();
