// Light/Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Dynamic Store Branding
function loadStoreBranding() {
  const storeName = localStorage.getItem('storeName') || "My Brand Store";
  const heroTitle = localStorage.getItem('heroTitle') || "Welcome to My Brand!";
  const heroSubtitle = localStorage.getItem('heroSubtitle') || "High-quality products shipped worldwide. Pay with Payoneer, Wise, or your local bank.";
  const logoSrc = localStorage.getItem('storeLogo') || "images/logo.png";
  const heroBg = localStorage.getItem('heroBg') || "images/hero-bg.jpg";

  document.querySelectorAll('#store-name, #store-name-shop, #footer-store-name, #footer-store-name-shop, #footer-store-name-cart').forEach(el => el.textContent = storeName);
  document.querySelectorAll('#store-logo, #store-logo-shop').forEach(el => el.src = logoSrc);
  document.getElementById('store-title').textContent = storeName;
  document.getElementById('store-title-shop')?.textContent = storeName;
  document.getElementById('hero-title')?.textContent = heroTitle;
  document.getElementById('hero-subtitle')?.textContent = heroSubtitle;
  document.getElementById('hero-section')?.style.backgroundImage = `url(${heroBg})`;
}
loadStoreBranding();
