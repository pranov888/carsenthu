/* ═══════════════════════════════════════════════════════════════
   APEX MOTORS - JavaScript Interactivity & Animations
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initCountUpAnimations();
    initFilterTabs();
    initCarCards();
    initModal();
    initParallax();

    // Check for filter in URL hash (for navigation from profile pages)
    checkHashFilters();
});

/* ═══════════════════════════════════════════
   LOADING SCREEN
═══════════════════════════════════════════ */
function initLoader() {
    const loader = document.getElementById('loader');
    const speedValue = document.querySelector('.speed-value');
    let speed = 0;

    // Animate speed counter
    const speedInterval = setInterval(() => {
        if (speed < 320) {
            speed += Math.floor(Math.random() * 20) + 5;
            if (speed > 320) speed = 320;
            speedValue.textContent = speed;
        }
    }, 50);

    // Hide loader after animation
    setTimeout(() => {
        clearInterval(speedInterval);
        speedValue.textContent = '320';

        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';

            // Trigger hero animations
            triggerHeroAnimations();
        }, 500);
    }, 2200);
}

function triggerHeroAnimations() {
    // Add visible class to hero elements for animation
    document.querySelectorAll('.hero .animate-slide-up, .hero .animate-fade-in').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, i * 100);
    });
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
function initCustomCursor() {
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

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor (fast follow)
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower (slower follow)
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverables = document.querySelectorAll('a, button, .car-card, .filter-btn');
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
   NAVIGATION
═══════════════════════════════════════════ */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scroll for nav links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // If link goes to another page (contains '../' or is external), allow normal navigation
            if (href.includes('../') || href.includes('index.html')) {
                // Don't prevent default - let browser navigate normally
                navLinks.classList.remove('active');
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            const filterType = link.getAttribute('data-filter');

            if (target) {
                // Close mobile menu
                navLinks.classList.remove('active');

                // Smooth scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Trigger filter if nav link has data-filter
                if (filterType) {
                    setTimeout(() => {
                        const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterType}"]`);
                        if (filterBtn) {
                            filterBtn.click();
                        }
                    }, 500);
                }
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ═══════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;
    const colors = ['#ff3a3a', '#ff6b35', '#00d4ff', '#ffd700'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        container.appendChild(particle);
    }
}

/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special handling for staggered animations
                if (entry.target.classList.contains('car-card')) {
                    const cards = document.querySelectorAll('.car-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .animate-slide-up,
        .animate-slide-left,
        .animate-fade-in,
        .animate-reveal,
        .section-tag,
        .section-title,
        .filter-tabs,
        .car-card
    `);

    animatedElements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════
   COUNT UP ANIMATIONS
═══════════════════════════════════════════ */
function initCountUpAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }

        // Format number
        if (target > 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ═══════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════ */
function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards with animation
            cards.forEach((card, index) => {
                const category = card.dataset.category;

                // First, hide all cards
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.95)';

                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');

                        // Staggered reveal
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });
}

/* ═══════════════════════════════════════════
   CHECK HASH FOR FILTERS (from profile pages)
═══════════════════════════════════════════ */
function checkHashFilters() {
    const hash = window.location.hash;

    // Map hash values to filter types
    const hashFilters = {
        '#gallery-supercar': 'supercar',
        '#gallery-tuned': 'tuned',
        '#gallery-luxury': 'luxury',
        '#gallery': 'all'
    };

    const filterType = hashFilters[hash];

    if (filterType) {
        // Function to apply filter
        const applyFilter = () => {
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterType}"]`);
            if (filterBtn) {
                filterBtn.click();
            }

            // Scroll to gallery section
            const gallery = document.getElementById('gallery');
            if (gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Try multiple times to ensure filter is applied
        // After loader (2.8s) and also immediately after DOMContentLoaded
        setTimeout(applyFilter, 100);  // Quick attempt
        setTimeout(applyFilter, 2800); // After loader
        setTimeout(applyFilter, 3200); // Backup
    }
}

// Also listen for hash changes (for back button/direct navigation)
window.addEventListener('hashchange', () => {
    checkHashFilters();
});

/* ═══════════════════════════════════════════
   CAR CARDS INTERACTIONS
═══════════════════════════════════════════ */

// Car name to URL slug mapping
const carSlugs = {
    'G-Power M5 F90': 'g-power-m5',
    'MANHART MH5 F90': 'manhart-m5',
    'MANSORY BMW X7': 'mansory-x7',
    'MANSORY Ferrari SF90': 'mansory-sf90',
    'MANSORY McLaren 720S': 'mansory-720s',
    'MANSORY BMW XM': 'mansory-xm',
    'Koenigsegg RS': 'koenigsegg-rs',
    'Koenigsegg Jesko Attack': 'jesko-attack',
    'Ferrari LaFerrari': 'laferrari',
    'Aventador SVJ 63': 'aventador-svj-63',
    'Audi RS6 Avant': 'audi-rs6',
    'Porsche 918 Spyder': 'porsche-918',
    'Veneno Roadster': 'veneno-roadster',
    'Bugatti Chiron Pur Sport': 'bugatti-pur-sport',
    'Lamborghini Urus': 'lamborghini-urus',
    'Lamborghini Huracán': 'lamborghini-huracan',
    'Maybach GLS 600': 'maybach-gls-600',
    'Maybach S580': 'maybach-s580',
    'Porsche 992 GT3 RS': 'porsche-gt3-rs'
};

function initCarCards() {
    const cards = document.querySelectorAll('.car-card');

    cards.forEach(card => {
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });

        // Click to navigate to profile page
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            const slug = carSlugs[title];

            if (slug) {
                window.location.href = `cars/${slug}.html`;
            }
        });
    });

    // Load car images for cards
    loadCarImages();
}

