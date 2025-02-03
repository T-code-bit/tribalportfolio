document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.classList.add('mobile-nav-toggle');
    mobileNavToggle.innerHTML = `
        <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    // Mobile Navigation Menu
    const mobileNavMenu = document.createElement('div');
    mobileNavMenu.classList.add('mobile-nav-menu');

    // Clone navigation links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const mobileNavLinks = navLinks.cloneNode(true);
        mobileNavMenu.appendChild(mobileNavLinks);
    }

    // Append to body
    document.body.appendChild(mobileNavToggle);
    document.body.appendChild(mobileNavMenu);

    // Toggle Mobile Menu
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
    });

    // Close menu when a link is clicked
    const mobileMenuLinks = mobileNavMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
    });

    // Swipe gesture for mobile menu
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

        if (swiped === 'left' && !mobileNavMenu.classList.contains('active')) {
            mobileNavToggle.classList.add('active');
            mobileNavMenu.classList.add('active');
            document.body.classList.add('mobile-menu-open');
        } else if (swiped === 'right' && mobileNavMenu.classList.contains('active')) {
            mobileNavToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    }
});

// Mobile Navigation Styles
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }

        .mobile-nav-toggle {
            display: block;
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 1000;
            cursor: pointer;
        }

        .mobile-nav-toggle .hamburger-icon {
            width: 30px;
            height: 20px;
            position: relative;
            transform: rotate(0deg);
            transition: .5s ease-in-out;
            cursor: pointer;
        }

        .mobile-nav-toggle .hamburger-icon span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: var(--primary-color, #00ffff);
            border-radius: 9px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }

        .mobile-nav-toggle .hamburger-icon span:nth-child(1) {
            top: 0px;
        }

        .mobile-nav-toggle .hamburger-icon span:nth-child(2) {
            top: 10px;
        }

        .mobile-nav-toggle .hamburger-icon span:nth-child(3) {
            top: 20px;
        }

        .mobile-nav-toggle.active .hamburger-icon span:nth-child(1) {
            top: 10px;
            transform: rotate(135deg);
        }

        .mobile-nav-toggle.active .hamburger-icon span:nth-child(2) {
            opacity: 0;
            left: -60px;
        }

        .mobile-nav-toggle.active .hamburger-icon span:nth-child(3) {
            top: 10px;
            transform: rotate(-135deg);
        }

        .mobile-nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100%;
            background: var(--background-dark, #0a0a1a);
            z-index: 999;
            transition: 0.3s ease-in-out;
            padding: 100px 20px 20px;
            box-shadow: -10px 0 15px rgba(0,0,0,0.2);
        }

        .mobile-nav-menu.active {
            right: 0;
        }

        .mobile-nav-menu .nav-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .mobile-nav-menu .nav-links li {
            width: 100%;
            text-align: center;
        }

        .mobile-nav-menu .nav-links a {
            font-size: 18px;
            color: var(--primary-color, #00ffff);
            text-decoration: none;
            padding: 10px;
            display: block;
            transition: background 0.3s ease;
        }

        .mobile-nav-menu .nav-links a:hover,
        .mobile-nav-menu .nav-links a.active {
            background: rgba(0,255,255,0.1);
        }

        body.mobile-menu-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(mobileNavStyles);
