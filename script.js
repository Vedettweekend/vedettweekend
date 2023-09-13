const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);

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
    const sections = document.querySelectorAll('.written-content > div');
    const buttons = document.querySelectorAll('.tab-buttons');

    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                activateButton(sectionId);
            }
        });
    }, observerOptions);

    let activeSectionId = null; // Variable to track the active section

    // Observe all sections except djtomo-keytone
    sections.forEach((section) => {
        if (section.id !== 'djtomo-keytone') {
            observer.observe(section);
        }
    });

    function activateButton(sectionId) {
        buttons.forEach((button) => {
            const dataSectionId = button.dataset.sectionId;
            if (dataSectionId === sectionId) {
                if (dataSectionId !== activeSectionId) {
                    deactivateButton(activeSectionId); // Deactivate the previous button
                }
                button.classList.add('active');
                activeSectionId = sectionId;
            }
        });
    }

    function deactivateButton(sectionId) {
        buttons.forEach((button) => {
            const dataSectionId = button.dataset.sectionId;
            if (dataSectionId === sectionId) {
                button.classList.remove('active');
            }
        });
    }

    // Handle tab button clicks
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const sectionId = button.dataset.sectionId;
            scrollToSection(sectionId);
        });
    });

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

    // Get the hash from the URL
    var hash = window.location.hash;

};