/* ═══════════════════════════════════════════
   LOAD CAR IMAGES
═══════════════════════════════════════════ */
function loadCarImages() {
    const cards = document.querySelectorAll('.car-card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent;
        const slug = carSlugs[title];
        const placeholder = card.querySelector('.image-placeholder');
        const cardImage = card.querySelector('.card-image');

        if (slug && cardImage) {
            const imgSrc = `images/cars/${slug}/1.jpg`;
            const img = new Image();
            img.src = imgSrc;
            img.alt = title;
            img.className = 'car-img';

            img.onload = () => {
                if (placeholder) {
                    placeholder.remove();
                }
                cardImage.insertBefore(img, cardImage.firstChild);
            };

            img.onerror = () => {
                // Keep placeholder if image doesn't exist
                console.log(`Image not found: ${imgSrc}`);
            };
        }
    });
}

/* ═══════════════════════════════════════════
   MODAL
═══════════════════════════════════════════ */
function initModal() {
    const modal = document.getElementById('carModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = modal?.querySelector('.modal-overlay');

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(card) {
    const modal = document.getElementById('carModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImage = document.getElementById('modalImage');
    const modalStats = document.getElementById('modalStats');

    // Get card data
    const title = card.querySelector('.card-title').textContent;
    const desc = card.querySelector('.card-desc').textContent;
    const icon = card.querySelector('.placeholder-icon').textContent;
    const stats = card.querySelectorAll('.stat-item');

    // Populate modal
    modalTitle.textContent = title;
    modalDesc.textContent = desc + ' This incredible machine represents the pinnacle of automotive engineering, combining raw power with cutting-edge technology and breathtaking design.';
    modalImage.innerHTML = `<span style="font-size: 5rem">${icon}</span>`;

    // Build stats HTML
    let statsHTML = '';
    stats.forEach(stat => {
        const icon = stat.querySelector('.stat-icon').textContent;
        const value = stat.querySelector('.stat-val').textContent;
        statsHTML += `
            <div class="modal-stat">
                <span style="font-size: 1.5rem">${icon}</span>
                <div style="font-family: var(--font-display); font-size: 1.25rem; margin-top: 0.5rem">${value}</div>
            </div>
        `;
    });
    modalStats.innerHTML = statsHTML;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('carModal');
    modal?.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* ═══════════════════════════════════════════
   PARALLAX EFFECTS
═══════════════════════════════════════════ */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero parallax
        if (hero && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / window.innerHeight);
            const translateY = scrolled * 0.5;

            if (heroContent) {
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }
    });
}

/* ═══════════════════════════════════════════
   BONUS: SOUND EFFECTS (Optional)
═══════════════════════════════════════════ */
// Uncomment to enable engine sound on card hover
/*
function initSoundEffects() {
    const cards = document.querySelectorAll('.car-card');
    const engineSound = new Audio('engine.mp3');
    engineSound.volume = 0.2;
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            engineSound.currentTime = 0;
            engineSound.play();
        });
    });
}
*/

/* ═══════════════════════════════════════════
   BONUS: MAGNETIC BUTTONS
═══════════════════════════════════════════ */
document.querySelectorAll('.hero-cta, .filter-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/* ═══════════════════════════════════════════
   BONUS: TYPING EFFECT FOR TAGLINES
═══════════════════════════════════════════ */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

/* ═══════════════════════════════════════════
   EASTER EGG: KONAMI CODE
═══════════════════════════════════════════ */
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Rainbow mode!
        document.body.style.animation = 'rainbowBg 5s linear infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbowBg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 10000);
    }
});

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║      RINNAE MOTORS - Where Dreams Meet Horsepower         ║
║                                                           ║
║      Built with passion for car enthusiasts.              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);
