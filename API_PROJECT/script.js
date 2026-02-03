const API = 'https://fakestoreapi.com/products';
const container = document.getElementById('product-container');
const status = document.getElementById('status');
const input = document.getElementById('input-box');
const btn = document.getElementById('btn');
let products = [];

async function fetchProducts(){
  status.textContent = 'Loading products...';
  try{
    const res = await fetch(API);
    if(!res.ok) throw new Error('Network response was not ok');
    products = await res.json();
    renderProducts(products);
    status.textContent = '';
  }catch(err){
    status.textContent = 'Failed to load products.';
    console.error(err);
  }
}

function renderProducts(list){
  container.innerHTML = '';
  if(!list.length){
    container.innerHTML = '<p style="grid-column:1/-1;color:#6b7280;text-align:center">No products found.</p>';
    return;
  }
  for(const p of list){
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="image-wrap">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="desc">${escapeHtml(truncate(p.description, 110))}</p>
      <div class="meta">
        <span class="category">${escapeHtml(p.category)}</span>
        <span class="price">$${Number(p.price).toFixed(2)}</span>
      </div>
    `;
    container.appendChild(card);
  }
}

function truncate(str, n){
  if(!str) return '';
  return str.length > n ? str.slice(0,n-1) + '…' : str;
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function doSearch(){
  const q = input.value.trim().toLowerCase();
  if(!q){
    renderProducts(products);
    return;
  }
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderProducts(filtered);
}

btn.addEventListener('click', doSearch);
input.addEventListener('keydown', e => { if(e.key === 'Enter') doSearch(); });

fetchProducts();
