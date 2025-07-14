let filteredProducts = [...allProducts];
const productsPerPage = 12;
let currentPage = 1;

function displayProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const current = filteredProducts.slice(start, end);

  current.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="https://via.placeholder.com/200?text=${encodeURIComponent(p.title)}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>Ksh ${p.price.toLocaleString()}</p>
      <button onclick="addToCart('${p.title}', ${p.price})">Add to Cart</button>
    `;
    grid.appendChild(div);
  });

  displayPagination();
}

function filterProducts(category) {
  if (category === 'all') {
    filteredProducts = [...allProducts];
  } else {
    filteredProducts = allProducts.filter(p => p.category === category);
  }
  currentPage = 1;
  displayProducts();
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
  alert(`${name} added to cart`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.length;
  document.querySelector('a[onclick="viewCart()"]').innerHTML = `🛒 Cart (${cartCount})`;
}

function viewCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }
  let summary = "Items in Cart:\n";
  cart.forEach((item, index) => {
    summary += `${index + 1}. ${item.name} - Ksh ${item.price}\n`;
  });
  alert(summary);
}

function displayPagination() {
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      displayProducts();
    };
    pagination.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(); // Initialize cart count

  document.getElementById('search').addEventListener('input', function () {
    const term = this.value.toLowerCase();
    filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(term));
    currentPage = 1;
    displayProducts();
  });

  displayProducts();
});
