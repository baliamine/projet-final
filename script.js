document.addEventListener("DOMContentLoaded", () => {
  const itemCart = [];
  const popUp = document.getElementById("cart");
  const deleteAll = document.getElementsByClassName("delete-all")[0];
  const cartItems = document.getElementById("cart-content");
  const openCart = document.getElementsByClassName("look-inside")[0];
  console.log(openCart);

  openCart.addEventListener("click", () => {
    popUp.style.display = "block";
  });
  const hideCart = document.getElementById("close-button");
  hideCart.addEventListener("click", () => {
    popUp.style.display = "none";
  });
  const buttons = document.querySelectorAll("button");
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nameProduct = button.getAttribute("name-prod");
      const priceProduct = button.getAttribute("price-prod");
      const img = button.getAttribute("img-prod");
      deleteAll.style.display = "block";
      const existingItem = itemCart.find(
        (item) => item.nameProduct === nameProduct
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        //add object to the array
        itemCart.push({ nameProduct, priceProduct, img, quantity: 1 });
      }
      displayCart();
    });
  });

  function displayCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0; // Initialize the total price

    itemCart.forEach((item) => {
      const cartContent = `
      <div class="style-cart">
       <img  src="../img/poubelle.jfif" class ="poubelle"  data-name="${item.nameProduct}"/>
        <img class="img-prod" src="${item.img}" />
        <div class="prod">
        <h6>${item.nameProduct}</h6>
        <h6>${item.priceProduct} Dt</h6>
        </div>
        <div class="add-remove">
        <button class="add-button" data-name="${item.nameProduct}">+</button>
        <h6>${item.quantity}</h6>
        <button class="remove-button" data-name="${item.nameProduct}">-</button> 
        </div>
        </div>
       
    `;
      cartItems.innerHTML += cartContent;
      // Calculate the price for this item and add it to the total price
      totalPrice += item.priceProduct * item.quantity;
    });

    // Display the total price
    const totalContent = `
    <div class="total">
      <h6>Total Price: ${totalPrice.toFixed(2)} Dt</h6>
    </div>
  `;
    cartItems.innerHTML += totalContent;

    // Add event listeners to the add and remove buttons
    const addButtons = document.querySelectorAll(".add-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-name");
        const item = itemCart.find((item) => item.nameProduct === itemName);
        if (item) {
          item.quantity++;
          displayCart();
        }
      });
    });

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-name");
        const item = itemCart.find((item) => item.nameProduct === itemName);
        if (item && item.quantity > 1) {
          item.quantity--;
          displayCart();
        }
      });
    });

    const removeProductButtons = document.querySelectorAll(".poubelle");
    removeProductButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-name");
        const index = itemCart.findIndex(
          (item) => item.nameProduct === itemName
        );
        if (index !== -1) {
          itemCart.splice(index, 1);
          displayCart();
        }
      });
    });
    
    deleteAll.addEventListener("click", () => {
      itemCart.length = 0; // Clear the array by setting its length to 0
      displayCart(); // Call displayCart to update the UI
    });
    
  }
});
