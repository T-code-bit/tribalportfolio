// Utility Functions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Advanced Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Text Scramble on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Innovative Problem Solver',
        'Digital Strategist',
        'Technology Architect',
        'Global Innovator'
    ];

    const el = document.querySelector('.text-scramble');
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000);
        });
        counter = (counter + 1) % phrases.length;
    };

    next();
});

// Subtitle Cycling with Text Scramble
document.addEventListener('DOMContentLoaded', () => {
    const subtitleElement = document.querySelector('.text-scramble');
    const roles = [
        'Full Stack Developer',
        'Data Scientist',
        'Tech Innovator',
        'Cloud Architect',
        'AI Enthusiast',
        'Machine Learning Engineer',
        'Blockchain Developer',
        'Cybersecurity Specialist',
        'DevOps Architect',
        'Quantum Computing Researcher'
    ];

    const fx = new TextScramble(subtitleElement);
    let counter = 0;

    const next = () => {
        fx.setText(roles[counter]).then(() => {
            setTimeout(next, 5000); 
        });
        counter = (counter + 1) % roles.length;
    };

    next();
});

// Time Management Utility
const TimeManager = {
    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (!timeElement) return;

        const now = new Date();
        const options = {
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false,
            timeZone: 'UTC'
        };
        
        timeElement.textContent = now.toLocaleTimeString('en-US', options) + ' UTC';
    },

    init() {
        this.updateTime();
        setInterval(this.updateTime.bind(this), 1000);
    }
};

// Stats Counter Animation
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * (target - start) + start);
        
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Intersection Observer for Stats
document.addEventListener('DOMContentLoaded', () => {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsElements = entry.target.querySelectorAll('.stat-value');
                statsElements.forEach(statElement => {
                    const target = parseInt(statElement.dataset.target, 10);
                    animateCounter(statElement, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const heroStatsSection = document.querySelector('.hero-stats');
    if (heroStatsSection) {
        statsObserver.observe(heroStatsSection);
    }

    // Initialize Time Manager
    TimeManager.init();
});

// Inspirational Quotes System
const QuoteManager = {
    quotes: [
        {
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            category: "Motivation"
        },
        {
            quote: "Code is poetry in motion, and every programmer is a digital artist.",
            author: "Anonymous",
            category: "Programming"
        },
        {
            quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill",
            category: "Motivation"
        },
        {
            quote: "In the world of programming, learning never stops.",
            author: "Unknown",
            category: "Learning"
        },
        {
            quote: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs",
            category: "Innovation"
        },
        {
            quote: "The best way to predict the future is to create it.",
            author: "Peter Drucker",
            category: "Inspiration"
        },
        {
            quote: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
            author: "Patrick McKenzie",
            category: "Programming"
        },
        {
            quote: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci",
            category: "Design"
        }
    ],

    lastQuoteIndex: -1,

    getUniqueRandomQuote() {
        // Ensure we don't repeat the last quote
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.quotes.length);
        } while (newIndex === this.lastQuoteIndex && this.quotes.length > 1);

        this.lastQuoteIndex = newIndex;
        return this.quotes[newIndex];
    },

    displayQuote() {
        try {
            const quoteElement = document.querySelector('.quote-text');
            const authorElement = document.querySelector('.quote-author');

            if (!quoteElement || !authorElement) {
                console.error('Quote display elements not found');
                return;
            }

            const quote = this.getUniqueRandomQuote();
            
            // Animate quote change
            quoteElement.classList.add('quote-fade-out');
            authorElement.classList.add('quote-fade-out');

            setTimeout(() => {
                quoteElement.textContent = `"${quote.quote}"`;
                authorElement.textContent = `- ${quote.author}`;
                
                quoteElement.classList.remove('quote-fade-out');
                authorElement.classList.remove('quote-fade-out');
                quoteElement.classList.add('quote-fade-in');
                authorElement.classList.add('quote-fade-in');

                // Remove animation classes
                setTimeout(() => {
                    quoteElement.classList.remove('quote-fade-in');
                    authorElement.classList.remove('quote-fade-in');
                }, 500);
            }, 500);
        } catch (error) {
            console.error('Quote display failed:', error);
        }
    },

    init() {
        // Initial quote display
        this.displayQuote();
        
        // Refresh quote every 5 minutes
        setInterval(() => this.displayQuote(), 5 * 60 * 1000);
    }
};

// Enhanced Navigation and Section Management
const NavigationManager = {
    init() {
        console.log('NavigationManager: Initializing');
        
        const navItems = document.querySelectorAll('.nav-menu-item');
        const sections = document.querySelectorAll('.section');

        console.log(`NavigationManager: Found ${navItems.length} nav items and ${sections.length} sections`);

        // Debugging: Log section details
        sections.forEach(section => {
            console.log(`Section: ${section.id}, Initial Classes: ${section.className}`);
        });

        // Ensure all sections are hidden initially
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Default to showing Home section
        const homeSection = document.getElementById('home');

        if (homeSection) {
            homeSection.classList.add('active');
            homeSection.style.display = 'block';
            console.log('NavigationManager: Home section activated');
        }

        // Navigation click handler
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                console.log(`NavigationManager: Clicked item with target ${item.getAttribute('data-target')}`);

                // Remove active class from all sections and hide them
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                });

                // Get target section
                const targetSectionId = item.getAttribute('data-target');
                const targetSection = document.getElementById(targetSectionId);

                // Add active class to target section and make it visible
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.display = 'block';
                    console.log(`NavigationManager: Activated section ${targetSectionId}`);
                } else {
                    console.error(`NavigationManager: Could not find section with id ${targetSectionId}`);
                }

                // Optional: Highlight active navigation item
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
            });
        });

        console.log('NavigationManager: Initialization complete');
    }
};

// Custom Cursor
const CursorManager = {
    init() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (!cursorDot || !cursorOutline) return;

        const moveCursor = (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        };

        const addCursorHover = () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        };

        const removeCursorHover = () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', addCursorHover);
        document.addEventListener('mouseout', removeCursorHover);
    }
};

