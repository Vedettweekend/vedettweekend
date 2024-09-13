document.addEventListener("DOMContentLoaded", function() {
    // Ensure all videos are initialized properly
    const video = document.getElementById('video');
    const video2 = document.querySelector('.video2');
    const videos = document.querySelectorAll('.myVideo');
    const playButton = document.getElementById('playButton');

    // Function to toggle video play/pause on click
    function toggleVideoPlay() {
        if (video && video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Event listener for video click
    if (video) {
        video.addEventListener('click', toggleVideoPlay);
    }

    // Function to handle window resize for navigation items
    function handleWindowResize() {
        toggleNavItemsDisplay(); // Adjust nav items visibility on window resize
    }

    // Handle scroll to display header background
    let headerBackground;
    window.addEventListener('scroll', function() {
        if (!headerBackground) {
            headerBackground = document.createElement('div');
            headerBackground.classList.add('header-background');
            document.body.appendChild(headerBackground);
        }

        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            const videoBottom = videoContainer.getBoundingClientRect().bottom + 500; // Adjust as needed

            if (window.scrollY > videoBottom) {
                headerBackground.style.display = 'block';
            } else {
                headerBackground.style.display = 'none';
            }
        }
    });

    // Add resize event listener
    window.addEventListener('resize', handleWindowResize);

    // Handle .video2 playback at a controlled speed
    if (video2) {
        video2.playbackRate = 0.5;
        video2.play();

        // Pause on hover
        video2.addEventListener('mouseover', function() {
            video2.pause();
        });

        // Play on mouse leave
        video2.addEventListener('mouseout', function() {
            video2.play();
        });
    }

    // Handle multiple video controls via a play button
    if (playButton) {
        playButton.addEventListener('click', () => {
            videos.forEach(video => {
                if (video.paused) {
                    video.play();
                    playButton.textContent = '❚❚'; // Pause symbol
                } else {
                    video.pause();
                    playButton.textContent = '▶'; // Play symbol
                }
            });
        });
    }

    // Handle individual video play/pause and button updates
    videos.forEach(video => {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.textContent = '❚❚'; // Pause symbol
            } else {
                video.pause();
                playButton.textContent = '▶'; // Play symbol
            }
        });

        // Hide the play button when the video is playing
        video.addEventListener('play', () => {
            playButton.style.display = 'none';
        });

        // Show the play button when the video is paused
        video.addEventListener('pause', () => {
            playButton.style.display = 'block';
        });

        // Ensure play button resets after video ends
        video.addEventListener('ended', () => {
            playButton.textContent = '▶';
        });
    });

    // Auto-play all videos with class "video2" at a specific speed
    const videoElements = document.querySelectorAll('.video2');
    videoElements.forEach(video => {
        video.playbackRate = 0.1;
        video.play();
    });

    // Initialize marquee
    function initializeMarquee() {
        const marqueeContainer = document.querySelector('.marquee-container');
        const marquee = document.querySelector('.marquee');
        const marqueeItems = document.querySelectorAll('.marquee span');

        if (marqueeItems.length === 0) return;

        let totalWidth = 0;

        // Calculate total width of all span elements including margins
        marqueeItems.forEach(item => {
            const style = window.getComputedStyle(item);
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            totalWidth += item.offsetWidth + marginLeft + marginRight;
        });

        // Set the width of the marquee to the total width of the spans
        marquee.style.width = `${totalWidth}px`;

        // Calculate animation duration based on total width
        const animationDuration = totalWidth / 100; // Adjust divisor for speed

        // Set animation duration
        marquee.style.animationDuration = `${animationDuration}s`;

        // Start the animation
        marquee.style.animationPlayState = 'running';

        // Pause animation on hover
        marqueeContainer.addEventListener('mouseenter', function() {
            marquee.style.animationPlayState = 'paused';
        });

        // Resume animation on mouse leave
        marqueeContainer.addEventListener('mouseleave', function() {
            marquee.style.animationPlayState = 'running';
        });
    }

    // Initialize marquee on DOM content loaded
    initializeMarquee();

    // Ensure marquee restarts when navigating back to the page
    window.addEventListener('pageshow', initializeMarquee);
});





