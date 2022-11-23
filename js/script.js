// open and close cart content
var cart = document.querySelector('.cart')
var cartOverlay = document.querySelector('.cart-overlay')
var closeBtn = document.querySelector('.close')
function showCartOverlay() {
    if (cartOverlay.style.left == '-100%') {
        cartOverlay.style.left = '0'
    } else {
        cartOverlay.style.left = '-100%'
    }
}
cart.onclick = showCartOverlay
closeBtn.onclick = showCartOverlay
// // //////////////////////
// add items to cart
var addToCart = document.querySelectorAll('.add-to-cart');
var itemPur = document.getElementsByClassName('item-pur');

function addItemToCart (price, imageSrc) {
    var itemPur = document.createElement('div');
    itemPur.classList.add('item-pur');
    var itemsPur = document.querySelector('.items-pur');
    var cartImage = document.querySelectorAll('.cart-image');
    for (var i = 0; i < cartImage.length; i++){
        if (cartImage[i].src == imageSrc){
                alert ('This item has already been added to the cart')
                return;
            }
    }
    var cartItem = `
        <img class="cart-image" src="${imageSrc}" alt="" width="15%" height="15%" style="margin: 15px;">
        <span class ="cart-price" style="width: 100px;">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        `
    itemPur.innerHTML = cartItem;
    itemsPur.append(itemPur);
    itemPur.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
    itemPur.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
    updateCartPrice()
}
function addToCartClicked (event) {
    button = event.target;
    var cartItem = button.parentElement;
    var price = cartItem.querySelector('.item-price').innerText;
    var imageSrc = cartItem.querySelector('.item-img').src;
    addItemToCart (price, imageSrc);
    updateCartPrice()
}
addToCart.forEach(function (btn) {
    btn.onclick = addToCartClicked
})
/////////////////////////
// remove items from cart
function removeItem (event) {
    var btnClicked = event.target
    btnClicked.parentElement.remove()
    updateCartPrice()
}
var removeBtn = document.querySelectorAll('.remove-btn');
removeBtn.forEach(function(btnR) {
    btnR.onclick = removeItem
})
// //////////////////////////////////////////
// update quantity input
function changeQuantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartPrice()
}
var quantityInput = document.querySelectorAll('.product-quantity');
quantityInput.forEach(function(inp){
    inp.onchange = changeQuantity
})
// //////////////////////////////////////////
// update total price
function updateCartPrice() {
    var total = 0
    for (var i = 0; i < itemPur.length; i++) {
        var cartRow = itemPur[i]
        var priceElement = cartRow.querySelector('.cart-price')
        var quantityElement = cartRow.querySelector('.product-quantity')
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity )
    }
    document.querySelector('.total-price').innerText =  total + ' $' 
    document.querySelector('.count').textContent = i
    document.querySelector('.count').style .display = 'block'
}
// ////////////////////////////////////////////
// purchase items
cartOverlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-overlay')){
        cartOverlay.style.left = '-100%'
    }
})

const closeCartModal = document.querySelector('.cart-content');

function purchaseBtnClicked () {
    alert ('Thank you for your purchase');
    cartOverlay.style.left= '-100%'
    var cartItems = document.getElementsByClassName('items-pur')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartPrice()
}
var purchaseBtn = document.querySelector('.btn-purchase');
purchaseBtn.onclick = purchaseBtnClicked
// ////////////////////////////////////////////