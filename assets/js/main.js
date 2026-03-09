// js/main.js

// Import all modules
import { initLoader } from './modules/loader.js';
import { initParallax } from './modules/parallax.js';
import { initNavigation } from './modules/navigation.js';
import { initGallery } from './modules/gallery.js';
import { initAnimations } from './modules/animations.js';
import { initVirtualPages } from './modules/virtualpages.js';
import { initBentoFilter } from './modules/bentofilter.js';
import { initFooter } from './modules/footer.js';
import { initArchiveBuilder, initTimelineBuilder } from './modules/builder.js';
import { initSecurity } from './modules/security.js';

// Force scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // Lock scroll instantly on load
    window.isLoaderActive = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        if (typeof window.lenis !== 'undefined') window.lenis.stop();
    }, 100);

    // --- CREATE IMAGE PROMISE ---
    const heroImagePromise = new Promise(async (resolve) => {
        const root = document.documentElement;
        const rootStyles = getComputedStyle(root);
        const mainImgRaw = rootStyles.getPropertyValue('--main-img').trim();
        const urlMatch = mainImgRaw.match(/url\(['"]?(.*?)['"]?\)/);

        async function waitForPaint() {
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
        }

        async function loadAndPaint(url) {
            const img = new Image();
            img.src = url;
            await img.decode();
            await waitForPaint(); // Ensures browser painted it
        }

        if (urlMatch && urlMatch[1]) {
            try {
                await loadAndPaint(urlMatch[1]); // Try the main image
                resolve();
            } catch {
                const fallbackRaw = rootStyles.getPropertyValue('--main-img-fallback').trim();
                const fallbackMatch = fallbackRaw.match(/url\(['"]?(.*?)['"]?\)/); // Main image failed, prep the fallback

                if (fallbackMatch && fallbackMatch[1]) {
                    root.style.setProperty('--main-img', fallbackRaw);
                    try {
                        // Try the fallback image safely!
                        await loadAndPaint(fallbackMatch[1]);
                        resolve(); // Fallback success!
                    } catch {
                        // Even the fallback failed  
                        // Resolve anyway
                        resolve();
                    }
                } else {
                    resolve(); // No valid fallback found
                }
            }
        } else {
            resolve(); // No image in CSS
        }
    });

    // Initialize all site features
    initLoader();
    initParallax();
    initNavigation();
    initGallery();
    initAnimations();
    initVirtualPages();
    initTimelineBuilder();
    initArchiveBuilder();
    initBentoFilter();
    initFooter();
    initSecurity();
});
