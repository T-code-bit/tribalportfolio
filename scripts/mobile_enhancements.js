// Mobile-First Interactive Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Touch-Friendly Navigation
    function enhanceMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', 
                    navMenu.classList.contains('active'));
            }, { passive: false });

            // Close menu when clicking outside
            document.addEventListener('touchstart', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Swipe Gesture Navigation
    function implementSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const threshold = 100; // Minimum swipe distance
            const swiped = touchEndX < touchStartX - threshold ? 'left' :
                           touchEndX > touchStartX + threshold ? 'right' : 'none';

            switch(swiped) {
                case 'left':
                    // Navigate to next section or page
                    break;
                case 'right':
                    // Navigate to previous section or page
                    break;
            }
        }
    }

    // Progressive Image Loading
    function implementProgressiveImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Battery-Aware Performance
    function adjustPerformanceForBattery() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    // Reduce animations and complex interactions
                    document.body.classList.add('low-battery-mode');
                }
            });
        }
    }

    // Initialize Mobile Enhancements
    enhanceMobileNavigation();
    implementSwipeNavigation();
    implementProgressiveImageLoading();
    adjustPerformanceForBattery();
});

// Offline Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
