// Mobile Menu Interaction
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.mobile-nav ul li a');

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isMenuOpen = menuToggle.checked;
        const isMenuOrHamburger = event.target.closest('.hamburger-menu');
        
        if (isMenuOpen && !isMenuOrHamburger) {
            menuToggle.checked = false;
        }
    });
});
