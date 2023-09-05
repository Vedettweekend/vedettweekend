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
  });