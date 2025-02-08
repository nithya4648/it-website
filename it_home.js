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
    "current-pic/1.jpg",
    "current-pic/2.jpg",
    "current-pic/3.jpg",
    "current-pic/4.jpg",
    "current-pic/5.jpg",
    "current-pic/6.jpg",
    "current-pic/7.jpg",
    "current-pic/8.jpg",
    "current-pic/9.jpg",
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


//home scroll
const video = document.getElementById('bg-video');

video.addEventListener('error', () => {
    console.error("Video failed to load, switching to static background.");
    document.querySelector('#home').classList.add('fallback');
});

//library
const viewLibraryBtn = document.getElementById("viewLibraryBtn");
const libraryPage = document.getElementById("libraryPage");
const backBtn = document.getElementById("backBtn");
const mainContent = document.getElementById("three"); // Wrap main content in a div

// Function to disable scrolling on the main content
function disableMainScroll() {
    mainContent.style.overflow = "hidden";
    document.body.style.overflow = "hidden"; // Prevent full-page scroll
}

// Function to enable scrolling on the main content
function enableMainScroll() {
    mainContent.style.overflow = "";
    document.body.style.overflow = "";
}

// Show full-screen library and disable main content scroll
viewLibraryBtn.addEventListener("click", () => {
    libraryPage.style.display = "flex";
    disableMainScroll();
});

// Hide full-screen library and enable main content scroll
backBtn.addEventListener("click", () => {
    libraryPage.style.display = "none";
    enableMainScroll();
});



//hustory section
function toggleSections(section) {
    const sections1 = document.getElementById('hidden-sections-1');
    const sections2 = document.getElementById('hidden-sections-2');
    const readMoreBtn1 = document.getElementById('read-more-btn-1');
    const readMoreBtn2 = document.getElementById('read-more-btn-2');
    const showLessBtn = document.getElementById('show-less-btn');

    if (section === '1') {
        // Show the first two hidden sections with a smooth transition
        sections1.style.display = 'block';
        setTimeout(function () {
            sections1.classList.add('show');
        }, 10);
        readMoreBtn1.style.display = 'none';
        readMoreBtn2.style.display = 'block';
    } else if (section === '2') {
        // Show the second two hidden sections with a smooth transition
        sections2.style.display = 'block';
        setTimeout(function () {
            sections2.classList.add('show');
        }, 10);
        readMoreBtn2.style.display = 'none';
        showLessBtn.style.display = 'block';
    } else if (section === 'less') {
        // Collapse everything back to the first two sections
        sections1.classList.remove('show');
        sections2.classList.remove('show');
        sections1.style.display = 'none';
        sections2.style.display = 'none';
        readMoreBtn1.style.display = 'block';
        showLessBtn.style.display = 'none';
    }
}

// Set initial hidden state
document.getElementById('hidden-sections-1').style.display = 'none';
document.getElementById('hidden-sections-2').style.display = 'none';
