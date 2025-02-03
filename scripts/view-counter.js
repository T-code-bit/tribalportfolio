// Firebase Configuration
import { firebaseConfig, validateFirebaseConfig } from './firebase-config.js';

// Validate configuration before initialization
if (validateFirebaseConfig(firebaseConfig)) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const viewsRef = database.ref('website_views');

    // Function to increment and display view count
    function updateViewCount() {
        viewsRef.transaction((currentViews) => {
            // Increment views
            return (currentViews || 0) + 1;
        }, (error, committed, snapshot) => {
            if (error) {
                console.error('Transaction failed abnormally!', error);
            } else if (committed) {
                // Update view count display if element exists
                const viewCountElement = document.getElementById('view-count');
                if (viewCountElement) {
                    viewCountElement.textContent = snapshot.val();
                }
            }
        });
    }

    // Update view count when page loads
    window.addEventListener('load', updateViewCount);
} else {
    console.error('Firebase configuration is invalid. View counter will not work.');
}