// Performance Optimization: Lazy Loading and Intersection Observer
const LazyLoadManager = {
    init() {
        this.observeImages();
        this.optimizePerformance();
    },

    observeImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.add('loaded');
                        observer.unobserve(lazyImage);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    },

    optimizePerformance() {
        // Debounce scroll and resize events
        window.addEventListener('scroll', Utils.debounce(() => {
            this.handleScrollPerformance();
        }, 100));

        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResizePerformance();
        }, 250));
    },

    handleScrollPerformance() {
        // Pause animations and heavy computations when scrolling
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (this.isElementInViewport(section)) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    },

    handleResizePerformance() {
        // Recalculate and adjust layouts on window resize
        this.adjustResponsiveLayouts();
    },

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    adjustResponsiveLayouts() {
        const heroContent = document.querySelector('.hero-content');
        const skillsOverview = document.querySelector('.skills-overview');
        
        if (window.innerWidth < 768) {
            heroContent?.classList.add('mobile');
            skillsOverview?.classList.add('mobile');
        } else {
            heroContent?.classList.remove('mobile');
            skillsOverview?.classList.remove('mobile');
        }
    }
};

// Enhanced Error Handling and Logging
const ErrorTracker = {
    init() {
        window.addEventListener('error', (event) => {
            console.error('Unhandled Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
        });
    }
};

// Advanced Contact Form Interactions
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formGroups = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const contactSection = document.getElementById('contact');

    // Character Counter for Message
    const messageTextarea = document.getElementById('message');
    const charCounter = document.createElement('div');
    charCounter.classList.add('char-counter');
    messageTextarea.parentNode.insertBefore(charCounter, messageTextarea.nextSibling);

    messageTextarea.addEventListener('input', () => {
        const maxLength = 500;
        const currentLength = messageTextarea.value.length;
        charCounter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            messageTextarea.value = messageTextarea.value.slice(0, maxLength);
            charCounter.classList.add('limit-exceeded');
        } else {
            charCounter.classList.remove('limit-exceeded');
        }
    });

    // Typing Effect for Contact Title
    const contactTitle = contactSection.querySelector('.contact-title');
    const originalText = contactTitle.textContent;
    
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Intersection Observer for Typing Effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(contactTitle, originalText);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(contactTitle);

    // Copy Contact Details
    const contactDetails = contactSection.querySelectorAll('.contact-detail');
    contactDetails.forEach(detail => {
        const copyIcon = document.createElement('i');
        copyIcon.classList.add('fas', 'fa-copy', 'copy-icon');
        copyIcon.setAttribute('title', 'Copy to Clipboard');
        detail.appendChild(copyIcon);

        copyIcon.addEventListener('click', () => {
            const textToCopy = detail.querySelector('span').textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyIcon.classList.add('copied');
                setTimeout(() => {
                    copyIcon.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // Input Interactions
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        // Floating Label Effect
        input.addEventListener('focus', () => {
            group.classList.add('is-focused');
        });

        input.addEventListener('blur', () => {
            group.classList.remove('is-focused');
            validateInput(input);
        });

        // Real-time Validation
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });

    // Form Validation Function
    function validateInput(input) {
        const group = input.closest('.form-group');
        
        if (input.value.trim() === '') {
            group.classList.add('is-invalid');
            group.classList.remove('is-valid');
            return false;
        } else {
            // Additional specific validations
            switch(input.id) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        group.classList.add('is-invalid');
                        group.classList.remove('is-valid');
                        return false;
                    }
                    break;
                case 'name':
                    if (input.value.length < 2) {
                        group.classList.add('is-invalid');
                        group.classList.remove('is-valid');
                        return false;
                    }
                    break;
            }
            
            group.classList.remove('is-invalid');
            group.classList.add('is-valid');
            return true;
        }
    }

    // Form Submission Handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Submission Animation
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending</span>
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            `;

            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                submitBtn.classList.remove('sending');
                submitBtn.classList.add('sent');
                submitBtn.innerHTML = `
                    <span>Message Sent!</span>
                    <i class="fas fa-check"></i>
                `;

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                        <i class="fas fa-paper-plane"></i>
                    `;
                    formGroups.forEach(group => {
                        group.classList.remove('is-valid', 'is-invalid', 'is-focused');
                    });
                }, 3000);
            }, 2000);
        }
    });

    // Enhanced Social Media Link Interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('i');
            icon.classList.add('fa-bounce');
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.classList.add('social-tooltip');
            tooltip.textContent = icon.parentElement.getAttribute('aria-label');
            e.currentTarget.appendChild(tooltip);
        });

        link.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('i');
            icon.classList.remove('fa-bounce');
            
            // Remove tooltip
            const tooltip = e.currentTarget.querySelector('.social-tooltip');
            if (tooltip) {
                e.currentTarget.removeChild(tooltip);
            }
        });
    });

    // Particle Background for Contact Section (Optional)
    function createParticleBackground() {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-background');
        contactSection.insertBefore(particleContainer, contactSection.firstChild);

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 80 + 40; // 40-120px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particleContainer.appendChild(particle);

            // Remove particle after animation
            particle.addEventListener('animationend', () => {
                particleContainer.removeChild(particle);
                createParticle();
            });
        }

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
    }

    // Initialize Particle Background
    createParticleBackground();
});

