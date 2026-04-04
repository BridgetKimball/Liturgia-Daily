# Liturgia Daily

A Catholic widget / mobile app that shows the **liturgical color of the day** according to the Roman Rite calendar.

---

## Features

- **Liturgical color of the day** — instantly see which color the Church uses today and why
- **Full season awareness** — Advent, Christmastide, Ordinary Time, Lent, Holy Week, Eastertide, and Pentecost
- **Special day notes** — Gaudete Sunday, Laetare Sunday, Palm Sunday, Good Friday, Holy Saturday, Easter, Pentecost, and Epiphany
- **Home-screen widget preview** — see what the widget looks like at a glance
- **Accurate liturgical calendar engine** — Easter calculated via the Meeus/Jones/Butcher algorithm; Advent start, Baptism of the Lord, and all moveable feasts derived from Easter

## Liturgical Colors

| Color  | Season / Occasion |
|--------|-------------------|
| Purple | Advent, Lent |
| Rose   | Gaudete Sunday (3rd Sunday of Advent), Laetare Sunday (4th Sunday of Lent) |
| White  | Christmastide, Holy Thursday, Holy Saturday, Eastertide |
| Red    | Palm Sunday, Good Friday, Pentecost |
| Green  | Ordinary Time |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

### Install & Run

```bash
npm install
npm start          # opens Expo Dev Tools
npm run android    # launch on Android emulator / device
npm run ios        # launch on iOS simulator / device (requires macOS)
npm run web        # launch in the browser
```

### Run Tests

```bash
npm test
```

The test suite covers:

- Easter date calculation (10 known years)
- Advent start date rules
- Baptism of the Lord calculation
- Every liturgical season boundary and special day

## Project Structure

```
├── App.js                          # Root component
├── index.js                        # Expo entry point
├── app.json                        # Expo configuration
├── assets/                         # Icons and splash images
├── src/
│   ├── utils/
│   │   └── liturgicalCalendar.js   # Core calendar engine (pure JS)
│   ├── screens/
│   │   └── HomeScreen.js           # Main app screen
│   └── components/
│       └── WidgetPreview.js        # Home-screen widget mockup
└── __tests__/
    └── liturgicalCalendar.test.js  # Calendar engine tests
```

## Planned Features

- Saint feast days and Catholic holidays
- Daily prayer (Morning Prayer, Evening Prayer, Compline)
- Bible verse of the day
- Push notifications for major feasts
- Native iOS and Android home-screen widgets
