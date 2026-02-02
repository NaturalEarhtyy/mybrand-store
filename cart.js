let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }

function addToCart(product){
  const existing = cart.find(p=>p.name===product.name);
  if(existing){
    if(existing.quantity+1>product.stock) return alert("Cannot add more, stock limit reached!");
    existing.quantity+=1;
  } else {
    if(product.stock<1) return alert("Out of stock!");
    cart.push({...product, quantity:1});
  }
  saveCart();
  alert(`${product.name} added to cart!`);
  renderCart();
}

function renderCart(){
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!container) return;

  if(cart.length===0){
    container.innerHTML="<p>Your cart is empty.</p>";
    totalEl.textContent="";
    return;
  }

  let total=0;
  container.innerHTML = cart.map(item=>{
    const priceNumber=parseFloat(item.price.replace('$','')) || 0;
    total+=priceNumber*item.quantity;
    return `<div class="cart-item">
      <p>${item.name} x ${item.quantity} - $${(priceNumber*item.quantity).toFixed(2)}</p>
      <button class="btn remove-item" data-name="${item.name}">Remove</button>
    </div>`;
  }).join('');

  totalEl.textContent=`Total: $${total.toFixed(2)}`;

  container.querySelectorAll('.remove-item').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const name = e.target.dataset.name;
      cart = cart.filter(item=>item.name!==name);
      saveCart();
      renderCart();
    });
  });
}

renderCart();
