// Active nav link highlight
document.querySelectorAll('nav ul a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// Search / Filter
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const loc = document.getElementById('searchLocation')?.value.toLowerCase() || '';
    const type = document.getElementById('searchType')?.value || '';
    const price = document.getElementById('searchPrice')?.value || '';
    filterProperties(loc, type, price);
  });
}

const filterBtn = document.getElementById('filterBtn');
if (filterBtn) {
  filterBtn.addEventListener('click', () => {
    const loc = document.getElementById('filterLocation')?.value.toLowerCase() || '';
    const type = document.getElementById('filterType')?.value || '';
    const price = document.getElementById('filterPrice')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';
    filterProperties(loc, type, price, status);
  });
}

function filterProperties(loc, type, price, status) {
  const cards = document.querySelectorAll('.property-card');
  cards.forEach(card => {
    const cardLoc = card.dataset.location || '';
    const cardType = card.dataset.type || '';
    const cardPrice = parseInt(card.dataset.price || '0');
    const cardStatus = card.dataset.status || '';

    let show = true;
    if (loc && !cardLoc.includes(loc)) show = false;
    if (type && cardType !== type) show = false;
    if (status && cardStatus !== status) show = false;
    if (price) {
      const [min, max] = price.split('-').map(Number);
      if (max && (cardPrice < min || cardPrice > max)) show = false;
      if (!max && cardPrice < min) show = false;
    }
    card.style.display = show ? '' : 'none';
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// Animate stats counter
function animateCounters() {
  document.querySelectorAll('.stat-item h3').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (!target) return;
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = count.toLocaleString() + (el.dataset.suffix || '');
    }, 30);
  });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}
