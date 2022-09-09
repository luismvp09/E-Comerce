// cart

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


// open cart
cartIcon.onclick = ()=>{
    cart.classList.add('active')
}

// close cart
closeCart.onclick = ()=>{
    cart.classList.remove('active')
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}


// function

function ready() {
    // elimina del cart
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    for (let i = 0; i < removeCartButtons.length; i++) {
      let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //quantity canbio

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
         let input = quantityInputs[i]
         input.addEventListener('change',quantityChanged)
    }
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++){
        let button = addCart[i]
        button.addEventListener('click',addCartClick)
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClick )
}

// button

function buyButtonClick() {
    alert('')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();
}

 // elimina del cart

 function removeCartItem(e) {
    let buttonClick = e.target
    buttonClick.parentElement.remove()
    updatetotal();
 }

 // quantity canbio

 function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) { 
        input.value = 1; 
    }
    updatetotal()
 }

 
 function addCartClick(e) {
    let button = e.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductCart(title,price,productImg)
    updatetotal();
 }


 function addProductCart(title,price,productImg) {
    
    let carShopBox = document.createElement('div')
    carShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsName = document.getElementsByClassName('cart-product-title');
    for (let i = 0; i <cartItemsName.length; i++){
      if (cartItemsName[i].innerText == title) {
        alert('ya añadiste este articulo al carrito')
        return;
      }
    }
 }

 let cartBoxContent = `
         <img src="${productImg}" alt="" class="cart-img">
             <div class="detail-box">
               <div class="cart-product-title">${title}</div>
             <div class="cart-price">${price}</div>
             <input type="number" value="1" class="cart-quantity">
           </div>
          <!-- Remove cart -->
         <i class='bx bxs-trash-alt cart-remove' ></i>
 `

 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox)
 cartShopBox
 .getElementsByClassName('cart-remove')[0]
 .addEventListener('click', removeCartItem)
 cartShopBox
 .getElementsByClassName('cart-quantity')[0]
 .addEventListener('change', quantityChanged)

 // eliminar total

 function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxe = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i <cartBoxe.length; i++){
        let cartBox = cartBoxe[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$',''))
        let aquantity = quantityElement.value;
        total = total + price * aquantity;
    }
       total = Math.round(total * 100) / 100

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
 }