// Home Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Animated Stats Counter
    const statsElements = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * progress);
            
            element.textContent = currentCount;

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = target;
            }
        }, frameDuration);
    };

    // Intersection Observer for Stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statsElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    statsObserver.observe(document.querySelector('.hero-stats'));

    // Particle Background for Hero Section
    function createHeroParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.opacity = Math.random().toString();
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            
            particlesContainer.appendChild(particle);

            // Remove particle after animation
            particle.addEventListener('animationend', () => {
                particlesContainer.removeChild(particle);
                createParticle();
            });
        }

        // Create initial particles
        for (let i = 0; i < 100; i++) {
            createParticle();
        }
    }

    // Initialize Hero Particles
    createHeroParticles();

    // Animated Greeting
    const greetingElement = document.getElementById('greeting');
    const greetings = [
        'Hello, I\'m',
        'Bonjour, je suis',
        'Hola, soy',
        'こんにちは、私は',
        'Ciao, sono',
        'Hallo, ich bin'
    ];
    let currentGreetingIndex = 0;

    function cycleGreetings() {
        currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
        greetingElement.classList.add('greeting-fade');
        
        setTimeout(() => {
            greetingElement.textContent = greetings[currentGreetingIndex];
            greetingElement.classList.remove('greeting-fade');
        }, 500);
    }

    // Change greeting every 3 seconds
    setInterval(cycleGreetings, 3000);

    // Download CV functionality
    const downloadCvBtn = document.querySelector('.btn-secondary');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual CV download logic
            alert('CV Download functionality to be implemented');
        });
    }
});

