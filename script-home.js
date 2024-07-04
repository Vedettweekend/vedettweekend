document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navbar = document.querySelector(".navbar");
    const navItems = document.querySelectorAll(".nav-item");
    let headerBackground;
    const video = document.getElementById('video'); // Get the video element

    document.cookie = "__Secure-3PSIDCC=value; SameSite=None; Secure";

    // Function to toggle video play/pause on click
    function toggleVideoPlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Event listener for video click
    video.addEventListener('click', () => {
        toggleVideoPlay();
    });

    // Function to toggle visibility of nav items
    function toggleNavItemsDisplay() {
        if (window.innerWidth >= 1024 || navMenu.classList.contains("active")) {
            navItems.forEach(item => {
                item.style.display = 'block';
            });
            navMenu.style.pointerEvents = 'auto'; // Enable pointer events when menu is open
        } else {
            navItems.forEach(item => {
                item.style.display = 'none';
            });
            navMenu.style.pointerEvents = 'none'; // Disable pointer events when menu is closed
        }
    }

    // Function to handle menu toggle
    function toggleMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        navbar.classList.toggle("active");
        document.body.classList.toggle("menu-open"); // Toggle class on body
        
        // Add transition effect to the nav-menu background color
        navMenu.style.transition = "background-color 0.5s ease";

        // Toggle display property of nav items
        toggleNavItemsDisplay();
    }

    hamburger.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            navbar.classList.remove("active");
            document.body.classList.remove("menu-open"); // Remove class on body
            toggleNavItemsDisplay(); // Ensure nav items are hidden after clicking a link
        });
    });

    // Function to handle window resize
    function handleWindowResize() {
        toggleNavItemsDisplay(); // Adjust nav items visibility on window resize
    }

    window.addEventListener('scroll', function() {
        if (!headerBackground) {
            headerBackground = document.createElement('div');
            headerBackground.classList.add('header-background');
            document.body.appendChild(headerBackground);
        }

        var videoContainer = document.querySelector('.video-container');
        var videoBottom = videoContainer.getBoundingClientRect().bottom + 500; // Adjust this value as needed

        if (window.scrollY > videoBottom) {
            headerBackground.style.display = 'block';
        } else {
            headerBackground.style.display = 'none';
        }
    });

    window.addEventListener('resize', handleWindowResize);

    const video2 = document.querySelector('.video2');

    // Ensure the video plays at 50% speed initially
    video2.playbackRate = 0.5;
    video2.play();

    // Add event listener for mouse enter event to pause the video
    video2.addEventListener('mouseover', function() {
        video2.pause();
    });

    // Add event listener for mouse leave event to play the video
    video2.addEventListener('mouseout', function() {
        video2.play();
    });

    const videos = document.querySelectorAll('.myVideo');
    const playButton = document.getElementById('playButton');

    playButton.addEventListener('click', () => {
        videos.forEach(video => {
            if (video.paused) {
                video.play();
                playButton.textContent = '❚❚'; // Change button text to pause symbol
            } else {
                video.pause();
                playButton.textContent = '▶'; // Change button text to play symbol
            }
        });
    });

    videos.forEach(video => {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.textContent = '❚❚';
            } else {
                video.pause();
                playButton.textContent = '▶';
            }
        });

        video.addEventListener('play', () => {
            playButton.style.display = 'none';
        });

        video.addEventListener('pause', () => {
            playButton.style.display = 'block';
        });

        video.addEventListener('ended', () => {
            playButton.textContent = '▶';
        });
    });

    // Play each video automatically when the page loads
    const videoElements = document.querySelectorAll('.video2');
    videoElements.forEach(video => {
        video.playbackRate = 0.1;
        video.play();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const marquee = document.querySelector('.marquee');
    const marqueeItems = document.querySelectorAll('.marquee span');

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

    // Calculate animation duration based on total width and viewport width
    const animationDuration = totalWidth / 100; // Adjust divisor for speed

    // Set animation duration for all screen sizes
    marquee.style.animationDuration = `${animationDuration}s`;

    // Set initial position based on viewport width
    const viewportWidth = window.innerWidth;
    marquee.style.transform = `translateX(${viewportWidth}px)`;

    // Pause animation on hover
    marqueeContainer.addEventListener('mouseenter', function() {
        marquee.style.animationPlayState = 'paused';
    });

    // Resume animation on mouse leave
    marqueeContainer.addEventListener('mouseleave', function() {
        marquee.style.animationPlayState = 'running';
    });
});






