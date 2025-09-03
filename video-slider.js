
        // Testimonial data with thumbnail images
        const testimonials = [
            {
                id: 1,
                name: "Neil & Sabrina",
                title: "Augment Agency",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
                rating: 5,
                youtubeId: "8LSt8_11wbQ",
                thumbnail: "images/thumbnail-image.webp",
                description: "Amazing results for our e-commerce product photos!"
            },
            {
                id: 2,
                name: "Marcus Chen",
                title: "Product Photographer",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
                rating: 5,
                youtubeId: "tOwjEOt1zYU",
                thumbnail: "images/thumbnail-image.webp",
                description: "Professional clipping path service that saves me hours of work."
            },
            {
                id: 3,
                name: "Sarah Williams",
                title: "E-commerce Owner",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMOvkk0KwwYRrgi2zF2PT_vxwoh9GcB_1NQ&s",
                rating: 5,
                youtubeId: "sO4te2QNsHY",
                thumbnail: "images/thumbnail-image.webp",
                description: "Perfect background removal for our online store products."
            },
            {
                id: 4,
                name: "David Rodriguez",
                title: "Fashion Influencer",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
                rating: 5,
                youtubeId: "1UnIDL-eHOs",
                thumbnail: "images/thumbnail-image.webp",
                description: "Outstanding quality and fast turnaround for fashion shoots."
            },
            {
                id: 5,
                name: "Emily Foster",
                title: "Wedding Photographer",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
                rating: 5,
                youtubeId: "WSUj3PRvzzg",
                thumbnail: "images/thumbnail-image.webp",
                description: "Flawless photo editing that enhances our wedding portfolio."
            },
            {
                id: 6,
                name: "James Thompson",
                title: "Studio Owner",
                avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face",
                rating: 5,
                youtubeId: "pU5kvweq-EE",
                thumbnail: "images/thumbnail-image.webp",
                description: "Reliable service that helps us deliver premium results to clients."
            }
        ];

        // Global variables
        let currentIndex = 0;
        let autoplayInterval = null;
        let isVideoPlaying = false;

        // Utility function to extract YouTube video ID
        function extractYouTubeId(url) {
            if (!url) return null;
            if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
                return url;
            }
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }

        // Update YouTube video
        function updateVideo(youtubeId) {
            const youtubePlayer = document.getElementById('youtubePlayer');
            const videoLoading = document.getElementById('videoLoading');

            if (!youtubePlayer) return;

            const videoId = extractYouTubeId(youtubeId) || youtubeId;

            // Show loading indicator
            if (videoLoading) {
                videoLoading.classList.remove('hidden');
            }

            // Update iframe source
            const newSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&autoplay=${isVideoPlaying ? 1 : 0}&mute=1`;
            youtubePlayer.src = newSrc;

            // Hide loading indicator
            setTimeout(() => {
                if (videoLoading) {
                    videoLoading.classList.add('hidden');
                }
            }, 1000);

            console.log('Video updated to:', videoId);
        }

        // Show video and hide thumbnail
        function videoShow() {
            const imageShow = document.getElementById('imageShow');
            const videoShow = document.getElementById('videoShow');
            const youtubePlayer = document.getElementById('youtubePlayer');

            imageShow.classList.add('hidden');
            videoShow.classList.remove('hidden');
            isVideoPlaying = true;

            // Ensure autoplay
            let src = youtubePlayer.src;
            if (!src.includes('autoplay=1')) {
                youtubePlayer.src = src.replace('autoplay=0', 'autoplay=1');
            }

            console.log('Video shown for testimonial:', testimonials[currentIndex].name);
            resetAutoplay();
        }

        // Reset to thumbnail view
        function resetToThumbnail() {
            const imageShow = document.getElementById('imageShow');
            const videoShow = document.getElementById('videoShow');
            const youtubePlayer = document.getElementById('youtubePlayer');

            videoShow.classList.add('hidden');
            imageShow.classList.remove('hidden');
            isVideoPlaying = false;

            // Reset video source to prevent autoplay
            let src = youtubePlayer.src;
            if (src.includes('autoplay=1')) {
                youtubePlayer.src = src.replace('autoplay=1', 'autoplay=0');
            }

            console.log('Reset to thumbnail for testimonial:', testimonials[currentIndex].name);
        }

        // Initialize the slider
        function init() {
            console.log('Initializing slider with', testimonials.length, 'testimonials');
            updateTotalSlides();
            renderAvatars();
            updateCurrentTestimonial();
            setupEventListeners();
            startAutoplay();
        }

        // Update total slides display
        function updateTotalSlides() {
            const totalSlidesEl = document.getElementById('totalSlides');
            if (totalSlidesEl) {
                totalSlidesEl.textContent = testimonials.length;
            }
        }

        // Render avatar navigation
        function renderAvatars() {
            const avatarContainer = document.getElementById('avatarContainer');
            if (!avatarContainer) return;

            avatarContainer.innerHTML = testimonials.map((testimonial, index) => `
                <div class="avatar-item cursor-pointer transform hover:scale-110 transition-all duration-300 ${index === currentIndex ? 'ring-4 ring-cyan-400 ring-offset-2' : ''}" 
                     data-index="${index}">
                    <div class="avatar-ring">
                        <div class="avatar-inner">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" 
                                 class="w-14 h-14 rounded-full object-cover">
                        </div>
                    </div>
                </div>
            `).join('');

            console.log('Avatars rendered');
        }

        // Update current testimonial display
        function updateCurrentTestimonial() {
            const current = testimonials[currentIndex];
            console.log('Updating to testimonial:', current.name, 'Video ID:', current.youtubeId);

            // Get DOM elements
            const currentAvatar = document.getElementById('currentAvatar');
            const reviewerName = document.getElementById('reviewerName');
            const reviewerTitle = document.getElementById('reviewerTitle');
            const testimonialQuote = document.getElementById('testimonialQuote');
            const starRating = document.getElementById('starRating');
            const currentSlide = document.getElementById('currentSlide');
            const thumbnailImage = document.getElementById('thumbnailImage');

            // Reset to thumbnail view
            resetToThumbnail();

            // Update thumbnail
            if (thumbnailImage) {
                thumbnailImage.style.opacity = '0.5';
                setTimeout(() => {
                    thumbnailImage.src = current.thumbnail;
                    thumbnailImage.alt = `${current.name} Thumbnail`;
                    thumbnailImage.style.opacity = '1';
                }, 150);
            }

            // Update other content
            if (currentAvatar) {
                currentAvatar.style.opacity = '0.5';
                setTimeout(() => {
                    currentAvatar.src = current.avatar;
                    currentAvatar.alt = current.name;
                    currentAvatar.style.opacity = '1';
                }, 150);
            }

            if (reviewerName) {
                reviewerName.style.opacity = '0.5';
                setTimeout(() => {
                    reviewerName.textContent = current.name;
                    reviewerName.style.opacity = '1';
                }, 150);
            }

            if (reviewerTitle) {
                reviewerTitle.style.opacity = '0.5';
                setTimeout(() => {
                    reviewerTitle.textContent = current.title;
                    reviewerTitle.style.opacity = '1';
                }, 150);
            }

            if (testimonialQuote) {
                testimonialQuote.style.opacity = '0.5';
                setTimeout(() => {
                    testimonialQuote.textContent = `"${current.description}"`;
                    testimonialQuote.style.opacity = '1';
                }, 150);
            }

            if (starRating) {
                starRating.innerHTML = Array(current.rating).fill().map(() =>
                    '<span class="star text-xl">★</span>'
                ).join('');
            }

            if (currentSlide) {
                currentSlide.textContent = currentIndex + 1;
            }

            // Update video source (but keep it hidden until clicked)
            updateVideo(current.youtubeId);

            // Update avatar selection
            renderAvatars();
        }

        // Navigation functions
        function goToSlide(index) {
            console.log('Going to slide:', index);
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;
            currentIndex = index;
            updateCurrentTestimonial();
            resetAutoplay();
        }

        function nextSlide() {
            console.log('Next slide clicked');
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            console.log('Previous slide clicked');
            goToSlide(currentIndex - 1);
        }

   /*      // Autoplay functions
        function startAutoplay() {
            console.log('Starting autoplay');
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                console.log('Autoplay advancing slide');
                nextSlide();
            }, 5000);
        }

        function stopAutoplay() {
            console.log('Stopping autoplay');
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        } */

        // Setup event listeners
        function setupEventListeners() {
            console.log('Setting up event listeners');

            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const avatarContainer = document.getElementById('avatarContainer');

            if (prevBtn) {
                prevBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    console.log('Previous button clicked');
                    prevSlide();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    console.log('Next button clicked');
                    nextSlide();
                });
            }

            if (avatarContainer) {
                avatarContainer.addEventListener('click', function (e) {
                    e.preventDefault();
                    const avatarItem = e.target.closest('.avatar-item');
                    if (avatarItem) {
                        const index = parseInt(avatarItem.dataset.index);
                        console.log('Avatar clicked, index:', index);
                        if (!isNaN(index)) {
                            goToSlide(index);
                        }
                    }
                });
            }

            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
            });

            console.log('Event listeners set up successfully');
        }

        // Start the slider
        document.addEventListener('DOMContentLoaded', function () {
            console.log('DOM loaded, initializing slider...');
            init();
        });