// Advanced Home Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = heroSection.querySelector('.hero-content');
    const heroBackground = heroSection.querySelector('.hero-background');

    // 3D Tilt Effect for Hero Section
    function applyTiltEffect() {
        const tiltStrength = 10; // Adjust tilt sensitivity

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = (mouseY / centerY) * -tiltStrength;
            const rotateY = (mouseX / centerX) * tiltStrength;

            heroContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            heroBackground.style.transform = `rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'rotateX(0) rotateY(0)';
            heroBackground.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    // Tech Stack Skill Bubbles
    function createSkillBubbles() {
        const techSkills = [
            { name: 'Python', color: '#3776AB' },
            { name: 'JavaScript', color: '#F7DF1E' },
            { name: 'React', color: '#61DAFB' },
            { name: 'Node.js', color: '#339933' },
            { name: 'Docker', color: '#2496ED' },
            { name: 'AWS', color: '#FF9900' },
            { name: 'TensorFlow', color: '#FF6F00' },
            { name: 'SQL', color: '#4479A1' },
            { name: 'Git', color: '#F05032' },
            { name: 'Linux', color: '#FCC624' }
        ];

        const bubbleContainer = document.createElement('div');
        bubbleContainer.classList.add('skill-bubble-container');
        heroSection.appendChild(bubbleContainer);

        techSkills.forEach(skill => {
            const bubble = document.createElement('div');
            bubble.classList.add('skill-bubble');
            bubble.textContent = skill.name;
            
            // Random positioning
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 80 + 40; // 40-120px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            bubbleContainer.appendChild(bubble);
        });
    }

    // Dynamic Background Gradient
    function createDynamicGradient() {
        const gradientColors = [
            'rgba(30, 30, 40, 0.9)',
            'rgba(40, 40, 50, 0.9)',
            'rgba(50, 50, 60, 0.9)',
            'rgba(60, 60, 70, 0.9)'
        ];

        let currentColorIndex = 0;

        function animateGradient() {
            currentColorIndex = (currentColorIndex + 1) % gradientColors.length;
            const nextColor = gradientColors[currentColorIndex];

            heroBackground.style.background = `linear-gradient(135deg, ${nextColor} 0%, rgba(20, 20, 30, 0.95) 100%)`;
        }

        // Change gradient every 5 seconds
        setInterval(animateGradient, 5000);
    }

    // Typing Subtitle with Multiple Roles
    function setupSubtitleTyping() {
        const subtitleElement = document.querySelector('.text-scramble');
        const roles = [
            'Full Stack Developer',
            'Data Scientist',
            'Tech Innovator',
            'Cloud Architect',
            'AI Enthusiast'
        ];
        let currentRoleIndex = 0;

        function typeSubtitle(role) {
            let currentIndex = 0;
            subtitleElement.textContent = '';

            function typeChar() {
                if (currentIndex < role.length) {
                    subtitleElement.textContent += role[currentIndex];
                    currentIndex++;
                    setTimeout(typeChar, 100);
                } else {
                    setTimeout(eraseSubtitle, 2000);
                }
            }

            function eraseSubtitle() {
                function eraseChar() {
                    if (subtitleElement.textContent.length > 0) {
                        subtitleElement.textContent = subtitleElement.textContent.slice(0, -1);
                        setTimeout(eraseChar, 50);
                    } else {
                        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                        typeSubtitle(roles[currentRoleIndex]);
                    }
                }
                eraseChar();
            }

            typeChar();
        }

        // Start typing
        typeSubtitle(roles[currentRoleIndex]);
    }

    // Initialize Advanced Interactions
    applyTiltEffect();
    createSkillBubbles();
    createDynamicGradient();
    setupSubtitleTyping();
});

// Ultra-Advanced Home Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = heroSection.querySelector('.hero-content');
    const heroBackground = heroSection.querySelector('.hero-background');
    const avatarContainer = heroSection.querySelector('.avatar-container');

    // Quantum-Inspired Interactive Background
    function createQuantumBackground() {
        const backgroundCanvas = document.createElement('canvas');
        backgroundCanvas.classList.add('hero-quantum-background');
        heroBackground.appendChild(backgroundCanvas);
        
        const ctx = backgroundCanvas.getContext('2d');
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;

        class QuantumParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * backgroundCanvas.width;
                this.y = Math.random() * backgroundCanvas.height;
                this.radius = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 3;
                this.speedY = (Math.random() - 0.5) * 3;
                this.color = this.generateQuantumColor();
                this.phase = Math.random() * Math.PI * 2;
                this.frequency = Math.random() * 0.05 + 0.01;
            }

            generateQuantumColor() {
                const baseColors = [
                    'rgba(78, 205, 196, 0.5)',   // Teal
                    'rgba(255, 107, 107, 0.5)',  // Coral
                    'rgba(103, 58, 183, 0.5)',   // Deep Purple
                    'rgba(0, 230, 118, 0.5)'     // Green
                ];
                return baseColors[Math.floor(Math.random() * baseColors.length)];
            }

            update() {
                // Quantum-like movement
                this.x += this.speedX * Math.sin(this.phase);
                this.y += this.speedY * Math.cos(this.phase);
                
                // Update phase for wave-like motion
                this.phase += this.frequency;

                // Wrap around with quantum tunneling effect
                this.x = (this.x + backgroundCanvas.width) % backgroundCanvas.width;
                this.y = (this.y + backgroundCanvas.height) % backgroundCanvas.height;
            }

            draw() {
                ctx.beginPath();
                
                // Quantum probability cloud effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0, 
                    this.x, this.y, this.radius * 3
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }

        const particlesArray = [];
        const particleCount = 300;

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new QuantumParticle());
        }

        function animateBackground() {
            // Slight motion blur effect
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(20, 20, 30, 0.05)';
            ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            
            ctx.globalCompositeOperation = 'lighter';
            
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateBackground);
        }

        animateBackground();

        // Resize handling
        window.addEventListener('resize', () => {
            backgroundCanvas.width = window.innerWidth;
            backgroundCanvas.height = window.innerHeight;
        });
    }

    // Holographic Skill Projection
    function createHolographicSkillProjection() {
        const skills = [
            { 
                name: 'AI/ML', 
                subSkills: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
                color: 'rgba(0, 230, 118, 0.7)'
            },
            { 
                name: 'Web Dev', 
                subSkills: ['React', 'Node.js', 'GraphQL'],
                color: 'rgba(255, 107, 107, 0.7)'
            },
            { 
                name: 'Cloud', 
                subSkills: ['AWS', 'Docker', 'Kubernetes'],
                color: 'rgba(103, 58, 183, 0.7)'
            }
        ];

        const hologramContainer = document.createElement('div');
        hologramContainer.classList.add('holographic-skill-projection');
        heroSection.appendChild(hologramContainer);

        skills.forEach((skill, index) => {
            const skillNode = document.createElement('div');
            skillNode.classList.add('hologram-skill-node');
            skillNode.style.setProperty('--node-color', skill.color);
            
            // Adjusted positioning - moved higher
            skillNode.style.left = `${30 + index * 30}%`;
            skillNode.style.top = `${35 + (Math.random() - 0.5) * 10}%`; // Moved from 50% to 35%

            // Create main skill label
            const mainLabel = document.createElement('div');
            mainLabel.classList.add('hologram-skill-label');
            mainLabel.textContent = skill.name;
            skillNode.appendChild(mainLabel);

            // Create sub-skill projections
            skill.subSkills.forEach((subSkill, subIndex) => {
                const subSkillProj = document.createElement('div');
                subSkillProj.classList.add('hologram-sub-skill');
                subSkillProj.textContent = subSkill;
                
                // Radial positioning of sub-skills
                const angle = (subIndex / skill.subSkills.length) * Math.PI * 2;
                const radius = 40; // Reduced from 50
                subSkillProj.style.left = `${50 + Math.cos(angle) * radius}%`;
                subSkillProj.style.top = `${50 + Math.sin(angle) * radius}%`;

                skillNode.appendChild(subSkillProj);
            });

            hologramContainer.appendChild(skillNode);
        });
    }

    // Immersive Interaction Sphere
    function createInteractionSphere() {
        const interactionSphere = document.createElement('div');
        interactionSphere.classList.add('interaction-sphere');
        heroSection.appendChild(interactionSphere);

        // Positioning adjusted to be higher
        interactionSphere.style.top = '35%';
        interactionSphere.style.left = '50%';

        // Rest of the function remains the same
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate distance and angle from center
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // Sphere transformation based on mouse position
            interactionSphere.style.transform = `
                rotate3d(${Math.sin(angle)}, ${Math.cos(angle)}, 0, ${distance / 10}deg)
                scale(${1 + distance / (rect.width * 2)})
            `;
        });

        heroSection.addEventListener('mouseleave', () => {
            interactionSphere.style.transform = 'rotate3d(0, 0, 0, 0deg) scale(1)';
        });
    }

    // Dynamic Ambient Sound (optional, requires user interaction)
    function setupAmbientSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let ambientSource = null;

        function createAmbientNoise() {
            const bufferSize = 4096;
            const noiseNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
            
            noiseNode.onaudioprocess = (e) => {
                const output = e.outputBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    // Generate soft, ambient noise
                    output[i] = Math.random() * 0.1 - 0.05;
                }
            };

            return noiseNode;
        }

        heroSection.addEventListener('mouseenter', () => {
            if (!ambientSource) {
                ambientSource = createAmbientNoise();
                ambientSource.connect(audioContext.destination);
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            if (ambientSource) {
                ambientSource.disconnect(audioContext.destination);
                ambientSource = null;
            }
        });
    }

    // Advanced Cursor Tracking
    function setupCursorTracking() {
        const cursorTracker = document.createElement('div');
        cursorTracker.classList.add('hero-cursor-tracker');
        heroSection.appendChild(cursorTracker);

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cursorTracker.style.transform = `translate(${x}px, ${y}px)`;
            cursorTracker.style.opacity = '0.5';
        });

        heroSection.addEventListener('mouseleave', () => {
            cursorTracker.style.opacity = '0';
        });
    }

    // Initialize Advanced Interactions
    createQuantumBackground();
    createHolographicSkillProjection();
    createInteractionSphere();
    
    // Only setup sound if browser supports it
    if (window.AudioContext || window.webkitAudioContext) {
        setupAmbientSound();
    }
});

// Hyper-Advanced Home Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = heroSection.querySelector('.hero-content');
    const heroBackground = heroSection.querySelector('.hero-background');
    const avatarContainer = heroSection.querySelector('.avatar-container');

    // Advanced Interactive Background
    function createAdvancedBackground() {
        const backgroundCanvas = document.createElement('canvas');
        backgroundCanvas.classList.add('hero-canvas-background');
        heroBackground.appendChild(backgroundCanvas);
        
        const ctx = backgroundCanvas.getContext('2d');
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * backgroundCanvas.width;
                this.y = Math.random() * backgroundCanvas.height;
                this.radius = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = `rgba(78, 205, 196, ${Math.random() * 0.5})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around
                if (this.x < 0 || this.x > backgroundCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > backgroundCanvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }

        const particlesArray = [];
        const particleCount = 200;

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }

        function animateBackground() {
            ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateBackground);
        }

        animateBackground();

        // Resize handling
        window.addEventListener('resize', () => {
            backgroundCanvas.width = window.innerWidth;
            backgroundCanvas.height = window.innerHeight;
        });
    }

    // Interactive Skill Network
    function createSkillNetwork() {
        const skills = [
            { name: 'Machine Learning', connections: ['Python', 'TensorFlow', 'Data Analysis'] },
            { name: 'Web Development', connections: ['JavaScript', 'React', 'Node.js'] },
            { name: 'Cloud Computing', connections: ['AWS', 'Docker', 'Kubernetes'] },
            { name: 'Data Science', connections: ['Python', 'SQL', 'Data Visualization'] }
        ];

        const networkContainer = document.createElement('div');
        networkContainer.classList.add('skill-network-container');
        heroSection.appendChild(networkContainer);

        skills.forEach(skill => {
            const skillNode = document.createElement('div');
            skillNode.classList.add('skill-network-node');
            skillNode.textContent = skill.name;
            
            // Random positioning
            skillNode.style.left = `${Math.random() * 100}%`;
            skillNode.style.top = `${Math.random() * 100}%`;

            // Create connections
            skill.connections.forEach(connection => {
                const connectionLine = document.createElement('div');
                connectionLine.classList.add('skill-network-connection');
                connectionLine.dataset.from = skill.name;
                connectionLine.dataset.to = connection;
                
                networkContainer.appendChild(connectionLine);
            });

            networkContainer.appendChild(skillNode);
        });
    }

    // Immersive Avatar Interaction
    function setupAvatarInteraction() {
        const avatarImage = avatarContainer.querySelector('.avatar-image');
        const statusDot = avatarContainer.querySelector('.status-dot');

        // Breathing animation
        function breatheAnimation() {
            avatarImage.style.transform = 'scale(1.05)';
            statusDot.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                avatarImage.style.transform = 'scale(1)';
                statusDot.style.transform = 'scale(1)';
            }, 1500);
        }

        // Periodic breathing
        setInterval(breatheAnimation, 5000);

        // Interactive hover effects
        avatarContainer.addEventListener('mouseenter', () => {
            avatarImage.style.filter = 'brightness(1.2) contrast(1.2)';
            statusDot.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.7)';
        });

        avatarContainer.addEventListener('mouseleave', () => {
            avatarImage.style.filter = 'none';
            statusDot.style.boxShadow = 'none';
        });
    }

    // Advanced Cursor Tracking
    function setupCursorTracking() {
        const cursorTracker = document.createElement('div');
        cursorTracker.classList.add('hero-cursor-tracker');
        heroSection.appendChild(cursorTracker);

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cursorTracker.style.transform = `translate(${x}px, ${y}px)`;
            cursorTracker.style.opacity = '0.5';
        });

        heroSection.addEventListener('mouseleave', () => {
            cursorTracker.style.opacity = '0';
        });
    }

    // Initialize Advanced Interactions
    createAdvancedBackground();
    createSkillNetwork();
    setupAvatarInteraction();
    setupCursorTracking();
});

