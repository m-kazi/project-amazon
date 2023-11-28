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

    <div class="product-price">${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select>
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

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-id="${product.id}">Add to Cart</button>
  </div>
  `;
});

// ** Adding HTML into the page using DOM **
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// ** Making add to cart button interactive **
//Created a seperate cart.js file and also added "Data" attribute to the button element above.
//dataset property gives us all the data attributes attached to the element, in this case (button element).
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId; //productName is from the "data-{product-name}"

    //saving the matching item in a variable.
    let matchingItem;

    //checkig if the productName already is in the cart using forEach(),
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    //If the product is already there will increase the quantity
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      //cart is an array from the cart.js file
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }

    console.log(cart);
  });
});
