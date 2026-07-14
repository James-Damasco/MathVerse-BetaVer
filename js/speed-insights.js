// Vercel Speed Insights initialization
// This script initializes Vercel Speed Insights for performance monitoring

(function() {
    // Queue initialization
    window.si = window.si || function() {
        (window.siq = window.siq || []).push(arguments);
    };

    // Configuration
    const config = {
        debug: false, // Set to true to enable debug logging in development
        sampleRate: 1, // 1 = 100% of events sent (adjust to reduce costs if needed)
    };

    // Load the Speed Insights script
    const loadSpeedInsights = () => {
        // Check if script is already loaded
        const scriptSrc = '/_vercel/speed-insights/script.js';
        if (document.head.querySelector(`script[src*="${scriptSrc}"]`)) {
            return;
        }

        // Create and configure the script element
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.defer = true;
        
        // Add data attributes
        script.dataset.sdkn = '@vercel/speed-insights';
        script.dataset.sdkv = '2.0.0';
        
        if (config.sampleRate) {
            script.dataset.sampleRate = config.sampleRate.toString();
        }
        
        if (config.debug) {
            script.dataset.debug = 'true';
        }

        // Error handling
        script.onerror = function() {
            console.log(
                '[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.'
            );
        };

        // Append to head
        document.head.appendChild(script);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSpeedInsights);
    } else {
        loadSpeedInsights();
    }
})();
