// Advanced Project Showcase Module
export class ProjectShowcase {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.projects = [
            {
                title: 'AI-Powered Health Tracker',
                description: 'Machine learning application predicting health risks using wearable data.',
                technologies: ['Python', 'TensorFlow', 'React', 'Docker'],
                imageUrl: 'assets/projects/health-tracker.webp',
                githubLink: '#',
                liveLink: '#'
            },
            {
                title: 'Decentralized Finance Platform',
                description: 'Blockchain-based financial management system with smart contract integration.',
                technologies: ['Solidity', 'Web3.js', 'React', 'Node.js'],
                imageUrl: 'assets/projects/defi-platform.webp',
                githubLink: '#',
                liveLink: '#'
            },
            {
                title: 'Real-time Collaboration Tool',
                description: 'WebSocket-powered collaborative workspace with advanced sharing features.',
                technologies: ['TypeScript', 'GraphQL', 'WebSockets', 'Kubernetes'],
                imageUrl: 'assets/projects/collab-tool.webp',
                githubLink: '#',
                liveLink: '#'
            }
        ];

        this.init();
    }

    init() {
        this.renderProjects();
        this.addInteractivity();
    }

    renderProjects() {
        this.container.innerHTML = this.projects.map(project => `
            <div class="project-card" data-tech='${JSON.stringify(project.technologies)}'>
                <div class="project-image-container">
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.githubLink}" target="_blank" class="project-link github">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${project.liveLink}" target="_blank" class="project-link live">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-details">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    addInteractivity() {
        const projectCards = this.container.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('project-hover');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('project-hover');
            });
        });

        // Technology Filter
        const techTags = document.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const selectedTech = tag.textContent;
                projectCards.forEach(card => {
                    const technologies = JSON.parse(card.dataset.tech);
                    card.style.display = technologies.includes(selectedTech) ? 'block' : 'none';
                });
            });
        });
    }
}

export function initProjectShowcase() {
    const projectContainer = document.getElementById('project-showcase');
    if (projectContainer) {
        new ProjectShowcase('project-showcase');
    }
}
