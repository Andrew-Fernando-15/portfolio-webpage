// 3D Background


const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const starsGeometry = new THREE.BufferGeometry();
const starsCount = 3200;
const posArray = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    const center = 16;
    const radius = 14;

    const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

const starsMaterial = new THREE.PointsMaterial({
    size: 0.15,
    map: createStarTexture(),
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false
});

const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

camera.position.z = 20;

let mouseX = 0;
let mouseY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.0001;
    mouseY = (event.clientY - windowHalfY) * 0.0001;
});

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    starMesh.rotation.y += 0.0001;
    starMesh.rotation.x += 0.00005;

    starMesh.rotation.y += mouseX * 0.5;
    starMesh.rotation.x += mouseY * 0.5;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


gsap.registerPlugin(ScrollTrigger);


const hero = document.querySelector('.hero');
if (hero) {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

    tl.fromTo(".sub-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 }
    )
        .fromTo(".year",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0 },
            "-=0.5"
        )
        .fromTo(".main-title",
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0 },
            "-=0.5"
        )
        .fromTo(".hero-buttons .btn-resume:first-child",
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0 },
            "-=0.5"
        )
        .fromTo(".hero-buttons .btn-resume:last-child",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0 },
            "<"
        );
}


document.querySelectorAll('.section-title').forEach(title => {
    gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 88%",
                toggleActions: "play none none reverse"
            }
        }
    );
});


