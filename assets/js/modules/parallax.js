// js/modules/parallax.js

export function initParallax() {

    // SMOOTH PARALLAX LOGIC (LERP)
    const layers = document.querySelectorAll('.parallax-layer');
    if (layers.length === 0) return;

    // Pre-calculate and cache the speed for each layer so we don't recalculate 60 times a second
    const cachedLayers = Array.from(layers).map(layer => ({
        el: layer,
        speed: parseFloat(layer.getAttribute('data-speed')) || 0
    }));

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let parallaxRAF = null;

    document.addEventListener('mousemove', (e) => {
        // Ignore mouse tracking while loader is covering the screen
        if (window.isLoaderActive) return;

        targetX = e.clientX - window.innerWidth / 2;
        targetY = e.clientY - window.innerHeight / 2;
    });

    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function animateParallax() {
        // Double check: Don't run the math loop if loader is up
        if (window.isLoaderActive) {
            parallaxRAF = requestAnimationFrame(animateParallax);
            return;
        }

        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;

        // Optimization: Only run DOM updates if there is an actual visual difference left to lerp
        if (Math.abs(deltaX) > 0.05 || Math.abs(deltaY) > 0.05) {
            currentX += deltaX * 0.05;
            currentY += deltaY * 0.05;

            cachedLayers.forEach(layer => {
                const xOffset = (currentX * layer.speed) * -1;
                const yOffset = (currentY * layer.speed) * -1;
                layer.el.style.setProperty('--tx', `${xOffset.toFixed(2)}px`);
                layer.el.style.setProperty('--ty', `${yOffset.toFixed(2)}px`);
            });
        }

        parallaxRAF = requestAnimationFrame(animateParallax);
    }

    // Instead of polling, we just wait for the loader to tell us it's done!
    window.addEventListener('loaderFinished', () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 600px)").matches && !parallaxRAF) {
            animateParallax();
        }
    });

    // Handle Window Resizing
    const desktopMedia = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 600px)");

    desktopMedia.addEventListener('change', (media) => {
        if (media.matches) {
            if (!window.isLoaderActive && !parallaxRAF) {
                animateParallax();
            }
        } else {
            if (parallaxRAF) {
                cancelAnimationFrame(parallaxRAF);
                parallaxRAF = null;
                layers.forEach(layer => {
                    layer.style.setProperty('--tx', '0px');
                    layer.style.setProperty('--ty', '0px');
                });
            }
        }
    });
}