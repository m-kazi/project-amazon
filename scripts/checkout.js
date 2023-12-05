import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/currency.js";

//Each time we loop through the cart, we will save the result in this variable to combine the HTML.
let cartSummaryHTML = "";

//Looping through the cart.js file and generating this as HTML
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  //This variable is to save the search result of the product details from product.js file
  let matchingProduct;

  //Looping through the products array in product.js file and checking if the id property is equal to our product id here. product.id is from the product.js and productId is ours.
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product; //this we are looping through
    }
  });

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //Combining all the HTML here and save
  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                    matchingProduct.id
                  }">save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                    matchingProduct.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    `;
});

//Generating the HTML for the website using DOM
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//Selecting all the delete buttons and loop through all this links, also added a data attribute to the link to get it into the JS below to get the product id.
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    //This below part is to remove the item from the page whan delete button is clicked
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.remove(); //Every elements we get with DOM, has a method called .remove()
    updateCartQuantity(); //Calling this function to update the header when delete an item
  });
});

//Function to update cart items on the header
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}

updateCartQuantity(); //Calling this function when loading the page

//**To get all the update links and adding a 'click' event listener, also attaching the prodiuctId to the each link.
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(productId);

    //To get the cart item container when clicking Update
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    //Adding the class name to the main container to get the .quantity-input and .save-quantity-link as they both are inside elements of the main container.
    container.classList.add("is-editing-quantity");
  });
});

//Adding 'click' event listener to all the Save links, Getting the cart-item-container for the product and remove the class 'is-editing-quantity'.
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.classList.remove("is-editing-quantity");

    //Here using the DOM to get the quantity input for the product and get the value inside
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId, newQuantity);

    //Updating the quantity in the HTML
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );

    quantityLabel.innerHTML = newQuantity;

    updateCartQuantity();
  });
});
