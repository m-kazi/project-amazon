//Exporting the variable and import into amazon.js file
export const cart = [];

//**Function for add products to the cart
export function addToCart(productId) {
  //saving the matching item in a variable.
  let matchingItem;

  //checkig if the productName already in the cart using forEach(),
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //Using DOM to get the quantity from the dropdown
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value); //Values from DOM are strings, need to convert.

  //If the product is already there will increase the quantity
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    //cart is an array from the cart.js file
    cart.push({
      /* productId: productId,
          quantity: quantity, */
      productId,
      quantity,
    });
  }
}
