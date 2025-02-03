document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();

    // Highlight active navigation item
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth Page Transitions
    function smoothPageTransition(event) {
        event.preventDefault();
        const targetUrl = event.target.getAttribute('href');
        
        // Fade out current page
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    }

    // Add smooth transition to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothPageTransition);
    });

    // Optional: Preload next page for faster navigation
    function preloadPage(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        preloadPage(href);
    });
});

// Add transition styles
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    body {
        transition: opacity 0.3s ease-in-out;
    }
    body.page-transition {
        opacity: 0;
    }
`;
document.head.appendChild(transitionStyles);
