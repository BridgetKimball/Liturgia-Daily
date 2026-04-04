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
8. [Widget Setup](#widget-setup)
9. [Contributing](#contributing)
10. [References](#references)

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

> **Note:** This option requires a **Mac computer** with Xcode installed.

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

### Stopping the App

To stop the development server at any time, go back to your terminal and press **Ctrl + C** (hold the Control key and press C).

---

### Running Tests

To run the automated tests and make sure everything is working:

```bash
npm test
```

---

## Widget Setup

The in-app **Widget Preview** (visible at the bottom of the Home screen) shows exactly what the native widget will look like. Follow the steps in this section to install a real, live widget on your device's **home screen** or **lock screen**.

> **Note:** Native widgets run outside of Expo Go and require a full native build. You will use **EAS Build** (Expo's free cloud build service) to produce the installable app file.

---

### Widget Prerequisites

Before you begin, make sure you have:

- Completed the [Getting Started](#getting-started) steps above and can run the app successfully.
- A free [Expo account](https://expo.dev/signup) — sign up at expo.dev.
- **iOS only**: An [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year) is required to install the widget on a real iPhone/iPad. You also need a Mac with Xcode installed to accept Apple's signing certificates.
- **Android only**: An Android device (physical or emulator) running Android 5.0 (API level 21) or later.

---

### Step 1 — Install EAS CLI and Log In

EAS (Expo Application Services) builds the native version of the app that supports widgets.

1. In your terminal, install the EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```
   Enter your Expo email and password when prompted. ✅

3. Inside the `Liturgia-Daily` folder, link the project to EAS:
   ```bash
   eas init
   ```
   Follow the on-screen prompts to connect your project. ✅

---

### Step 2 — Install Widget Libraries

Install the libraries that add native widget support to the app:

```bash
npm install react-native-widget-extension @react-native-async-storage/async-storage
```

- **`react-native-widget-extension`** — adds an iOS WidgetKit extension to your project automatically via an Expo config plugin.
- **`@react-native-async-storage/async-storage`** — used to store and share liturgical data so the widget can read it.

---

### Step 3 — Register the Config Plugin in `app.json`

Open `app.json` in a text editor and update it to match the following (new lines are marked with comments):

```json
{
  "expo": {
    "name": "Liturgia Daily",
    "slug": "liturgia-daily",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A1628"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.liturgiadaily.app",
      "entitlements": {
        "com.apple.security.application-groups": ["group.com.liturgiadaily.app"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A1628"
      },
      "package": "com.liturgiadaily.app",
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      [
        "react-native-widget-extension",
        {
          "targetName": "LiturgiaWidget",
          "entryPoints": ["widgets/ios/LiturgiaWidget.swift"]
        }
      ]
    ]
  }
}
```

> The `entitlements` entry sets up the **App Group** that lets the main app and the widget share data. The `plugins` entry tells Expo to add the widget target to the Xcode project automatically at build time.

---

### Step 4 — Write the Today-Data Hook in `HomeScreen.js`

The widget needs to read today's liturgical data. Open `src/screens/HomeScreen.js` and add the following import and `useEffect` so the app writes today's data whenever it launches:

```js
// Add this import at the top of the file:
import AsyncStorage from '@react-native-async-storage/async-storage';

// Inside the HomeScreen component, after the existing `info` calculation:
React.useEffect(() => {
  AsyncStorage.multiSet([
    ['season',   info.season],
    ['color',    info.color],
    ['colorHex', info.colorHex],
  ]);
}, [info]);
```

> On iOS, `AsyncStorage` writes to `UserDefaults` using the App Group suite identifier, making the values readable by the Swift widget extension. The widget will always display the most recently opened day's data.

---

### Step 5 — Create the iOS Widget (Swift / WidgetKit)

> **What is WidgetKit?** It is Apple's framework for building home screen and lock screen widgets. Widgets are written in **Swift** — a language similar to JavaScript that Apple developed for iOS/macOS development. You do not need to be a Swift expert to follow these steps; just copy the code below exactly.

#### 5a. Create the widget folder

In your terminal (inside the `Liturgia-Daily` folder), run:

```bash
mkdir -p widgets/ios
```

#### 5b. Create the widget file

Create the file `widgets/ios/LiturgiaWidget.swift` and paste in the following code:

```swift
import WidgetKit
import SwiftUI

// ── Data model ─────────────────────────────────────────────────────────────

struct LiturgiaEntry: TimelineEntry {
    let date: Date
    let season: String
    let color: String
    let colorHex: String
}

// ── Timeline provider ───────────────────────────────────────────────────────

struct LiturgiaProvider: TimelineProvider {

    func placeholder(in context: Context) -> LiturgiaEntry {
        LiturgiaEntry(date: Date(), season: "Ordinary Time", color: "Green", colorHex: "#4A7C59")
    }

    func getSnapshot(in context: Context, completion: @escaping (LiturgiaEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<LiturgiaEntry>) -> Void) {
        let entry = loadEntry()
        // Refresh at the start of the next calendar day
        let tomorrow = Calendar.current.startOfDay(for: Date().addingTimeInterval(86_400))
        completion(Timeline(entries: [entry], policy: .after(tomorrow)))
    }

    private func loadEntry() -> LiturgiaEntry {
        // Read data written by the main app via AsyncStorage (App Group UserDefaults)
        let defaults = UserDefaults(suiteName: "group.com.liturgiadaily.app")
        let season   = defaults?.string(forKey: "season")   ?? "Ordinary Time"
        let color    = defaults?.string(forKey: "color")    ?? "Green"
        let colorHex = defaults?.string(forKey: "colorHex") ?? "#4A7C59"
        return LiturgiaEntry(date: Date(), season: season, color: color, colorHex: colorHex)
    }
}

// ── Widget view ─────────────────────────────────────────────────────────────

struct LiturgiaWidgetView: View {
    var entry: LiturgiaEntry

    var body: some View {
        ZStack {
            Color(hex: entry.colorHex).opacity(0.85)
            VStack(spacing: 4) {
                Text("✝")
                    .font(.title2)
                    .opacity(0.7)
                Text("LITURGIA")
                    .font(.system(size: 8, weight: .bold))
                    .tracking(1.5)
                    .opacity(0.7)
                Text(entry.season)
                    .font(.system(size: 13, weight: .bold))
                    .multilineTextAlignment(.center)
                Circle()
                    .fill(Color.white.opacity(0.6))
                    .frame(width: 7, height: 7)
                Text(entry.color)
                    .font(.system(size: 10, weight: .semibold))
            }
            .foregroundColor(.white)
            .padding(8)
        }
    }
}

// ── Accessory (lock screen) views ───────────────────────────────────────────

struct LiturgiaCircularView: View {
    var entry: LiturgiaEntry
    var body: some View {
        ZStack {
            Color(hex: entry.colorHex)
            Text("✝").font(.title3)
        }
        .foregroundColor(.white)
    }
}

struct LiturgiaRectangularView: View {
    var entry: LiturgiaEntry
    var body: some View {
        HStack(spacing: 6) {
            Text("✝")
            Text(entry.season).bold()
        }
        .font(.caption)
        .foregroundColor(.white)
    }
}

// ── Widget entry view (dispatches to the correct view per family) ─────────────

struct LiturgiaWidgetEntryView: View {
    var entry: LiturgiaEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        if #available(iOSApplicationExtension 16.0, *) {
            switch family {
            case .accessoryCircular:
                LiturgiaCircularView(entry: entry)
            case .accessoryRectangular:
                LiturgiaRectangularView(entry: entry)
            default:
                LiturgiaWidgetView(entry: entry)
            }
        } else {
            LiturgiaWidgetView(entry: entry)
        }
    }
}

// ── Color helper ────────────────────────────────────────────────────────────

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >> 8)  & 0xFF) / 255
        let b = Double(int         & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}

// ── Widget configuration ─────────────────────────────────────────────────────

@main
struct LiturgiaWidget: Widget {
    let kind = "LiturgiaWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: LiturgiaProvider()) { entry in
            LiturgiaWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Liturgia Daily")
        .description("Today's liturgical color and season at a glance.")
        .supportedFamilies(supportedFamilies)
    }

    private var supportedFamilies: [WidgetFamily] {
        if #available(iOSApplicationExtension 16.0, *) {
            return [
                .systemSmall,
                .systemMedium,
                .accessoryCircular,     // lock screen (iOS 16+)
                .accessoryRectangular,  // lock screen (iOS 16+)
            ]
        }
        return [.systemSmall, .systemMedium]
    }
}
```

> **Lock screen sizes explained:**
> - `.accessoryCircular` — a small circular slot below the clock on the lock screen.
> - `.accessoryRectangular` — a wider rectangular slot on the lock screen.
> Both sizes are supported only on **iOS 16 and later**.

---

### Step 6 — Create the Android Widget

Android widgets use XML layouts and a Kotlin class (`AppWidgetProvider`) to update the display. These files live inside the Android project that Expo generates during a build.

#### 6a. Create the widget layout

Create the directory path and file:

```
android/app/src/main/res/layout/liturgia_widget.xml
```

Paste in the following XML:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="8dp"
    android:background="#CC0A1628">

    <TextView
        android:id="@+id/widget_cross"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="✝"
        android:textSize="20sp"
        android:textColor="#D4AF37" />

    <TextView
        android:id="@+id/widget_season"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Ordinary Time"
        android:textSize="13sp"
        android:textColor="#FFFFFF"
        android:textStyle="bold"
        android:gravity="center" />

    <TextView
        android:id="@+id/widget_color"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Green"
        android:textSize="11sp"
        android:textColor="#D4AF37" />

</LinearLayout>
```

