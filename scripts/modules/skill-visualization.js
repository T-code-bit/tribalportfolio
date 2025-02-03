// Skill Visualization Module
export class SkillNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.skills = [
            { id: 'python', label: 'Python', category: 'Languages', proficiency: 90 },
            { id: 'javascript', label: 'JavaScript', category: 'Languages', proficiency: 85 },
            { id: 'react', label: 'React', category: 'Frameworks', proficiency: 80 },
            { id: 'nodejs', label: 'Node.js', category: 'Backend', proficiency: 75 },
            { id: 'aws', label: 'AWS', category: 'Cloud', proficiency: 70 },
            { id: 'docker', label: 'Docker', category: 'DevOps', proficiency: 65 },
            { id: 'tensorflow', label: 'TensorFlow', category: 'AI/ML', proficiency: 60 }
        ];

        this.init();
    }

    init() {
        this.createSkillVisualization();
        this.addInteractivity();
    }

    createSkillVisualization() {
        this.container.innerHTML = ''; // Clear existing content
        
        this.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skill-bubble');
            skillElement.dataset.skill = skill.id;
            skillElement.style.setProperty('--proficiency', `${skill.proficiency}%`);
            
            const label = document.createElement('span');
            label.textContent = skill.label;
            
            skillElement.appendChild(label);
            this.container.appendChild(skillElement);
        });
    }

    addInteractivity() {
        const skillBubbles = this.container.querySelectorAll('.skill-bubble');
        
        skillBubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                const skillId = bubble.dataset.skill;
                const skill = this.skills.find(s => s.id === skillId);
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.classList.add('skill-tooltip');
                tooltip.innerHTML = `
                    <strong>${skill.label}</strong>
                    <p>Category: ${skill.category}</p>
                    <div class="proficiency-bar" style="width: ${skill.proficiency}%"></div>
                `;
                
                bubble.appendChild(tooltip);
            });

            bubble.addEventListener('mouseleave', () => {
                const tooltip = bubble.querySelector('.skill-tooltip');
                if (tooltip) {
                    bubble.removeChild(tooltip);
                }
            });
        });
    }
}

export function initSkillVisualization() {
    const skillContainer = document.getElementById('skills-visualization');
    if (skillContainer) {
        new SkillNetwork('skills-visualization');
    }
}
