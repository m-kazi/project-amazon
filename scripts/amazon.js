//Creating array for products coz arrays are list and we need list of products
//inside the array we need to save product info as objects
//It also called Data Structure, we create Data Structure in JS using objects & arrays.

//**Below is the example code but the original code is in ./data/products.js**

/* const products = [
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
  },
  {
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
  },
  
]; */

//Importing variables & functions from the cart.js & products.js files
import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/currency.js";

// **Accumulator Pattern - we loop through an Array an adding to the result. Accumulating the result. **
//Each time we go through the loop, the HTML string below will be added to this variable.
let productsHTML = "";

//forEach() will take each object, saves it in the parameter(product) and runs the function.
//For image we hava added *10 to point it to the right image file number.
//Also we are combinig all the HTML below
products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${formatCurrency(product.priceCents)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-id="${product.id}">Add to Cart</button>
  </div>
  `;
});

// ** Adding HTML products into the page using DOM **
document.querySelector(".js-products-grid").innerHTML = productsHTML;

//** Function to update cart quantity on the webpage.
function updateCartQuantity() {
  //To store the total quantity
  const cartQuantity = calculateCartQuantity();

  // ** Adding HTML cart quantity into the page using DOM **
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

updateCartQuantity(); //Updating the cart quantity to show on the cart icon.

// ** Making add to cart button interactive **
//Created a seperate cart.js file and also added "Data" attribute to the button element above.
//dataset property gives us all the data attributes attached to the element, in this case (button element).
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // const productId = button.dataset.productId; //productName is from the "data-{product-name}"
    const { productId } = button.dataset; //Shorthand property

    addToCart(productId); // Calling add to cart function
    updateCartQuantity(); // Calling add to Update the Cart quantity function

    //Getting added message from the HTML using DOM and save in a veriable
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    //Adding CSS class using DOM and modify into the amazon.css file. CSS class can be selected without dot (.) in front of the class name.
    addedMessage.classList.add("added-to-cart-visible");

    //Setting time to remove Added Message diseppear after 2 seconds.
    setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);
  });
});
