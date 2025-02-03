// Advanced Button Interaction System
(function() {
    // Sound Library
    const soundEffects = {
        hover: new Audio('assets/sounds/hover.mp3'),
        click: new Audio('assets/sounds/click.mp3')
    };

    // Particle System
    class ButtonParticleSystem {
        constructor(button) {
            this.button = button;
            this.particleContainer = this.createParticleContainer();
        }

        createParticleContainer() {
            const container = document.createElement('div');
            container.classList.add('button-particle-container');
            container.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            `;
            this.button.appendChild(container);
            return container;
        }

        createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                opacity: 0.7;
                pointer-events: none;
            `;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            
            particle.style.left = `${this.button.offsetWidth / 2}px`;
            particle.style.top = `${this.button.offsetHeight / 2}px`;

            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            particle.animate([
                { 
                    transform: `translate(0px, 0px) scale(1)`, 
                    opacity: 0.7 
                },
                { 
                    transform: `translate(${dx}px, ${dy}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            });

            this.particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        burst(count = 20) {
            for (let i = 0; i < count; i++) {
                this.createParticle();
            }
        }
    }

    // Initialize Interactions
    function initButtonInteractions() {
        const sectionButtons = document.querySelectorAll('.btn-section');
        
        sectionButtons.forEach(button => {
            const particleSystem = new ButtonParticleSystem(button);

            // Hover Sound
            button.addEventListener('mouseenter', () => {
                soundEffects.hover.currentTime = 0;
                soundEffects.hover.volume = 0.2;
                soundEffects.hover.play().catch(() => {});
            });

            // Click Sound and Particle Burst
            button.addEventListener('click', (e) => {
                soundEffects.click.currentTime = 0;
                soundEffects.click.volume = 0.3;
                soundEffects.click.play().catch(() => {});
                
                particleSystem.burst();
            });
        });
    }

    // Initialize on DOM Load
    window.addEventListener('DOMContentLoaded', initButtonInteractions);
})();
