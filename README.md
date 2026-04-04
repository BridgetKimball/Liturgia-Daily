# Liturgia Daily

A Catholic widget and mobile app that displays the **liturgical color of the day** so the faithful can easily stay connected to the rhythm of the Church's calendar.

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

**Liturgia Daily** is a lightweight Catholic widget and mobile application designed to help Catholics keep track of the liturgical season at a glance. Each day the app displays the appropriate liturgical color, reflecting the season or feast being celebrated in the Roman Rite of the Catholic Church.

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
| **Home / Widget** | Shows today's liturgical color as a bold background or color swatch, with the name of the season or feast |
| **Day Detail** | Expanded view with the liturgical color, season name, and (in future updates) saint of the day, prayer, and Bible verse |
| **Calendar** | *(Planned)* Monthly calendar with liturgical color coding for each day |
| **Settings** | *(Planned)* Options for notifications, language/localization, and calendar preferences |

---

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK ~54) with [React Native](https://reactnative.dev/)
- **Platforms**: iOS, Android, and Web (via `react-native-web`)
- **Language**: JavaScript (React)
- **Liturgical Calendar Logic**: Custom pure-JS implementation in `src/utils/liturgicalCalendar.js`, based on the Roman Catholic liturgical calendar

---

## Getting Started

Liturgia Daily is an **Expo React Native** app. It runs on **iOS**, **Android**, and **Web** from a single codebase.

---

### Step 1 — Install Prerequisites

Before running the app, make sure you have the following installed:

1. **Node.js** (v18 or later) — [Download here](https://nodejs.org/)
   - npm comes bundled with Node.js, so no separate install is needed.
   - Verify your installation by running:
     ```bash
     node --version
     npm --version
     ```

2. **Git** — [Download here](https://git-scm.com/)
   - Verify with:
     ```bash
     git --version
     ```

---

### Step 2 — Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/BridgetKimball/Liturgia-Daily.git
cd Liturgia-Daily
```

---

### Step 3 — Install Dependencies

Inside the project folder, install all required packages:

```bash
npm install
```

This installs Expo, React Native, and all other dependencies listed in `package.json`.

---

### Step 4 — Run the App

Choose your platform below:

---

#### 📱 Run on iOS — Physical Device (Easiest, no Mac required)

1. Install the **Expo Go** app on your iPhone from the [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. In the project folder, start the development server:
   ```bash
   npm start
   ```
3. A QR code will appear in your terminal and in the browser that opens.
4. Open the **Camera app** on your iPhone and point it at the QR code.
5. Tap the notification banner that appears — this opens the app in **Expo Go**.

> **Note:** Your phone and computer must be on the **same Wi-Fi network**.

---

#### 🖥️ Run on iOS — Simulator (Mac only)

1. Make sure you have **Xcode** installed from the [Mac App Store](https://apps.apple.com/app/xcode/id497799835).
2. Open Xcode at least once to accept its license agreement and install required components.
3. In the project folder, run:
   ```bash
   npm run ios
   ```
4. Expo will automatically launch the iOS Simulator and open the app inside it.

> **Note:** This option requires **macOS**. It will not work on Windows or Linux.

---

#### 🌐 Run on Web (Any computer)

1. In the project folder, run:
   ```bash
   npm run web
   ```
2. Your default browser will automatically open with the app running at `http://localhost:8081`.
3. If the browser doesn't open automatically, navigate to that URL manually.

---

#### 🤖 Run on Android

| Method | Steps |
|--------|-------|
| **Physical device** | Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android phone. Run `npm start` and scan the QR code with the Expo Go app. |
| **Emulator** | Install [Android Studio](https://developer.android.com/studio) and set up a virtual device, then run `npm run android`. |

---

### Quick Reference

| Platform | Command | Requirements |
|----------|---------|--------------|
| **iOS (device)** | `npm start` → scan QR with Expo Go | iPhone + Expo Go app + same Wi-Fi |
| **iOS (simulator)** | `npm run ios` | macOS + Xcode |
| **Web** | `npm run web` | Any computer with a browser |
| **Android (device)** | `npm start` → scan QR with Expo Go | Android + Expo Go app + same Wi-Fi |
| **Android (emulator)** | `npm run android` | Android Studio |
| **Interactive (choose platform)** | `npm start` then press `i`, `w`, or `a` | Platform-specific requirements above |

---

### Running Tests

```bash
npm test
```

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