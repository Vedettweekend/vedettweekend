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

    // Function to handle window resize for navigation items
    function handleWindowResize() {
        toggleNavItemsDisplay(); // Adjust nav items visibility on window resize
    }

    // Handle scroll to display header background
    let headerBackground;
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        window.addEventListener('scroll', function() {
            if (!headerBackground) {
                headerBackground = document.createElement('div');
                headerBackground.classList.add('header-background');
                document.body.appendChild(headerBackground);
            }
    
            const videoBottom = videoContainer.getBoundingClientRect().bottom + 350;
            headerBackground.style.display = window.scrollY > videoBottom ? 'block' : 'none';
        });
    }
    

    // Add resize event listener
    let timeout;
    window.addEventListener('resize', function() {
    clearTimeout(timeout);
    timeout = setTimeout(handleWindowResize, 100); // 100ms debounce
    });

      // Ensure all videos are initialized properly
const video = document.getElementById('video');
const playButton = document.getElementById('playButton');

// Function to update the play/pause button text
function updateButton() {
    if (video && video.paused) {
        playButton.textContent = '▶'; // Play icon
    } else {
        playButton.textContent = '❚❚'; // Pause icon
    }
}

if (video) {
    video.muted = true;
    video.play().catch(function(error) {
        console.error('Autoplay failed:', error);
    });
}

// Function to toggle video play/pause on click
function toggleVideoPlay() {
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        updateButton(); // Update button state
    }
}

// Event listener for button click
if (playButton) {
    playButton.addEventListener('click', toggleVideoPlay);
}

// Event listener for video click (optional, if you want video click to also toggle play/pause)
if (video) {
    video.addEventListener('click', toggleVideoPlay);
}

// Initialize button state
updateButton();


    
})





