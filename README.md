# TRIBAL Digital Experience Portfolio

## Overview
A modern, interactive portfolio showcasing professional skills, experience, and digital innovation.

## Features
- Responsive Design
- Dark Theme
- Interactive Text Scramble Effects
- Performance Optimized
- Accessibility Focused

## Technologies
- HTML5
- CSS3
- Modern JavaScript (ES6+)
- Intersection Observer API
- CSS Custom Properties

## Performance Optimizations
- Lazy Loading
- Minimal Repaints
- Efficient JavaScript Modules
- Accessibility Enhancements

## Setup
1. Clone the repository
2. Open `index.html` in a modern browser
3. Explore the interactive portfolio

## Firebase Configuration
### Prerequisites
- Create a Firebase account at [https://firebase.google.com/](https://firebase.google.com/)
- Create a new Firebase project

### Setup Steps
1. Go to Firebase Console
2. Navigate to Project Settings
3. Under "Your apps" section, click "Add app" and choose Web
4. Register your app and copy the configuration

### Environment Configuration
1. Ensure Python 3.8+ is installed
2. Install dependencies: `pip install -r requirements.txt`
3. Run configuration generator: `python generate_firebase_config.py`
4. Follow the interactive prompts to enter your Firebase project details

### Configuration Generator
The `generate_firebase_config.py` script helps you:
- Securely create a `.env` file
- Validate Firebase configuration
- Prevent accidental misconfiguration

#### What You'll Need
- Firebase Project ID
- Web App Configuration Details
- API Keys from Firebase Console

### Quick Firebase Setup Video
[![Firebase Setup Guide](https://img.shields.io/badge/Watch-Setup%20Guide-red?style=for-the-badge&logo=youtube)](https://youtu.be/firebase-setup-guide)

### Security Recommendations
- Never commit your actual `.env` file to version control
- Add `.env` to your `.gitignore`
- Use environment-specific configurations

### Troubleshooting
- Ensure all Firebase configuration values are correctly set
- Check browser console for any configuration errors
- Verify Firebase project settings match your deployment environment

## Customization
Modify CSS variables in `styles/base.css` and `styles/themes/dark-theme.css` to personalize the design.

## Performance Metrics
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s

## Accessibility
- WCAG 2.1 AA Compliant
- Keyboard Navigation
- Screen Reader Friendly

## License
MIT License

## Contact
Email: tribal@example.com
LinkedIn: [Your LinkedIn Profile]
