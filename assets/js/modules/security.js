export function initSecurity() {
    // Disable right click globally to prevent easy access to 'Save Image As' or 'Inspect Element'
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Disable common keyboard shortcuts used by manual scrapers
    document.addEventListener('keydown', (e) => {
        // Prevent F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
        }

        // Prevent Ctrl+S (Save Page), Ctrl+U (View Source)
        // Prevent Ctrl+Shift+I (Dev Tools), Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey) {
            const key = e.key.toLowerCase();
            if (key === 's' || key === 'u') {
                e.preventDefault();
            }
            if (e.shiftKey && (key === 'i' || key === 'c' || key === 'j')) {
                e.preventDefault();
            }
        }
    });

    // Prevent drag and drop on all images explicitly
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
        }
    });
}
