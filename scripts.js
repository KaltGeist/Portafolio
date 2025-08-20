let isLoading = true;
let typingIndex = 0;
let currentTextIndex = 0;

const typingTexts = [
    "Desarrollador Full Stack",
    "Ingeniero en Informatica",
    "Especialista en Backend",
    "Arquitecto de Software",
    "Innovador Tecnológico"
];

document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    initializeNavigation();
    initializeAnimations();
    initializeTypingEffect();
    initializeScrollEffects();
    initializeFormHandling();
});

function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    const percentageText = document.querySelector('.loading-percentage');

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';
        percentageText.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    isLoading = false;
                    startMainAnimations();
                }, 500);
            }, 500);
        }
    }, 100);
}

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animación del hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    function typeText() {
        const currentText = typingTexts[currentTextIndex];

        if (typingIndex < currentText.length) {
            typingElement.textContent += currentText.charAt(typingIndex);
            typingIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (typingIndex > 0) {
            typingElement.textContent = typingElement.textContent.slice(0, -1);
            typingIndex--;
            setTimeout(eraseText, 50);
        } else {
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
        }
    }

    setTimeout(typeText, 1000);
}

function startMainAnimations() {
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    setTimeout(initializeCounters, 1000);
}

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;

        if (scrolled > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(139, 92, 246, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(139, 92, 246, 0.3)';
        }

        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animaciones específicas por tipo de elemento
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                }

                if (entry.target.classList.contains('skill-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.skill-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .neon-card, .fade-in-left'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

function initializeAnimations() {
    document.querySelectorAll('.pulse-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = this.querySelector('.ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';

                setTimeout(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                }, 10);

                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }
        });
    });

    document.querySelectorAll('.hover-tilt').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) {
            const cursorGlow = document.createElement('div');
            cursorGlow.className = 'cursor-glow';
            cursorGlow.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursorGlow);
        }

        const cursorElement = document.querySelector('.cursor-glow');
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    });
}

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');

    const inputs = contactForm.querySelectorAll('.neon-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');

            const glow = this.nextElementSibling;
            if (glow && glow.classList.contains('input-glow')) {
                glow.style.opacity = '0.2';
            }
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');

            const glow = this.nextElementSibling;
            if (glow && glow.classList.contains('input-glow')) {
                glow.style.opacity = '0';
            }
        });

        input.addEventListener('input', function () {
            if (this.value.length > 0) {
                this.style.borderColor = 'var(--neon-purple)';
                this.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
            } else {
                this.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                this.style.boxShadow = 'none';
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.classList.add('loading');
        submitBtn.style.pointerEvents = 'none';

        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
        };

        try {
            await emailjs.send("service_m72szkm", "template_ohemg4h", formData);

            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span>¡Mensaje Enviado!</span><div class="btn-glow"></div>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            contactForm.reset();
            showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        } catch (error) {
            console.error("Error:", error);
            showNotification('Hubo un problema al enviar el mensaje.', 'error');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Enviar Mensaje</span><div class="btn-glow"></div><div class="loading-spinner"></div>';
                submitBtn.style.background = 'var(--gradient-primary)';
                submitBtn.style.pointerEvents = 'auto';
            }, 3000);
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: var(--bg-color);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-glow);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function createParticleEffect(element) {
    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--neon-bright);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
        `;

        element.appendChild(particle);
        particles.push(particle);
    }

    return particles;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(() => {
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});