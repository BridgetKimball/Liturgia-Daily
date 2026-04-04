# Liturgia Daily

A Catholic mobile and web app that displays the **liturgical color of the day** so the faithful can easily stay connected to the rhythm of the Church's calendar.

---

## Table of Contents

1. [About the App](#about-the-app)
2. [Liturgical Colors](#liturgical-colors)
3. [Current Features](#current-features)
4. [Planned Features](#planned-features)
5. [App Screens Overview](#app-screens-overview)
6. [Tech Stack](#tech-stack)
7. [Getting Started](#getting-started)
8. [Contributing](#contributing)
9. [References](#references)

---

## About the App

**Liturgia Daily** is a lightweight Catholic mobile and web application designed to help Catholics keep track of the liturgical season at a glance. Each day the app displays the appropriate liturgical color, reflecting the season or feast being celebrated in the Roman Rite of the Catholic Church.

The name *Liturgia* comes from the Latin/Greek word for "liturgy" — the public worship of the Church.

---

## Liturgical Colors

The Catholic Church uses specific colors throughout the liturgical year to symbolize different seasons, feasts, and themes:

| Color      | Season / Occasion                                                                 |
|------------|-----------------------------------------------------------------------------------|
| 🟢 **Green**  | Ordinary Time — growth, hope, and life in the Church                            |
| 🟣 **Purple / Violet** | Advent & Lent — penance, preparation, and mourning                  |
| ⚪ **White / Gold** | Christmas Season, Easter Season, feasts of the Lord, feasts of Mary, feasts of non-martyr saints — joy and purity |
| 🔴 **Red**    | Palm Sunday, Good Friday, Pentecost, feasts of Apostles and martyrs — fire of the Holy Spirit and the blood of martyrs |
| 🌹 **Rose / Pink** | Gaudete Sunday (3rd Sunday of Advent) & Laetare Sunday (4th Sunday of Lent) — joy amid penance |
| ⚫ **Black**  | Masses for the Dead (traditional usage) — mourning                              |
| 🔵 **Blue**   | Feasts of Our Lady (in some dioceses, e.g., United States) — Mary                |

---

## Current Features

- **Liturgical Color of the Day** — Displays the correct liturgical color for the current date based on the Roman Catholic liturgical calendar.

---

## Planned Features

Future updates may include:

- 🕯️ **Saint Feast Days** — Display the saint(s) being celebrated on a given day.
- ✝️ **Catholic Holidays & Solemnities** — Highlight major feasts such as Easter, Christmas, the Assumption, All Saints' Day, and more.
- 🙏 **Daily Prayer** — A short prayer or intention for each day, tied to the season or feast.
- 📖 **Bible Verse of the Day** — A scripture reading connected to the day's Mass readings or liturgical theme.
- 📅 **Liturgical Calendar View** — A monthly or yearly view of the liturgical calendar with color coding.
- 🔔 **Daily Notifications** — Optional reminders with the liturgical color and feast of the day.
- 🌍 **Localization** — Support for different regional calendars (e.g., diocesan feast days).

---

## App Screens Overview

| Screen | Description |
|--------|-------------|
| **Home** | Shows today's liturgical color as a bold background or color swatch, with the name of the season or feast |
| **Day Detail** | Expanded view with the liturgical color, season name, and (in future updates) saint of the day, prayer, and Bible verse |
| **Calendar** | *(Planned)* Monthly calendar with liturgical color coding for each day |
| **Settings** | *(Planned)* Options for notifications, language/localization, and calendar preferences |

---

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK ~54) with [React Native](https://reactnative.dev/)
- **Platforms**: iOS, Android, and Web (via `react-native-web`)
- **Language**: JavaScript (React)
- **Liturgical Calendar Logic**: Custom pure-JS implementation in `src/lib/liturgicalCalendar.js`, based on the Roman Catholic liturgical calendar

---

## Getting Started

Liturgia Daily is an **Expo React Native** app. It runs on **iOS**, **Android**, and **Web** from a single codebase. Follow the steps below — no prior coding experience required!

---

### Step 1 — Install the Required Tools

You will need two free programs installed on your computer before you can run the app.

#### 1a. Install Node.js

Node.js is the engine that powers the app on your computer.

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Click the big green **"LTS" (recommended)** download button.
3. Open the downloaded file and follow the on-screen installer steps (just click "Next" / "Continue" through each screen).
4. When it finishes, open a **Terminal** (Mac/Linux) or **Command Prompt / PowerShell** (Windows) and type the following command, then press **Enter**:
   ```
   node --version
   ```
   You should see a version number (e.g., `v22.0.0`). That means Node.js is installed correctly. ✅

> **What is a Terminal / Command Prompt?**
> - **Mac**: Press `Command ⌘ + Space`, type `Terminal`, press Enter.
> - **Windows**: Press the Windows key, type `cmd` or `PowerShell`, press Enter.
> - **Linux**: Right-click the desktop and choose "Open Terminal."

#### 1b. Install Git

Git lets you download the app's source code.

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Click your operating system (Windows, Mac, or Linux) and follow the download and install instructions.
3. Verify Git is installed by typing this in your terminal and pressing Enter:
   ```
   git --version
   ```
   You should see something like `git version 2.x.x`. ✅

---

### Step 2 — Download the App Code

In your terminal, run the following two commands one at a time (press **Enter** after each one):

```bash
git clone https://github.com/BridgetKimball/Liturgia-Daily.git
cd Liturgia-Daily
```

- The first command downloads the app code into a new folder called `Liturgia-Daily`.
- The second command moves you inside that folder.

---

### Step 3 — Install App Dependencies

Still in your terminal (inside the `Liturgia-Daily` folder), run:

```bash
npm install
```

This downloads all the extra packages the app needs. It may take a minute or two. You'll know it's done when you see your terminal prompt again. ✅

---

### Step 4 — Run the App

Choose **one** of the options below depending on where you want to run the app.

---

#### 📱 Option A — Run on a Real iPhone or Android Phone (Easiest — No Simulator Needed!)

This is the quickest way to see the app on a real device.

**On your phone:**
1. Open the App Store (iPhone) or Google Play Store (Android).
2. Search for **"Expo Go"** and install it.

**On your computer:**
1. In your terminal, run:
   ```bash
   npm start
   ```
2. A QR code will appear in the terminal.
3. **iPhone users**: Open the built-in **Camera** app and point it at the QR code. Tap the notification that appears at the top of the screen.
4. **Android users**: Open the **Expo Go** app, tap **"Scan QR code"**, and scan the QR code on your screen.

The app will load on your phone within a few seconds! 🎉

---

#### 🍎 Option B — Run on iOS (iPhone Simulator on a Mac)

> **Note:** This option requires a **Mac computer** with Xcode installed, but it does **not** require an Apple Developer Program account.

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the Mac App Store (it's free but large — about 10 GB).
2. Open Xcode at least once to accept the license agreement and let it finish installing extra tools.
3. In your terminal (inside the `Liturgia-Daily` folder), run:
   ```bash
   npm run ios
   ```
4. A simulated iPhone screen will open on your Mac automatically and the app will load inside it. ✅

---

#### 🤖 Option C — Run on Android (Android Emulator)

> **Note:** This option requires [Android Studio](https://developer.android.com/studio) (free).

1. Download and install **Android Studio** from [https://developer.android.com/studio](https://developer.android.com/studio). Follow the setup wizard and accept all defaults.
2. Open Android Studio, go to **More Actions → Virtual Device Manager**, and create a virtual device (any phone model is fine — click "Next" through the defaults).
3. Click the **▶ Play button** next to your virtual device to start the emulator. A phone screen will appear on your desktop.
4. In your terminal (inside the `Liturgia-Daily` folder), run:
   ```bash
   npm run android
   ```
5. The app will install and open in the emulator automatically. ✅

---

#### 🌐 Option D — Run in a Web Browser (Simplest Setup)

No phone or simulator needed — just your computer's web browser!

1. In your terminal (inside the `Liturgia-Daily` folder), run:
   ```bash
   npm run web
   ```
2. Your default web browser will open automatically and show the app. ✅

---

#### 🔗 Option E — Use the Deployed Web Version (GitHub Pages)

If you just want to open the live deployed site, use this link:

[https://bridgetkimball.github.io/Liturgia-Daily/](https://bridgetkimball.github.io/Liturgia-Daily/)

---

### Stopping the App

To stop the development server at any time, go back to your terminal and press **Ctrl + C** (hold the Control key and press C).

---

### Running Tests

To run the automated tests and make sure everything is working:

```bash
npm test
```

### Add the App to Your Home Screen

If you want a home screen icon without a paid Apple Developer account, use the web version of the app in Safari or Chrome and add it as a shortcut.

#### On iPhone or iPad

1. Open Safari and visit the web version of the app.
2. Tap the Share button.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

#### On Android

1. Open Chrome and visit the web version of the app.
2. Tap the three-dot menu.
3. Tap **Add to Home screen** or **Install app**.
4. Confirm the shortcut.

---

## Contributing

Contributions, ideas, and feedback are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your fork and open a Pull Request.

Please ensure any contributions respect Catholic teaching and the General Instruction of the Roman Missal (GIRM) when it comes to liturgical accuracy.

---

## References

- [Liturgical Color Guide — Gaspard Inc.](https://www.gaspardinc.com/liturgical-color-guide)
- [General Instruction of the Roman Missal (GIRM)](https://www.usccb.org/prayer-and-worship/the-mass/general-instruction-of-the-roman-missal)
- [USCCB Liturgical Calendar](https://www.usccb.org/committees/divine-worship/liturgical-calendar)
- Liturgical Calendars: See the `/Liturgical Calendars` folder for 2026–2028 PDF references.
- Liturgical Colors Image: See the `/Images` folder for a visual guide to liturgical colors.

---

*"The liturgy is the summit toward which the activity of the Church is directed; at the same time it is the font from which all her power flows."*
— Second Vatican Council, *Sacrosanctum Concilium*, §10