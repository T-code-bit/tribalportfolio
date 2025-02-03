document.addEventListener('DOMContentLoaded', () => {
    const skillsProgressChart = document.getElementById('skills-progress-chart');

    const skillProgression = {
        'Web Development': [
            { year: 2015, level: 20 },
            { year: 2017, level: 50 },
            { year: 2019, level: 75 },
            { year: 2021, level: 90 }
        ],
        'Cloud Computing': [
            { year: 2015, level: 10 },
            { year: 2017, level: 30 },
            { year: 2019, level: 60 },
            { year: 2021, level: 85 }
        ],
        'AI & Machine Learning': [
            { year: 2015, level: 5 },
            { year: 2017, level: 25 },
            { year: 2019, level: 55 },
            { year: 2021, level: 80 }
        ]
    };

    function createSkillProgressionChart() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '300');
        svg.setAttribute('viewBox', '0 0 600 300');

        const colors = {
            'Web Development': '#00CED1',
            'Cloud Computing': '#FF6B6B',
            'AI & Machine Learning': '#4ECDC4'
        };

        // X and Y axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', '50');
        xAxis.setAttribute('y1', '250');
        xAxis.setAttribute('x2', '550');
        xAxis.setAttribute('y2', '250');
        xAxis.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        svg.appendChild(xAxis);

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', '50');
        yAxis.setAttribute('y1', '50');
        yAxis.setAttribute('x2', '50');
        yAxis.setAttribute('y2', '250');
        yAxis.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        svg.appendChild(yAxis);

        // Years labels
        [2015, 2017, 2019, 2021].forEach((year, index) => {
            const yearLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            yearLabel.setAttribute('x', 50 + index * 166);
            yearLabel.setAttribute('y', '280');
            yearLabel.setAttribute('fill', 'rgba(255,255,255,0.5)');
            yearLabel.textContent = year;
            svg.appendChild(yearLabel);
        });

        // Skill progression lines
        Object.entries(skillProgression).forEach(([skill, progression], skillIndex) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const pathData = progression.map((point, index) => {
                const x = 50 + index * 166;
                const y = 250 - (point.level * 2);
                return `${index === 0 ? 'M' : 'L'}${x},${y}`;
            }).join(' ');

            path.setAttribute('d', pathData);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', colors[skill]);
            path.setAttribute('stroke-width', '3');
            svg.appendChild(path);

            // Skill label
            const skillLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            skillLabel.setAttribute('x', '560');
            skillLabel.setAttribute('y', 50 + skillIndex * 50);
            skillLabel.setAttribute('fill', colors[skill]);
            skillLabel.textContent = skill;
            svg.appendChild(skillLabel);
        });

        skillsProgressChart.appendChild(svg);
    }

    createSkillProgressionChart();
});
