/* ============================================
   PORTFOLIO JAVASCRIPT - Interactions & Animations
   ============================================ */

// ============ PARTICLE SYSTEM ============
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#a78bfa', '#34d399'];
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 15 + 8}s;
            animation-delay: ${Math.random() * 10}s;
            box-shadow: 0 0 ${size * 2}px ${color};
            opacity: 0;
        `;
        container.appendChild(particle);
    }
}

createParticles();

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
});

// ============ TYPING ANIMATION ============
const roles = [
    'MERN Stack Developer',
    'React.js Developer',
    'Node.js & Express Expert',
    'MongoDB Database Designer',
    'Full Stack Web Developer',
    'Open to New Opportunities'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeRole, speed);
}

setTimeout(typeRole, 1000);

// ============ SCROLL REVEAL ANIMATIONS ============
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
        }
    });
}, observerOptions);

// Add fade-in-up to all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animElements = document.querySelectorAll(
        '.about-card, .skill-card, .project-card, .service-card, .contact-card, .contact-form-wrapper'
    );
    
    animElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

// ============ SKILL BARS ANIMATION ============
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                setTimeout(() => fill.classList.add('animated'), 200);
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ============ SMOOTH SCROLL FOR NAV LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPos = target.offsetTop - navHeight - 20;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
let mobileMenuOpen = false;

hamburger.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(8, 11, 20, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 20px 5%;
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 4px;
            animation: slideDown 0.3s ease;
        `;
        
        const links = ['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'];
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = `#${link.toLowerCase()}`;
            a.textContent = link;
            a.style.cssText = `
                color: #8892a4;
                text-decoration: none;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 500;
                transition: all 0.2s;
                font-family: 'Outfit', sans-serif;
            `;
            a.addEventListener('mouseenter', () => { a.style.background = 'rgba(108,99,255,0.1)'; a.style.color = '#f0f4ff'; });
            a.addEventListener('mouseleave', () => { a.style.background = ''; a.style.color = '#8892a4'; });
            a.addEventListener('click', () => closeMobileMenu());
            mobileMenu.appendChild(a);
        });
        
        document.body.appendChild(mobileMenu);
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    mobileMenuOpen = false;
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.remove();
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.opacity = '';
    hamburger.children[2].style.transform = '';
}

// ============ CONTACT FORM SUBMIT ============
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.submit-btn');
    const originalHTML = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = `<span>Sending...</span> <div class="spinner" style="width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></div>`;
    btn.disabled = true;
    
    // Add spinner keyframe
    if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        btn.innerHTML = `<span>✅ Message Sent!</span>`;
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1800);
});

// ============ HERO SECTION PARALLAX ============
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-dev-img');
    const scrolled = window.scrollY;
    if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// ============ CURSOR GLOW EFFECT ============
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108, 99, 255, 0.06) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: transform 0.1s;
    will-change: transform;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ============ COUNTER ANIMATION ============
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            const data = [50, 3, 30];
            const suffixes = ['+', '+', '+'];
            nums.forEach((num, i) => animateCounter(num, data[i], suffixes[i]));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

console.log('🚀 Portfolio loaded! Built with passion and code.');