// 3D Calligraphy Name Effect
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('home');
    const heroContent = heroSection.querySelector('.hero-content');

    function create3DName(name) {
        // Create name container
        const nameContainer = document.createElement('div');
        nameContainer.classList.add('hero-name-container');

        // Create base name element
        const baseName = document.createElement('div');
        baseName.classList.add('hero-name');
        baseName.textContent = name;

        // Create 3D layers
        const layers = [
            { zIndex: -10, rotateY: 10 },
            { zIndex: -20, rotateY: 20 },
            { zIndex: -30, rotateY: 30 }
        ];

        layers.forEach(layer => {
            const layerElement = document.createElement('div');
            layerElement.classList.add('hero-name-layer');
            layerElement.textContent = name;
            layerElement.style.transform = `translateZ(${layer.zIndex}px) rotateY(${layer.rotateY}deg)`;
            
            nameContainer.appendChild(layerElement);
        });

        nameContainer.appendChild(baseName);
        heroContent.appendChild(nameContainer);

        // Interactive mouse tracking for 3D effect
        function handleMouseMove(e) {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const rotateX = (mouseY - centerY) / centerY * -10;
            const rotateY = (mouseX - centerX) / centerX * 10;

            nameContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        function resetRotation() {
            nameContainer.style.transform = 'rotateX(0) rotateY(0)';
        }

        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', resetRotation);
    }

    // Call the function with your name
    create3DName('Brian');
});

// Advanced Interactive Subtitle System
class InteractiveSubtitle {
    constructor(element) {
        this.el = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.roles = [
            // Professional Roles
            { 
                title: 'Code Alchemist', 
                color: '#4a90e2',
                description: 'Transforming ideas into digital reality'
            },
            { 
                title: 'Quantum Logic Architect', 
                color: '#9b59b6',
                description: 'Bridging classical and quantum computing'
            },
            { 
                title: 'Neural Network Sculptor', 
                color: '#e74c3c',
                description: 'Crafting intelligent systems from raw data'
            },
            { 
                title: 'Cyber Resilience Engineer', 
                color: '#2ecc71',
                description: 'Defending digital frontiers with innovative solutions'
            },
            { 
                title: 'Blockchain Philosopher', 
                color: '#f39c12',
                description: 'Decentralizing trust through code'
            },
            { 
                title: 'AI Consciousness Researcher', 
                color: '#3498db',
                description: 'Exploring the boundaries of machine intelligence'
            },
            { 
                title: 'Holographic UX Architect', 
                color: '#e056fd',
                description: 'Designing immersive digital experiences'
            },
            { 
                title: 'Quantum Cryptography Wizard', 
                color: '#34495e',
                description: 'Securing communication beyond classical limits'
            }
        ];
        this.currentIndex = 0;
        this.setupInteractivity();
    }

