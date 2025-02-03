import os
import re

def generate_firebase_env():
    """
    Generate a secure .env file for Firebase configuration
    Prompts user for input and validates configuration
    """
    print(" TRIBAL Portfolio Firebase Configuration Generator ")
    print("Please have your Firebase project configuration ready.")
    
    config_keys = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_DATABASE_URL',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_STORAGE_BUCKET',
        'VITE_FIREBASE_MESSAGING_SENDER_ID',
        'VITE_FIREBASE_APP_ID'
    ]
    
    env_content = []
    
    for key in config_keys:
        while True:
            value = input(f"Enter {key.replace('VITE_FIREBASE_', '').replace('_', ' ').title()}: ").strip()
            
            # Basic validation
            if not value:
                print(" Value cannot be empty. Please try again.")
                continue
            
            # Additional specific validations
            if 'API_KEY' in key and len(value) != 39:
                print(" API Key should be 39 characters long. Please check your configuration.")
                continue
            
            if 'PROJECT_ID' in key and not re.match(r'^[a-z0-9-]+$', value):
                print(" Project ID should contain only lowercase letters, numbers, and hyphens.")
                continue
            
            env_content.append(f"{key}={value}")
            break
    
    # Write to .env file
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    with open(env_path, 'w') as f:
        f.write('\n'.join(env_content))
    
    print(f"\n Configuration saved to {env_path}")
    print(" Keep this file secure and never share it publicly!")

if __name__ == '__main__':
    generate_firebase_env()
