// Advanced User Interaction Capture
import { firebaseConfig, validateFirebaseConfig } from './firebase-config.js';

class UserCapture {
    constructor() {
        if (!validateFirebaseConfig(firebaseConfig)) {
            console.error('Invalid Firebase configuration. User capture will not work.');
            return null;
        }

        this.database = firebase.database();
        this.captureRef = this.database.ref('user_interactions');
        this.sessionId = this.generateSessionId();
        this.initializeCapture();
    }

    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    initializeCapture() {
        this.captureMouseMovement();
        this.captureScrollBehavior();
        this.captureClickInteractions();
        this.captureTimeOnPage();
    }

    captureMouseMovement() {
        document.addEventListener('mousemove', (event) => {
            this.logInteraction('mouse_move', {
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now()
            });
        }, { passive: true });
    }

    captureScrollBehavior() {
        let lastScrollPosition = 0;
        document.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
            
            this.logInteraction('scroll', {
                position: currentScrollPosition,
                direction: scrollDirection,
                timestamp: Date.now()
            });

            lastScrollPosition = currentScrollPosition;
        }, { passive: true });
    }

    captureClickInteractions() {
        document.addEventListener('click', (event) => {
            const targetElement = event.target;
            const elementInfo = {
                tagName: targetElement.tagName,
                className: targetElement.className,
                id: targetElement.id,
                text: targetElement.textContent.trim().substring(0, 50)
            };

            this.logInteraction('click', {
                element: elementInfo,
                timestamp: Date.now()
            });
        });
    }

    captureTimeOnPage() {
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            this.logInteraction('page_time', {
                duration: timeSpent,
                timestamp: Date.now()
            });
        });
    }

    logInteraction(type, data) {
        try {
            this.captureRef.push({
                sessionId: this.sessionId,
                type: type,
                data: data,
                timestamp: Date.now(),
                page: window.location.pathname
            });
        } catch (error) {
            console.error('Error logging interaction:', error);
        }
    }

    // Optional: Capture device and browser information
    static getCaptureMetadata() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            colorDepth: window.screen.colorDepth
        };
    }
}

// Initialize user capture when page loads
window.addEventListener('load', () => {
    // Only initialize if Firebase is available and configuration is valid
    if (window.firebase && firebase.apps.length > 0) {
        window.userCapture = new UserCapture();
        if (window.userCapture) {
            console.log('User interaction capture initialized');
        }
    }
});
