# 🧺 Terra Basket – React App

Clay-cooling storage app (Login, Register, Home, Add Item, Storage, Profile, Climate, Reports, Tips, Settings).

## Run (first time)
1. Install Node.js LTS (https://nodejs.org)
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 (use browser DevTools -> mobile view). Phone-la paaka: same WiFi-la `Network:` URL open pannunga.

Demo login: `lavpriya@email.com` / `123456`

## Build for production
```
npm run build      # output -> dist/
```

## Folder structure
```
src/
  main.jsx          entry
  App.jsx           navigation, global state (user, items, settings), tab bar, drawer
  context.js        React context (useApp)
  data.js           localStorage helpers + sample data
  styles.css        all styling / dark mode
  components/       ui.jsx (icons, fields, modal...), LineChart.jsx
  pages/            Splash, Login, Register, Home, AddItem, Storage, Profile, Climate, Reports, Tips, Settings
```

## Next steps
- Backend: Firebase / Node + MongoDB for real auth (now it is localStorage demo only).
- Real sensor data (ESP32 + DHT22) -> replace WEEK_TEMP / WEEK_HUM in `data.js`.
- Android APK: `npm i @capacitor/core @capacitor/cli @capacitor/android`, `npx cap init`, `npm run build`, `npx cap add android`, `npx cap open android`.
"# terra-basket" 
