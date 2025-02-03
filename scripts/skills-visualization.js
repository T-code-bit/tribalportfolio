console.log('Skills Visualization Script Loaded');

class SkillsVisualization {
    constructor(containerId) {
        console.log(`Initializing SkillsVisualization with container ID: ${containerId}`);
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            console.error(`ERROR: Container with ID ${containerId} not found`);
            console.error('Available elements:', 
                Array.from(document.querySelectorAll('div')).map(el => el.id)
            );
            return;
        }

        console.log('Container found:', this.container);

        this.skills = [
            { 
                category: 'Programming Languages', 
                description: 'Mastery of diverse programming paradigms and language ecosystems',
                skills: [
                    { name: 'Python', level: 90, color: '#3776AB', expertise: 'Advanced data science and backend development' },
                    { name: 'JavaScript', level: 85, color: '#F7DF1E', expertise: 'Full-stack web development and frontend frameworks' },
                    { name: 'TypeScript', level: 80, color: '#3178C6', expertise: 'Type-safe enterprise applications' },
                    { name: 'Java', level: 75, color: '#007396', expertise: 'Enterprise software and Android development' },
                    { name: 'Go', level: 70, color: '#00ADD8', expertise: 'High-performance system programming' }
                ]
            },
            { 
                category: 'Web Technologies', 
                description: 'Modern web development with cutting-edge frameworks and tools',
                skills: [
                    { name: 'React', level: 85, color: '#61DAFB', expertise: 'Component-based UI development' },
                    { name: 'Node.js', level: 80, color: '#339933', expertise: 'Scalable backend services' },
                    { name: 'GraphQL', level: 75, color: '#E10098', expertise: 'Efficient API design' },
                    { name: 'WebPack', level: 70, color: '#8DD6F9', expertise: 'Module bundling and optimization' },
                    { name: 'Next.js', level: 75, color: '#000000', expertise: 'Server-side rendering' }
                ]
            },
            { 
                category: 'Cloud & DevOps', 
                description: 'Cloud-native architecture and infrastructure as code',
                skills: [
                    { name: 'Docker', level: 85, color: '#2496ED', expertise: 'Containerization and microservices' },
                    { name: 'Kubernetes', level: 80, color: '#326CE5', expertise: 'Orchestration and scaling' },
                    { name: 'AWS', level: 75, color: '#FF9900', expertise: 'Cloud infrastructure design' },
                    { name: 'Terraform', level: 70, color: '#844FBA', expertise: 'Infrastructure as Code' },
                    { name: 'CI/CD', level: 75, color: '#1A1A1A', expertise: 'Automated deployment pipelines' }
                ]
            },
            { 
                category: 'AI & Data Science', 
                description: 'Advanced machine learning and data analysis techniques',
                skills: [
                    { name: 'TensorFlow', level: 80, color: '#FF6F00', expertise: 'Deep learning models' },
                    { name: 'PyTorch', level: 75, color: '#EE4C2C', expertise: 'Neural network development' },
                    { name: 'Pandas', level: 70, color: '#150458', expertise: 'Data manipulation' },
                    { name: 'scikit-learn', level: 75, color: '#F89939', expertise: 'Machine learning algorithms' },
                    { name: 'Jupyter', level: 70, color: '#F37626', expertise: 'Interactive data exploration' }
                ]
            }
        ];
        
        this.svg = null;
        this.detailPanel = null;
        
