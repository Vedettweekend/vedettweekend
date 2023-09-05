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

// Wait for the DOM to fully load