    setupInteractivity() {
        this.el.addEventListener('mouseenter', () => this.startHoverEffect());
        this.el.addEventListener('mouseleave', () => this.resetHoverEffect());
    }

    startHoverEffect() {
        this.el.style.transform = 'scale(1.05)';
        this.el.style.textShadow = '0 0 10px rgba(0,0,0,0.3)';
    }

    resetHoverEffect() {
        this.el.style.transform = 'scale(1)';
        this.el.style.textShadow = 'none';
    }

    scramble(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        
        return new Promise((resolve) => {
            const queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                queue.push({ from, to, start, end });
            }

            let frame = 0;
            const update = () => {
                let output = '';
                let complete = 0;

                for (let i = 0; i < queue.length; i++) {
                    let { from, to, start, end, char } = queue[i];

                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        // Reduce randomization to improve spelling accuracy
                        if (!char || Math.random() < 0.15) { 
                            char = this.randomChar();
                            queue[i].char = char;
                        }
                        output += `<span class="dud">${char || to}</span>`;
                    } else {
                        output += from;
                    }
                }

                this.el.innerHTML = output;

                if (complete === queue.length) {
                    // Ensure final text is exactly as intended
                    this.el.textContent = newText;
                    resolve();
                } else {
                    requestAnimationFrame(update);
                    frame++;
                }
            };

            update();
        });
    }

    async cycle() {
        const currentRole = this.roles[this.currentIndex];
        
        // Update color dynamically
        this.el.style.color = currentRole.color;
        
        // Add description as a data attribute
        this.el.setAttribute('data-description', currentRole.description);

        await this.scramble(currentRole.title);
        
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        
        return new Promise(resolve => setTimeout(resolve, 10000)); 
    }

    async start() {
        while (true) {
            await this.cycle();
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Interactive Subtitle
document.addEventListener('DOMContentLoaded', () => {
    const subtitleElement = document.querySelector('.text-scramble');
    const interactiveSubtitle = new InteractiveSubtitle(subtitleElement);
    interactiveSubtitle.start();
});

// Section Title Particle Effect
function createSectionTitleParticles() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('section-title-particles');
        title.appendChild(particlesContainer);

        // Create multiple particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('section-title-particle');

            // Randomize particle position and animation
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5;

            particlesContainer.appendChild(particle);
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', createSectionTitleParticles);

// Initialization of All Features
function initializePortfolio() {
    // Initialize Managers
    NavigationManager.init();
    TimeManager.init();
    CursorManager.init();
    LazyLoadManager.init();
    ErrorTracker.init();
}

// Ensure DOM is fully loaded before initialization
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Device Compatibility and Performance Manager
const DeviceCompatibilityManager = {
    init() {
        this.detectDeviceCharacteristics();
        this.handleOrientationChange();
        this.optimizePerformance();
        this.setupTouchInteractions();
    },

    detectDeviceCharacteristics() {
        const deviceInfo = {
            isMobile: window.innerWidth <= 768,
            isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
            isDesktop: window.innerWidth > 1024,
            touchCapable: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1
        };

        document.documentElement.classList.add(
            deviceInfo.isMobile ? 'mobile' :
            deviceInfo.isTablet ? 'tablet' : 'desktop'
        );

        if (deviceInfo.touchCapable) {
            document.documentElement.classList.add('touch-device');
        }

        return deviceInfo;
    },

    handleOrientationChange() {
        const handleResize = Utils.debounce(() => {
            this.detectDeviceCharacteristics();
            this.adjustLayoutForOrientation();
        }, 250);

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
    },

    adjustLayoutForOrientation() {
        const sections = document.querySelectorAll('.section');
        const isPortrait = window.innerHeight > window.innerWidth;

        sections.forEach(section => {
            section.classList.toggle('portrait', isPortrait);
            section.classList.toggle('landscape', !isPortrait);
        });
    },

    optimizePerformance() {
        // Throttle expensive operations
        const throttledScroll = Utils.debounce(this.handleScrollPerformance.bind(this), 100);
        window.addEventListener('scroll', throttledScroll);

        // Disable animations on low-performance devices
        if (window.innerWidth <= 768 || window.devicePixelRatio < 2) {
            document.body.classList.add('low-performance');
        }
    },

    handleScrollPerformance() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop - window.innerHeight / 2 &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        });
    },

    setupTouchInteractions() {
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', this.handleTouchStart, { passive: true });
            document.addEventListener('touchmove', this.handleTouchMove, { passive: true });
            document.addEventListener('touchend', this.handleTouchEnd, { passive: true });
        }
    },

    handleTouchStart(event) {
        // Implement touch start logic
        const touch = event.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
    },

    handleTouchMove(event) {
        // Implement touch move logic for navigation or interactions
        if (!this.startX || !this.startY) return;

        const touch = event.touches[0];
        const diffX = touch.clientX - this.startX;
        const diffY = touch.clientY - this.startY;

        // Example: Swipe navigation between sections
        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault();
        }
    },

    handleTouchEnd() {
        // Reset touch tracking
        this.startX = null;
        this.startY = null;
    }
};

// Initialize Device Compatibility on DOM load
document.addEventListener('DOMContentLoaded', () => {
    DeviceCompatibilityManager.init();
});

// Language Network JavaScript Removed
// Removed previous LanguageNetworkBackground class

