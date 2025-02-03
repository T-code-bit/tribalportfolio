import re
import os

def validate_firebase_config(key, value):
    """Validate different Firebase configuration values"""
    validations = {
        'api_key': lambda x: len(x) == 39 and x.startswith('AIza'),
        'auth_domain': lambda x: x.endswith('.firebaseapp.com'),
        'project_id': lambda x: re.match(r'^[a-z0-9-]+$', x) is not None,
        'storage_bucket': lambda x: x.endswith('.appspot.com'),
        'messaging_sender_id': lambda x: x.isdigit(),
        'app_id': lambda x: re.match(r'^1:\d+:web:[a-f0-9]+$', x) is not None,
        'database_url': lambda x: x.startswith('https://') and x.endswith('.firebaseio.com')
    }
    
    return validations.get(key, lambda x: True)(value)

def get_firebase_config():
    print("\n🔥 TRIBAL Portfolio - Firebase Configuration Helper 🔥")
    print("Enter your Firebase configuration values carefully.\n")
    
    config_keys = [
        ('api_key', 'Firebase API Key (39 characters, starts with AIza)'),
        ('auth_domain', 'Authentication Domain (ends with .firebaseapp.com)'),
        ('project_id', 'Project ID (lowercase letters, numbers, hyphens)'),
        ('storage_bucket', 'Storage Bucket (ends with .appspot.com)'),
        ('messaging_sender_id', 'Messaging Sender ID (numeric)'),
        ('app_id', 'App ID (format: 1:123456:web:abcdef)'),
        ('database_url', 'Database URL (starts with https://, ends with .firebaseio.com)')
    ]
    
    config = {}
    
    for key, description in config_keys:
        while True:
            value = input(f"Enter {description}: ").strip()
            
            if not value:
                print("❌ Value cannot be empty. Please try again.")
                continue
            
            if validate_firebase_config(key, value):
                config[key] = value
                break
            else:
                print(f"❌ Invalid {description}. Please check and re-enter.")
    
    # Generate .env content
    env_content = f"""# Firebase Configuration for TRIBAL Portfolio
VITE_FIREBASE_API_KEY={config['api_key']}
VITE_FIREBASE_AUTH_DOMAIN={config['auth_domain']}
VITE_FIREBASE_DATABASE_URL={config['database_url']}
VITE_FIREBASE_PROJECT_ID={config['project_id']}
VITE_FIREBASE_STORAGE_BUCKET={config['storage_bucket']}
VITE_FIREBASE_MESSAGING_SENDER_ID={config['messaging_sender_id']}
VITE_FIREBASE_APP_ID={config['app_id']}"""
    
    # Write to .env file
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    with open(env_path, 'w') as f:
        f.write(env_content)
    
    print(f"\n✅ Configuration saved to {env_path}")
    print("🔐 Your Firebase configuration has been securely saved!")
    print("\n🚨 IMPORTANT: Never share your .env file publicly!")

if __name__ == '__main__':
    get_firebase_config()
