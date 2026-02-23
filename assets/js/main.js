// Force the browser to start exactly at the top of the page on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ==========================================
// LOADER CUSTOMIZATION SETTINGS
// ==========================================
const LOADER_BG_COLOR = "#12131f"; // Background color (Black)
const LOADER_BAR_COLOR = "#FFD700"; // Loading bar and fill color (Yellow)

// 1. Paste raw SVG code (including the <svg> and <path> tags)
const RAW_SVG_LOGO = `
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1001.25 211.87">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
        stroke: #fff;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <path class="cls-1" d="M519.57,10.7v8.25h9.84v13.33h42.22V13.24h-31.74V2.45h-20.32v8.25ZM584.33,7.05v3.97h61.9V3.08h-61.9v3.97ZM426.56,26.1v13.17h43.49V12.93h-43.49v13.17ZM2.45,118.64v90.79h544.42v-37.78h-13.75l.19-5.49c.13-2.98.32-12.95.41-22.13.19-14.6.13-16.95-.32-19.05-2-9.3-9.49-12.73-14.79-6.76-1.65,1.87-2.95,4.51-3.81,7.87-1.17,4.48-1.52,24.89-.76,41.52l.19,4.03h-30.95l.19-4.51c.76-18.73.95-38.13.57-53.97-.19-9.14-.48-18.67-.57-21.21l-.19-4.6,3.78.22c4.98.25,14,.25,18.54-.03,2-.13,3.68-.19,3.75-.16.03,0,.89,4.92,1.87,10.89l1.78,10.89.73-2.51c3.14-10.86,9.75-18.32,17.97-20.25,3.9-.92,10.25-.48,13.68.95.63.25,1.24.48,1.33.48s.16-4.44.16-9.84v-9.84h-118.72v-15.55h-54.6v-24.76H2.45v90.79ZM141.14,55.15c11.44,12.38,18.54,31.83,18.7,48.57,4.77-4.04,9.25-8.57,15.17-11.9,12.7-7.49,23.81-10.69,38.86-10.95.2,14.65-5.32,31.55-13.36,42.6-1.93,1.99.87,1.23,2.79,1.49,14.76.44,31.78,7.28,43.27,16.76,0,.03,4.87,4.26,4.67,3.74-.29.32,1.65,2.44,2.03,2.19.76-.18-.84,2.13-.83,2.51-13.84,16.93-35.13,28.45-57.01,28.44-3.99.49-3-.8-5.24-2.13-10.73-11.3-29.11-19.79-45.39-20.76-8.16-.53,15.25-2.23,18.13-4.41,13.65-4.24,29.13-15.61,36.13-26.41-21.46-.37-40.39,11.33-52.35,21.21,7.31-9.64,13.21-28.78,12.98-41.59-10.96,11.32-19.28,29.87-20.09,47.46-1.45-17.61-8.26-34.87-20.16-47.49-.39,15.55,6.49,31.43,12.95,42.47-2.78-2.25-7.73-7.41-11.94-9.36-1.69-2.51-16.68-8.88-21.65-10.09-2-.79-9.62-1.91-16.32-2.41-3.08-.22-3.08-.44-.22,3.08,13.98,15.89,28.07,23.83,49.97,26.54,9.72.62-9.97,1.72-11.78,2.86-15.41,4.1-25.93,11.28-36.03,21.08-19.36.21-37.18-8.82-49.87-19.52-1.61-2.97-3.23-2.8-5.14-5.9-3.63-4.43-4.35-4.3-2.67-6.89,12.49-10.98,29.02-20.51,47.78-21.21,11.5,2.47-11.27-17.63-9.62-44.25,20.55-.19,37.87,8.12,52.28,20.79-.22.18.66,1.39,1.24,1.21.56,1.82.79.94,1.14-4.32.95-8.99,1.3-11.24,4.48-20.22.93-3.99,14.35-29.62,17.11-23.17h0ZM336.09,62.48c7.68.57,12.54,1.52,17.81,3.43,10.51,3.84,17.17,11.97,19.84,24.16.83,3.71.83,14.32.03,18.73-.98,5.3-3.17,10.98-5.59,14.54-3.24,4.73-10.25,9.75-16.19,11.52l-1.27.38,1.33,2.41c.73,1.33,5.71,9.75,11.11,18.73,5.36,8.98,9.9,16.57,10.09,16.89.29.57-.25.6-17.33.6s-17.65-.03-17.84-.54c-.6-1.71-9.21-19.24-13.05-26.6l-4.44-8.57-9.24-.1-9.24-.06v35.87h-30.57l.19-6.13c.1-3.33.35-15.97.57-28.06.38-20.98.16-47.46-.57-71.81l-.19-6.16,30.28.22c16.67.13,32.06.35,34.25.54h0ZM438.3,86.48c17.02,2.73,29.36,14.38,32.57,30.7.67,3.49,1.08,9.9.86,13.27l-.19,2.79h-28.67c-15.78,0-28.7.13-28.7.25,0,.95,1.17,4.35,2.13,6.16,2.67,5.08,6.6,7.59,12.67,8.06,6.92.57,13.49-2.44,18.06-8.22l.95-1.21,6.83,3.46c3.75,1.87,8.92,4.35,11.52,5.43,2.57,1.11,4.67,2.06,4.67,2.16,0,.06-.48,1.17-1.05,2.41-3.9,8.41-11.46,15.05-20.95,18.32-6.22,2.16-13.24,3.02-21.97,2.76-6.35-.19-10.25-.76-14.76-2.19-5.87-1.87-9.71-4.16-13.84-8.32-5.75-5.75-9.33-12.98-11.14-22.51-.79-4.22-.79-17.27,0-21.33,1.81-9.17,5.17-16.09,10.57-21.75,6.03-6.32,14.44-9.87,25.36-10.76,4.38-.35,11.14-.13,15.08.51h0Z"/>
      <path class="cls-1" d="M302.12,100.54v8.57h11.52c17.59,0,24.54-.7,28.28-2.83,1.24-.7,1.81-1.3,2.51-2.6.83-1.52.89-1.97.76-3.84-.44-6.6-5.24-7.87-30.13-7.87h-12.95v8.57ZM425.86,109.91c-2.63.67-4.89,1.9-6.83,3.75-1.62,1.52-3.27,3.97-3.75,5.52l-.19.73h29.52l-.44-1.27c-1.17-3.3-4.29-6.76-7.4-8.19-1.56-.7-2.32-.83-5.46-.92-2.41-.06-4.25.06-5.46.38ZM483.38,44.67v13.02h25.71v-26.03h-25.71v13.02ZM588.14,73.72c-.79,3.87-2.54,7.33-5.14,10.19-2.76,2.98-5.78,4.57-9.68,5.08l-1.68.22v26.95l1.52-.19c1.17-.16,9.94-.83,10.95-.83.13,0,.22,7.24.16,16.09-.03,15.33-.03,16.32.63,19.87,2.76,14.95,9.78,21.81,23.36,22.73,5.27.35,14.13-.1,18.6-.92,2-.35,3.65-.7,3.68-.73s.13-5.43.16-12l.13-11.9-1.27.22c-2.16.41-6.48.32-8.51-.22-2.48-.63-4.29-1.71-5.52-3.24-3.24-4.03-4.1-9.17-3.71-22.38l.22-7.84h1.65c1.87,0,14.92.83,17.71,1.14l1.81.19v-27.05h-24.57l3.24-3.17c1.78-1.75,4.1-4.29,5.17-5.62,1.9-2.38,5.68-7.84,5.68-8.19,0-.1-7.71-.16-17.11-.16h-17.14l-.35,1.75ZM870.35,83.27c-5.11.54-8.7,1.65-12.54,3.87-4.79,2.79-8.51,7.27-11.14,13.52-1.11,2.63-1.4,3.05-1.56,2.38-.1-.41-.92-4.7-1.84-9.49l-1.68-8.73-12.32-.1-12.35-.06.19,1.14c.1.63.38,14.06.57,29.84.32,22.63.32,34.76,0,57.39-.19,15.78-.48,29.21-.57,29.84l-.19,1.14h28.98v-2.79c0-1.52-.22-11.49-.48-22.13-.29-10.67-.48-21.65-.41-24.44l.1-5.08.92,2.38c4.48,11.43,13.97,17.78,26.54,17.78s23.52-11.56,27.78-29.97c1.46-6.38,1.87-16.48.95-22.89-2.44-17.17-11.02-29.74-22.38-32.86-2.1-.6-6.54-.98-8.57-.76h0ZM872.09,96.6c-.81,20.92,8.43,27.54,21.14,32.82-18.36,1.06-27.07,6.69-33.2,22.54.6-20.18-7.29-28.4-21.97-33.65,19.42.6,28.21-9.43,34.03-21.71ZM911.36,90.92c7.97,21.87,16.48,46.66,20.86,60.73,3.52,11.33,5.75,19.17,5.49,19.36-2.44,1.71-3.33,2.25-4.63,2.83-5.43,2.38-13.59,2.7-21.24.86l-3.02-.73,1.11,3.21c1.56,4.67,3.36,12.03,5.33,21.94.95,4.79,1.75,8.82,1.75,8.95,0,.1,1.68.1,3.71-.03,7.84-.48,14.79-2.22,20.48-5.17,11.62-6,21.62-18.13,27.81-33.74,2.03-5.14,9.27-25.43,13.49-37.93,3.84-11.3,12.98-39.17,15.02-45.81l.41-1.33h-29.17l-.16.7c-.06.41-.63,3.02-1.27,5.81-1.37,6.29-3.94,16.09-8.06,30.7-1.75,6.16-3.62,12.89-4.19,14.95-.54,2.06-1.08,3.65-1.17,3.56s-.95-2.86-1.87-6.13c-6.54-22.95-10.6-38.06-12-44.82-.48-2.19-.89-4.16-.98-4.38-.1-.29-3.4-.38-15.14-.38h-15.05l2.51,6.89ZM754.8,86.41c-15.4,2.03-24.32,8.16-30.28,20.79-2.6,5.52-3.84,10.6-4.29,17.68-.92,13.43,2.22,25.49,8.83,34.06,5.78,7.49,14.03,11.81,25.52,13.33,3.65.48,13.27.38,17.43-.16,14.41-1.87,25.05-8.76,30.57-19.75.76-1.52,1.3-2.89,1.17-2.98-.13-.13-2-.98-4.19-1.9s-7.17-3.3-11.11-5.27l-7.14-3.59-.44.73c-.25.38-1.46,1.71-2.73,2.92-3.84,3.81-8.54,5.68-14.29,5.68-3.71,0-5.97-.48-8.51-1.81-3.78-1.97-7.17-7.05-8-11.9l-.22-1.33h57.46l.22-1.94c.32-2.73-.1-9.36-.83-13.17-1.56-8.19-4.95-14.7-10.6-20.32-5.65-5.62-12.89-9.24-21.59-10.76-4.06-.7-12.86-.89-16.98-.32ZM768.32,109.56c3.97,1.05,6.89,3.59,8.89,7.68.57,1.24,1.08,2.41,1.08,2.63,0,.25-3.97.35-15.08.35-12.38,0-15.08-.06-15.08-.41,0-.25.44-1.33.98-2.41,1.9-3.81,5.68-6.73,10.06-7.78,2.35-.6,7.08-.6,9.14-.06ZM694.48,87.65c-9.49,2-16,8.44-19.36,19.17-.57,1.78-1.08,3.21-1.14,3.17-.03-.06-.89-4.89-1.87-10.73-.95-5.84-1.84-10.86-1.9-11.11-.13-.41-1.84-.48-13.02-.48h-12.82l.13,1.11c.41,3.11.86,24.48.86,40.63s-.44,37.59-.86,40.7l-.16,1.21h30.35l-.13-17.87c-.16-18.67,0-21.52,1.21-25.52,2.86-9.3,10.03-12.19,21.27-8.6,1.65.54,3.78,1.3,4.73,1.71.95.44,1.81.7,1.9.57.38-.38,4.16-33.59,3.84-33.9-.51-.51-10.63-.54-13.02-.06h0ZM546.87,129.87v41.46h15.33l-.25-1.05c-.13-.54-.35-14.03-.48-29.9-.16-16.89-.41-29.68-.6-30.79-.83-4.95-2.83-9.94-5.43-13.84-1.78-2.6-6.03-6.38-8.13-7.17-.38-.13-.44,5.56-.44,41.3Z"/>
    </g>
  </g>
</svg>
`;