        console.log('Calling init method');
        this.init();
    }

    init() {
        console.log('init method started');
        
        // Ensure container exists
        if (!this.container) {
            console.error('Container does not exist, cannot initialize');
            return;
        }

        // Create container for SVG and detail panel
        const container = document.createElement('div');
        container.className = 'skills-visualization-wrapper';
        console.log('Created wrapper div:', container);
        
        this.container.appendChild(container);
        console.log('Appended wrapper to container');

        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '300');
        this.svg.setAttribute('style', 'background-color: rgba(0,0,0,0.1);'); // Debug visibility
        container.appendChild(this.svg);
        console.log('SVG created and appended');

        // Create detail panel
        this.createDetailPanel(container);

        // Visualize skills
        this.visualizeSkills();
        
        console.log('Initialization complete');
    }

    createDetailPanel(container) {
        this.detailPanel = document.createElement('div');
        this.detailPanel.className = 'skills-detail-panel';
        this.detailPanel.innerHTML = `
            <h3 class="detail-title">Hover over skills to explore</h3>
            <p class="detail-description">Discover the depth and breadth of my technical expertise</p>
        `;
        container.appendChild(this.detailPanel);
    }

    updateDetailPanel(category, skill) {
        if (!this.detailPanel) return;

        this.detailPanel.innerHTML = `
            <h3 class="detail-title">${skill.name}</h3>
            <p class="detail-category">${category}</p>
            <div class="detail-expertise">
                <span class="expertise-label">Expertise:</span>
                <span class="expertise-text">${skill.expertise}</span>
            </div>
            <div class="skill-proficiency">
                <span class="proficiency-label">Proficiency:</span>
                <div class="proficiency-bar" style="width: ${skill.level}%; background-color: ${skill.color}"></div>
                <span class="proficiency-percentage">${skill.level}%</span>
            </div>
        `;
    }

    visualizeSkills() {
        const width = this.container.clientWidth;
        const height = 300;
        const categoryWidth = width / this.skills.length;

        // Create category sections
        this.skills.forEach((category, index) => {
            const categoryX = index * categoryWidth;
            const categoryY = 50;

            // Category Label
            const categoryLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            categoryLabel.setAttribute('x', categoryX + categoryWidth / 2);
            categoryLabel.setAttribute('y', 30);
            categoryLabel.setAttribute('text-anchor', 'middle');
            categoryLabel.setAttribute('fill', '#00CED1');
            categoryLabel.setAttribute('font-size', '16');
            categoryLabel.setAttribute('font-weight', 'bold');
            categoryLabel.textContent = category.category;
            this.svg.appendChild(categoryLabel);

            // Individual Skills
            category.skills.forEach((skill, skillIndex) => {
                const skillY = categoryY + (skillIndex + 1) * 50;

                // Skill Node
                const skillNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                skillNode.setAttribute('cx', categoryX + categoryWidth / 2);
                skillNode.setAttribute('cy', skillY);
                skillNode.setAttribute('r', 25);
                skillNode.setAttribute('fill', skill.color);
                skillNode.setAttribute('fill-opacity', '0.2');
                skillNode.setAttribute('stroke', skill.color);
                skillNode.setAttribute('stroke-width', '2');
                this.svg.appendChild(skillNode);

                // Interactive Hover
                skillNode.addEventListener('mouseover', () => {
                    skillNode.setAttribute('r', '30');
                    skillNode.setAttribute('fill-opacity', '0.4');
                    this.updateDetailPanel(category.category, skill);
                });

                skillNode.addEventListener('mouseout', () => {
                    skillNode.setAttribute('r', '25');
                    skillNode.setAttribute('fill-opacity', '0.2');
                });

                // Skill Label
                const skillLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                skillLabel.setAttribute('x', categoryX + categoryWidth / 2);
                skillLabel.setAttribute('y', skillY + 35);
                skillLabel.setAttribute('text-anchor', 'middle');
                skillLabel.setAttribute('fill', skill.color);
                skillLabel.setAttribute('font-size', '10');
                skillLabel.setAttribute('font-weight', 'bold');
                skillLabel.textContent = skill.name;
                this.svg.appendChild(skillLabel);
            });
        });
    }
}

// Initialize on page load with multiple event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event triggered');
    
    const skillsVisualization = document.getElementById('skills-visualization');
    console.log('Skills visualization element:', skillsVisualization);
    
    if (skillsVisualization) {
        console.log('Creating SkillsVisualization instance');
        new SkillsVisualization('skills-visualization');
    } else {
        console.error('Skills visualization container not found');
        console.error('Available elements:', 
            Array.from(document.querySelectorAll('div')).map(el => el.id)
        );
    }
});

// Fallback initialization
window.addEventListener('load', () => {
    console.log('Window load event triggered');
    
    const skillsVisualization = document.getElementById('skills-visualization');
    console.log('Skills visualization element:', skillsVisualization);
    
    if (skillsVisualization) {
        console.log('Creating SkillsVisualization instance');
        new SkillsVisualization('skills-visualization');
    }
});
