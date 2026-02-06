/* ═══════════════════════════════════════════════════════════════
   RINNAE MOTORS - Car Profile Page JavaScript
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom cursor for profile pages
    initProfileCursor();

    // Initialize navbar for profile pages
    initProfileNavbar();

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let currentIndex = 0;
    let images = [];

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const src = item.getAttribute('data-src');
        if (src) {
            images.push(src);
        }

        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (images[currentIndex]) {
            lightboxImage.src = images[currentIndex];
            lightboxImage.alt = `Gallery image ${currentIndex + 1}`;
            updateCounter();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex];
        updateCounter();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex];
        updateCounter();
    }

    function updateCounter() {
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Load actual images if they exist
    galleryItems.forEach(item => {
        const src = item.getAttribute('data-src');
        const placeholder = item.querySelector('.gallery-placeholder');

        if (src) {
            const img = new Image();
            img.src = src;
            img.alt = 'Car gallery image';

            img.onload = () => {
                if (placeholder) {
                    placeholder.remove();
                }
                item.appendChild(img);
            };

            img.onerror = () => {
                // Keep placeholder if image doesn't exist
                console.log(`Image not found: ${src}`);
            };
        }
    });

    // Load similar car images
    document.querySelectorAll('.similar-image .image-placeholder').forEach(placeholder => {
        const parent = placeholder.parentElement;
        const imgSrc = parent.getAttribute('data-src');

        if (imgSrc) {
            const img = new Image();
            img.src = imgSrc;
            img.alt = 'Similar car';

            img.onload = () => {
                placeholder.remove();
                parent.appendChild(img);
            };
        }
    });

    // Hero image fallback
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const bgImage = heroImage.style.backgroundImage;
        const url = bgImage.slice(5, -2); // Extract URL from url('...')

        const testImg = new Image();
        testImg.src = url;

        testImg.onerror = () => {
            // If hero image doesn't exist, show gradient
            heroImage.style.background = 'linear-gradient(135deg, #1a1a1f 0%, #0a0a0c 100%)';
        };
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.spec-card, .gallery-item, .similar-card, .about-text');

        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible && !el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transitionDelay = `${index * 0.05}s`;
            }
        });
    };

    // Set initial state for animations
    document.querySelectorAll('.spec-card, .gallery-item, .similar-card, .about-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});

/* ═══════════════════════════════════════════
   CUSTOM CURSOR FOR PROFILE PAGES
═══════════════════════════════════════════ */
function initProfileCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverables = document.querySelectorAll('a, button, .gallery-item, .similar-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* ═══════════════════════════════════════════
   NAVBAR FUNCTIONALITY FOR PROFILE PAGES
═══════════════════════════════════════════ */
function initProfileNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
}