// 2. Encode the SVG so your <img> tags can read it instantly as a local URL
const LOADER_LOGO_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(RAW_SVG_LOGO)}`; // Replace with logo URL
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
    //overlay.style.backgroundColor = LOADER_BG_COLOR;
    overlay.style.backgroundImage = `
    repeating-linear-gradient(0deg, #ffffff05, #ffffff05 1px, transparent 1px, transparent 8px),
    radial-gradient(circle, rgb(23, 24, 39) 0%, rgba(0, 0, 0, 1) 100%)
    `;
    overlay.style.zIndex = "99999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.transition = `opacity ${TIME_TO_FADEOUT}ms ease-out`;

    // 2. Create the logo container
    const logoContainer = document.createElement("div");
    logoContainer.style.maxWidth = "300px";
    logoContainer.style.opacity = "0"; // Start invisible for fade-in
    logoContainer.style.animation = "fadeInLogo 1.5s forwards ease-in-out";
    logoContainer.style.zIndex = "2"; // Keep above the expanding bar initially

    // Use URL for logo instead of looking for existing element
    const image = document.createElement("img");
    image.src = LOADER_LOGO_URL;
    image.alt = "Loading Logo";
    image.style.display = "block";
    image.style.width = "300px"; // Sensible default constraint
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
    percentageText.style.fontSize = "18px";
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
    
    // 0.5.1 SET FOOTER LOGO TO MATCH LOADER LOGO
    const footLogo = document.getElementById('bottom-logo');
    if (footLogo) {
        footLogo.src = LOADER_LOGO_URL;
        footLogo.onerror = function() {
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

    // Store the animation ID so we can cancel it later
    let parallaxRAF = null;

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
    
    // Media Query listener to toggle the animation
    const desktopMedia = window.matchMedia("(min-width: 600px)");
    
    function manageParallaxState(media) {
        if (media.matches) {
            // Desktop (> 600px): Start the animation loop if it isn't running
            if (!parallaxRAF) {
                animateParallax();
            }
        } else {
            // Mobile (< 600px): Completely stop the loop to save resources
            if (parallaxRAF) {
                cancelAnimationFrame(parallaxRAF);
                parallaxRAF = null;
                
                // Optional but recommended: Reset positions so layers don't get stuck off-center
                layers.forEach(layer => {
                    layer.style.setProperty('--tx', '0px');
                    layer.style.setProperty('--ty', '0px');
                });
            }
        }
    }

        // a. Run the check immediately on page load
        manageParallaxState(desktopMedia);
    
        // b. Listen for screen resizing (e.g., rotating a tablet or resizing a desktop window)
        desktopMedia.addEventListener('change', manageParallaxState);

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
        let baseSpeed = 1;        // Normal auto-scroll speed
        let targetSpeed = 1;      // The speed it wants to reach
        let currentSpeed = 1;     // The actual speed applied right now 
        let isHovered = false;
        let isDragging = false;
        let isClickAnimating = false; // Prevents loop from fighting the Next Button CSS transition

        // Trackers for swipe physics
        let lastMouseX = 0;
        let dragVelocity = 0; 
        let lastMoveTime = 0;

        let animationId;
        
        // Helper to grab the exact pixel width of one original set of images (including gap)
        function getSetWidth() {
            const itemWidth = originalItems[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(sliderTrack).gap) || 0;
            return (itemWidth + gap) * originalItems.length;
        }

        function sliderLoop() {
            // Naturally move forward if we aren't hovering or touching
            // a. Calculate the new speed (The Lerp formula)
            // If not dragging and not clicking, smoothly glide the current speed toward the target speed
            if (!isDragging && !isClickAnimating) {
                // 0.05 is the friction. It will gently pull the current swipe speed back down to baseSpeed (or 0)
                currentSpeed += (targetSpeed - currentSpeed) * 0.05;
                slideCurrentX -= currentSpeed;
            }
            
            const setWidth = getSetWidth();
            
            // Mathematically loop the gallery seamlessly
            if (slideCurrentX <= -setWidth) {
                slideCurrentX += setWidth; 
            } else if (slideCurrentX > 0) {
                slideCurrentX -= setWidth;
            }
            
            // 3. Apply the transform ONLY if a CSS transition isn't currently handling it
            if (!isClickAnimating) {
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
            }
            
            animationId = requestAnimationFrame(sliderLoop);
        }
        
        // Kick off the loop
        animationId = requestAnimationFrame(sliderLoop);

        // --- HOVER PAUSE LOGIC ---
        sliderContainer.addEventListener('mouseenter', () => {
            isHovered = true;
            targetSpeed = 0; // Tell the slider to smoothly brake to zero
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            if (!isDragging) targetSpeed = baseSpeed; // Smoothly accelerate back to normal
        });

        // 5a. Touch & Drag Controls (Calculates exact pixel offset to follow finger)
        function handleDragStart(e) {
            isDragging = true;
            currentSpeed = 0; // Kill momentum instantly on grab
            targetSpeed = 0;
            lastMouseX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            dragVelocity = 0; // Reset flick velocity
            sliderTrack.style.transition = 'none'; 
            sliderContainer.style.cursor = 'grabbing';
        }

        function handleDragMove(e) {
            if (!isDragging) return;
            const currentMouseX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            // Calculate how fast the mouse/finger is moving right now
            dragVelocity = currentMouseX - lastMouseX;
            lastMouseX = currentMouseX;
            lastMoveTime = Date.now();
            
            // Instantly stick the slider to the finger
            slideCurrentX += dragVelocity;
        }

        function handleDragEnd() {
            isDragging = false;
            sliderContainer.style.cursor = 'grab';
            // If mouse left the container during drag, resume speed. Otherwise stay stopped.
            targetSpeed = isHovered ? 0 : baseSpeed; 

            // If they held their finger still for more than 100ms before letting go, kill the momentum
            if (Date.now() - lastMoveTime > 100) {
                dragVelocity = 0; 
            }
            
            // Transfer the physical swipe velocity into the slider's currentSpeed.
            // We invert it (-dragVelocity) because positive speed moves the slider left.
            // We also cap the max flick speed so it doesn't violently fly off the screen.
            const maxFlickSpeed = 25;
            currentSpeed = Math.min(Math.max(-dragVelocity, -maxFlickSpeed), maxFlickSpeed);
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
                if (isClickAnimating) return; // Prevent spam clicking from breaking the loop
                const itemWidth = originalItems[0].offsetWidth;
                const gap = parseFloat(window.getComputedStyle(sliderTrack).gap) || 0;

                isClickAnimating = true; // Tell the JS loop to step back temporarily
                
                // Add CSS transition briefly just to animate the click snap
                sliderTrack.style.transition = 'transform 0.4s ease-out';
                slideCurrentX -= (itemWidth + gap);
                sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
                
                setTimeout(() => {
                    // Turn off transition to prevent glitching the auto scroll
                    sliderTrack.style.transition = 'none';
                    
                    // Safety check to ensure we smoothly reset position if the jump passed the loop threshold
                    const setWidth = getSetWidth();
                    if (slideCurrentX <= -setWidth) {
                        slideCurrentX += setWidth;
                        sliderTrack.style.transform = `translateX(${slideCurrentX}px)`;
                    }
                    isClickAnimating = false; // Give control back to the JS loop
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
    // a. Grab all elements once at the top
    const aboutMarquee = document.getElementById('aboutMarquee');
    const profileSection = document.getElementById('profile');
    const contactMarquee = document.getElementById('contactMarquee');
    const contactMarquee2 = document.getElementById('contactMarqueeInverse');
    const contactSection = document.getElementById('links');

    // b. Create a reusable helper function for the math
    function updateMarquees(section, marqueeElements, multiplier) {
        if (!section) return; // Safety check
    
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if the section is partially visible in the viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const scrollProgress = viewportHeight - rect.top;
            // Calculate offset and use template literals (backticks) for the string
            const offset = `${scrollProgress * multiplier}px`;

            // Apply the CSS variable to all passed marquee elements
            marqueeElements.forEach(marquee => {
            if (marquee) {
                marquee.style.setProperty('--scroll-offset', offset);
            }
        });
        }
    }

    // c. Attach a SINGLE scroll event listener
    window.addEventListener('scroll', () => {
    
    // Process About Marquee (Multiplier: 0.5)
    if (aboutMarquee && profileSection) {
        updateMarquees(profileSection, [aboutMarquee], 0.5);
    }

    // Process Contact Marquees (Multiplier: -0.5)
    if (contactSection && (contactMarquee || contactMarquee2)) {
        updateMarquees(contactSection, [contactMarquee, contactMarquee2], -0.5);
    }   
    });

    // 8. DEFERRED PROFILE CARD FLIP LOGIC
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        const profileObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Attach click listener only when the card is near the viewport
                    profileCard.addEventListener('click', function() {
                        const innerCard = this.querySelector('.about-image-inner');
                        if (innerCard) {
                            innerCard.classList.toggle('is-flipped');
                        }
                    });
                    observer.disconnect(); // Stop observing once initialized
                }
            });
        }, { rootMargin: '200px' }); // Trigger 200px before it scrolls into view
        
        profileObserver.observe(profileCard);
    }

    // 9. DEFERRED DYNAMIC ACCURATE FOOTER YEAR
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        const footerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fetch the true internet time only when the user nears the bottom
                    fetch('https://timeapi.io/api/v1/time/current/zone?timezone=Manila%2FAsia')
                        .then(response => response.json())
                        .then(data => {
                            const trueYear = data.datetime.substring(0, 4);
                            yearElement.textContent = `© ${trueYear} Rentrepy`;
                        })
                        .catch(() => {
                            yearElement.textContent = `© ${new Date().getFullYear()} Rentrepy`;
                        });
                    
                    observer.disconnect(); // Stop observing to ensure we only fetch once!
                }
            });
        }, { rootMargin: '600px' }); // Trigger when within 600px of the footer
        
        footerObserver.observe(yearElement);
    }

    // 10. BACK TO TOP CLICK LOGIC
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // This forces the button to lose focus/active state
            // Returning it to its default circular shape immediately
            backToTopBtn.blur();
        });
    }

});
