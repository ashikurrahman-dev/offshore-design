// Smooth image comparison slider functionality for multiple sliders
document.addEventListener('DOMContentLoaded', function () {
    function initComparisons() {
        const containers = document.querySelectorAll('.comparison-container');

        containers.forEach(function (container) {
            const beforeImageContainer = container.querySelector('.before-image-container');
            const sliderLine = container.querySelector('.slider-line');

            let isSliding = false;
            let containerWidth = container.offsetWidth;
            let containerLeft = container.getBoundingClientRect().left;

            // Update container dimensions on window resize
            function updateDimensions() {
                containerWidth = container.offsetWidth;
                containerLeft = container.getBoundingClientRect().left + window.pageXOffset;
            }

            window.addEventListener('resize', updateDimensions);

            function slide(x) {
                // Calculate position relative to container
                let pos = x - containerLeft;

                // Keep slider within bounds
                if (pos < 0) pos = 0;
                if (pos > containerWidth) pos = containerWidth;

                // Calculate percentage
                const percentage = (pos / containerWidth) * 100;

                // Update before image width using clip-path for smooth transition
                beforeImageContainer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;

                // Update slider position
                sliderLine.style.left = percentage + '%';
            }

            function getCursorPos(e) {
                let x = 0;
                e = e.changedTouches ? e.changedTouches[0] : e;

                // Get the x positions relative to the page
                x = e.pageX;

                return x;
            }

            function slideReady(e) {
                e.preventDefault();
                isSliding = true;
                updateDimensions(); // Update dimensions when sliding starts

                // Add event listeners for move events
                document.addEventListener('mousemove', slideMove);
                document.addEventListener('touchmove', slideMove);

                // Change cursor
                document.body.style.cursor = 'col-resize';
                container.style.userSelect = 'none';
            }

            function slideMove(e) {
                if (!isSliding) return false;
                e.preventDefault();

                const pos = getCursorPos(e);
                slide(pos);
            }

            function slideFinish() {
                isSliding = false;

                // Remove event listeners
                document.removeEventListener('mousemove', slideMove);
                document.removeEventListener('touchmove', slideMove);

                // Reset cursor
                document.body.style.cursor = 'default';
                container.style.userSelect = 'auto';
            }

            // Mouse events
            sliderLine.addEventListener('mousedown', slideReady);
            document.addEventListener('mouseup', slideFinish);

            // Touch events
            sliderLine.addEventListener('touchstart', slideReady);
            document.addEventListener('touchend', slideFinish);

            // Click anywhere on container to move slider
            container.addEventListener('click', function (e) {
                if (e.target === sliderLine || sliderLine.contains(e.target)) return;

                updateDimensions();
                const pos = getCursorPos(e);
                slide(pos);
            });

            // Initialize dimensions
            updateDimensions();
        });
    }

    // Initialize all sliders
    initComparisons();
});


// 
// Get all tab buttons and image divs
const tabs = {
    'original-tab': { image: 'original-image', activeText: 'text-green-600', activeBorder: 'border-green-600', hover: 'hover:text-green-800' },
    'our-edit-tab': { image: 'our-edit-image', activeText: 'text-blue-600', activeBorder: 'border-blue-600', hover: 'hover:text-blue-800' },
    'ai-edit-tab': { image: 'ai-edit-image', activeText: 'text-gray-600', activeBorder: 'border-gray-600', hover: 'hover:text-gray-800' }
};

// Add click event listeners to each tab
Object.keys(tabs).forEach(tabId => {
    document.getElementById(tabId).addEventListener('click', () => {
        // Reset all tabs to default style
        Object.keys(tabs).forEach(id => {
            const tab = document.getElementById(id);
            tab.classList.remove(tabs[id].activeText, tabs[id].activeBorder);
            tab.classList.add('text-gray-600', 'border-transparent', tabs[id].hover);
            document.getElementById(tabs[id].image).classList.add('hidden');
        });

        // Style the active tab and show corresponding image
        const clickedTab = document.getElementById(tabId);
        clickedTab.classList.remove('text-gray-600', 'border-transparent', tabs[tabId].hover);
        clickedTab.classList.add(tabs[tabId].activeText, tabs[tabId].activeBorder);
        document.getElementById(tabs[tabId].image).classList.remove('hidden');
    });
});

// hero section image slide
let heroCurrentSlide = 0;
    const heroSlides = document.querySelectorAll('#hero-slider img');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroTotalSlides = heroSlides.length;

    function heroUpdateSlider() {
        document.getElementById('hero-slider').style.transform = `translateX(-${heroCurrentSlide * 100}%)`;
        heroDots.forEach((dot, index) => {
            dot.classList.toggle('bg-white', index === heroCurrentSlide);
            dot.classList.toggle('bg-gray-400', index !== heroCurrentSlide);
        });
    }

    function heroNextSlide() {
        heroCurrentSlide = (heroCurrentSlide + 1) % heroTotalSlides;
        heroUpdateSlider();
    }

    function heroPrevSlide() {
        heroCurrentSlide = (heroCurrentSlide - 1 + heroTotalSlides) % heroTotalSlides;
        heroUpdateSlider();
    }

    function heroGoToSlide(index) {
        heroCurrentSlide = index;
        heroUpdateSlider();
    }

    // Auto-slide every 5 seconds (optional, remove if not needed)
    // setInterval(heroNextSlide, 5000);

    // Initialize slider
    heroUpdateSlider();





// image slide
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}