let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Render products in sections
function renderProducts(containerId, filter = "", featuredOnly = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filteredProducts = products;
  if (filter) filteredProducts = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  if (featuredOnly) filteredProducts = filteredProducts.filter(p => p.featured === true);

  container.innerHTML = filteredProducts.map(product => {
    const isOutOfStock = product.stock <= 0;
    return `
      <div class="product-card">
        <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${isOutOfStock ? '<span style="color:red;font-weight:bold;">Out of Stock</span>' : product.price}</p>
        <button class="btn add-to-cart" data-name="${product.name}" ${isOutOfStock ? 'disabled' : ''}>
          ${isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const name = e.target.dataset.name;
      const product = products.find(p => p.name === name);
      addToCart(product);
    });
  });
}

// Initial render
renderProducts("top-products");
renderProducts("featured-products", "", true);
renderProducts("shop-products");
