

let cart = JSON.parse(localStorage.getItem("cart")) || [];



const container = document.getElementById("cart-container");



function renderCart() {


  container.innerHTML = "";



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



  cart.forEach(function (item) {

    const card = document.createElement("div");

    card.classList.add("cart-item");

    card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">

            <div class="cart-details">

                <h3>${item.title}</h3>

                <p>Price: ₹${item.price.toFixed(2)}</p>

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
                    Subtotal: ₹${(item.price * item.quantity).toFixed(2)}
                </p>

                <button class="remove-btn">
                    Remove
                </button>

            </div>
        `;



    const increaseBtn = card.querySelector(".increase-btn");

    const decreaseBtn = card.querySelector(".decrease-btn");

    const removeBtn = card.querySelector(".remove-btn");



    increaseBtn.addEventListener("click", function () {

      increaseQuantity(item.id);

    });



    decreaseBtn.addEventListener("click", function () {

      decreaseQuantity(item.id);

    });



    removeBtn.addEventListener("click", function () {

      removeProduct(item.id);

    });



    container.appendChild(card);

  });



  updateSummary();

}



function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();

}



function increaseQuantity(id) {

  const product = cart.find(function (item) {

    return item.id === id;

  });

  if (product) {

    product.quantity++;

    saveCart();

  }
}



function decreaseQuantity(id) {

  const product = cart.find(function (item) {

    return item.id === id;

  });

  if (product && product.quantity > 1) {

    product.quantity--;

    saveCart();

  }
}



function removeProduct(id) {

  cart = cart.filter(function (item) {

    return item.id !== id;

  });

  saveCart();

}



function updateSummary() {

  let totalItems = 0;

  let totalPrice = 0;


  cart.forEach(function (item) {

    totalItems += item.quantity;

    totalPrice += item.price * item.quantity;

  });



  document.getElementById("total-items").textContent = totalItems;



  document.getElementById("total-price").textContent = totalPrice.toFixed(2);



  document.getElementById("checkout-btn").disabled = cart.length === 0;

}



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



renderCart();
