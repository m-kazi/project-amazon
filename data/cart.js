//Exporting the variable and import into amazon.js file

//To get the cart items from local storage using getItem - it takes name value
export let cart = JSON.parse(localStorage.getItem("cart"));

//if the cart is empty we put a default value for reference
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

//**Save our cart into the local storage
//setItem has 2 values - name, data. local storage only saves strings.
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

  //Whenever we update the cart we need to save it to the localstorage, to do that calling the function below.
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  //Adding total products into the cart quantity by looping through the cart Array.
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

// 1.Create a new array, 2.Loop through the cart, 3.Add each product to the new array, except for this productid.
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; //Will take our newCart and replace the cart

  //Calling the localstorage function to update the cart
  saveToStorage();
}
