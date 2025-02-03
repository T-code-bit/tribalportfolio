(function() {
    // Minimal logging function
    function log(message, type = 'log') {
        // Intentionally left minimal for potential future debugging
    }

    // Comprehensive Mobile Navigation Creation
    function createMobileNavigation() {
        try {
            // Detect navigation container
            const originalNav = document.querySelector('.nav-links');
            if (!originalNav) {
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

            // Responsive visibility
            function updateMobileVisibility() {
                const isMobile = window.innerWidth <= 768;
                mobileToggle.style.display = isMobile ? 'block' : 'none';
                originalNav.style.display = isMobile ? 'none' : 'flex';
            }

            // Initial and responsive setup
            updateMobileVisibility();
            window.addEventListener('resize', updateMobileVisibility);

        } catch (error) {
            console.error('Mobile Navigation Setup Failed:', error);
        }
    }

    // Ensure DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMobileNavigation);
    } else {
        createMobileNavigation();
    }
})();
