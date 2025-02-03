// About Me Sections Template Management
class AboutSectionTemplates {
    constructor() {
        this.initializeTemplates();
    }

    initializeTemplates() {
        // Personal Growth Milestones
        this.initializePersonalGrowthMilestones();

        // Language Skills
        this.initializeLanguageSkills();

        // Professional Certifications
        this.initializeCertifications();

        // Content Creation Platforms
        this.initializeContentPlatforms();
    }

    initializePersonalGrowthMilestones() {
        const milestones = [
            {
                title: 'Self-Taught Programming Journey',
                description: 'Began coding at 15, creating web applications and learning through online resources and open-source communities',
                date: '2012',
                icon: 'fa-rocket'
            },
            {
                title: 'First Open Source Contribution',
                description: 'Contributed to a machine learning library, gaining recognition in the developer community and understanding collaborative coding',
                date: '2016',
                icon: 'fa-code-branch'
            },
            {
                title: 'Tech Conference Speaking',
                description: 'Presented innovative cloud-native architecture strategies at international tech conferences, sharing insights on scalable system design',
                date: '2020',
                icon: 'fa-microphone'
            },
            {
                title: 'Machine Learning Research',
                description: 'Published research on AI-driven predictive models, focusing on ethical AI and algorithmic fairness',
                date: '2022',
                icon: 'fa-brain'
            }
        ];

        milestones.forEach(milestone => {
            this.addMilestone(
                milestone.title, 
                milestone.description, 
                milestone.date, 
                milestone.icon
            );
        });
    }

    initializeLanguageSkills() {
        const languages = [
            { name: 'English', level: 'Native', progress: 100 },
            { name: 'Spanish', level: 'Advanced', progress: 85 },
            { name: 'Mandarin', level: 'Intermediate', progress: 60 },
            { name: 'French', level: 'Beginner', progress: 30 }
        ];

        languages.forEach(lang => {
            this.addLanguage(
                lang.name, 
                lang.level, 
                `${lang.progress}%`
            );
        });
    }

    initializeCertifications() {
        const certifications = [
            {
                title: 'AWS Certified Solutions Architect',
                description: 'Advanced cloud architecture and scalable system design',
                date: '2021',
                logo: 'assets/aws-certified.svg'
            },
            {
                title: 'Certified Kubernetes Administrator',
                description: 'Container orchestration and cloud-native infrastructure management',
                date: '2020',
                logo: 'assets/kubernetes-certified.svg'
            },
            {
                title: 'Google Cloud Professional',
                description: 'Data engineering and machine learning specialization',
                date: '2022',
                logo: 'assets/google-cloud-certified.svg'
            }
        ];

        certifications.forEach(cert => {
            this.addCertification(
                cert.title, 
                cert.description, 
                cert.date, 
                cert.logo
            );
        });
    }

    initializeContentPlatforms() {
        const platforms = [
            {
                title: 'Technical Blog',
                stats: '500+ Followers | 25 Published Articles',
                link: 'https://medium.com/@yourprofile',
                icon: 'fa-medium'
            },
            {
                title: 'Tech Tutorial Channel',
                stats: '10K+ Subscribers | 50 Video Tutorials',
                link: 'https://youtube.com/@yourtech',
                icon: 'fa-youtube'
            },
            {
                title: 'Tech Podcast',
                stats: '5K Listeners | 30 Episodes',
                link: 'https://anchor.fm/yourpodcast',
                icon: 'fa-spotify'
            }
        ];

        platforms.forEach(platform => {
            this.addPlatform(
                platform.title, 
                platform.stats, 
                platform.link, 
                platform.icon
            );
        });
    }

