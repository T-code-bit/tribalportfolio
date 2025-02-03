// Import modules
import { TextScramble, cycleSubtitles } from './modules/text-scramble.js';
import { initSkillVisualization } from './modules/skill-visualization.js';
import { initProjectShowcase } from './modules/project-showcase.js';
import { InteractiveBackground, initInteractiveBackground } from './modules/interactive-background.js';
import { 
    animateCounter, 
    lazyLoadImages, 
    optimizeScrollPerformance,
    setupAccessibility,
    initPerformanceMonitoring
} from './utils/performance.js';

// Theme Toggle Functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    themeSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        
        // Store theme preference
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeSwitch.checked = false;
    }
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Initialize Portfolio
function initializePortfolio() {
    // Text Scramble for Subtitle
    const subtitleElement = document.querySelector('.text-scramble');
    if (subtitleElement) {
        cycleSubtitles(subtitleElement);
    }

    // Animate Counters
    const statsElements = document.querySelectorAll('.stat-value');
    statsElements.forEach(statElement => {
        const target = parseInt(statElement.dataset.target, 10);
        animateCounter(statElement, target);
    });

    // Performance Optimizations
    lazyLoadImages();
    optimizeScrollPerformance();
    setupAccessibility();
    initPerformanceMonitoring();

    // Initialize Modules
    initSkillVisualization();
    initProjectShowcase();
    initInteractiveBackground();
    initThemeToggle();
    initSmoothScroll();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);
