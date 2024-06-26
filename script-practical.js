document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-buttons');
  
    // Get all content sections
    const contentSections = document.querySelectorAll('.written-content > div');
  
    // Find the 'Locatie' button and its corresponding section
    let defaultButton;
    let defaultSection;
    tabButtons.forEach(function(button) {
      if (button.getAttribute('data-section-id') === 'locatie') {
        defaultButton = button;
        defaultSection = document.getElementById('locatie');
      }
    });
  
    // Add 'active' class to the default button
    if (defaultButton) {
      defaultButton.classList.add('active');
    }
  
    // Display the corresponding content section
    if (defaultSection) {
      defaultSection.style.display = 'block';
    }
  
    // Add click event listener to each tab button
    tabButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Remove 'active' class from all buttons
        tabButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
  
        // Add 'active' class to the clicked button
        button.classList.add('active');
  
        // Hide all content sections
        contentSections.forEach(function(section) {
          section.style.display = 'none';
        });
  
        // Show the corresponding content section based on data-section-id attribute
        const sectionId = button.getAttribute('data-section-id');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.style.display = 'block';
        }
      });
    });
  });

  
  

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
  
  document.querySelector('.wegaanduiding').addEventListener('click', function() {
    document.getElementById('fullscreenOverlay').style.display = 'flex';
});

document.getElementById('fullscreenOverlay').addEventListener('click', function() {
    this.style.display = 'none';
});


