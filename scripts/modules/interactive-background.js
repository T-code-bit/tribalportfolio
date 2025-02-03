// Advanced Interactive Background Module
export class InteractiveBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
        this.createParticles();
        this.attachEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
    }

    createParticles() {
        const particleCount = this.canvas.width / 10;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(135, 206, 235, ${Math.random() * 0.5})`,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Interactive mouse connection
            const dx = particle.x - this.mousePosition.x;
            const dy = particle.y - this.mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Draw connection lines
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.strokeStyle = `rgba(135, 206, 235, ${1 - distance / 100})`;
                this.ctx.stroke();
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }

    attachEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mousePosition.x = event.clientX - rect.left;
            this.mousePosition.y = event.clientY - rect.top;
        });
    }
}

export function initInteractiveBackground() {
    const backgroundContainer = document.getElementById('interactive-background');
    if (backgroundContainer) {
        new InteractiveBackground('interactive-background');
    }
}
