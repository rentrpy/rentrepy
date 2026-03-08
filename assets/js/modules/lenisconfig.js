window.lenis = new Lenis({
    lerp: 0.08,
    smooth: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 1,
    anchors: true,
    infinite: false,

    // Reduce RAF calls
    raf: (time) => {
        lenis.raf(time);
        if (Math.abs(lenis.velocity) < 0.1) {
            // Skip RAF when nearly stopped
            return;
        }
        requestAnimationFrame(raf);
    }

});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);