// Skills Network Visualization
class SkillsNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.skills = [
            { id: 'python', label: 'Python', category: 'Languages', proficiency: 90 },
            { id: 'javascript', label: 'JavaScript', category: 'Languages', proficiency: 75 },
            { id: 'java', label: 'Java', category: 'Languages', proficiency: 60 },
            { id: 'react', label: 'React', category: 'Web', proficiency: 80 },
            { id: 'nodejs', label: 'Node.js', category: 'Web', proficiency: 70 },
            { id: 'aws', label: 'AWS', category: 'Cloud', proficiency: 65 },
            { id: 'docker', label: 'Docker', category: 'DevOps', proficiency: 75 },
            { id: 'mongodb', label: 'MongoDB', category: 'Databases', proficiency: 70 },
            { id: 'postgresql', label: 'PostgreSQL', category: 'Databases', proficiency: 65 }
        ];
        this.connections = [
            { source: 'python', target: 'react', strength: 0.7 },
            { source: 'javascript', target: 'nodejs', strength: 0.9 },
            { source: 'java', target: 'aws', strength: 0.5 },
            { source: 'react', target: 'nodejs', strength: 0.8 },
            { source: 'docker', target: 'aws', strength: 0.6 },
            { source: 'mongodb', target: 'nodejs', strength: 0.7 },
            { source: 'postgresql', target: 'python', strength: 0.6 }
        ];
        this.svg = null;
        this.simulation = null;
        this.init();
    }

    init() {
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        const colorScale = d3.scaleOrdinal()
            .domain(['Languages', 'Web', 'Cloud', 'DevOps', 'Databases'])
            .range(['#6a11cb', '#ff6a00', '#22c1c3', '#8e2de2', '#2575fc']);

        const radiusScale = d3.scaleLinear()
            .domain([0, 100])
            .range([10, 40]);

        this.simulation = d3.forceSimulation(this.skills)
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => radiusScale(d.proficiency)))
            .force('link', d3.forceLink(this.connections)
                .id(d => d.id)
                .distance(100)
            );

        const links = this.svg.selectAll('.link')
            .data(this.connections)
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#555')
            .style('stroke-opacity', 0.6)
            .style('stroke-width', d => d.strength * 3);

        const nodes = this.svg.selectAll('.node')
            .data(this.skills)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this))
            );

        nodes.append('circle')
            .attr('r', d => radiusScale(d.proficiency))
            .style('fill', d => colorScale(d.category))
            .style('fill-opacity', 0.8);

        nodes.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
            .text(d => d.label)
            .style('fill', 'white')
            .style('font-size', '12px')
            .style('pointer-events', 'none');

        this.simulation.on('tick', () => {
            links
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            nodes
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });
    }

    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// Initialize Skills Network on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const skillsNetwork = new SkillsNetwork('skills-network');
});

// Smooth Scrolling for Skills Section
class SkillsSectionScroller {
    constructor() {
        this.skillsSection = document.getElementById('skills');
        this.skillsOverview = this.skillsSection.querySelector('.skills-overview');
        this.skillsSummary = this.skillsSection.querySelector('.skills-summary');
        this.skillsDiagram = this.skillsSection.querySelector('.skills-diagram');
        this.skillsCategories = this.skillsSection.querySelector('.skills-categories');
        
        this.init();
    }

    init() {
        this.setupScrollObserver();
        this.setupScrollInteractions();
    }

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillsSection();
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(this.skillsSection);
    }

    setupScrollInteractions() {
        let isScrolling = false;
        let currentScrollPosition = 0;

        const smoothScroll = () => {
            const maxScroll = this.skillsOverview.scrollHeight - this.skillsOverview.clientHeight;
            
            const scrollStep = () => {
                if (!isScrolling) return;

                currentScrollPosition += 2;
                if (currentScrollPosition >= maxScroll) {
                    currentScrollPosition = 0;
                }

                this.skillsOverview.scrollTop = currentScrollPosition;
                requestAnimationFrame(scrollStep);
            };

            const startScrolling = () => {
                isScrolling = true;
                requestAnimationFrame(scrollStep);
            };

            const stopScrolling = () => {
                isScrolling = false;
            };

            this.skillsSection.addEventListener('mouseenter', startScrolling);
            this.skillsSection.addEventListener('mouseleave', stopScrolling);
        };

        smoothScroll();
    }

    animateSkillsSection() {
        const animationSequence = [
            { element: this.skillsSummary, animation: 'fadeInLeft' },
            { element: this.skillsDiagram, animation: 'fadeInRight' },
            { element: this.skillsCategories, animation: 'fadeInUp' }
        ];

        animationSequence.forEach((item, index) => {
            setTimeout(() => {
                item.element.classList.add('animated', item.animation);
            }, index * 300);
        });
    }
}

// Initialize Skills Section Scroller on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const skillsSectionScroller = new SkillsSectionScroller();
});

// Smooth Scrolling Enhancement
class SmoothScroller {
    constructor() {
        this.initSmoothScroll();
        this.initScrollToSection();
    }

    initSmoothScroll() {
        // Smooth scroll for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initScrollToSection() {
        // Additional scroll management
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                } else {
                    entry.target.classList.remove('section-visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// Initialize Smooth Scroller on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const smoothScroller = new SmoothScroller();
});

// Language Network Interaction
class LanguageNetwork {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.nodes = this.container.querySelectorAll('.language-node');
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.createNetworkConnections();
    }

    addHoverEffects() {
        this.nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                this.highlightConnectedNodes(node);
            });

            node.addEventListener('mouseleave', () => {
                this.resetNodeHighlights();
            });
        });
    }

    highlightConnectedNodes(activeNode) {
        this.nodes.forEach(node => {
            if (node !== activeNode) {
                node.style.opacity = '0.5';
            } else {
                node.style.transform = 'scale(1.1)';
            }
        });
    }

    resetNodeHighlights() {
        this.nodes.forEach(node => {
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        });
    }

    createNetworkConnections() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'network-connections');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.zIndex = '1';
        svg.style.pointerEvents = 'none';

        const nodePositions = Array.from(this.nodes).map(node => {
            const rect = node.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        });

        nodePositions.forEach((pos1, i) => {
            nodePositions.forEach((pos2, j) => {
                if (i !== j) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', pos1.x);
                    line.setAttribute('y1', pos1.y);
                    line.setAttribute('x2', pos2.x);
                    line.setAttribute('y2', pos2.y);
                    line.setAttribute('stroke', 'rgba(106, 17, 203, 0.2)');
                    line.setAttribute('stroke-width', '1');
                    svg.appendChild(line);
                }
            });
        });

        this.container.appendChild(svg);
    }
}