const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item) => {
    const isLeft = item.classList.contains('left');
    gsap.fromTo(item,
        { opacity: 0, x: isLeft ? -80 : 80 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});


const projectCards = document.querySelectorAll('.experience-card');
if (projectCards.length) {
    gsap.fromTo(projectCards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            stagger: 0.12,
            scrollTrigger: {
                trigger: '.experience-slider',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
}


const skillCards = document.querySelectorAll('.skills-container .skill-bar');
if (skillCards.length) {
    gsap.fromTo(skillCards,
        { opacity: 0, x: -40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: {
                each: 0.1,
                from: "start"
            },
            scrollTrigger: {
                trigger: '.skills-container',
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        }
    );
}


const contactContainer = document.querySelector('.contact-container');
if (contactContainer) {
    gsap.fromTo(contactContainer,
        { opacity: 0, scale: 0.92, filter: "blur(8px)" },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contactContainer,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
}


const certItems = document.querySelectorAll('.cert-list-item');
if (certItems.length) {
    gsap.fromTo(certItems,
        { opacity: 0, x: -30, filter: "blur(5px)" },
        {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.cert-list',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
}




// Main Script


document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('expanded');
            } else {
                entry.target.classList.remove('expanded');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.about-section .scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    const typingText = document.getElementById('typing-text');
    const words = ["PROGRAMMER", "CODER", "DEVELOPER", "ENGINEER"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 60;
    const wordPause = 1500;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = wordPause;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    if (typingText) {
        // Wait for preloader to finish before starting the hero animation
        if (document.getElementById('preloader')) {
            window.addEventListener('preloaderComplete', type, { once: true });
        } else {
            type();
        }
    }

    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    });

    const interactables = document.querySelectorAll('a, button, .floating-icon');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.classList.remove('hovered');
        });
    });

    const timelineSections = document.querySelectorAll('.timeline');

    timelineSections.forEach(timelineSection => {
        const timelineProgress = timelineSection.querySelector('.timeline-progress');
        const timelineDots = timelineSection.querySelectorAll('.timeline-dot');

        if (timelineProgress) {
            window.addEventListener('scroll', () => {
                const sectionRect = timelineSection.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const sectionHeight = sectionRect.height;
                const windowHeight = window.innerHeight;

                const startOffset = windowHeight / 2;
                let scrollDistance = startOffset - sectionTop;

                let progressPercentage = (scrollDistance / sectionHeight) * 100;
                progressPercentage = Math.max(0, Math.min(100, progressPercentage));

                timelineProgress.style.height = `${progressPercentage}%`;

                timelineDots.forEach(dot => {
                    const dotRect = dot.getBoundingClientRect();
                    const dotTop = dotRect.top;
                    const lineBottom = timelineProgress.getBoundingClientRect().bottom;

                    if (lineBottom > dotTop) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            });
        }
    });

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
                backToTopBtn.classList.add('bounce');
            } else {
                backToTopBtn.classList.remove('bounce');
            }
        });
    }

    const aboutCard = document.querySelector('.glass-card');
    if (aboutCard) {
        aboutCard.addEventListener('mousemove', (e) => {

            if (!aboutCard.classList.contains('expanded')) return;

            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            const title = aboutCard.querySelector('h2');
            const para = aboutCard.querySelector('p');

            if (title) title.style.transform = `translateZ(40px)`;
            if (para) para.style.transform = `translateZ(20px)`;

            aboutCard.style.transition = 'transform 0.1s ease-out';
            aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        aboutCard.addEventListener('mouseleave', () => {
            if (!aboutCard.classList.contains('expanded')) return;

            aboutCard.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            aboutCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

            const title = aboutCard.querySelector('h2');
            const para = aboutCard.querySelector('p');
            if (title) title.style.transform = 'translateZ(0)';
            if (para) para.style.transform = 'translateZ(0)';

            setTimeout(() => {
                aboutCard.style.transition = '';
            }, 600);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);

            const json = JSON.stringify(object);

            fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {

                        btn.innerHTML = '<span>Message Delivered!</span> <i class="fa-solid fa-check"></i>';
                        btn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a, #22c55e)';
                        btn.style.borderColor = '#4ade80';
                        contactForm.reset();
                        if (window.soundSystem) window.soundSystem.playSuccess();
                    } else {

                        btn.innerHTML = '<span>Error, Please Retry!</span> <i class="fa-solid fa-triangle-exclamation"></i>';
                        btn.style.background = 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)';
                        if (window.soundSystem) window.soundSystem.playError();
                    }
                })
                .catch(error => {

                    btn.innerHTML = '<span>Error!</span> <i class="fa-solid fa-triangle-exclamation"></i>';
                    btn.style.background = 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)';
                    if (window.soundSystem) window.soundSystem.playError();
                })
                .finally(() => {

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.style.opacity = '1';
                        btn.style.pointerEvents = 'all';
                    }, 3000);
                });
        });
    }

    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');
    const footerResumeBtn = document.getElementById('footerResumeBtn');

    if (resumeModal && closeResumeBtn) {
        const openModal = (e) => {
            if (e) e.preventDefault();
            resumeModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            resumeModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        };

        if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
        if (footerResumeBtn) footerResumeBtn.addEventListener('click', openModal);
        closeResumeBtn.addEventListener('click', closeModal);

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });
    }

    // ── Interactive Skill Filtering ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card[data-category]');
    let isFiltering = false;

    if (filterBtns.length && skillCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isFiltering) return;
                isFiltering = true;

                // Play click sound
                if (window.soundSystem) window.soundSystem.playClick();

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // 1. Sequentially hide all currently visible cards
                const visibleCards = Array.from(skillCards).filter(card => !card.classList.contains('d-none'));

                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('filter-hide');
                    }, index * 30); // staggered fade out
                });

                // Wait for hide sequence to finish plus a little padding
                const hideDuration = visibleCards.length * 30 + 300;

                setTimeout(() => {
                    // 2. Change layout (display:none vs display:flex) while invisible
                    let cardsToShow = [];
                    skillCards.forEach(card => {
                        const category = card.dataset.category;
                        const shouldShow = filter === 'all' || category === filter;

                        // Force transition off for instant layout update
                        card.style.transition = 'none';

                        if (shouldShow) {
                            card.classList.remove('d-none');
                            card.classList.add('filter-hide'); // stay invisible
                            cardsToShow.push(card);
                        } else {
                            card.classList.add('d-none');
                        }
                    });

                    // Force reflow
                    skillCards.forEach(card => void card.offsetWidth);

                    // Restore transitions
                    skillCards.forEach(card => card.style.transition = '');

                    // 3. Sequentially show new cards
                    cardsToShow.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.remove('filter-hide');
                        }, index * 60); // slightly slower staggered fade in
                    });

                    // 4. Release filtering lock
                    const showDuration = cardsToShow.length * 60 + 400;
                    setTimeout(() => {
                        isFiltering = false;
                    }, showDuration);

                }, hideDuration);
            });
        });
    }

    // ── Experience Slider Drag Logic ──
    const slider = document.querySelector('.experience-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            slider.style.scrollSnapType = 'none'; // Disable snap while dragging
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = '';
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = '';
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

});

