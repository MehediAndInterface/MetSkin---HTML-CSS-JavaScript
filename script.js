document.addEventListener("DOMContentLoaded", () => {
    // --- Header ---
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");

    navToggle.addEventListener("click", () => {
      siteNav.classList.toggle("active");
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });

        // Close nav on mobile after clicking
        if (navToggle.style.display !== "none") {
          siteNav.classList.remove("active");
        }
      });
    });

    // --- Feedback Slider ---
    const feedbackItems = document.querySelectorAll(".feedback-item");
    const feedbackPrev = document.querySelector(".feedback-prev");
    const feedbackNext = document.querySelector(".feedback-next");
    let currentFeedbackIndex = 0;
    const feedbackInterval = 5000; // 5 seconds

    function showFeedback(index) {
      feedbackItems.forEach((item) => item.classList.remove("active"));
      feedbackItems[index].classList.add("active");
    }

    function nextFeedback() {
      currentFeedbackIndex =
        (currentFeedbackIndex + 1) % feedbackItems.length;
      showFeedback(currentFeedbackIndex);
    }

    function prevFeedback() {
      currentFeedbackIndex =
        (currentFeedbackIndex - 1 + feedbackItems.length) %
        feedbackItems.length;
      showFeedback(currentFeedbackIndex);
    }

    feedbackNext.addEventListener("click", nextFeedback);
    feedbackPrev.addEventListener("click", prevFeedback);

    // Start the automatic slider
    let feedbackSliderInterval = setInterval(
      nextFeedback,
      feedbackInterval
    );

    // Clear interval on hover, restart on mouse leave
    feedbackSlider.addEventListener("mouseenter", () => {
      clearInterval(feedbackSliderInterval);
    });

    feedbackSlider.addEventListener("mouseleave", () => {
      feedbackSliderInterval = setInterval(nextFeedback, feedbackInterval);
    });

    // --- Add to Cart ---
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        alert("Product added to cart!"); // Replace with actual cart logic
      });
    });
  });