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

        /* --- MOBILE SLIDER OPTIMIZATIONS --- */
        .slider-container {
            position: absolute;
            bottom: 10%; 
            width: 100%;
            z-index: 100; 
            display: flex;
            justify-content: center;
            touch-action: none; /* Prevents page scrolling while sliding */
        }

        .gate-slider {
            -webkit-appearance: none;
            width: 80%;
            height: 60px; 
            background: transparent;
            cursor: pointer;
        }

        /* Larger thumb for easier grabbing on mobile */
        .gate-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 45px;
            width: 45px;
            border-radius: 50%;
            background: #fff;
            cursor: grab;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>

<div class="split-wrapper">
    <div class="section side-a"></div>
    <div class="section side-m"></div>

    <div class="floating-text art-hint">Art</div>
    <div class="floating-text math-hint">Mathematics</div>

    <div class="slider-container">
        <input type="range" min="0" max="100" value="50" class="gate-slider" id="gateSlider">
    </div>
</div>

<script>
    const slider = document.getElementById('gateSlider');
    const root = document.documentElement;
    let ticking = false;

    // 1. THE BRAIN: Updates visuals and handles redirects
    function updateStyles(value) {
        const distanceFromCenter = Math.abs(50 - value);
        const newOpacity = 0.5 + (distanceFromCenter / 100);

        let mathOpacity = 0;
        if (value > 60) mathOpacity = (value - 60) / 30;

        let artOpacity = 0;
        if (value < 40) artOpacity = (40 - value) / 30;

        root.style.setProperty('--split', value + '%');
        root.style.setProperty('--dynamic-opacity', newOpacity);
        root.style.setProperty('--math-hint-opacity', Math.min(mathOpacity, 1));
        root.style.setProperty('--art-hint-opacity', Math.min(artOpacity, 1));

        // Redirects when reaching edges
        if (value <= 5) { 
            window.location.href = "{{ '/art/' | relative_url }}";
        } else if (value >= 95) {
            window.location.href = "{{ '/math/' | relative_url }}";
        }
    }

    // 2. INPUT LISTENER: Real-time updates
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

    // 3. RELEASE LISTENERS: Handles snapping back
    const endEvents = ['pointerup', 'touchend', 'mouseup'];
    endEvents.forEach(event => {
        slider.addEventListener(event, () => {
            const value = parseInt(slider.value);
            if (value > 5 && value < 95) {
                snapToMiddle();
            }
        });
    });

    // 4. THE SNAP ANIMATION
    function snapToMiddle() {
        const startValue = parseFloat(slider.value);
        const endValue = 50;
        const duration = 400; 
        const startTime = performance.now();

        function animateSnap(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easeOut;
            slider.value = currentValue;
            updateStyles(currentValue);
            if (progress < 1) requestAnimationFrame(animateSnap);
        }
        requestAnimationFrame(animateSnap);
    }

    // 5. STARTUP
    window.onload = () => {
        slider.value = 50;
        updateStyles(50);
    };
</script>
</body>
</html>