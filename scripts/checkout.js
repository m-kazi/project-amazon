import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

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
    <div class="cart-item-container">
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
                <div class="product-price">${
                  matchingProduct.priceCents / 100
                }</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
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
                    name="delivery-option-1"
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
                    name="delivery-option-1"
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
                    name="delivery-option-1"
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