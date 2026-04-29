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
        /* 1. BACKGROUND SECTIONS */
        .split-wrapper {
            position: relative;
            width: 100%;
            height: 100vh; /* Full screen height */
            overflow: hidden;
        }

        .section {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%; /* Full height of wrapper */
            background-size: cover;
            background-position: center;
        }

        .side-a, .side-m {
            background-image: url("{{ '/assets/images/me.png' | relative_url }}");
        }

        /* 2. THE CENTERED SLIDER */
        .slider-container {
            position: absolute;
            top: 50%; 
            left: 50%;
            /* Shifts the container back perfectly into the dead center */
            transform: translate(-50%, 0%); 
            
            width: 100%;
            z-index: 100; 
            display: flex;
            justify-content: center;
            touch-action: none; /* Prevents page scrolling while sliding on mobile */
        }

        .gate-slider {
            -webkit-appearance: none;
            width: 85%; /* Matches the 85% max-width of your portfolio wrapper */
            height: 80px; /* Taller hit area for better touch recognition */
            background: transparent;
            cursor: pointer;
            outline: none;
        }

        /* 3. SLIDER THUMB (The handle) */
        .gate-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid rgba(0,0,0,0.1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            cursor: grab;
        }

        .gate-slider:active::-webkit-slider-thumb {
            cursor: grabbing; /* Gives feedback that the user is holding it */
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

    // THE BRAIN: Updates visual variables and handles redirects
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

        // Redirects when reaching the edges
        if (value <= 5) { 
            window.location.href = "{{ '/art/' | relative_url }}";
        } else if (value >= 95) {
            window.location.href = "{{ '/math/' | relative_url }}";
        }
    }

    // INPUT LISTENER: Real-time updates while sliding
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

    // RELEASE LISTENERS: Handles snapping back
    const endEvents = ['pointerup', 'touchend', 'mouseup'];
    endEvents.forEach(event => {
        slider.addEventListener(event, () => {
            const value = parseInt(slider.value);
            if (value > 5 && value < 95) {
                snapToMiddle();
            }
        });
    });

    // THE SNAP ANIMATION: Springs back to 50%
    function snapToMiddle() {
        const startValue = parseFloat(slider.value);
        const endValue = 50;
        const duration = 400; 
        const startTime = performance.now();

        function animateSnap(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic calculation for a smooth "spring" stop
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easeOut;
            
            slider.value = currentValue;
            updateStyles(currentValue);
            
            if (progress < 1) requestAnimationFrame(animateSnap);
        }
        requestAnimationFrame(animateSnap);
    }

    // STARTUP: Ensure slider is perfectly centered on page load
    window.onload = () => {
        slider.value = 50;
        updateStyles(50);
    };
</script>
</body>
</html>