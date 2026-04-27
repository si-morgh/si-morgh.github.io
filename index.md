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
</head>
<body>

<div class="split-wrapper">
    <div class="section side-a">
        <div class="label">
            <h2>Art</h2>
            <p>← Slide Left</p>
        </div>
    </div>

    <div class="section side-m">
        <div class="label">
            <h2>Mathematics</h2>
            <p>Slide Right →</p>
        </div>
    </div>

    <input type="range" min="0" max="100" value="50" class="gate-slider" id="gateSlider">
</div>

<script>
    const slider = document.getElementById('gateSlider');
    const root = document.documentElement;

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        // This updates the CSS variable --split
        root.style.setProperty('--split', value + '%');

        // Logic for redirection
        if (value <= 2) {
            // Sends user to Art/index.md
            window.location.href = "{{ '/Art/' | relative_url }}";
        } else if (value >= 98) {
            // Sends user to Math/index.md
            window.location.href = "{{ '/Math/' | relative_url }}";
        }
    });

    // Reset slider to middle on page load (prevents browser caching the position)
    window.onload = () => slider.value = 50;
</script>

</body>
</html>