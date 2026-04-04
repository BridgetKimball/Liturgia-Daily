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

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo Go](https://expo.dev/go) app installed on your iOS or Android device (for mobile testing), **or** an iOS Simulator / Android Emulator

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/BridgetKimball/Liturgia-Daily.git
   cd Liturgia-Daily
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

| Platform | Command | Notes |
|----------|---------|-------|
| **Expo Dev Server** (choose platform interactively) | `npm start` | Opens Expo CLI; press `i` for iOS, `a` for Android, `w` for web |
| **iOS** | `npm run ios` | Requires macOS with Xcode or an iOS Simulator |
| **Android** | `npm run android` | Requires Android Studio / Emulator or a connected device |
| **Web** | `npm run web` | Opens the app in your default browser |

> **Tip — mobile device**: Start the dev server with `npm start`, then scan the QR code with the **Expo Go** app on your phone to run the app instantly without a simulator.

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