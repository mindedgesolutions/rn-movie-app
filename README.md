delete default files and folders:
npm run reset-project
delete (y)

<!-- ------------------------------------------------------- -->

To install tailwind.css:

1. go to NativeWind (https://www.nativewind.dev/getting-started/installation)
2. npm install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context@4.12.0
3. npx tailwindcss init
4. add code from NativeWind website to tailwind.config.js
5. create global.css in app folder
6. add tailwind directives
7. create babel.config.js in root
8. add code from NativeWind website to babel.config.js
9. to create metro.config.js run: npx expo customize metro.config.js
10. add code from NativeWind website to metro.config.js
11. add import "./global.css" in app/index.tsx
12. create a new file in root: nativewind-env.d.ts
13. add: /// <reference types="nativewind/types" />

clear and run: npx expo start --clear
refresh: r

<!-- ------------------------------------------------------- -->

add following in tailwind.config.js: content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
for tailwind classes to apply on the components as well which are outside app folder
