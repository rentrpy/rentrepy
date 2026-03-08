// js/modules/footer.js

// Import the shared variables from the loader module
import { LOADER_LOGO_URL, LOADER_LOGO_FALLBACK } from './loader.js';

export function initFooter() {

    // Set footer logo to match loader logo
    const footLogo = document.getElementById('bottom-logo');
    if (footLogo) {
        footLogo.src = LOADER_LOGO_URL;
        footLogo.onerror = function () {
            this.onerror = null;
            this.src = LOADER_LOGO_FALLBACK;
        };
    }

    // Dynamic Year (handles multiple instances if they share the class/ID)
    const yearElements = document.querySelectorAll('[id="copyright-year"], .copyright-year');
    if (yearElements.length > 0) {
        const MIN_YEAR = 2026; // < set minimum year
        const currentYear = new Date().getFullYear();
        const yearText = `© ${Math.max(currentYear, MIN_YEAR)} Rentrepy`;
        yearElements.forEach(el => el.textContent = yearText);
    }

    // Easter Egg Logic
    const footerLogo = document.getElementById('bottom-logo');
    const theme = {
        '--bg-color': '#ff6d7b',
        '--nav-bg': '#2f2c6a',
        '--hl-color': '#2dd4bf',
        '--social-color': '#2dd4bf',
        '--contact-bg': '#1e1b4b',
        '--footer-bg': '#1e1b4b'
    };

    if (footerLogo) {
        footerLogo.style.cursor = 'default';
        // Initially set to none until it scrolls into view
        footerLogo.style.pointerEvents = 'none';

        let clickCount = 0;
        let clickTimer;

        // Create an observer to only enable clicks when the footer is actually visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                footerLogo.style.pointerEvents = 'auto';
            } else {
                footerLogo.style.pointerEvents = 'none';
                clickCount = 0; // Reset count if they scroll away
            }
        }, { threshold: 0.5 });

        observer.observe(footerLogo);

        footerLogo.addEventListener('click', function handleEasterEggClick() {
            // Additional safety check: ensure the user has scrolled down to the bottom
            if ((window.innerHeight + Math.round(window.scrollY)) < document.documentElement.scrollHeight - 150) {
                return;
            }

            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount >= 10) {
                // Swap the background color
                Object.entries(theme).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value);
                });

                // Swap the hero image
                document.documentElement.style.setProperty('--main-img', "url('https://res.cloudinary.com/dcmvh3uii/image/upload/web-bonus_ny5bxv.webp')");

                // Smooth scroll back to the top
                if (typeof window.lenis !== 'undefined') {
                    window.lenis.scrollTo(0, { duration: 1.5 });
                }

                // Remove the listener and stop observing
                footerLogo.removeEventListener('click', handleEasterEggClick);
                observer.disconnect();
                // Restore the pointer-events to 'none' to make it completely unclickable again
                footerLogo.style.pointerEvents = 'none';
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
            }
        });
    }
}