#### 6b. Create the widget info file

Create the directory path and file:

```
android/app/src/main/res/xml/liturgia_widget_info.xml
```

Paste in the following XML:

```xml
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="110dp"
    android:minHeight="40dp"
    android:updatePeriodMillis="86400000"
    android:initialLayout="@layout/liturgia_widget"
    android:widgetCategory="home_screen"
    android:description="Today\'s liturgical color and season." />
```

#### 6c. Create the widget provider class

Create the directory path and file:

```
android/app/src/main/java/com/liturgiadaily/app/LiturgiaWidgetProvider.kt
```

Paste in the following Kotlin code:

```kotlin
package com.liturgiadaily.app

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews

class LiturgiaWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        // Read data written by the React Native app
        val prefs = context.getSharedPreferences("liturgia_widget_data", Context.MODE_PRIVATE)
        val season = prefs.getString("season", "Ordinary Time") ?: "Ordinary Time"
        val color  = prefs.getString("color",  "Green")         ?: "Green"

        for (id in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.liturgia_widget)
            views.setTextViewText(R.id.widget_season, season)
            views.setTextViewText(R.id.widget_color,  color)
            appWidgetManager.updateAppWidget(id, views)
        }
    }
}
```

#### 6d. Register the widget in `AndroidManifest.xml`

