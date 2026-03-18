// Highlight active nav link
document.querySelectorAll('nav ul a').forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
});

// Counter Animation for Stats
const animateCounters = () => {
    document.querySelectorAll('.stat-item h3').forEach(el => {
        const target = parseInt(el.dataset.target);
        let count = 0;
        const step = target / 50;
        const update = () => {
            count += step;
            if (count < target) {
                el.innerText = Math.ceil(count) + el.dataset.suffix;
                setTimeout(update, 20);
            } else {
                el.innerText = target + el.dataset.suffix;
            }
        };
        update();
    });
};

// Start counters when section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}