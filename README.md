# Omakase Counter (お任せカウンター) 🍣

A gamified sushi eating tracker that allows users to count pieces in real-time, break personal records, capture celebration photos, and share achievements on social media.

## Features ✨

### Phase 1 - Core MVP (✅ Complete)
- **Real-time Counter**: Tap the large + button to increment your sushi count
- **Personal Records**: Track your highest count and get notified when you break it
- **Celebration Animation**: Confetti and celebration modal when you set a new record
- **Photo Capture**: Take photos of your achievements (with camera or file upload fallback)
- **Session History**: View all your past sushi eating sessions
- **Sushi Type Tracking**: Select and track which types of sushi you've eaten
- **Offline Support**: All data stored locally with IndexedDB

## Tech Stack 🛠

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (neutral/minimalist design)
- **Animations**: Framer Motion
- **Storage**: IndexedDB (via idb library)
- **Icons**: Lucide React
- **Image Processing**: browser-image-compression

## Getting Started 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to:
- Local: http://localhost:3000
- Network: http://YOUR_IP:3000 (for testing on iPhone)

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure 📁

```
src/
├── components/
│   ├── Counter/          # Counter display and increment button
│   ├── Celebration/      # Record break modal and confetti
│   ├── Camera/           # Photo capture and preview
│   ├── History/          # Session list and cards
│   ├── SushiTypes/       # Type selection grid
│   └── Layout/           # Navigation and layout components
├── hooks/                # Custom React hooks
│   ├── useCounter.js     # Counter logic and state
│   ├── useCamera.js      # Camera access and photo capture
│   ├── useShare.js       # Web Share API integration
│   └── useIndexedDB.js   # Database operations
├── utils/                # Utility functions
│   ├── db.js             # IndexedDB helpers
│   ├── imageCompression.js
│   ├── share.js          # Social sharing
│   └── constants.js      # App constants
└── styles/
    └── globals.css       # Global styles and Tailwind config

## How to Use 📱

### Counter Tab
1. Tap the **+** button to add each piece of sushi you eat
2. Watch your count grow with smooth animations
3. When you beat your personal record, a celebration modal appears
4. Choose to capture a photo or skip
5. End your session when done

### Types Tab
Select which types of sushi you're eating:
- Browse by category (Nigiri, Maki, Sashimi, Other)
- Tap to select/deselect types
- Selected types appear on your counter screen

### History Tab
- View all your past sessions
- See photos you've taken
- Share sessions to social media
- Track your progress over time

## Features Breakdown 🎯

### Counter System
- Smooth increment animations
- Haptic feedback on tap (if supported)
- Visual feedback for new records
- Decrement button (appears when count > 0)

### Record Tracking
- Automatic personal best tracking
- Comparison with current session
- Special styling when breaking records
- Record flag in session history

### Photo System
- Camera access with environment facing mode
- File upload fallback
- Image compression (<500KB)
- Base64 storage in IndexedDB

### Social Sharing
- Web Share API integration
- Works natively on iOS Safari
- Includes count, photo, and link
- Fallback to clipboard copy

## Design Philosophy 🎨

### Color Scheme
- **Rice** (#F8F7F4): Off-white background
- **Charcoal** (#2C3E50): Primary text and buttons
- **Salmon** (#FF6B6B): Accent for records and celebrations
- **Border Gray** (#E8E8E8): Subtle borders

### Typography
- **Headings**: Poppins (modern, clean)
- **Body**: Inter (readable, iOS-friendly)
- **Counter**: Large, bold numbers

### Animations
- Counter increment: 300ms scale animation
- Celebration: 2500ms with confetti
- Transitions: 200ms smooth fades

## iOS Safari Optimization 📱

- Viewport meta tag with safe-area support
- 16px minimum font size (prevents auto-zoom)
- Standalone mode support
- Camera permissions handling
- Touch-friendly button sizes (60px+)

## Next Steps 🔮

### Planned Features
- [ ] PWA manifest and service worker
- [ ] Offline-first architecture
- [ ] Custom sushi types
- [ ] Statistics and insights
- [ ] Restaurant tracking
- [ ] Friends leaderboard
- [ ] Capacitor wrapper for App Store

## Development Notes 📝

### Testing on iPhone
1. Start dev server: `npm run dev`
2. Find your computer's IP address
3. On iPhone, navigate to: `http://YOUR_IP:3000`
4. Test camera, photos, and sharing

### Browser Support
- Chrome/Edge: Full support
- Safari iOS: Full support (primary target)
- Firefox: Full support
- Camera API requires HTTPS in production

## Contributing 🤝

This is a personal project, but feedback and suggestions are welcome!

## License 📄

Private project - All rights reserved

## Credits 👏

- Design inspiration: Japanese minimalism
- Icons: Lucide React
- Animations: Framer Motion
- Built with ❤️ for sushi lovers everywhere

---

**Version**: 0.1.0
**Last Updated**: December 1, 2025
**Status**: MVP Complete ✅
