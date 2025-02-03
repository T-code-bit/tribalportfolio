// Aggressive Mobile Navigation Script
(function() {
    console.error('🚨 Mobile Navigation Script Loaded');
    
    // Force mobile navigation creation
    function createMobileNavigation() {
        console.error('🛠️ Creating Mobile Navigation');
        
        // Create mobile toggle button
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
        const originalNav = document.querySelector('.nav-links');
        if (originalNav) {
            const mobileNavLinks = originalNav.cloneNode(true);
            mobileMenu.appendChild(mobileNavLinks);
        }

        // Append to body
        document.body.appendChild(mobileToggle);
        document.body.appendChild(mobileMenu);

        // Toggle functionality
        mobileToggle.addEventListener('click', () => {
            console.error('🔄 Mobile Menu Toggled');
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
            console.error(`📱 Mobile View: ${isMobile}`);
            
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
    }

    // Ensure DOM is loaded before creating navigation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMobileNavigation);
    } else {
        createMobileNavigation();
    }
})();
