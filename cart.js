
// Retrieve cart data from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Select cart container

const container = document.getElementById("cart-container");


// Display cart products

function renderCart() {

  // Clear previously displayed products

  container.innerHTML = "";


  // Handle empty cart

  if (cart.length === 0) {

    container.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>Add some products to your cart.</p>

                <a href="index.html">Continue Shopping</a>

            </div>
        `;

    updateSummary();

    return;
  }


  // Generate cart item cards

  cart.forEach(function (item) {

    const card = document.createElement("div");

    card.classList.add("cart-item");

    card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">

            <div class="cart-details">

                <h3>${item.title}</h3>

                <p>Price: $${item.price.toFixed(2)}</p>

                <div class="quantity-controls">

                    <button class="decrease-btn"
                        ${item.quantity === 1 ? "disabled" : ""}>
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button class="increase-btn">
                        +
                    </button>

                </div>

                <p>
                    Subtotal: $${(item.price * item.quantity).toFixed(2)}
                </p>

                <button class="remove-btn">
                    Remove
                </button>

            </div>
        `;


    // Select buttons

    const increaseBtn = card.querySelector(".increase-btn");

    const decreaseBtn = card.querySelector(".decrease-btn");

    const removeBtn = card.querySelector(".remove-btn");


    // Increase button event listener

    increaseBtn.addEventListener("click", function () {

      increaseQuantity(item.id);

    });


    // Decrease button event listener

    decreaseBtn.addEventListener("click", function () {

      decreaseQuantity(item.id);

    });


    // Remove button event listener

    removeBtn.addEventListener("click", function () {

      removeProduct(item.id);

    });


    // Append cart item

    container.appendChild(card);

  });


  // Update order summary

  updateSummary();

}


// Save updated cart

function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();

}


// Increase product quantity

function increaseQuantity(id) {

  const product = cart.find(function (item) {

    return item.id === id;

  });

  if (product) {

    product.quantity++;

    saveCart();

  }
}


// Decrease product quantity

function decreaseQuantity(id) {

  const product = cart.find(function (item) {

    return item.id === id;

  });

  if (product && product.quantity > 1) {

    product.quantity--;

    saveCart();

  }
}


// Remove product

function removeProduct(id) {

  cart = cart.filter(function (item) {

    return item.id !== id;

  });

  saveCart();

}


// Calculate order summary

function updateSummary() {

  let totalItems = 0;

  let totalPrice = 0;


  cart.forEach(function (item) {

    totalItems += item.quantity;

    totalPrice += item.price * item.quantity;

  });


  // Update total items

  document.getElementById("total-items").textContent = totalItems;


  // Update total price

  document.getElementById("total-price").textContent = totalPrice.toFixed(2);


  // Disable checkout button when cart is empty

  document.getElementById("checkout-btn").disabled = cart.length === 0;

}


// Place Order functionality

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", function () {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;
  }

  alert("Order placed successfully!");

  cart = [];

  saveCart();

});


// Initial function call

renderCart();
