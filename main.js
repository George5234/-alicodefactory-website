// ============================================
// ALI CODE FACTORY - PROFESSIONAL PORTFOLIO
// Complete JavaScript File - Interactions & Animations
// Version: 1.0
// ============================================

// ============================================
// 1. WAIT FOR DOM TO LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initCounters();
    initModal();
    initContactForm();
    initScrollReveal();
    initNavbarScroll();
});

// ============================================
// 2. NAVIGATION (Mobile & Active Links)
// ============================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
            
            // Update active link
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// 3. ANIMATED COUNTERS (Achievements)
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    let counted = false;
    
    function startCounters() {
        if (counted) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
        
        counted = true;
    }
    
    // Trigger counters when they come into view
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(achievementsSection);
    }
}

// ============================================
// 4. SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .project-card, .step-card, .testimonial-card, .achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// 5. PROJECT MODAL
// ============================================

// Project data (to be populated with images/videos later)
const projectData = {
    refi: {
        title: 'REFI Network',
        description: 'A complete earning platform with mining, staking, referral system, and multi-currency swaps. Built for scalability with over 80,000 users.',
        features: [
            'Advanced referral system with milestone rewards',
            'Multi-currency mining (USDT, BNB, TON, REFI)',
            'Staking system with 3 plans (Silver, Gold, Diamond)',
            'Live crypto prices via CoinGecko API',
            'Swap system with real-time rates',
            'Complete admin panel for user management',
            'Deposit/withdrawal system with manual review',
            'Professional transaction history',
            'Floating notifications for user activity',
            'RTL/LTR support (English/Arabic)'
        ],
        techStack: 'Node.js • Firebase • Telegraf • CoinGecko API • TON Connect',
        videoPlaceholder: true
    },
    troll: {
        title: 'Troll Army',
        description: 'Mystery missions platform with referral rewards, premium unlock, and instant withdrawals. Engaged over 15,000 users with unique gamification.',
        features: [
            '4 mystery missions to unlock withdrawals',
            'Premium membership with TON payment',
            'Referral system with 500 TROLL per referral',
            'Milestone rewards up to 100,000 TROLL',
            'TON wallet integration',
            'Admin panel with user management',
            'Broadcast system for announcements',
            'Complete transaction history',
            'Solana wallet connection',
            'Dark/light theme support'
        ],
        techStack: 'Node.js • Firebase • Telegraf • TON Connect • Solana Web3',
        videoPlaceholder: true
    },
    axion: {
        title: 'Axion AI',
        description: 'Advanced referral bot with channel verification, milestone rewards, and comprehensive admin panel. Built for high-volume user engagement.',
        features: [
            'Channel verification system (4 channels)',
            'Referral tracking with click counts',
            'Welcome bonus (100 AXC)',
            'Referral bonus (100 AXC per verified user)',
            'Withdrawal system with auto-approval',
            'Swap station (AXC ↔ USDT)',
            'Admin panel with user search and balance management',
            'Milestone rewards up to 50 USDT',
            'Real-time notifications',
            'User cache system for performance'
        ],
        techStack: 'Node.js • Firebase • Telegraf • Express',
        videoPlaceholder: true
    },
    mwh: {
        title: 'VIP Mining (MWH)',
        description: 'Staking platform with lock bonuses, card purchases, airdrop distribution, and complete wallet management. Premium features for VIP users.',
        features: [
            'Staking system with 4 plans (Fast, Medium, Gold, VIP)',
            'MWH Pay Card with locked bonus (30 days)',
            'Airdrop distribution system (500M total)',
            'Complete wallet management (MWH, USDT, BNB)',
            'Deposit/withdrawal with manual review',
            'Swap system (MWH ↔ USDT ↔ BNB)',
            'Referral challenges with BNB rewards',
            'Admin panel with user balance management',
            'Daily ad watching limit (50 ads/day)',
            'Floating notifications for activity'
        ],
        techStack: 'Node.js • Firebase • Telegraf • Express',
        videoPlaceholder: true
    },
    casino: {
        title: 'TON Mining Casino',
        description: 'Casino platform with wheel of fortune, slot machines, mining system, and progressive jackpots. Complete gambling experience on Telegram.',
        features: [
            'Lucky Wheel with 16 segments and 3D animation',
            'Slot machine with 7 symbols and turbo mode',
            'Mining system with 6 machines',
            'Progressive jackpot system',
            'Staking system with 4 pools',
            'Heat meter (more losses = bigger wins)',
            'Auto-spin functionality',
            'Spin packs purchase via TON',
            'Leaderboard system',
            'Complete admin panel'
        ],
        techStack: 'Node.js • Firebase • Telegraf • TON Connect • Canvas API',
        videoPlaceholder: true
    },
    alien: {
        title: 'Alien Musk Quantum',
        description: 'Quantum mining platform with AI integration, advanced staking, VIP tasks, and complete swap system. Next-generation earning platform.',
        features: [
            '5 mining levels (Beginner → Mythic)',
            '4 staking plans (Silver, Gold, Diamond)',
            'AI-powered task system',
            'VIP tasks with large rewards',
            'Swap system (USDT/BNB/TON ↔ AMSK)',
            'Referral milestones with BNB rewards',
            'Complete deposit/withdrawal system',
            'Live crypto prices',
            'Admin panel with user management',
            'Multi-language support'
        ],
        techStack: 'Node.js • Firebase • Telegraf • AI APIs • CoinGecko',
        videoPlaceholder: true
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    const featuresContainer = document.getElementById('modalFeatures');
    
    const project = projectData[projectId];
    if (!project) return;
    
    // Set title
    title.textContent = project.title;
    
    // Set description
    description.innerHTML = `<p>${project.description}</p><p style="margin-top: 12px;"><strong>Tech Stack:</strong> ${project.techStack}</p>`;
    
    // Build features list
    let featuresHtml = '<h4>📋 Key Features</h4><ul>';
    project.features.forEach(feature => {
        featuresHtml += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
    });
    featuresHtml += '</ul>';
    featuresContainer.innerHTML = featuresHtml;
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// ============================================
// 6. CONTACT FORM HANDLING
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            const message = document.getElementById('contactMessage')?.value;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Simple validation
            if (!name || !email || !message) {
                showToast('⚠️ Please fill in all fields', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('⚠️ Please enter a valid email address', 'warning');
                return;
            }
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Prepare email content
            const subject = `Portfolio Contact: ${name}`;
            const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
            
            // Open email client with pre-filled data
            window.location.href = `mailto:contact@alicodefactory.space?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Reset form and button
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast('✅ Email client opened! Thank you for reaching out.', 'success');
            }, 1000);
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// 7. TOAST NOTIFICATION SYSTEM
// ============================================

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--bg-card);
        border-radius: var(--radius-lg);
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        border: 1px solid var(--border);
        box-shadow: var(--shadow-lg);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-size: 0.9rem;
    }
    
    .toast-notification.show {
        transform: translateX(0);
    }
    
    .toast-notification.success {
        border-left: 3px solid var(--success);
    }
    
    .toast-notification.success i {
        color: var(--success);
    }
    
    .toast-notification.warning {
        border-left: 3px solid var(--warning);
    }
    
    .toast-notification.warning i {
        color: var(--warning);
    }
    
    .toast-notification.error {
        border-left: 3px solid var(--danger);
    }
    
    .toast-notification.error i {
        color: var(--danger);
    }
    
    @media (max-width: 768px) {
        .toast-notification {
            bottom: 80px;
            right: 16px;
            left: 16px;
            transform: translateY(100px);
        }
        
        .toast-notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(toastStyles);

// ============================================
// 8. NAVBAR SCROLL EFFECT
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(15,23,42,0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15,23,42,0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// 9. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 10. PARALLAX EFFECT ON HERO
// ============================================

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ============================================
// 11. INTERSECTION OBSERVER FOR STATS
// ============================================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateNumber(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 40);
}

// ============================================
// 12. ADD CSS VARIABLES FOR TOAST
// ============================================

// Ensure CSS variables are available
if (!document.querySelector(':root')) {
    const root = document.documentElement;
    root.style.setProperty('--bg-card', '#1E293B');
    root.style.setProperty('--border', 'rgba(59,130,246,0.2)');
    root.style.setProperty('--shadow-lg', '0 20px 25px -5px rgba(0,0,0,0.1)');
    root.style.setProperty('--success', '#10B981');
    root.style.setProperty('--warning', '#F97316');
    root.style.setProperty('--danger', '#EF4444');
}

// ============================================
// 13. PRELOADER (Optional - remove if not needed)
// ============================================

window.addEventListener('load', function() {
    // Simple fade-in effect for the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// 14. COPYRIGHT YEAR AUTO-UPDATE
// ============================================

const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${year} Ali Code Factory. All rights reserved.`;
}

// ============================================
// 15. PROJECT CARD HOVER EFFECT
// ============================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// 16. SERVICE CARD HOVER EFFECT
// ============================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// ============================================
// 17. TYPEWRITER EFFECT FOR HERO (Optional)
// ============================================

function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.getAttribute('data-typewriter') === 'true') {
        const originalText = heroTitle.innerText;
        heroTitle.innerText = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.innerText += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }
}

// Uncomment to enable typewriter effect
// initTypewriter();

// ============================================
// 18. CONSOLE LOG (Professional greeting)
// ============================================

console.log('%c🚀 Ali Code Factory - Professional Portfolio', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
console.log('%cTurning ideas into reality, one project at a time.', 'color: #8B5CF6; font-size: 12px;');
console.log('%cContact: contact@alicodefactory.space | Telegram: @George_TN', 'color: #64748B; font-size: 11px;');

// ============================================
// END OF MAIN.JS
// ============================================