// ══════════════════════════════════════════
//  PRELOADER
// ══════════════════════════════════════════
(function () {
    const preloader = document.getElementById('preloader');
    const sleekFill = document.getElementById('preloaderSleekFill');
    const particlesContainer = document.getElementById('preloaderParticles');
    if (!preloader) return;

    const DURATION = 3500;         // Total animation duration in ms
    const startTime = performance.now();
    let pageLoaded = false;
    let animationDone = false;

    // ── Spawn floating particles ──
    if (particlesContainer) {
        for (let i = 0; i < 100; i++) {
            const p = document.createElement('div');
            p.classList.add('preloader-particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = -(Math.random() * 20) + '%';

            // Sync with the ~3.5s DURATION. Duration between 2s and 4s, delay up to 1.5s
            p.style.animationDuration = (2 + Math.random() * 2) + 's';
            p.style.animationDelay = (Math.random() * 1.5) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    // ── Smooth linear animation via requestAnimationFrame ──
    function animate(now) {
        const elapsed = now - startTime;
        // Ease-out cubic for a natural deceleration feel
        let t = Math.min(elapsed / DURATION, 1);
        let easedT = 1 - Math.pow(1 - t, 3);

        // If page has loaded and we're past 80%, accelerate to finish
        if (pageLoaded && easedT >= 0.8) {
            easedT = Math.min(easedT + (1 - easedT) * 0.1, 1);
        }

        // Update loading bar
        if (sleekFill) {
            sleekFill.style.width = (easedT * 100) + '%';
        }

        if (easedT < 1) {
            requestAnimationFrame(animate);
        } else {
            // Reached 100%
            if (sleekFill) sleekFill.style.width = '100%';
            animationDone = true;
            tryDismiss();
        }
    }

    requestAnimationFrame(animate);

    // ── Dismiss only when BOTH animation is done AND page is loaded ──
    function tryDismiss() {
        if (!animationDone || !pageLoaded) return;

        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.remove();
                // Dispatch event to tell landing page to start animating
                document.body.classList.add('page-loaded');
                window.dispatchEvent(new Event('preloaderComplete'));
            }, 1000);
        }, 500);
    }

    window.addEventListener('load', () => {
        pageLoaded = true;
        tryDismiss();
    });
})();

// ══════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ══════════════════════════════════════════
(function () {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
})();

// ══════════════════════════════════════════
//  FLOATING NAVBAR — Active Section Tracking
// ══════════════════════════════════════════
(function () {
    const nav = document.getElementById('siteNav');
    const indicator = document.getElementById('navIndicator');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!nav || !indicator || !navLinks.length) return;

    const sectionIds = Array.from(navLinks).map(link => link.dataset.section);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    let currentActive = 'home';
    let navShown = false;

    // ── Position the sliding indicator ──
    function updateIndicator(activeLink) {
        if (!activeLink) return;
        const pill = nav.querySelector('.nav-pill');
        if (!pill) return;

        const pillRect = pill.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const left = linkRect.left - pillRect.left;
        const width = linkRect.width;

        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
    }

    // ── Set active link ──
    function setActive(sectionId) {
        if (sectionId === currentActive) return;
        currentActive = sectionId;

        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
                updateIndicator(link);
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ── IntersectionObserver for section tracking ──
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ── Show/hide navbar based on scroll position ──
    const heroSection = document.getElementById('home');
    let heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    function checkNavVisibility() {
        const scrollY = window.scrollY;

        if (scrollY > heroHeight * 0.5 && !navShown) {
            nav.classList.add('nav-visible');
            navShown = true;
            // Initial indicator position
            requestAnimationFrame(() => {
                const activeLink = nav.querySelector('.nav-link.active');
                updateIndicator(activeLink);
            });
        } else if (scrollY <= heroHeight * 0.3 && navShown) {
            nav.classList.remove('nav-visible');
            navShown = false;
        }
    }

    window.addEventListener('scroll', checkNavVisibility, { passive: true });

    // ── Update indicator on resize ──
    window.addEventListener('resize', () => {
        heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        const activeLink = nav.querySelector('.nav-link.active');
        updateIndicator(activeLink);
    });

    // ── Smooth scroll on nav link click ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.section;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Initial check
    checkNavVisibility();
})();

// ══════════════════════════════════════════
//  FLOWTHROUGH: STAGE 2 (Modal Logic)
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    const flowthroughBtn = document.getElementById('flowthrough-btn');
    const modalOverlay = document.getElementById('flowthrough-modal-overlay');
    const btnNo = document.getElementById('ft-btn-no');
    const btnOk = document.getElementById('ft-btn-ok');

    if (flowthroughBtn && modalOverlay) {
        // Open Modal
        flowthroughBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        // Close Modal via "NO"
        if (btnNo) {
            btnNo.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
            });
        }

        // Close Modal via "OK" (Ready for Tour)
        if (btnOk) {
            btnOk.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
                console.log('Tour System Loaded. Running Stage 5 (Step 1)...');
                tourActive = true;
                runCassieStep(0);
            });
        }
    }
});

