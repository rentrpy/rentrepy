// js/modules/navigation.js

// Import the shared variables from the loader module
import { LOADER_LOGO_URL, LOADER_LOGO_FALLBACK } from './loader.js';

export function initNavigation() {

    // Set nav logo to match loader logo
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        navLogo.src = LOADER_LOGO_URL;
        navLogo.onerror = function () {
            this.onerror = null;
            this.src = LOADER_LOGO_FALLBACK;
        };
    }

    // NAVIGATION MENU LOGIC
    const burgerToggle = document.getElementById('burgerToggle');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const navItems = document.querySelectorAll('.nav-item, .scroll-indicator, a[href="browser:none"]');
    const landingSection = document.getElementById('home');

    // Enhanced toggle logic that controls Lenis safely
    const toggleMenu = () => {
        const isNowOpen = document.body.classList.toggle('menu-open');

        if (isNowOpen) {
            if (typeof window.lenis !== 'undefined') window.lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            if (typeof window.lenis !== 'undefined') window.lenis.start();
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        // Only execute if the menu is actually open to prevent spamming!
        if (document.body.classList.contains('menu-open')) {
            document.body.classList.remove('menu-open');
            if (typeof window.lenis !== 'undefined') window.lenis.start();
            document.body.style.overflow = '';
        }
    };

    if (burgerToggle && menuBackdrop) {
        burgerToggle.addEventListener('click', toggleMenu);
        menuBackdrop.addEventListener('click', closeMenu);
    }

    let popupTimeout;

    navItems.forEach(item => item.addEventListener('click', (e) => {
        const targetHref = item.getAttribute('href');

        if (targetHref === 'browser:none') {
            e.preventDefault();
            closeMenu();

            const popup = document.getElementById('browser-popup');
            const popupText = document.getElementById('browser-popup-text');

            if (popup && popupText) {
                // Instantly override text and show
                popupText.innerHTML = "Unavailable at the moment. Please try again later!";
                popup.style.display = 'block';

                // Allow the 'block' state to render before triggering the opacity transition
                setTimeout(() => {
                    popup.style.opacity = '1';
                }, 10);

                // Reset timer so it doesn't close prematurely if clicked back-to-back
                clearTimeout(popupTimeout);
                popupTimeout = setTimeout(() => {
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        popup.style.display = 'none';
                    }, 400); // Wait for the CSS transition to finish before hiding from layout
                }, 3000);
            }
            return;
        }

        if (targetHref && targetHref.startsWith('#')) {
            e.preventDefault();

            // 1. SMART MENU HANDLING
            const isDesktop = window.innerWidth > 992;
            if (targetHref === '#home' && isDesktop) {
                // Desktop Home Click: Unlock Lenis, but DO NOT close menu visually
                if (typeof window.lenis !== 'undefined') window.lenis.start();
                document.body.style.overflow = '';
            } else {
                // Mobile or other links: Close menu normally
                closeMenu();
            }

            // 2. EXECUTE SMOOTH SCROLL
            const target = document.querySelector(targetHref);
            if (target) {
                if (typeof window.lenis !== 'undefined') {
                    window.lenis.scrollTo(target, {
                        duration: 1.2
                    });
                } else {
                    // Safe native fallback if Lenis isn't loaded
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }));


    // SCROLL LOGIC
    const handleScroll = () => {
        // Ignore scroll events if the virtual page overlay is open
        if (document.querySelector('.virtual-page.is-active')) return;
        if (!landingSection) return;

        const triggerHeight = landingSection.offsetHeight * 0.7;
        if (window.scrollY > triggerHeight) {
            document.body.classList.add('is-scrolled');
        } else {
            document.body.classList.remove('is-scrolled');

            // Silently remove the active class on desktop without triggering fade animations
            if (window.innerWidth > 992) {
                document.body.classList.remove('menu-open');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Fire once on load


    // BACK TO TOP CLICK LOGIC
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            if (typeof window.lenis !== 'undefined') {
                window.lenis.scrollTo(0, {
                    immediate: false,
                    duration: 1.2,
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback
            }

            // Remove focus/active state
            backToTopBtn.blur();
        });
    }
}