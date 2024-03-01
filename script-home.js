const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item"); // Select all .nav-item elements
let headerBackground;
const video = document.getElementById('video'); // Get the video element

document.cookie = "__Secure-3PSIDCC=value; SameSite=None; Secure";

// Function to toggle video play/pause
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

var video2 = document.querySelector('.video2');

// Function to pause the video
function pauseVideo() {
    video2.pause();
}

// Function to play the video
function playVideo() {
    video2.play();
}

// Add event listener for mouse enter event
video2.addEventListener('mouseleave', playVideo);

// Add event listener for mouse leave event (optional)
video2.addEventListener('mouseenter', pauseVideo);

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

document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');

    // Play the video automatically when the page loads
    video.play();
    
    // Remove the event listener for video click
    video.removeEventListener('click', toggleVideoPlay);
});