// ══════════════════════════════════════════
//  FLOWTHROUGH: STAGE 4 (Tour Steps)
// ══════════════════════════════════════════
let tourActive = false;
let typeWriterTimeout;
let activeGsapTween;

const cassieTourSteps = [
    {
        waypoints: ['#home h2', '.hero-buttons'],
        text: `Welcome. You're looking at Andrew Fernando's work.`,
        duration: 3000,
        highlight: '#home'
    },
    {
        waypoints: ['.hero-name'],
        text: `I'm Cassie. I'll walk you through it — won't take long.`,
        duration: 5000,
        highlight: '#home'
    },
    {
        waypoints: ['#about h2', '.about-text-content p', '.about-image-content'],
        text: `Andrew's a Computer Engineering student. He builds systems that work, not just demos that look like they might.`,
        duration: 10000,
        highlight: '#about'
    },
    {
        waypoints: ['#projects h2', '.experience-card:nth-child(1)'],
        text: `This is Mr. Fernando OS — a working desktop environment, built in the browser. Try it. It's easier to show you than tell you.`,
        duration: 5000,
        highlight: '.experience-card:nth-child(1)'
    },
    {
        waypoints: ['.experience-card:nth-child(2)'],
        text: `The Student Management System. Built to solve one problem well — managing records without the mess.`,
        duration: 5000,
        highlight: '.experience-card:nth-child(2)'
    },
    {
        waypoints: ['.experience-card:nth-child(3)'],
        text: `ChainGuard. Blockchain-backed evidence management — built for the one thing that can't be compromised: trust.`,
        duration: 5000,
        highlight: '.experience-card:nth-child(3)'
    },
    {
        waypoints: ['#skills h2', '.skills-container'],
        text: `HTML, CSS, JavaScript, Java, C — and more. What's under the hood of everything you just saw.`,
        duration: 15000,
        highlight: '#skills'
    },
    {
        waypoints: ['#certifications h2', '.cert-list-item:nth-child(1)'],
        text: `The credentials behind the work — degree and coursework, both.`,
        duration: 8000,
        highlight: '#certifications'
    },
    {
        waypoints: ['#contact h2', '#contactForm'],
        text: `If this is relevant to you — LinkedIn, or the form below. Either works.`,
        duration: 8000,
        highlight: '#contact'
    },
    {
        waypoints: ['#contact'],
        text: `That's the tour. The rest is worth exploring on your own.`,
        duration: 5000,
        highlight: ''
    }
];

// ══════════════════════════════════════════
//  FLOWTHROUGH: STAGE 5 (Automatic Scrolling & Movement)
// ══════════════════════════════════════════
function clearTourHighlight() {
    document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
    });
}

function typeWriter(text, element, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    
    // Replace \n with <br> inside the HTML text before typing, 
    // but typing HTML tags character by character breaks them.
    // Instead, we will type out text and inject <br> when we see \n.
    
    const characters = text.split('');
    
    function typeNextChar() {
        if (!tourActive) return;
        if (i < characters.length) {
            if (characters[i] === '\n') {
                element.innerHTML += '<br><br>';
            } else {
                element.innerHTML += characters[i];
            }
            i++;
            typeWriterTimeout = setTimeout(typeNextChar, speed);
        }
    }
    typeNextChar();
}

function typeOut(element, speed = 15, callback) {
    let currentHtml = element.innerHTML;
    
    function eraseNextChar() {
        if (!tourActive) return;
        if (currentHtml.length > 0) {
            if (currentHtml.endsWith('<br><br>')) {
                currentHtml = currentHtml.slice(0, -8);
            } else {
                currentHtml = currentHtml.slice(0, -1);
            }
            element.innerHTML = currentHtml;
            typeWriterTimeout = setTimeout(eraseNextChar, speed);
        } else {
            if (callback) callback();
        }
    }
    eraseNextChar();
}