    setupTimelineTemplate() {
        const timelineSection = document.querySelector('.personal-growth');
        if (!timelineSection) return;

        const template = timelineSection.querySelector('#milestone-template');
        const container = timelineSection.querySelector('.milestone-container');

        // Method to add a new milestone
        this.addMilestone = (title, description, date, iconClass = 'fa-rocket') => {
            if (!template || !container) return;

            const milestoneClone = template.content.cloneNode(true);
            const milestoneEl = milestoneClone.querySelector('.growth-milestone');
            
            // Set milestone details
            milestoneEl.querySelector('[data-title]').textContent = title;
            milestoneEl.querySelector('[data-description]').textContent = description;
            milestoneEl.querySelector('.milestone-date').textContent = date;
            
            // Set icon
            const icon = milestoneEl.querySelector('.milestone-icon i');
            icon.className = `fas ${iconClass}`;

            container.appendChild(milestoneClone);
        };
    }

    setupLanguageSkillsTemplate() {
        const languageSection = document.querySelector('.language-skills');
        if (!languageSection) return;

        const template = languageSection.querySelector('#language-template');
        const container = languageSection.querySelector('.language-grid');

        // Method to add a new language
        this.addLanguage = (language, level, progress) => {
            if (!template || !container) return;

            const languageClone = template.content.cloneNode(true);
            const languageEl = languageClone.querySelector('.language-item');
            
            // Set language details
            languageEl.querySelector('[data-language]').textContent = language;
            languageEl.querySelector('.proficiency-level').textContent = level;
            
            const progressBar = languageEl.querySelector('.progress-bar');
            progressBar.style.setProperty('--progress', `${progress}`);

            container.appendChild(languageClone);
        };
    }

    setupCertificationsTemplate() {
        const certificationSection = document.querySelector('.certifications');
        if (!certificationSection) return;

        const template = certificationSection.querySelector('#certification-template');
        const container = certificationSection.querySelector('.certification-list');

        // Method to add a new certification
        this.addCertification = (title, description, date, logoSrc) => {
            if (!template || !container) return;

            const certificationClone = template.content.cloneNode(true);
            const certificationEl = certificationClone.querySelector('.certification-item');
            
            // Set certification details
            certificationEl.querySelector('[data-title]').textContent = title;
            certificationEl.querySelector('[data-description]').textContent = description;
            certificationEl.querySelector('.certification-date').textContent = date;
            
            const logoImg = certificationEl.querySelector('[data-logo]');
            logoImg.src = logoSrc;
            logoImg.alt = title;

            container.appendChild(certificationClone);
        };
    }

    setupContentPlatformsTemplate() {
        const platformsSection = document.querySelector('.content-creation');
        if (!platformsSection) return;

        const template = platformsSection.querySelector('#platform-template');
        const container = platformsSection.querySelector('.content-platforms');

        // Method to add a new platform
        this.addPlatform = (title, stats, link, iconClass) => {
            if (!template || !container) return;

            const platformClone = template.content.cloneNode(true);
            const platformEl = platformClone.querySelector('.platform-card');
            
            // Set platform details
            platformEl.querySelector('[data-title]').textContent = title;
            platformEl.querySelector('[data-stats]').textContent = stats;
            
            const linkEl = platformEl.querySelector('[data-link]');
            linkEl.href = link;
            
            const icon = platformEl.querySelector('[data-icon]');
            icon.className = `fab ${iconClass}`;

            container.appendChild(platformClone);
        };
    }

    // Example of how to use the templates
    initializeExamples() {
        // Example: Adding a milestone
        this.addMilestone(
            'Machine Learning Breakthrough', 
            'Developed an AI model that improved prediction accuracy by 35%', 
            '2022',
            'fa-brain'
        );

        // Example: Adding a language
        this.addLanguage('French', 'Beginner', '40%');

        // Example: Adding a certification
        this.addCertification(
            'Google Cloud Professional', 
            'Cloud architecture and data engineering', 
            '2022', 
            'assets/google-cloud-certified.svg'
        );

        // Example: Adding a platform
        this.addPlatform(
            'Tech Podcast', 
            '5K Listeners | 30 Episodes', 
            'https://techpodcast.com', 
            'fa-spotify'
        );
    }
}

// Initialize the templates when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const aboutTemplates = new AboutSectionTemplates();
    
    // Uncomment the following line to add example content
    // aboutTemplates.initializeExamples();
});
