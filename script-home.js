document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navbar = document.querySelector(".navbar");
    const navItems = document.querySelectorAll(".nav-item");

    document.cookie = "__Secure-3PSIDCC=value; SameSite=None; Secure";


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
            const videoBottom = videoContainer.getBoundingClientRect().bottom + 350; // Adjust as needed

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

})





