// Firebase Configuration Management
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
};

// Validate Firebase Configuration
export function validateFirebaseConfig(config) {
    const requiredKeys = [
        'apiKey', 'authDomain', 'databaseURL', 
        'projectId', 'storageBucket', 'messagingSenderId', 'appId'
    ];

    const missingKeys = requiredKeys.filter(key => !config[key]);
    
    if (missingKeys.length > 0) {
        console.error('Missing Firebase configuration keys:', missingKeys);
        return false;
    }
    return true;
}
