---
layout: null
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome | My Page</title>
    <link rel="stylesheet" href="{{ '/assets/css/slider.css' | relative_url }}">
    <style>
        .side-a, .side-m {
            background-image: url("{{ '/assets/images/me.png' | relative_url }}");
        }
    </style>
</head>
<body>

<div class="split-wrapper">
    <div class="section side-a">
        <div class="label">
        </div>
    </div>
    <div class="section side-m">
        <div class="label">
        </div>
    </div>
    <div class="split-wrapper">
    <div class="floating-text art-hint">Art</div>
    <div class="floating-text math-hint">Mathematics</div>
     <div class="slider-container">
        <input type="range" min="0" max="100" value="50" class="gate-slider" id="gateSlider">
    </div>
</div>
</div>
<script>
    const slider = document.getElementById('gateSlider');
    const root = document.documentElement;
    let ticking = false;
    // 1. THE BRAIN: Updates all visual variables and checks for redirect
    function updateStyles(value) {
        const distanceFromCenter = Math.abs(50 - value);
        const newOpacity = 0.5 + (distanceFromCenter / 100);
        // Math Hint (Left side of screen, fades in as we slide Right)
        let mathOpacity = 0;
        if (value > 60) mathOpacity = (value - 60) / 30;
        // Art Hint (Right side of screen, fades in as we slide Left)
        let artOpacity = 0;
        if (value < 40) artOpacity = (40 - value) / 30;
        // Apply to CSS
        root.style.setProperty('--split', value + '%');
        root.style.setProperty('--split-num', value);
        root.style.setProperty('--dynamic-opacity', newOpacity);
        root.style.setProperty('--math-hint-opacity', Math.min(mathOpacity, 1));
        root.style.setProperty('--art-hint-opacity', Math.min(artOpacity, 1));
        // REDIRECT LOGIC: Only triggers if you reach the very edges
        if (value <= 5) { 
            window.location.href = "{{ '/Art/' | relative_url }}/";
        } else if (value >= 95) {
            window.location.href = "{{ '/Math/' | relative_url }}/";
        }
    }
    // 2. WHILE DRAGGING: Update visuals in real-time
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateStyles(value);
                ticking = false;
            });
            ticking = true;
        }
    });
    // 3. WHEN LET GO: Snap back to 50 if not at the edges
    // We use 'pointerup' because it works better than 'change'
    slider.addEventListener('pointerup', () => {
        const value = parseInt(slider.value);
        if (value > 5 && value < 95) {
            snapToMiddle();
        }
    });
    // 4. THE SPRING ANIMATION
    function snapToMiddle() {
        const startValue = parseFloat(slider.value);
        const endValue = 50;
        const duration = 400; // ms
        const startTime = performance.now();
        function animateSnap(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: starts fast, slows down at 50
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easeOut;
            slider.value = currentValue;
            updateStyles(currentValue);
            if (progress < 1) {
                requestAnimationFrame(animateSnap);
            }
        }
        requestAnimationFrame(animateSnap);
    }
    window.addEventListener('pointerup', () => {
    const value = parseFloat(slider.value);
    if (value > 5 && value < 95) {
        snapToMiddle();
    }
});
    // 5. STARTUP: Set everything to middle
    window.onload = () => {
        slider.value = 50;
        updateStyles(50);
    };
    // This forces the browser to recalculate the hover state 
// whenever the mouse moves over the slider area
slider.addEventListener('mousemove', () => {
    // This empty function call is often enough to "wake up" 
    // the CSS engine in Chrome/Safari
    ticking = false; 
});
</script>
</body>
</html>
