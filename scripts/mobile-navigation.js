// Explicit Mobile Navigation Script
(function() {
    // Logging function with multiple channels
    function log(message, type = 'log') {
        const methods = {
            'log': console.log,
            'warn': console.warn,
            'error': console.error
        };
        
        // Browser console
        methods[type](`🚀 MOBILE NAV: ${message}`);
        
        // Optional: Add visual logging to page
        const logContainer = document.getElementById('mobile-nav-log') || 
            (() => {
                const container = document.createElement('div');
                container.id = 'mobile-nav-log';
                container.style.cssText = `
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: black;
                    color: lime;
                    padding: 10px;
                    z-index: 9999;
                    font-family: monospace;
                `;
                document.body.appendChild(container);
                return container;
            })();
        
        logContainer.innerHTML += `<div>${message}</div>`;
    }

    // Comprehensive Mobile Navigation Creation
    function createMobileNavigation() {
        try {
            log('Initializing Mobile Navigation', 'warn');

            // Detect navigation container
            const originalNav = document.querySelector('.nav-links');
            if (!originalNav) {
                log('No .nav-links found! Check HTML structure.', 'error');
                return;
            }

            // Create mobile toggle
            const mobileToggle = document.createElement('div');
            mobileToggle.id = 'mobile-nav-toggle';
            mobileToggle.innerHTML = `
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            mobileToggle.style.cssText = `
                display: none;
                position: fixed;
                top: 15px;
                right: 15px;
                width: 30px;
                height: 20px;
                z-index: 1000;
                cursor: pointer;
                background: red;
            `;

            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.id = 'mobile-nav-menu';
            mobileMenu.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                z-index: 999;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            `;

            // Clone navigation links
            const mobileNavLinks = originalNav.cloneNode(true);
            mobileMenu.appendChild(mobileNavLinks);

            // Append to body
            document.body.appendChild(mobileToggle);
            document.body.appendChild(mobileMenu);

            // Toggle functionality
            mobileToggle.addEventListener('click', () => {
                log('Mobile Menu Toggled', 'warn');
                mobileToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                } else {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // Responsive show/hide
            function checkMobileView() {
                const isMobile = window.innerWidth <= 768;
                log(`Mobile View Detected: ${isMobile}`, 'warn');
                
                if (isMobile) {
                    mobileToggle.style.display = 'block';
                    originalNav.style.display = 'none';
                } else {
                    mobileToggle.style.display = 'none';
                    mobileMenu.style.display = 'none';
                    originalNav.style.display = 'flex';
                }
            }

            // Initial check and resize listener
            checkMobileView();
            window.addEventListener('resize', checkMobileView);

            log('Mobile Navigation Successfully Created', 'log');
        } catch (error) {
            log(`Error creating mobile navigation: ${error.message}`, 'error');
        }
    }

    // Ensure DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMobileNavigation);
    } else {
        createMobileNavigation();
    }
})();