function animateWaypoints(waypoints, duration) {
    if (!tourActive || waypoints.length === 0) return;
    
    const cassieCursor = document.getElementById('cassie-cursor');
    const cassieTooltip = document.getElementById('cassie-tooltip');
    
    // Calculate time per waypoint
    const timePerWaypoint = (duration / 1000) / waypoints.length;
    
    let tl = gsap.timeline();
    activeGsapTween = tl;
    
    waypoints.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (el) {
            const rect = el.getBoundingClientRect();
            // Aim for center-right for wide elements, or center for small elements
            // Calculate absolute document coordinates
            const absoluteTop = window.scrollY + rect.top;
            const absoluteLeft = window.scrollX + rect.left;
            
            const targetTop = absoluteTop + (rect.height / 2);
            let targetLeft = absoluteLeft + (rect.width / 2) + 20;
            
            // Adjust left if element is very wide (like a section title)
            if (rect.width > 300) {
                targetLeft = absoluteLeft + rect.width - 50;
            }
            
            // CLAMP TOOLTIP TO PREVENT GOING OFF-SCREEN
            // Tooltip is 300px wide and offset by 25px. We need about 350px of space on the right.
            const screenRightBound = window.scrollX + window.innerWidth;
            if (targetLeft + 350 > screenRightBound) {
                targetLeft = screenRightBound - 350;
            }
            
            tl.to([cassieCursor, cassieTooltip], {
                top: targetTop,
                left: targetLeft,
                duration: timePerWaypoint,
                ease: "power2.inOut",
                onStart: () => {
                    // Smoothly scroll to the waypoint as Cassie moves to it
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });
}

function runCassieStep(stepIndex) {
    if (!tourActive) return; // Abort if cancelled
    
    const cassieCursor = document.getElementById('cassie-cursor');
    const cassieTooltip = document.getElementById('cassie-tooltip');
    const cassieText = document.getElementById('cassie-text');

    if (!cassieCursor || !cassieTooltip || !cassieText) {
        console.error('Cassie Tour Error: Missing Cassie UI elements');
        return;
    }

    // Termination logic: End of tour
    if (stepIndex >= cassieTourSteps.length) {
        cassieCursor.classList.remove('active');
        cassieTooltip.classList.remove('active');
        clearTourHighlight();
        console.log('Tour Complete.');
        tourActive = false;
        return;
    }
    
    const step = cassieTourSteps[stepIndex];
    
    // Highlight active section
    clearTourHighlight();
    if (step.highlight) {
        const highlightEl = document.querySelector(step.highlight);
        if (highlightEl) {
            highlightEl.classList.add('tour-highlight');
        }
    }

    // Use the first waypoint to scroll into view
    const targetElement = document.querySelector(step.waypoints[0]);
    if (!targetElement) {
        console.error('Cassie Tour Error: Missing target element for step', stepIndex);
        return;
    }

    // 1. Scroll to the first waypoint immediately to center the view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. Wait slightly for initial scroll to start, then animate and type
    setTimeout(() => {
        if (!tourActive) return;
        
        // Show Cassie
        cassieCursor.classList.add('active');
        cassieTooltip.classList.add('active');
        
        // Clear previous timeouts
        clearTimeout(typeWriterTimeout);
        if (activeGsapTween) activeGsapTween.kill();
        
        // Start typing effect
        typeWriter(step.text, cassieText, 25);
        
        // Start GSAP waypoint animation
        animateWaypoints(step.waypoints, step.duration * 0.9); // Finish moving slightly before duration ends
        
        console.log(`Cassie: Executed Step ${stepIndex}`);
        
        // Calculate when to start erasing text based on text length and total duration
        const typeOutSpeed = 5;
        const typeOutDuration = step.text.length * typeOutSpeed;
        const timeToStartTypingOut = Math.max(step.duration - typeOutDuration - 500, step.duration * 0.6);
        
        setTimeout(() => {
            if (tourActive) {
                typeOut(cassieText, typeOutSpeed);
            }
        }, timeToStartTypingOut);
        
        // Recursive logic: Wait for 'duration', then run next step
        setTimeout(() => {
            if (tourActive) {
                runCassieStep(stepIndex + 1);
            }
        }, step.duration);
        
    }, 700); // 700ms delay to let scrolling settle
}

// ══════════════════════════════════════════
//  FLOWTHROUGH: STAGE 7 (Safety Abort)
// ══════════════════════════════════════════
function abortCassieTour(e) {
    // Ignore clicks on the flowthrough OK button to prevent immediate cancellation
    if (e.target.closest('#ft-btn-ok') || e.target.closest('#flowthrough-btn')) return;
    
    if (tourActive) {
        console.log('Tour aborted by user interaction.');
        tourActive = false;
        clearTimeout(typeWriterTimeout);
        if (activeGsapTween) activeGsapTween.kill();
        
        clearTourHighlight();
        
        const cassieCursor = document.getElementById('cassie-cursor');
        const cassieTooltip = document.getElementById('cassie-tooltip');
        if (cassieCursor) cassieCursor.classList.remove('active');
        if (cassieTooltip) cassieTooltip.classList.remove('active');
    }
}

// Listen for user scroll or click to cancel the tour
window.addEventListener('wheel', abortCassieTour, { passive: true });
window.addEventListener('touchstart', abortCassieTour, { passive: true });
window.addEventListener('mousedown', abortCassieTour);
