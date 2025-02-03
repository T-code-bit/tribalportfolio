// Minimal Device Compatibility Tester

class DeviceCompatibilityTester {
    constructor() {
        this.diagnostics = {
            browser: {},
            screen: {},
            performance: {},
            features: {},
            network: {},
            accessibility: {}
        };
    }

    // Minimal methods to collect basic information
    collectBrowserInfo() {
        this.diagnostics.browser = {
            userAgent: navigator.userAgent,
            browserName: this.getBrowserName(),
            language: navigator.language
        };
    }

    getBrowserName() {
        const agent = navigator.userAgent.toLowerCase();
        switch (true) {
            case agent.includes('chrome'): return 'Chrome';
            case agent.includes('firefox'): return 'Firefox';
            case agent.includes('safari'): return 'Safari';
            case agent.includes('edge'): return 'Edge';
            case agent.includes('opera'): return 'Opera';
            default: return 'Unknown';
        }
    }

    // Minimal run method without report generation
    runComprehensiveDiagnostics() {
        this.collectBrowserInfo();
    }
}

// Minimal initialization
window.addEventListener('DOMContentLoaded', () => {
    const compatibilityTester = new DeviceCompatibilityTester();
    compatibilityTester.runComprehensiveDiagnostics();
});
