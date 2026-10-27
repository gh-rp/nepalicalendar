पात्रो (Patro) — Nepali Calendar

A lightweight, offline Nepali calendar app for Android. It displays Bikram Sambat and AD dates, tithis, festivals, holidays, and personal events.

Built with React, TypeScript, Vite, and Capacitor.

Project Structure

src/ — Application source code

public/ — Static assets

package.json — Dependencies and scripts

capacitor.config.json — Capacitor configuration

vite.config.ts — Vite configuration

dist/ — Generated web build (created during build)

node\_modules/ — Installed dependencies (created during setup)

Rebuild the Android APK

Requirements

Node.js LTS

Android Studio with the required Android SDK

Internet connection for initial dependency downloads

Steps

npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android

