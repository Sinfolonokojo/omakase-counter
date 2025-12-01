# PWA Setup Guide for iOS Installation

Your Omakase Counter app is now PWA-ready! Follow these steps to install it on your iPhone.

## Step 1: Generate App Icons

1. Open `icon-generator.html` in your browser
2. Click each "Download" button to save the three icon files:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
   - `apple-touch-icon.png` (180x180)
3. Move all three PNG files to the `public/` folder

## Step 2: Access the App from Your iPhone

### Option A: Local Network (Same WiFi)
1. Make sure your iPhone and computer are on the same WiFi network
2. Run `npm run dev` if not already running
3. Look for the network URL in the terminal (should show something like):
   ```
   ➜  Local:   http://localhost:3000/
   ➜  Network: http://192.168.x.x:3000/
   ```
4. Open Safari on your iPhone and go to the Network URL

### Option B: Deploy to a Server
For production use, deploy to:
- **Vercel** (recommended): `npm install -g vercel` then `vercel deploy`
- **Netlify**: Connect your GitHub repo and deploy
- **GitHub Pages**: Configure in repository settings

## Step 3: Install on iPhone

1. Open the app in **Safari** (must use Safari, not Chrome)
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Customize the name if desired
5. Tap **"Add"** in the top right

Your app will now appear on your home screen like a native app! 🍣

## Features Enabled

✅ **Standalone Mode** - Opens in full screen without Safari UI
✅ **Offline Support** - Works without internet connection
✅ **Home Screen Icon** - Beautiful sushi icon on your home screen
✅ **Fast Loading** - Service worker caches assets for instant loading
✅ **iOS Optimized** - Safe area insets, proper status bar styling

## Testing Checklist

- [ ] Icons generated and placed in `public/` folder
- [ ] App accessible from iPhone Safari
- [ ] "Add to Home Screen" option available
- [ ] App installs successfully
- [ ] Standalone mode works (no Safari UI)
- [ ] Offline functionality works (try airplane mode)
- [ ] Camera and photo features work
- [ ] Counter increments properly
- [ ] Session history saves correctly

## Troubleshooting

**"Add to Home Screen" not showing?**
- Must use Safari browser (not Chrome or Firefox)
- Make sure you're on iOS 11.3 or later
- Check that manifest.json is loading (open DevTools)

**App won't go offline?**
- Check browser console for service worker errors
- Service workers require HTTPS (or localhost)
- Clear browser cache and reload

**Icons not showing?**
- Verify PNG files are in `public/` folder
- Check file names match manifest.json
- Hard refresh the page (Cmd+Shift+R)

## Next Steps

Once testing is complete, you can:
1. Deploy to production (Vercel/Netlify)
2. Share the URL with friends
3. Later: Wrap with Capacitor for App Store submission

Enjoy your PWA! 🎉
