import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../util/currency.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//Using an external library as an ESM = EcmaScript Module, default export. so, {} is not needed.
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

//Using an external library dayjs() for the delivery date setup. This is a TEST
/* const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D")); */

//** Putting all the codes into this Function to re-render the page and update all the HTML
export function renderOrderSummary() {
  //Each time we loop through the cart, we will save the result in this variable to combine the HTML.
  let cartSummaryHTML = "";

  //Looping through the cart.js file and generating this as HTML
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //This variable is to save the search result of the product details from product.js file
    const matchingProduct = getProduct(productId);

    //To update the delivery option title
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    //Combining all the HTML here and save
    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">Delivery date: ${dateString}</div>
  
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
                  
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                 
                </div>
              </div>
            </div>
  
      `;
  });

  //This function will loop through deliveryOptions, for each option generate HTML, combine the HTML together,
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      //Using ternary operator to calculate the shipping price
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      //If both are equal, will save the result and used a ternary below for the checked input radio.
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}">
          <input
            type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} - Shipping</div>
          </div>
        </div>
  
      `;
    });
    return html;
  }

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
      renderCheckoutHeader; //To update the cheackout header by MVC
      renderPaymentSummary(); //Calling this function to update the order summary
      updateCartQuantity(); //Calling this function to update the header when delete an item
    });
  });

  //Adding event listener to the delivery-option. Used data atribute to get the productId & deliveryOptionId
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
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

      //Here using the DOM to get the quantity input for the product and get the value inside
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      // For Validation
      if (newQuantity < 1 || newQuantity >= 1000) {
        alert("Quantity must be at-least 1 and less than 1000");
      }
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.remove("is-editing-quantity");

      //Updating the quantity in the HTML
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();

      renderPaymentSummary(); //To regenrate the HTML as a refresh the page
    });
  });
}
