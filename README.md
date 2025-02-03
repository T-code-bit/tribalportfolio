# TRIBAL Digital Experience Portfolio

## Overview
A modern, interactive personal portfolio showcasing professional skills, experience, and digital innovation.

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

## Deployment
This portfolio is deployed using GitHub Pages. 

### Local Development
1. Clone the repository
2. Open `index.html` in your browser

### Performance Optimizations
- Lazy Loading
- Minimal External Dependencies
- Efficient JavaScript Animations

## Deployment Details
- **Repository:** [GitHub Repo](https://github.com/T-code-bit/tribalportfolio)
- **Live URL:** https://T-code-bit.github.io/tribalportfolio/
- **Deployment Method:** GitHub Pages with GitHub Actions

### Maintenance Scripts
- `optimize.ps1`: Minifies CSS and JavaScript
- `accessibility_audit.ps1`: Runs accessibility tests

### Recommended Workflow
1. Make changes locally
2. Test thoroughly
3. Commit and push to main branch
4. GitHub Actions will automatically deploy

### Performance Optimization
Run `optimize.ps1` before deployment to:
- Minify CSS files
- Compress JavaScript
- Generate performance report

### Accessibility Audit
Run `accessibility_audit.ps1` to:
- Check WCAG compliance
- Generate detailed accessibility report

## Mobile Responsiveness Testing

### Testing Tools
- `mobile_test.html`: Interactive device simulator
- `mobile_responsiveness_test.ps1`: Automated browser testing script

### How to Test
1. Open `mobile_test.html` in a web browser
2. Run `mobile_responsiveness_test.ps1` as an administrator

### Supported Test Devices
- iPhone SE (375x667)
- iPhone 12/13 Pro (390x844)
- Samsung Galaxy S21 (360x800)
- iPad Mini (768x1024)

### Responsiveness Checklist
- [ ] Navigation menu collapses/expands
- [ ] Text remains readable
- [ ] Images scale correctly
- [ ] Touch targets are 44x44 pixels minimum
- [ ] No horizontal scrolling
- [ ] Sections stack vertically

### Troubleshooting
- Ensure browsers are installed
- Run script with administrator privileges
- Check console logs for any issues

## Performance and Mobile Optimization

### Key Enhancements
- Advanced mobile-first CSS optimizations
- Progressive image loading
- Touch-friendly navigation
- Battery-aware performance adjustments
- Offline support via Service Worker

### Performance Scripts
- `performance_audit.ps1`: Comprehensive performance analysis
- `mobile_enhancements.js`: Interactive mobile features

### Mobile Features
- Swipe gesture navigation
- Adaptive performance based on battery level
- Lazy loading for images
- Responsive typography
- Reduced motion for accessibility

### Optimization Techniques
- Hardware acceleration
- Minimal repaints and reflows
- Content visibility optimization
- Network-aware asset loading

### Performance Metrics Goals
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s

### How to Use Performance Tools
1. Run `performance_audit.ps1`
2. Review generated performance report
3. Implement suggested optimizations

## Troubleshooting
- Ensure all scripts have necessary dependencies
- Check GitHub Actions logs for deployment issues

## License
MIT License
