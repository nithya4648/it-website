// Preloader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
});

// Toggle Menu
const toggleButton = document.getElementById("toggle");
const menu = document.getElementById("menu");

toggleButton.addEventListener("click", function () {
    menu.classList.toggle("show");
    toggleButton.classList.toggle("on");
});

// Hide menu on scroll down
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        menu.classList.remove("show");
        toggleButton.classList.remove("on");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Image Gallery
const images = [
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg",
    "images/1.jpg"
];
let currentImageIndex = 0;

function changeImage(index) {
    const mainImg = document.getElementById("mainImg");
    const dots = document.querySelectorAll(".dot");
    const thumbnails = document.querySelectorAll(".thumbnail-list img");
    const thumbnailList = document.querySelector(".thumbnail-list");

    // Fade out current image
    mainImg.style.opacity = 0;

    setTimeout(() => {
        mainImg.src = images[index];
        mainImg.style.opacity = 1; // Fade in new image
        currentImageIndex = index;

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle("active-dot", i === index);
        });

        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });

        // Scroll to the active thumbnail
        const activeThumbnail = thumbnails[index];
        const thumbnailListRect = thumbnailList.getBoundingClientRect();
        const activeThumbnailRect = activeThumbnail.getBoundingClientRect();

        if (activeThumbnailRect.left < thumbnailListRect.left) {
            // Scroll left
            thumbnailList.scrollBy({
                left: activeThumbnailRect.left - thumbnailListRect.left - 10,
                behavior: "smooth",
            });
        } else if (activeThumbnailRect.right > thumbnailListRect.right) {
            // Scroll right
            thumbnailList.scrollBy({
                left: activeThumbnailRect.right - thumbnailListRect.right + 10,
                behavior: "smooth",
            });
        }
    }, 300); // Match transition duration
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeImage(currentImageIndex);
}

// Read More/Close History
function read_more_history() {
    const mainContent = document.getElementById("mainContent");
    const fullView = document.getElementById("fullView");

    // Hide main content
    mainContent.style.opacity = "0";
    mainContent.style.visibility = "hidden";

    // Wait for the fade-out transition to complete before displaying the full view
    setTimeout(() => {
        fullView.style.display = "block";
        setTimeout(() => {
            fullView.style.opacity = "1";
            fullView.style.visibility = "visible";
        }, 50); // Small delay to ensure display takes effect before opacity
    }, 500); // Match this duration with your CSS transition timing
}

function close_history() {
    const mainContent = document.getElementById("mainContent");
    const fullView = document.getElementById("fullView");

    // Hide full view
    fullView.style.opacity = "0";
    fullView.style.visibility = "hidden";

    // Wait for the fade-out transition to complete before hiding from layout
    setTimeout(() => {
        fullView.style.display = "none";
        mainContent.style.opacity = "1";
        mainContent.style.visibility = "visible";
    }, 500); // Match this duration with your CSS transition timing
}

// Book Container
let activeBookIndex = 2; // Initial center image index
const bookImages = document.querySelectorAll(".book div");

function refreshBookClasses() {
    bookImages.forEach((img, index) => {
        img.classList.remove("center", "left", "right");
        if (index === activeBookIndex) {
            img.classList.add("center");
        } else if (index === (activeBookIndex - 1 + bookImages.length) % bookImages.length) {
            img.classList.add("left");
        } else if (index === (activeBookIndex + 1) % bookImages.length) {
            img.classList.add("right");
        }
    });
}

refreshBookClasses();

document.querySelector(".book-next").addEventListener("click", () => {
    activeBookIndex = (activeBookIndex + 1) % bookImages.length;
    refreshBookClasses();
});

document.querySelector(".book-prev").addEventListener("click", () => {
    activeBookIndex = (activeBookIndex - 1 + bookImages.length) % bookImages.length;
    refreshBookClasses();
});

//home scroll
const video = document.getElementById('bg-video');

video.addEventListener('error', () => {
    console.error("Video failed to load, switching to static background.");
    document.querySelector('#home').classList.add('fallback');
});
