

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

// Services dropdown
const servicesToggle = document.getElementById('mobile-services-toggle');
const servicesMenu = document.getElementById('mobile-services-menu');
const servicesArrow = document.getElementById('services-arrow');

// Portfolio dropdown
const portfolioToggle = document.getElementById('mobile-portfolio-toggle');
const portfolioMenu = document.getElementById('mobile-portfolio-menu');
const portfolioArrow = document.getElementById('portfolio-arrow');

function openMobileMenu() {
    mobileMenu.classList.remove('-translate-x-full');
    mobileMenuOverlay.classList.remove('opacity-0', 'invisible');
    document.body.style.overflow = 'hidden';
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
}

function closeMobileMenu() {
    mobileMenu.classList.add('-translate-x-full');
    mobileMenuOverlay.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = '';
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

function toggleDropdown(menu, arrow) {
    const isOpen = menu.style.maxHeight !== '0px';

    if (isOpen) {
        // Close the dropdown
        menu.style.maxHeight = '0px';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // Open the dropdown - calculate the full height
        menu.style.maxHeight = 'none';
        const height = menu.scrollHeight;
        menu.style.maxHeight = '0px';

        // Force reflow and then set the height
        setTimeout(() => {
            menu.style.maxHeight = height + 'px';
        }, 10);

        arrow.style.transform = 'rotate(180deg)';
    }
}

// Event listeners
mobileMenuButton.addEventListener('click', () => {
    if (mobileMenu.classList.contains('-translate-x-full')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

servicesToggle.addEventListener('click', () => {
    toggleDropdown(servicesMenu, servicesArrow);
});

portfolioToggle.addEventListener('click', () => {
    toggleDropdown(portfolioMenu, portfolioArrow);
});

// Close mobile menu when clicking on navigation links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeMobileMenu, 150);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('-translate-x-full')) {
        closeMobileMenu();
    }
});



// according button
    const accordionButtons = document.querySelectorAll('.accordion-btn');

    accordionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('svg');

            // Close other accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
                }
            });

            // Toggle current accordion
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    });