// Smooth image comparison slider functionality for multiple sliders (hover version)
document.addEventListener('DOMContentLoaded', function () {
    function initComparisons() {
        const containers = document.querySelectorAll('.comparison-container');

        containers.forEach(function (container) {
            const beforeImageContainer = container.querySelector('.before-image-container');
            const sliderLine = container.querySelector('.slider-line');

            let containerWidth = container.offsetWidth;
            let containerLeft = container.getBoundingClientRect().left;

            function updateDimensions() {
                containerWidth = container.offsetWidth;
                containerLeft = container.getBoundingClientRect().left + window.pageXOffset;
            }

            window.addEventListener('resize', updateDimensions);

            function slide(x) {
                let pos = x - containerLeft;

                if (pos < 0) pos = 0;
                if (pos > containerWidth) pos = containerWidth;

                const percentage = (pos / containerWidth) * 100;

                beforeImageContainer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                sliderLine.style.left = percentage + '%';
            }

            function getCursorPos(e) {
                e = e.changedTouches ? e.changedTouches[0] : e;
                return e.pageX;
            }

            // Hover functionality: slide on mousemove over the container
            container.addEventListener('mousemove', function (e) {
                const pos = getCursorPos(e);
                slide(pos);
            });

            // Touch support: move slider on touch move
            container.addEventListener('touchmove', function (e) {
                const pos = getCursorPos(e);
                slide(pos);
            });

            // Initialize dimensions
            updateDimensions();
        });
    }

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