const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item"); // Select all .nav-item elements

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

// Function to handle window resize
function handleWindowResize() {
    toggleNavItemsDisplay(); // Adjust nav items visibility on window resize
}
window.addEventListener('resize', handleWindowResize);



