const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');

let items = [];
let cart = [];

//
function displayProducts(products) {
    productList.innerHTML = '';

    products.forEach(product => {
        const extDiv = document.createElement('div');
        extDiv.classList.add('product-item');

        extDiv.innerHTML = `
        <div class="product-image">
            <img src="${product.image.desktop}" alt="${product.name}" class="product-img" />
            <button onclick="" class="cart-btn">Add to Cart</button>
        </div>        
            <p>${product.category}</p>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        `;

        productList.appendChild(extDiv);
    })

    cartList.innerHTML = cartItems.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
    cartCount.textContent = cartItems.length;

}

// feth data from json file
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching JSON data:', error);
    }
}

function renderProducts() {
    loadData().then(products => {
        displayProducts(products);
    });

}
renderProducts();

function addToCart(name, price) {
    const item = items.find(product => product.name === name);
    if (item) {
        item.quantity = item.quantity++;
    }
    else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    updateCart();
}


function updateCart() {
    const cartItems = cart.map(item => `<li>${item.name} - $${item.price} x ${item.quantity}</li>`).join('');
    cartList.innerHTML = cartItems;
    cartCount.textContent = cart.length;
}


document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product-item');
        const productName = productElement.querySelector('h3').textContent;
        const product = items.find(item => item.name === productName);
        if (product) {
            cart.push(product);
            updateCartCount();
            displayCartItems();
        }
    });
});