console.log('🚀 Navigation Script Loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 DOM Fully Loaded');
    // Navigation Configuration
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();
    console.log('📍 Current Path:', currentPath);
    console.log('🔗 Nav Links Found:', navLinks.length);

    // Highlight Active Navigation Item
    function highlightActiveNavigation() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (href === currentPath || 
                (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Mobile Navigation Toggle
    function setupMobileNavigation() {
        const navToggle = document.createElement('div');
        navToggle.classList.add('mobile-nav-toggle');
        navToggle.innerHTML = `
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        const navMenu = document.createElement('div');
        navMenu.classList.add('mobile-nav-menu');

        // Clone navigation links
        const originalNavLinks = document.querySelector('.nav-links');
        if (originalNavLinks) {
            const mobileNavLinks = originalNavLinks.cloneNode(true);
            navMenu.appendChild(mobileNavLinks);
        }

        // Add to body
        document.body.appendChild(navToggle);
        document.body.appendChild(navMenu);

        // Toggle Mobile Menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });

        // Close menu when link clicked
        const mobileLinks = navMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            });
        });
    }

    // Responsive Navigation
    function setupResponsiveNavigation() {
        function checkScreenSize() {
            const isMobile = window.innerWidth <= 768;
            const originalNavLinks = document.querySelector('.nav-links');
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const mobileNavMenu = document.querySelector('.mobile-nav-menu');

            if (isMobile) {
                if (originalNavLinks) originalNavLinks.style.display = 'none';
                if (mobileNavToggle) mobileNavToggle.style.display = 'block';
            } else {
                if (originalNavLinks) originalNavLinks.style.display = 'flex';
                if (mobileNavToggle) mobileNavToggle.style.display = 'none';
                if (mobileNavMenu) mobileNavMenu.classList.remove('active');
            }
        }

        // Initial check and add resize listener
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    }

    // Smooth Page Transitions
    function setupSmoothTransitions() {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetUrl = link.getAttribute('href');
                
                // Fade out current page
                document.body.classList.add('page-transition');
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        });
    }

    // Initialize Navigation Features
    highlightActiveNavigation();
    setupMobileNavigation();
    setupResponsiveNavigation();
    setupSmoothTransitions();
});

// Transition Styles
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
