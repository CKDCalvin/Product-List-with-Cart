const productList = document.getElementById('product-list');

let items = [];

function displayProducts(products) {
    productList.innerHTML = '';


    products.forEach(product => {
        const extDiv = document.createElement('div');
        extDiv.classList.add('product-item');

        extDiv.innerHTML = `
        <div class="product-image">
            <img src="${product.image.desktop}" alt="${product.name}" class="product-img" />
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>        
            <p>${product.category}</p>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        `;

        productList.appendChild(extDiv);

        // const productItem = document.createElement('li');
        // productItem.textContent = `${product.name} - $${product.price}`;
        // productList.appendChild(productItem);
    })
    loadData();
}

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