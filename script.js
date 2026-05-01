// =====================
// DARK MODE TOGGLE
// =====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load saved preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDarkOnLoad = savedTheme ? savedTheme === 'dark' : prefersDark;
applyTheme(isDarkOnLoad);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(!currentlyDark);
        localStorage.setItem('theme', !currentlyDark ? 'dark' : 'light');
    });
}

// =====================
// SKILLS TABS
// =====================
const pills = document.querySelectorAll('#skillTabs .pill');
const tabPanels = document.querySelectorAll('.tab-panel');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const target = pill.dataset.tab;
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === target) panel.classList.add('active');
        });
    });
});

// =====================
// PROJECT FILTER
// =====================
const filterPills = document.querySelectorAll('.filter-pill');
const projectRows = document.querySelectorAll('.project-row');

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;
        projectRows.forEach(row => {
            if (filter === 'all' || row.dataset.category === filter) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });
    });
});

// =====================
// SMOOTH SCROLL OFFSET (for fixed navbar)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


// =====================
// CONTACT FORM (basic success handling)
// =====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
    });
}

// =====================
// GALLERY CAROUSEL
// =====================
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const total = slides.length;
    const visible = 5; // number of slides visible at once
    let current = 0;

    function getSlideWidth() {
        // slide width + gap (10px)
        return slides[0].getBoundingClientRect().width + 10;
    }

    function updateCarousel() {
        const offset = current * getSlideWidth();
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= total - visible;
    }

    prevBtn.addEventListener('click', () => {
        if (current > 0) { current--; updateCarousel(); }
    });

    nextBtn.addEventListener('click', () => {
        if (current < total - visible) { current++; updateCarousel(); }
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > 40 && current < total - visible) { current++; updateCarousel(); }
        else if (diff < -40 && current > 0) { current--; updateCarousel(); }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => updateCarousel());

    updateCarousel();
}