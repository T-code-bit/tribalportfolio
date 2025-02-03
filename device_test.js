// Advanced Device Compatibility Diagnostic and Testing Tool

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

    collectBrowserInfo() {
        this.diagnostics.browser = {
            userAgent: navigator.userAgent,
            browserName: this.getBrowserName(),
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            platform: navigator.platform,
            doNotTrack: navigator.doNotTrack
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

    collectScreenInfo() {
        this.diagnostics.screen = {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            orientation: screen.orientation ? screen.orientation.type : 'Not supported'
        };
    }

    collectPerformanceInfo() {
        this.diagnostics.performance = {
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
            maxTouchPoints: navigator.maxTouchPoints,
            memoryEstimate: performance.memory ? 
                `${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB` : 
                'Not Available',
            jsHeapSizeLimit: performance.memory ? 
                `${(performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB` : 
                'Not Available'
        };
    }

    collectFeatureSupport() {
        this.diagnostics.features = {
            touchSupport: 'ontouchstart' in window,
            webGLSupport: !!window.WebGLRenderingContext,
            intersectionObserverSupport: 'IntersectionObserver' in window,
            darkModeSupport: window.matchMedia('(prefers-color-scheme: dark)').matches,
            serviceWorkerSupport: 'serviceWorker' in navigator,
            webWorkerSupport: !!window.Worker,
            webSocketSupport: !!window.WebSocket
        };
    }

    collectNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.diagnostics.network = connection ? {
            type: connection.type,
            effectiveType: connection.effectiveType,
            downlinkMax: connection.downlinkMax,
            saveData: connection.saveData
        } : { status: 'Network Information API not supported' };
    }

    testAccessibility() {
        const testContainer = document.createElement('div');
        testContainer.innerHTML = `
            <div>
                <h1>Accessibility Test</h1>
                <button aria-label="Test Button">Accessibility Check</button>
                <input type="text" placeholder="Input Field" aria-required="true">
            </div>
        `;
        document.body.appendChild(testContainer);

        this.diagnostics.accessibility = {
            ariaSupport: !!document.querySelector('[aria-label]'),
            requiredFieldsSupport: !!document.querySelector('[aria-required]'),
            colorContrastBasic: this.checkColorContrast()
        };
    }

    checkColorContrast() {
        // Basic color contrast check
        const testElement = document.createElement('div');
        testElement.style.background = 'black';
        testElement.style.color = 'white';
        document.body.appendChild(testElement);
        return window.getComputedStyle(testElement).color !== 'rgb(0, 0, 0)';
    }

    runPerformanceStressTest() {
        console.time('Performance Stress Test');
        const iterations = 500000;
        let result = 0;
        for (let i = 0; i < iterations; i++) {
            result += Math.pow(Math.sqrt(i), 2);
        }
        console.timeEnd('Performance Stress Test');
        return result;
    }

    testResponsiveLayout() {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = `
            <div class="responsive-test" style="
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4); 
                padding: 20px; 
                color: white; 
                text-align: center;
                transition: all 0.3s ease;
            ">
                <h2>Responsive Layout Test</h2>
                <p>Resize browser to test responsiveness</p>
            </div>
        `;
        document.body.appendChild(testDiv);

        // Add media query test
        const style = document.createElement('style');
        style.textContent = `
            @media screen and (max-width: 600px) {
                .responsive-test {
                    background: #3498db;
                }
            }
        `;
        document.head.appendChild(style);
    }

    generateCompatibilityReport() {
        console.log('🔍 Comprehensive Device Compatibility Report 🔍');
        console.group('Browser Information');
        console.table(this.diagnostics.browser);
        console.groupEnd();

        console.group('Screen Characteristics');
        console.table(this.diagnostics.screen);
        console.groupEnd();

        console.group('Performance Metrics');
        console.table(this.diagnostics.performance);
        console.groupEnd();

        console.group('Feature Support');
        console.table(this.diagnostics.features);
        console.groupEnd();

        console.group('Network Information');
        console.table(this.diagnostics.network);
        console.groupEnd();

        console.group('Accessibility Assessment');
        console.table(this.diagnostics.accessibility);
        console.groupEnd();
    }

    runComprehensiveDiagnostics() {
        this.collectBrowserInfo();
        this.collectScreenInfo();
        this.collectPerformanceInfo();
        this.collectFeatureSupport();
        this.collectNetworkInfo();
        this.testAccessibility();
        this.testResponsiveLayout();
        this.runPerformanceStressTest();
        this.generateCompatibilityReport();
    }
}

// Initialize and run diagnostics when page loads
window.addEventListener('DOMContentLoaded', () => {
    const compatibilityTester = new DeviceCompatibilityTester();
    compatibilityTester.runComprehensiveDiagnostics();
});
