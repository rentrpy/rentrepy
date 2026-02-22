// Force the browser to start exactly at the top of the page on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ==========================================
// LOADER CUSTOMIZATION SETTINGS
// ==========================================
const LOADER_BG_COLOR = "#000000"; // Background color (Black)
const LOADER_BAR_COLOR = "#FFD700"; // Loading bar and fill color (Yellow)
const LOADER_LOGO_URL = "./images/logo.png"; // Replace with logo URL
const LOADER_LOGO_FALLBACK = "https://file.garden/ZzX5gcUBcGLpZuFr/logotest.png"; // If logo fails to load
const BAR_INITIAL_HEIGHT = "8px"; // Height of the loading bar at the bottom

// TIMINGS (1000 = 1 second)
const TIME_TO_LOAD = 2500; // How long it takes the bar to fill left-to-right
const TIME_TO_JUMP = 500; // Duration of the logo jump
const TIME_TO_EXPAND = 700; // Duration of the yellow bar expanding upwards
const TIME_TO_FADEOUT = 800; // Duration of the final fade out to reveal the site

function createLoadingSequence() {
    // 1. Create the main overlay background
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.backgroundColor = LOADER_BG_COLOR;
    overlay.style.zIndex = "99999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.transition = `opacity ${TIME_TO_FADEOUT}ms ease-out`;

    // 2. Create the logo container
    const logoContainer = document.createElement("div");
    logoContainer.style.opacity = "0"; // Start invisible for fade-in
    logoContainer.style.animation = "fadeInLogo 1.5s forwards ease-in-out";
    logoContainer.style.zIndex = "2"; // Keep above the expanding bar initially

    // Use URL for logo instead of looking for existing element
    const image = document.createElement("img");
    image.src = LOADER_LOGO_URL;
    image.alt = "Loading Logo";
    image.style.display = "block";
    image.style.maxWidth = "350px"; // Sensible default constraint
    image.onerror = function() {
        this.onerror = null;
        this.src = LOADER_LOGO_FALLBACK;
    };
    logoContainer.appendChild(image);
    
    overlay.appendChild(logoContainer);

    // 3. Create the actual colored bar directly on the overlay
    const loadingBar = document.createElement("div");
    loadingBar.style.position = "absolute";
    loadingBar.style.bottom = "0";
    loadingBar.style.left = "0";
    loadingBar.style.width = "0%";
    loadingBar.style.height = BAR_INITIAL_HEIGHT;
    loadingBar.style.backgroundColor = LOADER_BAR_COLOR;
    loadingBar.style.zIndex = "1"; // Behind the logo
    loadingBar.style.transition = `width ${TIME_TO_LOAD}ms linear`; // Width animation
    overlay.appendChild(loadingBar);

    // 4. Create the percentage text above the bar
    const percentageText = document.createElement("div");
    percentageText.style.position = "absolute";
    percentageText.style.bottom = `calc(${BAR_INITIAL_HEIGHT} + 8px)`; // Sits 8px above the bar
    percentageText.style.left = "0%";
    percentageText.style.transform = "translateX(0%)";
    percentageText.style.color = LOADER_BAR_COLOR; // Match the bar color
    percentageText.style.fontFamily = "sans-serif";
    percentageText.style.fontWeight = "bold";
    percentageText.style.fontSize = "16px";
    percentageText.style.zIndex = "2";
    // Transition left and transform to keep it exactly on the leading edge without overflowing the screen
    percentageText.style.transition = `left ${TIME_TO_LOAD}ms linear, transform ${TIME_TO_LOAD}ms linear, opacity 0.3s ease`;
    percentageText.innerText = "0%";
    overlay.appendChild(percentageText);

    // 5. Add custom CSS keyframes for animations
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeInLogo {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes jumpLogo {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-40px); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // ==========================================
    // ANIMATION SEQUENCE LOGIC
    // ==========================================

    // Start filling the loading bar slightly after DOM paints
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            loadingBar.style.width = "100%";
            
            // Move the percentage text along with the bar
            percentageText.style.left = "100%";
            // Shift its anchor to the right at the end so the text doesn't go off-screen
            percentageText.style.transform = "translateX(-100%)"; 

            // Animate the number counting from 0 to 100
            let startTimestamp = null;
            const updatePercentage = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / TIME_TO_LOAD, 1);
                percentageText.innerText = Math.floor(progress * 100) + "%";
                
                if (progress < 1) {
                    window.requestAnimationFrame(updatePercentage);
                }
            };
            window.requestAnimationFrame(updatePercentage);
        });
    });

    // After loading bar fills, make the logo jump
    setTimeout(() => {
        // Fade out the percentage text so it disappears smoothly before the screen expands
        percentageText.style.opacity = "0";

        // FIX: Lock in the opacity to 1 before overwriting the animation.
        logoContainer.style.opacity = "1";
        logoContainer.style.animation = `jumpLogo ${TIME_TO_JUMP}ms ease-in-out`;
        
        // As the jump finishes, expand the yellow bar to fill the screen
        setTimeout(() => {
            // Change transition property to animate height instead of width
            loadingBar.style.transition = `height ${TIME_TO_EXPAND}ms cubic-bezier(0.65, 0, 0.35, 1)`;
            loadingBar.style.height = "100%";

            // Optional: Hide the logo as the yellow fills the screen
            logoContainer.style.transition = `opacity ${TIME_TO_EXPAND / 2}ms ease`;
            logoContainer.style.opacity = "0";

            // After expansion is done, fade out the whole overlay
            setTimeout(() => {
                overlay.style.opacity = "0";
                
                // Remove from DOM completely after fade out
                setTimeout(() => {
                    overlay.remove();
                }, TIME_TO_FADEOUT);

            }, TIME_TO_EXPAND);

        }, TIME_TO_JUMP); // Wait for the jump to complete before expanding

    }, TIME_TO_LOAD); // Wait for the bar to fill before jumping
}


