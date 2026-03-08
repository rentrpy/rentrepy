// js/modules/virtualPages.js

export function initVirtualPages() {
    const virtualLinks = document.querySelectorAll('.see-more-link');
    const virtualPages = document.querySelectorAll('.virtual-page');
    const virtualCloses = document.querySelectorAll('.virtual-close');
    const siteWrapper = document.querySelector('.site-wrapper');

    // State trackers
    let savedScrollPos = 0;
    let marqueeTimer;


    // IMAGE LAZY LOADER (WITH SKELETON KILL-SWITCH)

    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.hasAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');

                    // Wait for the image to physically finish downloading
                    img.onload = () => {
                        // Find the parent bento box and apply the kill switch class
                        const parentBox = img.closest('.bento-item');
                        if (parentBox) {
                            parentBox.classList.add('is-loaded');
                        }
                    };

                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: "400px 0px"
    });


    // OPEN VIRTUAL PAGE LOGIC

    virtualLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                e.preventDefault();

                if (typeof window.lenis !== 'undefined') window.lenis.stop();

                // Save where we are and lock the main site
                savedScrollPos = window.scrollY;
                if (siteWrapper) {
                    siteWrapper.style.position = 'fixed';
                    siteWrapper.style.top = `-${savedScrollPos}px`;
                    siteWrapper.style.width = '100%';
                }

                targetPage.style.display = 'block';
                targetPage.classList.add('is-active');

                // Force browser recalculation
                document.body.offsetHeight;
                window.scrollTo(0, 0);

                // Defer Lenis so the browser can paint the 'display: block' layout first
                setTimeout(() => {
                    if (typeof window.lenis !== 'undefined') {
                        window.lenis.resize();
                        window.lenis.scrollTo(0, { immediate: true });
                        window.lenis.start();
                    }
                }, 150); // <--- 150ms timeout

                // Pass images to the Observer
                const lazyImages = targetPage.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    lazyImageObserver.observe(img);
                });

                // Pause background marquees 500ms after opening
                clearTimeout(marqueeTimer);
                marqueeTimer = setTimeout(() => {
                    document.body.classList.add('pause-marquees');
                }, 500);

                // Push to browser history
                history.pushState({ page: targetId }, '', `#${targetId}`);
            }
        });
    });

    // 3. CLOSE VIRTUAL PAGE LOGIC

    const closeVirtualPage = () => {
        virtualPages.forEach(page => page.classList.remove('is-active'));

        // Resume marquees instantly when closing
        clearTimeout(marqueeTimer);
        document.body.classList.remove('pause-marquees');

        // Stop Lenis instantly so the scroll is frozen while fading out
        if (typeof window.lenis !== 'undefined') window.lenis.stop();

        // Wait for the 0.7s CSS fade-out transition before restoring the background
        setTimeout(() => {
            virtualPages.forEach(page => page.style.display = 'none');

            if (siteWrapper) {
                siteWrapper.style.position = '';
                siteWrapper.style.top = '';
                siteWrapper.style.width = '';
            }

            // CRITICAL: Force the browser to recalculate the main site's height synchronously. 
            document.body.offsetHeight;

            // Force the native window back to the exact pixel instantly
            window.scrollTo(0, savedScrollPos);

            // Force Lenis to the exact pixel and wake it up
            if (typeof window.lenis !== 'undefined') {
                window.lenis.scrollTo(savedScrollPos, { immediate: true });
                window.lenis.start();
            }
        }, 400);
    };

    virtualCloses.forEach(btn => {
        btn.addEventListener('click', () => {
            closeVirtualPage();
            history.pushState('', document.title, window.location.pathname);
        });
    });

    // 4. BROWSER BACK/FORWARD BUTTON LOGIC
    window.addEventListener('popstate', (e) => {
        const lightbox = document.getElementById('lightbox');
        let wasLightboxOpen = false;

        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            const lightboxVideo = document.getElementById('lightbox-video');
            if (lightboxVideo) lightboxVideo.src = ''; // Ensure video stops playing
            wasLightboxOpen = true;
        }

        // Prevent virtual pages from re-rendering if we are just closing the lightbox natively
        if (e.state && e.state.lightbox) return;
        if (wasLightboxOpen) return;

        if (e.state && e.state.page) {
            // User went 'forward' into a virtual page
            const targetPage = document.getElementById(e.state.page);
            if (targetPage && !targetPage.classList.contains('is-active')) {
                if (typeof window.lenis !== 'undefined') window.lenis.stop();

                savedScrollPos = window.scrollY;

                if (siteWrapper) {
                    siteWrapper.style.position = 'fixed';
                    siteWrapper.style.top = `-${savedScrollPos}px`;
                    siteWrapper.style.width = '100%';
                }

                targetPage.style.display = 'block';
                targetPage.classList.add('is-active');
                document.body.offsetHeight;
                window.scrollTo(0, 0);

                // Defer Lenis initialization here as well
                setTimeout(() => {
                    if (typeof window.lenis !== 'undefined') {
                        window.lenis.resize();
                        window.lenis.scrollTo(0, { immediate: true });
                        window.lenis.start();
                    }
                }, 150);

                clearTimeout(marqueeTimer);
                marqueeTimer = setTimeout(() => {
                    document.body.classList.add('pause-marquees');
                }, 500);
            }

        } else {
            // User went 'back' to the main site
            // ONLY execute virtual page closing logic if a virtual page is actually active
            const isAnyVirtualPageActive = Array.from(virtualPages).some(page => page.classList.contains('is-active'));
            if (!isAnyVirtualPageActive) return;

            virtualPages.forEach(page => page.classList.remove('is-active'));

            clearTimeout(marqueeTimer);
            document.body.classList.remove('pause-marquees');

            if (typeof window.lenis !== 'undefined') window.lenis.stop();

            setTimeout(() => {
                virtualPages.forEach(page => page.style.display = 'none');
                if (siteWrapper) {
                    siteWrapper.style.position = '';
                    siteWrapper.style.top = '';
                    siteWrapper.style.width = '';
                }

                document.body.offsetHeight;
                window.scrollTo(0, savedScrollPos);

                if (typeof window.lenis !== 'undefined') {
                    window.lenis.scrollTo(savedScrollPos, { immediate: true });
                    window.lenis.start();
                }
            }, 400);
        }
    });

    // 5. VIRTUAL PAGE DARK MODE TOGGLE
    const darkModeBtns = document.querySelectorAll('.virtual-dark-mode');
    darkModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentPage = btn.closest('.virtual-page');
            if (parentPage) {
                parentPage.classList.toggle('is-dark');
            }
        });
    });
}