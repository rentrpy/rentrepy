// js/modules/animations.js

export function initAnimations() {

    // ABOUT SCROLL MARQUEE LOGIC
    const aboutMarquee = document.getElementById('aboutMarquee');
    const profileSection = document.getElementById('profile');
    const contactMarquee = document.getElementById('contactMarquee');
    const contactMarquee2 = document.getElementById('contactMarqueeInverse');
    const contactSection = document.getElementById('links');

    // Create a reusable helper function for the math
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

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Freeze the marquees ONLY when this delayed class is active
                if (document.body.classList.contains('pause-marquees')) {
                    ticking = false;
                    return;
                }

                if (aboutMarquee && profileSection) {
                    updateMarquees(profileSection, [aboutMarquee], 0.5);
                }

                if (contactSection && (contactMarquee || contactMarquee2)) {
                    updateMarquees(contactSection, [contactMarquee, contactMarquee2], -0.5);
                }

                ticking = false;
            });

            ticking = true;
        }
    });


    // DEFERRED PROFILE CARD FLIP LOGIC
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        const profileObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Attach click listener only when the card is near the viewport
                    profileCard.addEventListener('click', function () {
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

    // 3. TEXT REVEAL ON SCROLL
    const revealElements = document.querySelectorAll('.reveal-up');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once revealed so it doesn't animate backwards
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.50 // Triggers when 50% of the element is visible
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }


    // MAGNETIC BUTTON MICRO-INTERACTION
    const magneticButtons = document.querySelectorAll('.social-btn, .burger-btn');

    // Only apply on non-touch devices to save mobile battery
    if (window.matchMedia("(pointer: fine)").matches) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                // Calculate distance from center of the button
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Move the button 30% of the distance toward the mouse
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
            });

            btn.addEventListener('mouseleave', () => {
                // Snap back to original position
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // CLICK RIPPLE LOGIC (Lag-free)
    document.addEventListener('mousedown', (e) => {
        // Create the ripple element
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';

        // Position it at the cursor click coordinates
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;

        // Add it to the body
        document.body.appendChild(ripple);

        // Remove it after the animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}