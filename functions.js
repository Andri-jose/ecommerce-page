// To show shopping cart
let cart = document.getElementById("cart");
let button = document.getElementById("cartSelection");
let button2 = document.querySelector(".buy-button");
let cartEmpty = document.getElementById("empty");
let cartProduct = document.getElementById("cartProduct");

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const value = document.querySelector(".value");
let showCart = document.querySelector(".show-cart");
let carousel = document.getElementById("carouselExampleIndicators")


// to open the carousel

document.querySelector(".click-carousel").addEventListener("click", ()=>{
  carousel.classList.remove("close-card");
  document.querySelector(".closed_carousel").classList.remove("close-card");
  document.querySelector(".dark-overlay").classList.remove("close-card");
});

// to closed the carousel
document.querySelector(".closed_carousel").addEventListener("click", ()=>{
  carousel.classList.add("close-card");
  document.querySelector(".closed_carousel").classList.add("close-card");
  document.querySelector(".dark-overlay").classList.add("close-card");
});


// open menu on responsive mobile
document.querySelector(".img_menu").addEventListener("click", () => {
  document.querySelector(".menu_mobile").classList.remove("close-card");
 
})

// closed responsive mobile
document.querySelector(".close-menu").addEventListener("click", () => {
  document.querySelector(".menu_mobile").classList.add("close-card");
  
})



// const carousel = new bootstrap.Carousel('#myCarousel')

// button to show the cart  
button.addEventListener("click", ()=>{
  // open the cart 
  cart.classList.toggle("toggle");
   // Check if the data exist in the localstorage
  const description = localStorage.getItem('description');
  if (description !== null){
    cartEmpty.classList.toggle("close-card");
    showProduct();
  }else{
    cartEmpty.classList.remove("close-card");
  }

});



// button to add product to the cart
button2.addEventListener("click", ()=>{
  //  // open the cart 
  cart.classList.toggle("toggle");
  // const description = localStorage.getItem('description');

    cartEmpty.classList.add("close-card");
    addProduct();
 
  // cartEmpty.classList.toggle("close-card");
  //   addProduct();
   
 
  
  
});



// to add quatity to the products
let a = 1;

plus.addEventListener("click", ()=>{
  if(a < 3){
    a++
  }else{
    switch (a) {
      case 0:
        text = 3;
        break;}
  }
    value.innerHTML = a;
    
}); 

minus.addEventListener("click", ()=>{
  if(a > 1){
    a--
  }
    value.innerHTML = a;
    
}); 





// to fetch the product in json
const addProduct = () => {
      // get data from json
    fetch('data.json')
      .then(response => response.json())  // Parse the JSON data
      .then(data => {
           // Create HTML content in the cart
          const htmlContent = `
              <div class="d-flex align-items-center mb-3 show-cart">
                  <img src="${data.img}" class="cart-image" alt="thumbnail of the product">
                  <p class="cart-description">"${data.description}"<span class="amount-cart"></span></p>
                  <img src="${data.delete}" alt="cart delete" class="cart-delete" ">
              </div>
              <button class="cart-checkout-button">Checkout</button>
          `;

          // Save the JSON data to localStorage
          localStorage.setItem('description', JSON.stringify(htmlContent));
        
          // Insert the HTML into the product container
          cartProduct.innerHTML = htmlContent;


            // to add total amount to each product
            let content = value.textContent;
            let newContent = "";
          // counter to add number to the shopping cart 
            if(content == 1){
              newContent = " $125.00";
            } else if(content == 2){
              newContent = " $250.00";
            } else{
              newContent = " $375.00";
            }
            // showing cart amount 
            const toSaveAmount = document.querySelector(".amount-cart").textContent = "x " + content + newContent;
            localStorage.setItem('amount', JSON.stringify(toSaveAmount));
          
            trash();
      })
      .catch(error => {
          console.error('Error fetching the JSON file:', error);
      });
}


// to show the products saved on localStorage
const showProduct = () => {
  // to return description 
  const strDescrip = localStorage.getItem('description');
  const objDescrip = JSON.parse(strDescrip);
  // Insert the description into the cart
  cartProduct.innerHTML = objDescrip;


  // to return amount
  const strAmount = localStorage.getItem('amount');
  const objAmount = JSON.parse(strAmount);
  document.querySelector(".amount-cart").textContent = objAmount;
  trash();
}


// to delete the cart
const trash = () => {
   // to delete button
   document.querySelector(".cart-delete").addEventListener("click", () => {
    // localStorage.removeItem('amount');
    localStorage.removeItem('description');
    localStorage.removeItem('amount');
    // Show the empty cart message
    cartProduct.innerHTML = "";
    cartEmpty.classList.remove("close-card");
  })
}


