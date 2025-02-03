document.addEventListener('DOMContentLoaded', () => {
    console.log('Skills Popup Script Loaded');
    
    const skillsTrigger = document.querySelector('.hero-subtitle');
    const skillsPopup = document.getElementById('skills-popup');
    const skillsPopupClose = document.querySelector('.skills-popup-close');
    const skillItems = document.querySelectorAll('.skill-item');

    console.log('Trigger:', skillsTrigger);
    console.log('Popup:', skillsPopup);
    console.log('Close Button:', skillsPopupClose);
    console.log('Skill Items:', skillItems);

    // Scramble Text Effect
    class ScrambleText {
        constructor(element) {
            this.element = element;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.originalText = element.textContent;
        }

        setText(newText) {
            const length = Math.max(this.originalText.length, newText.length);
            const promise = new Promise((resolve) => setTimeout(resolve, length * 50));
            
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = this.originalText[i] || '';
                const to = newText[i] || '';
                this.queue.push({ from, to });
            }
            
            this.frame = 0;
            this.update(newText);
            return promise;
        }

        update(newText) {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to } = this.queue[i];
                
                if (this.frame >= this.queue[i].duration) {
                    complete++;
                    output += to;
                } else {
                    if (this.frame < 20) {
                        output += this.randomChar();
                    } else {
                        output += from;
                    }
                    this.queue[i].duration = this.queue[i].duration || Math.floor(Math.random() * 20) + 10;
                }
            }
            
            this.element.textContent = output;
            this.frame++;
            
            if (complete !== this.queue.length) {
                requestAnimationFrame(() => this.update(newText));
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Function to open popup with scramble and animations
    function openSkillsPopup() {
        skillsPopup.classList.add('show-popup');
        
        // Scramble skill titles
        skillItems.forEach((item, index) => {
            const title = item.querySelector('h3');
            const scrambler = new ScrambleText(title);
            
            // Stagger the scramble effect
            setTimeout(() => {
                scrambler.setText(title.dataset.originalText || title.textContent);
            }, index * 100);
        });

        // Add animation classes to skill items
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('skill-item-enter');
        });
    }

    // Function to close popup
    function closeSkillsPopup() {
        skillsPopup.classList.remove('show-popup');
        
        // Remove animation classes
        skillItems.forEach(item => {
            item.classList.remove('skill-item-enter');
        });
    }

    // Store original text for scramble effect
    skillItems.forEach(item => {
        const title = item.querySelector('h3');
        title.dataset.originalText = title.textContent;
    });

    // Event listeners
    skillsTrigger.addEventListener('click', (event) => {
        console.log('Skills Subtitle Clicked');
        openSkillsPopup();
    });

    skillsPopupClose.addEventListener('click', () => {
        console.log('Popup Close Button Clicked');
        closeSkillsPopup();
    });

    // Close popup when clicking outside of it
    skillsPopup.addEventListener('click', (event) => {
        if (event.target === skillsPopup) {
            closeSkillsPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && skillsPopup.classList.contains('show-popup')) {
            closeSkillsPopup();
        }
    });
});
