// Performance Optimization Utilities
export function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * (target - start) + start);
        
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

export function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.add('loaded');
                observer.unobserve(image);
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px'
    });

    images.forEach(image => imageObserver.observe(image));
}

export function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollPosition() {
        // Add scroll-based optimizations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    });
}

export function setupAccessibility() {
    // Add keyboard navigation
    document.querySelectorAll('.nav-menu-item').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Add ARIA attributes dynamically
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.setAttribute('aria-label', section.id);
    });
}

export function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load took ${loadTime} milliseconds`);
        });
    }
}
