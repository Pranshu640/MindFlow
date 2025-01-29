document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll with custom easing
    const smoothScroll = (target, duration = 1200) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition;
        let startTime = null;

        const ease = (t) => {
            return t < 0.5 
                ? 4 * t * t * t 
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = ease(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Enhanced scroll observer
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const delay = target.dataset.delay || 0;
                
                setTimeout(() => {
                    target.classList.add('visible');
                }, delay);
                
                if (target.classList.contains('services')) {
                    document.querySelectorAll('.service-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 200 + (index * 100));
                    });
                }
            }
        });
    }, observerOptions);

    // Initialize observers
    observer.observe(document.querySelector('.services'));
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Smooth parallax effect
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScroll = () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const services = document.querySelector('.services');
        
        // Parallax for hero
        if (hero) {
            const speed = 0.4;
            const yPos = -(scrolled * speed);
            hero.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
        
        // Fade for services section
        if (services && scrolled > window.innerHeight * 0.3) {
            const progress = (scrolled - window.innerHeight * 0.3) / (window.innerHeight * 0.3);
            services.style.opacity = Math.min(progress, 1);
        }
        
        lastScrollY = scrolled;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initialize positions
    updateScroll();
    
    // Add data-delay attributes to cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.dataset.delay = index * 100;
    });

    // Smooth section transition
    const updateSectionTransition = () => {
        const services = document.querySelector('.services');
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled > heroHeight * 0.5) {
            services.style.transform = 'translateY(0)';
            services.style.opacity = '1';
        }
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateSectionTransition);
    }, { passive: true });

    // Initialize section positions
    updateSectionTransition();

    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide music player
    const musicPlayer = document.getElementById('musicPlayer');
    let isPlayerVisible = false;

    function toggleMusicPlayer() {
        isPlayerVisible = !isPlayerVisible;
        musicPlayer.style.display = isPlayerVisible ? 'block' : 'none';
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.issue-card, .test-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for scroll animations
    const elements = document.querySelectorAll('.issue-card, .test-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Add parallax effect to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // Handle issue card clicks
    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach(card => {
        card.addEventListener('click', () => {
            const testSection = document.querySelector('.tests');
            testSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animate curved text on load
    const letters = document.querySelectorAll('.curved-text span');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });

    // Add CSS class for visible elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .service-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Prevent white flash during scroll
    document.addEventListener('scroll', () => {
        const services = document.querySelector('.services');
        const hero = document.querySelector('.hero');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > hero.offsetHeight / 2) {
            services.style.backgroundColor = '#fff';
        } else {
            services.style.backgroundColor = 'transparent';
        }
    }, { passive: true });

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Remove any click event listeners that might interfere
        ctaButton.replaceWith(ctaButton.cloneNode(true));
    }
});