Open `android/app/src/main/AndroidManifest.xml` and paste the following block just **before** the closing `</application>` tag:

```xml
<receiver
    android:name=".LiturgiaWidgetProvider"
    android:exported="true">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/liturgia_widget_info" />
</receiver>
```

> **How does the data flow?** The React Native app writes today's season and color to `SharedPreferences` (via `AsyncStorage`) whenever it opens. The `LiturgiaWidgetProvider` reads those values and updates the widget views.

---

### Step 7 — Build and Install the App

Once you have created all the files above, run an EAS development build:

**iOS:**

```bash
eas build --platform ios --profile development
```

**Android:**

```bash
eas build --platform android --profile development
```

> These commands upload your project to Expo's cloud build servers and return a download link when finished. The build may take 5–15 minutes.

After the build finishes:

- **iOS** — Open the download link on your iPhone. You may need to go to **Settings → General → VPN & Device Management** and trust your developer certificate before the app will open.
- **Android** — Download the `.apk` file and open it on your device. If prompted, allow installs from unknown sources under **Settings → Apps → Special App Access → Install Unknown Apps**.

---

### Step 8 — Add the Widget to Your Home Screen

#### 📱 On iPhone / iPad (iOS 14 or later)

1. Press and hold any **empty spot** on your Home Screen until the apps start to jiggle.
2. Tap the **＋** (plus) button in the top-left corner of the screen.
3. In the widget gallery that appears, **search for "Liturgia"** or scroll down to find it.
4. Tap the **Liturgia Daily** widget.
5. Swipe left or right to choose a widget size (small or medium) and tap **Add Widget**.
6. Drag the widget to the position you want, then tap **Done** in the top-right corner. ✅

#### 🤖 On Android

1. Press and hold any **empty spot** on your Home Screen.
2. Tap **Widgets** from the menu that appears at the bottom of the screen.
3. Scroll through the list or type **"Liturgia"** in the search bar.
4. Press and hold the **Liturgia Daily** widget thumbnail, then drag it to the desired location on your Home Screen.
5. Release to place the widget. ✅

---

### Step 9 — Add the Widget to Your Lock Screen (iPhone — iOS 16 or later)

Apple introduced lock screen widgets in iOS 16. The Liturgia Daily widget supports both the circular and rectangular lock screen slots.

1. Wake your iPhone and press and hold the **Lock Screen** until a **Customize** button appears at the bottom.
2. Tap **Customize**.
3. Tap the **Lock Screen** tile (the left tile, not the Home Screen tile).
4. Tap the **widget area just below the clock** — the row of small circular or rectangular placeholder slots.
5. Scroll the widget picker and tap **Liturgia Daily**.
6. Select the style you prefer:
   - **Circular** — shows the cross (✝) icon in today's liturgical color.
   - **Rectangular** — shows the cross and season name side by side.
7. Tap anywhere outside the customisation panel, then tap **Done** to save. ✅

> You can now see today's liturgical color and season on your lock screen **without unlocking your phone**!

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