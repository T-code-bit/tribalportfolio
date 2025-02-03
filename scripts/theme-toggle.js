// Theme Toggle Functionality
(function() {
    // Theme Configuration
    const themes = {
        light: {
            background: '#ffffff',
            text: '#333333',
            primary: '#3498db',
            secondary: '#2ecc71',
            accent: '#e74c3c'
        },
        dark: {
            background: '#121212',
            text: '#ffffff',
            primary: '#bb86fc',
            secondary: '#03dac6',
            accent: '#cf6679'
        }
    };

    // Theme Toggle Elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Local Storage Management
    function getStoredTheme() {
        return localStorage.getItem('portfolio-theme') || 'light';
    }

    function setStoredTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }

    // Apply Theme
    function applyTheme(themeName) {
        const theme = themes[themeName];
        
        // Update CSS Variables
        document.documentElement.style.setProperty('--bg-color', theme.background);
        document.documentElement.style.setProperty('--text-color', theme.text);
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);

        // Update Theme Attributes
        document.documentElement.setAttribute('data-theme', themeName);

        // Update Toggle Icon
        if (themeIcon) {
            themeIcon.textContent = themeName === 'dark' ? '🌞' : '🌙';
        }
    }

    // Toggle Theme
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        setStoredTheme(newTheme);
    }

    // Initialize Theme on Load
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = getStoredTheme();
        applyTheme(savedTheme);

        // Attach Toggle Event
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    });
})();
