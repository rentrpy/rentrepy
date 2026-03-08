// js/modules/gallery.js

export function initGallery() {

    // GALLERY INFINITE SLIDER LOGIC
    const sliderContainer = document.getElementById('gallerySlider');
    const sliderTrack = document.getElementById('galleryTrack');
    const nextBtn = document.getElementById('sliderNextBtn');

    if (sliderTrack && sliderContainer) {
        const originalItems = Array.from(sliderTrack.children);

        // Clone the whole array of items 4 extra times (Total 5 complete sets)
        for (let i = 0; i < 4; i++) {
            originalItems.forEach(item => {
                sliderTrack.appendChild(item.cloneNode(true));
            });
        }

        let slideCurrentX = 0;
        let baseSpeed = 1;      // Normal auto-scroll speed  
        let targetSpeed = 1;    // The speed it wants to reach
        let currentSpeed = 1;   // The actual speed applied right now
        let isHovered = false;
        let isDragging = false;
        let isClickAnimating = false;

        // Trackers for swipe physics
        let lastMouseX = 0;
        let dragVelocity = 0;
        let lastMoveTime = 0;
        let animationId;

        // Cache the layout geometry so we do NOT read from the DOM 60 times a second
        let cachedSetWidth = 0;
        let cachedJumpDistance = 0;

        function updateLayoutMeasurements() {
            if (originalItems.length === 0) return;
            const itemWidth = originalItems[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(sliderTrack).gap) || 0;
            cachedJumpDistance = itemWidth + gap;
            cachedSetWidth = cachedJumpDistance * originalItems.length;
        }

        // Calculate once instantly, and recalculate whenever the browser size actually changes
        updateLayoutMeasurements();
        window.addEventListener('resize', updateLayoutMeasurements);

        function sliderLoop() {
            animationId = requestAnimationFrame(sliderLoop);

            // Freeze the math and DOM updates if a virtual page is open
            if (document.body.classList.contains('pause-marquees')) return;

            if (!isDragging && !isClickAnimating) {
                currentSpeed += (targetSpeed - currentSpeed) * 0.05;
                slideCurrentX -= currentSpeed;
            }

            // Mathematically loop the gallery seamlessly
            if (slideCurrentX <= -cachedSetWidth) {
                slideCurrentX += cachedSetWidth;
            } else if (slideCurrentX > 0) {
                slideCurrentX -= cachedSetWidth;
            }

            if (!isClickAnimating) {
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
            }
        }

        // Kick off the loop
        animationId = requestAnimationFrame(sliderLoop);

        // --- HOVER PAUSE LOGIC ---
        sliderContainer.addEventListener('mouseenter', () => {
            isHovered = true;
            targetSpeed = 0;
        });

        sliderContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            if (!isDragging) targetSpeed = baseSpeed;
        });

        // --- TOUCH & DRAG CONTROLS ---
        function handleDragStart(e) {
            isDragging = true;
            currentSpeed = 0;
            targetSpeed = 0;
            lastMouseX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            dragVelocity = 0;
            sliderTrack.style.transition = 'none';
            sliderContainer.style.cursor = 'grabbing';
        }

        function handleDragMove(e) {
            if (!isDragging) return;
            const currentMouseX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            dragVelocity = currentMouseX - lastMouseX;
            lastMouseX = currentMouseX;
            lastMoveTime = Date.now();
            slideCurrentX += dragVelocity;
        }

        function handleDragEnd() {
            isDragging = false;
            sliderContainer.style.cursor = 'grab';
            targetSpeed = isHovered ? 0 : baseSpeed;

            if (Date.now() - lastMoveTime > 100) {
                dragVelocity = 0;
            }

            const maxFlickSpeed = 25;
            currentSpeed = Math.min(Math.max(-dragVelocity, -maxFlickSpeed), maxFlickSpeed);
        }

        sliderContainer.addEventListener('mousedown', handleDragStart);
        sliderContainer.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);

        sliderContainer.addEventListener('touchstart', handleDragStart, { passive: true });
        sliderContainer.addEventListener('touchmove', handleDragMove, { passive: true });
        sliderContainer.addEventListener('touchend', handleDragEnd);

        // --- NEXT BUTTON CONTROLS ---
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (isClickAnimating) return;

                // Recalculate just in case fonts/images loaded slowly after resize
                updateLayoutMeasurements();

                isClickAnimating = true;

                sliderTrack.style.transition = 'transform 0.4s ease-out';
                slideCurrentX -= cachedJumpDistance;
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;

                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    if (slideCurrentX <= -cachedSetWidth) {
                        slideCurrentX += cachedSetWidth;
                        sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
                    }
                    isClickAnimating = false;
                }, 400);
            });
        }
    }

    // LIGHTBOX MODAL LOGIC (Gallery + Bento)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxVideo = document.getElementById('lightbox-video');

    if (lightbox && lightboxImg && lightboxVideo) {
        const openLightbox = (imgSrc, videoId = null) => {
            if (videoId) {
                // Video Mode
                lightboxVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                lightboxVideo.style.display = 'block';
                lightboxImg.style.display = 'none';
            } else {
                // Image Mode
                lightboxVideo.src = '';
                lightboxVideo.style.display = 'none';
                lightboxImg.src = imgSrc;
                lightboxImg.style.display = 'block';
            }

            lightbox.classList.add('active');
            history.pushState({ lightbox: true }, '', window.location.hash);
        };

        const closeLightbox = () => {
            if (!lightbox.classList.contains('active')) return;
            lightbox.classList.remove('active');
            // Stop video playing by clearing the iframe source when closed
            lightboxVideo.src = '';

            if (history.state && history.state.lightbox) {
                history.back();
            }
        };

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                // Because the image has pointer-events: none, clicks physically hit the lightbox background.
                // We mathematically check if the click coordinates fell within the image's visible bounds.
                if (lightboxImg.style.display === 'block') {
                    const rect = lightboxImg.getBoundingClientRect();
                    const isInsideImg =
                        e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top && e.clientY <= rect.bottom;

                    if (isInsideImg) return; // Ignore clicks inside the image
                }

                closeLightbox();
            }
        });

        // A. Attach to Infinite Gallery
        if (sliderTrack) {
            sliderTrack.addEventListener('click', (e) => {
                const clickedItem = e.target.closest('.slider-item');
                if (clickedItem) {
                    const img = clickedItem.querySelector('img');
                    const isAnimation = clickedItem.getAttribute('data-class') === 'animation';
                    const videoId = clickedItem.getAttribute('data-video-id');

                    if (img) {
                        openLightbox(img.src, isAnimation ? videoId : null);
                    }
                }
            });
        }

        // B. Attach to Bento Grid Items
        const bentoGridContainer = document.querySelector('.bento-timeline');
        if (bentoGridContainer) {
            bentoGridContainer.addEventListener('click', (e) => {
                const clickedItem = e.target.closest('.bento-item');
                if (clickedItem) {
                    const img = clickedItem.querySelector('img');
                    // In bento, classes are stored in data-tags. We'll support both for flexibility.
                    const tags = clickedItem.getAttribute('data-tags') || '';
                    const dataClass = clickedItem.getAttribute('data-class') || '';
                    const isAnimation = dataClass === 'animation' || tags.includes('animation');
                    const videoId = clickedItem.getAttribute('data-video-id');

                    if (img) {
                        openLightbox(img.src, isAnimation ? videoId : null);
                    }
                }
            });
        }
    }
}