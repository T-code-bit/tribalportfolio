// Advanced Home Screen Interactions
class HomeInteractions {
    constructor() {
        this.initDynamicGreetings();
        this.initSkillRotation();
        this.initParticleInteractions();
        this.initAvatarAnimations();
        this.initQuoteGenerator();
    }

    initDynamicGreetings() {
        const greetings = [
            'Hello, World!', 
            'Innovate. Create. Inspire.', 
            'Digital Experiences Await.', 
            'Welcome to My Universe.', 
            'Code is Poetry in Motion.'
        ];
        const greetingElement = document.querySelector('.greeting-text');
        
        let currentIndex = 0;
        setInterval(() => {
            greetingElement.classList.add('fade-out');
            setTimeout(() => {
                greetingElement.textContent = greetings[currentIndex];
                greetingElement.classList.remove('fade-out');
                currentIndex = (currentIndex + 1) % greetings.length;
            }, 500);
        }, 3000);
    }

    initSkillRotation() {
        const skills = [
            'Software Engineering', 
            'UI/UX Design', 
            'Machine Learning', 
            'Cloud Architecture', 
            'Digital Innovation'
        ];
        const subtitleElement = document.querySelector('.hero-subtitle');
        
        let currentSkillIndex = 0;
        setInterval(() => {
            subtitleElement.classList.add('slide-up');
            setTimeout(() => {
                subtitleElement.textContent = skills[currentSkillIndex];
                subtitleElement.classList.remove('slide-up');
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
            }, 500);
        }, 2500);
    }

    initParticleInteractions() {
        const particleBackground = document.getElementById('interactive-background');
        
        particleBackground.addEventListener('mousemove', (event) => {
            const particles = particleBackground.querySelectorAll('.particle');
            particles.forEach(particle => {
                const speed = parseFloat(particle.dataset.speed);
                const x = (event.clientX * speed) / 250;
                const y = (event.clientY * speed) / 250;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    initAvatarAnimations() {
        const avatar = document.querySelector('.avatar-image');
        const statusDot = document.querySelector('.status-dot');
        
        // Breathing effect
        setInterval(() => {
            avatar.classList.toggle('breathe');
        }, 3000);

        // Status dot pulsing
        setInterval(() => {
            statusDot.classList.toggle('pulse');
        }, 2000);
    }

    initQuoteGenerator() {
        const quotes = [
            {
                text: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "Code is not just syntax, it's a form of art.",
                author: "TRIBAL"
            }
        ];

        const quoteElement = document.getElementById('inspirational-quote');
        const authorElement = document.getElementById('quote-author');

        function updateQuote() {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            quoteElement.classList.add('fade-out');
            authorElement.classList.add('fade-out');
            
            setTimeout(() => {
                quoteElement.textContent = `"${randomQuote.text}"`;
                authorElement.textContent = `- ${randomQuote.author}`;
                
                quoteElement.classList.remove('fade-out');
                authorElement.classList.remove('fade-out');
            }, 500);
        }

        // Initial quote
        updateQuote();

        // Change quote every 10 seconds
        setInterval(updateQuote, 10000);
    }
}

// Initialize interactions when page loads
window.addEventListener('load', () => {
    new HomeInteractions();
});
