
class TestimonialCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.track = document.getElementById('testimonialTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play carousel
        setInterval(() => this.nextSlide(), 5000);
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600');
            } else {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300');
            }
        });

        // Update navigation buttons
        this.prevBtn.classList.toggle('opacity-50', this.currentSlide === 0);
        this.nextBtn.classList.toggle('opacity-50', this.currentSlide === this.totalSlides - 1);
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0; // Loop back to first slide
        }
        this.updateCarousel();
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.totalSlides - 1; // Loop to last slide
        }
        this.updateCarousel();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});




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