// Initialize Language Network on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const languageNetwork = new LanguageNetwork('.hero-languages-network');
});

// Number Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 500; // Animation duration in milliseconds

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let currentValue = 0;

        const updateCounter = () => {
            if (currentValue < target) {
                currentValue += increment;
                counter.textContent = Math.round(currentValue);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Initialize Counters on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Existing Text Scramble initialization
    const phrases = [
        'Innovative Problem Solver',
        'Digital Strategist', 
        'Technology Architect',
        'Global Innovator'
    ];

    const el = document.querySelector('.text-scramble');
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000);
        });
        counter = (counter + 1) % phrases.length;
    };

    next();

    // Animate Counters with Intersection Observer
    const statsSection = document.querySelector('.hero-stats-grid');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);
});

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Particle Animation
function createParticles() {
    const container = document.querySelector('.hero-particles-container');
    const particles = document.querySelectorAll('.hero-particle');

    particles.forEach(particle => {
        const speed = parseFloat(particle.dataset.speed);
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;

        particle.style.transform = `translate(${randomX}px, ${randomY}px)`;

        function animate() {
            const currentX = parseFloat(particle.style.transform.split('(')[1]);
            const currentY = parseFloat(particle.style.transform.split(',')[1]);

            const newX = currentX + speed;
            const newY = currentY + speed;

            particle.style.transform = `translate(${newX}px, ${newY}px)`;

            if (newX > window.innerWidth || newY > window.innerHeight) {
                particle.style.transform = 'translate(-100px, -100px)';
            }

            requestAnimationFrame(animate);
        }

        animate();
    });
}

// Greeting and Subtitle Dynamic Content
function updateGreetingAndSubtitle() {
    const greetingEl = document.getElementById('greeting');
    const subtitleEl = document.querySelector('.text-scramble');
    const subtitleScramble = new TextScramble(subtitleEl);

    const hours = new Date().getHours();
    let greeting = 'Hello, I\'m';

    if (hours < 12) greeting = 'Good Morning, I\'m';
    else if (hours < 18) greeting = 'Good Afternoon, I\'m';
    else greeting = 'Good Evening, I\'m';

    greetingEl.textContent = greeting;

    const subtitles = [
        'Full Stack Developer',
        'Digital Experience Architect',
        'Innovation Catalyst',
        'Tech Problem Solver'
    ];

    let currentSubtitleIndex = 0;

    function cycleSubtitles() {
        currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
        subtitleEl.classList.add('greeting-fade');
        
        setTimeout(() => {
            subtitleScramble.setText(subtitles[currentSubtitleIndex])
                .then(() => {
                    setTimeout(() => {
                        subtitleEl.classList.remove('greeting-fade');
                    }, 500);
                });
        }, 500);
    }

    // Change greeting every 3 seconds
    setInterval(cycleSubtitles, 3000);
}

// Title Letter Animation
function animateTitleLetters() {
    const letters = document.querySelectorAll('.title-letter');
    letters.forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            letter.style.transform = `scale(1.2) rotate(${5 * (index % 2 === 0 ? 1 : -1)}deg)`;
        });

        letter.addEventListener('mouseleave', () => {
            letter.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Social Links Interaction
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-icon');
    socialLinks.forEach(link => {
        const platform = link.dataset.platform;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: Replace with actual social media links
            alert(`Redirecting to ${platform} profile`);
        });
    });
}

// Stats Counting Animation
function animateStats() {
    const statsElements = document.querySelectorAll('.stat-value');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                let currentValue = 0;

                const updateCounter = () => {
                    const increment = targetValue / 50;
                    if (currentValue < targetValue) {
                        currentValue += increment;
                        target.textContent = Math.round(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue;
                    }
                };

                updateCounter();
                observer.unobserve(target);
            }
        });
    }, options);

    statsElements.forEach(el => observer.observe(el));
}

// Initialize All Interactions
function initializeInteractions() {
    createParticles();
    updateGreetingAndSubtitle();
    animateTitleLetters();
    setupSocialLinks();
    animateStats();
}

// Run interactions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeInteractions);

// Stats Counting Animation
function animateStats() {
    const statsElements = document.querySelectorAll('.stat-value');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                let currentValue = 0;

                const updateCounter = () => {
                    const increment = targetValue / 50;
                    if (currentValue < targetValue) {
                        currentValue += increment;
                        target.textContent = Math.round(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue;
                    }
                };

                updateCounter();
                observer.unobserve(target);
            }
        });
    }, options);

    statsElements.forEach(el => observer.observe(el));
}

// Greeting Dynamic Content
function updateGreeting() {
    const greetingEl = document.getElementById('greeting');
    const hours = new Date().getHours();
    let greeting = 'Hello, I\'m';

    if (hours < 12) greeting = 'Good Morning, I\'m';
    else if (hours < 18) greeting = 'Good Afternoon, I\'m';
    else greeting = 'Good Evening, I\'m';

    greetingEl.textContent = greeting;
}

// Initialize Interactions
function initializeInteractions() {
    animateStats();
    updateGreeting();
}

// Run interactions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeInteractions);

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const ctaButtons = document.querySelectorAll('.hero-cta a');

    function setActiveSection(sectionId) {
        // Remove active class from all sections and nav links
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the selected section and nav link
        const selectedSection = document.getElementById(sectionId);
        const selectedNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

        if (selectedSection && selectedNavLink) {
            selectedSection.classList.add('active');
            selectedNavLink.classList.add('active');
        }
    }

    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            setActiveSection(sectionId);
        });
    });

    // CTA buttons navigation handler
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('href').substring(1);
            setActiveSection(sectionId);
        });
    });

    // Initial load: set Home section as active
    setActiveSection('home');

    // Animated number counters
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';

        const updateCounter = () => {
            const currentCount = parseInt(counter.textContent);
            const increment = target / speed;

            if (currentCount < target) {
                counter.textContent = Math.ceil(currentCount + increment);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! I will get back to you soon.');
            contactForm.reset();
        });
    }
});
