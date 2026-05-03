// =====================
// PROFILE AVATAR LIGHTBOX
// =====================
const profileAvatar = document.getElementById('profileAvatar');
const avatarLightbox = document.getElementById('avatarLightbox');
const avatarBackdrop = document.getElementById('avatarBackdrop');
const avatarClose = document.getElementById('avatarClose');

function openLightbox() {
    avatarLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    avatarLightbox.classList.remove('open');
    document.body.style.overflow = '';
}

if (profileAvatar) profileAvatar.addEventListener('click', openLightbox);
if (avatarBackdrop) avatarBackdrop.addEventListener('click', closeLightbox);
if (avatarClose) avatarClose.addEventListener('click', closeLightbox);



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
// PROJECT VIEW ALL
// =====================
const viewAllBtn = document.getElementById('viewAllProjects');
const extraProjects = document.querySelectorAll('.project-extra');
const interestsWrapper = document.getElementById('interestsWrapper');
const colSide = document.querySelector('.col-side');
const interestsSection = document.getElementById('interests');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        const isExpanded = viewAllBtn.classList.contains('expanded');

        extraProjects.forEach(card => {
            card.classList.toggle('visible', !isExpanded);
        });
        viewAllBtn.classList.toggle('expanded', !isExpanded);
        viewAllBtn.innerHTML = isExpanded
            ? '<i class="fas fa-th-large"></i> View All Projects'
            : '<i class="fas fa-chevron-up"></i> Show Less';

        if (!isExpanded) {
            // Move interests into col-side
            interestsSection.classList.remove('interests-fullwidth');
            interestsSection.querySelector('.interests-grid').classList.remove('interests-grid-wide');
            colSide.appendChild(interestsSection);
            interestsWrapper.style.display = 'none';
        } else {
            // Move interests back to full-width wrapper
            interestsWrapper.style.display = '';
            interestsSection.classList.add('interests-fullwidth');
            interestsSection.querySelector('.interests-grid').classList.add('interests-grid-wide');
            interestsWrapper.querySelector('.container').appendChild(interestsSection);
        }
    });
}

// =====================
// CONTACT MODAL
// =====================
const openContactModal = document.getElementById('openContactModal');
const contactModalOverlay = document.getElementById('contactModalOverlay');
const contactModalClose = document.getElementById('contactModalClose');

function openModal() {
    contactModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    contactModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (openContactModal) openContactModal.addEventListener('click', openModal);
if (contactModalClose) contactModalClose.addEventListener('click', closeModal);
if (contactModalOverlay) {
    contactModalOverlay.addEventListener('click', function(e) {
        if (e.target === contactModalOverlay) closeModal();
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
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

//disabled rightclick
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});