// Mobile Menu Interactions
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileSections = document.querySelectorAll('.mobile-section');
    const mobileCTAButtons = document.querySelectorAll('.mobile-cta-button');

    // Close menu when a CTA button is clicked
    mobileCTAButtons.forEach(button => {
        button.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });

    // Optional: Smooth scrolling for mobile sections
    mobileSections.forEach(section => {
        const links = section.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    menuToggle.checked = false;
                }
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isMenuOpen = menuToggle.checked;
        const isMenuOrHamburger = event.target.closest('.hamburger-menu');
        
        if (isMenuOpen && !isMenuOrHamburger) {
            menuToggle.checked = false;
        }
    });
});