// ==========================================
// MAIN SITE LOGIC (Parallax, Menu, Scroll)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Fallback for main background image - Checks if primary fetch fails
    const rootStyles = getComputedStyle(document.documentElement);
    const mainImgRaw = rootStyles.getPropertyValue('--main-img').trim();
    const urlMatch = mainImgRaw.match(/url\(['"]?(.*?)['"]?\)/);
    
    if (urlMatch && urlMatch[1]) {
        const testImg = new Image();
        testImg.onerror = () => {
            const fallbackRaw = rootStyles.getPropertyValue('--main-img-fallback').trim();
            document.documentElement.style.setProperty('--main-img', fallbackRaw);
        };
        testImg.src = urlMatch[1]; // Attempt to load the primary URL
    }

    // 0.5 SET NAV LOGO TO MATCH LOADER LOGO
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        navLogo.src = LOADER_LOGO_URL;
        navLogo.onerror = function() {
            this.onerror = null;
            this.src = LOADER_LOGO_FALLBACK;
        };
    }

    // 1. RUN THE LOADER IMMEDIATELY
    createLoadingSequence();

    // 2. SMOOTH PARALLAX LOGIC (LERP)
    const layers = document.querySelectorAll('.parallax-layer');
    
    // Target coordinates (where the mouse is)
    let targetX = 0;
    let targetY = 0;
    
    // Current coordinates (where the elements are drawn)
    let currentX = 0;
    let currentY = 0;

    // Listen to the whole document so parallax works even over the nav bar
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX - window.innerWidth / 2;
        targetY = e.clientY - window.innerHeight / 2;
    });

    // Gently return to center when mouse leaves the browser
    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // The animation loop
    function animateParallax() {
        // Lerp math: glide 5% of the distance to the target every frame
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xOffset = (currentX * speed) * -1;
            const yOffset = (currentY * speed) * -1;
            layer.style.setProperty('--tx', `${xOffset}px`);
            layer.style.setProperty('--ty', `${yOffset}px`);
        });

        // Loop smoothly on the monitor's refresh rate
        requestAnimationFrame(animateParallax);
    }
    
    // Start the loop
    animateParallax();

    // 3. NAVIGATION MENU LOGIC
    const burgerToggle = document.getElementById('burgerToggle');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const navItems = document.querySelectorAll('.nav-item');
    const landingSection = document.getElementById('home');

    const toggleMenu = () => document.body.classList.toggle('menu-open');
    const closeMenu = () => document.body.classList.remove('menu-open');

    if (burgerToggle && menuBackdrop) {
        burgerToggle.addEventListener('click', toggleMenu);
        menuBackdrop.addEventListener('click', closeMenu);
    }
    
    navItems.forEach(item => item.addEventListener('click', (e) => {
        const targetHref = item.getAttribute('href');
        // Let the scroll listener handle visibility cleanly if clicking Home on desktop
        if (targetHref === '#home' && window.innerWidth > 992) {
            return; 
        } else {
            closeMenu();
        }
    }));

    // 4. SCROLL LOGIC
    const handleScroll = () => {
        if (!landingSection) return;
        
        const triggerHeight = landingSection.offsetHeight * 0.7; 
        if (window.scrollY > triggerHeight) {
            document.body.classList.add('is-scrolled');
        } else {
            document.body.classList.remove('is-scrolled');
            if(window.innerWidth > 992) closeMenu();
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    // 5. GALLERY INFINITE SLIDER LOGIC (CUSTOM JS DRIVEN)
    const sliderContainer = document.getElementById('gallerySlider');
    const sliderTrack = document.getElementById('galleryTrack');
    const nextBtn = document.getElementById('sliderNextBtn');
    
    if (sliderTrack && sliderContainer) {
        const originalItems = Array.from(sliderTrack.children);
        
        // Clone the whole array of items 4 extra times (Total 5 complete sets)
        // This makes it virtually impossible to out-click the buffer
        for (let i = 0; i < 4; i++) {
            originalItems.forEach(item => {
                sliderTrack.appendChild(item.cloneNode(true));
            });
        }

        let slideCurrentX = 0;
        let autoScrollSpeed = 1; 
        let isHovered = false;
        let isDragging = false;
        let startX = 0;
        let prevX = 0;
        let animationId;
        
        // Helper to grab the exact pixel width of one original set of images (including gap)
        function getSetWidth() {
            const itemWidth = originalItems[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(sliderTrack).gap) || 0;
            return (itemWidth + gap) * originalItems.length;
        }

        function sliderLoop() {
            // Naturally move forward if we aren't hovering or touching
            if (!isDragging && !isHovered) {
                slideCurrentX -= autoScrollSpeed;
            }
            
            const setWidth = getSetWidth();
            
            // Mathematically loop the gallery perfectly under the hood without a visual seam
            if (slideCurrentX <= -setWidth) {
                slideCurrentX += setWidth; 
                // Only immediately apply transform if we aren't currently smooth-scrolling a click
                if (!isHovered) sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
            } else if (slideCurrentX > 0) {
                slideCurrentX -= setWidth;
                if (!isHovered) sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
            }
            
            if (!isHovered) {
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
            }
            
            animationId = requestAnimationFrame(sliderLoop);
        }
        
        // Kick off the loop
        animationId = requestAnimationFrame(sliderLoop);

        // Pause behavior
        sliderContainer.addEventListener('mouseenter', () => isHovered = true);
        sliderContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            isDragging = false; 
        });

        // 5a. Touch & Drag Controls (Calculates exact pixel offset to follow finger)
        function handleDragStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            prevX = slideCurrentX;
            sliderTrack.style.transition = 'none'; 
            sliderContainer.style.cursor = 'grabbing';
        }

        function handleDragMove(e) {
            if (!isDragging) return;
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const walk = x - startX;
            slideCurrentX = prevX + walk;
        }

        function handleDragEnd() {
            isDragging = false;
            sliderContainer.style.cursor = 'grab';
        }

        sliderContainer.addEventListener('mousedown', handleDragStart);
        sliderContainer.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);

        sliderContainer.addEventListener('touchstart', handleDragStart, {passive: true});
        sliderContainer.addEventListener('touchmove', handleDragMove, {passive: true});
        sliderContainer.addEventListener('touchend', handleDragEnd);

        // 5b. Next Button Controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const itemWidth = originalItems[0].offsetWidth;
                const gap = parseFloat(window.getComputedStyle(sliderTrack).gap) || 0;
                
                // Add CSS transition briefly just to animate the click snap
                sliderTrack.style.transition = 'transform 0.4s ease-out';
                slideCurrentX -= (itemWidth + gap);
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
                
                // Tell the loop to pause updating while the CSS transition plays
                isHovered = true;
                
                setTimeout(() => {
                    // Turn off transition to prevent glitching the auto scroll
                    sliderTrack.style.transition = 'none';
                    
                    // Safety check to ensure we smoothly reset position if the jump passed the loop threshold
                    const setWidth = getSetWidth();
                    if (slideCurrentX <= -setWidth) {
                        slideCurrentX += setWidth;
                        sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
                    }
                    isHovered = false; 
                }, 400); 
            });
        }
    }

    // 6. LIGHTBOX MODAL LOGIC
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (sliderTrack && lightbox) {
        // Using Event Delegation so cloned images also trigger the click
        sliderTrack.addEventListener('click', (e) => {
            const clickedItem = e.target.closest('.slider-item');
            if (clickedItem) {
                // Since the img has pointer-events: none, we query the src from inside the clicked slider-item div
                const img = clickedItem.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            }
        });

        const closeLightbox = () => lightbox.classList.remove('active');
        
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close if user clicks the background overlay (outside the image)
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // 7. ABOUT SCROLL MARQUEE LOGIC
    const aboutMarquee = document.getElementById('aboutMarquee');
    const profileSection = document.getElementById('profile');
    
    if (aboutMarquee && profileSection) {
        window.addEventListener('scroll', () => {
            const rect = profileSection.getBoundingClientRect();
            // Check if the section is partially visible in the viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Generate a translation value that grows as you scroll down
                const scrollProgress = window.innerHeight - rect.top;
                // Move text to the right by modifying the custom CSS variable
                aboutMarquee.style.setProperty('--scroll-offset', `${scrollProgress * 0.5}px`);
            }
        });
    }
});
