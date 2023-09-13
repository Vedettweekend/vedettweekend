const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
// Example of setting a cookie with SameSite=Lax
document.cookie = "cookieName=cookieValue; SameSite=Lax";


hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

document.addEventListener("DOMContentLoaded", function () {
    // Get references to buttons and content sections
    const tabs = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Add click event listeners to buttons
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // Remove the 'active' class from all buttons and content sections
        tabs.forEach(function (tab) {
          tab.classList.remove("active");
        });
        tabContents.forEach(function (content) {
          content.classList.remove("active");
        });
  
        // Add the 'active' class to the clicked button and its associated content
        const tabId = tab.getAttribute("id");
        const contentId = "content" + tabId.substr(3);
        tab.classList.add("active");
        document.getElementById(contentId).classList.add("active");
      });
    });

    // Make the first tab and its content section active on page load
    tabs[0].classList.add("active");
    const initialContentId = "content" + tabs[0].getAttribute("id").substr(3);
    document.getElementById(initialContentId).classList.add("active");
});


    window.onload = function () {
        // Get the hash from the URL
        var hash = window.location.hash;

        // Check if the hash corresponds to the "Tomoxkeytone" section
        if (hash === "#djtomo-keytone") {
            // Activate the second tab
            var tab2 = document.getElementById("tab2");
            tab2.click();
            
            // Scroll to the artist section after a short delay
            setTimeout(function () {
                var artistSection = document.querySelector(hash);
                if (artistSection) {
                    artistSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }, 10);
        } else if (hash === "#djmassiv-trillusion") {
            // Scroll to the "Massiv x Trillusion" section directly without tab activation
            setTimeout(function () {
                var artistSection = document.querySelector(hash);
                if (artistSection) {
                    artistSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }, 100);
        } else if (hash === "#mattic-alleskapot") {
            // Scroll to the "Mattic" section directly without tab activation
            setTimeout(function () {
                var artistSection = document.querySelector(hash);
                if (artistSection) {
                    artistSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }, 100);
        } else {
            // Handle the tab navigation for the "Practical" page
            const buttons = document.querySelectorAll('.tab-buttons');
            buttons.forEach((button) => {
                button.addEventListener('click', function () {
                    buttons.forEach((btn) => btn.classList.remove('active'));
                    button.classList.add('active');
                    const sectionId = button.dataset.sectionId;
                    scrollToSection(sectionId);
                });
            });
        }
    };

    // Scroll function for the "Practical" page
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    document.cookie = "myCookie=myValue; SameSite=Lax";
