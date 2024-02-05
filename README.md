# React + TypeScript + Tailwind + Vite + Vite PWA

Progressive web app made with React and Vite

### Prerequisites

- Node.js
- bun, yarn, or npm

## How to run the project

I personally recommend bun over yarn or npm because bun is much faster

Created .env as per .env.example

1. `bun`
2. `bun dev`
3. The app will be available at [http://localhost:5173](http://localhost:5173)

## Create PWA offline features

1. Add logo.svg to public folder
2. `bun run generate-pwa-assets` - if you are using yarn or npm before running this scrip run `yarn add sharp --ignore-engines` or `npm install --include=optional sharp`
3. `bun run build`
4. `bun preview`
5. Done! If you visit the preview localhost URL at [http://localhost:4173](http://localhost:4173), you can turn off the internet and the app will still run. You can click the install button in your browser's address bar to install the app on your PC.
