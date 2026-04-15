const {
  getLiturgicalInfo,
  getEasterDate,
  getAdventStart,
  getBaptismOfLord,
  addDays,
  isSameDay,
} = require('../src/utils/liturgicalCalendar');

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function date(year, month, day) {
  // month is 1-indexed for readability in tests
  return new Date(year, month - 1, day);
}

// ---------------------------------------------------------------------------
// Easter date calculation
// ---------------------------------------------------------------------------
describe('getEasterDate', () => {
  const knownEasters = [
    { year: 2019, month: 4, day: 21 },
    { year: 2020, month: 4, day: 12 },
    { year: 2021, month: 4, day: 4 },
    { year: 2022, month: 4, day: 17 },
    { year: 2023, month: 4, day: 9 },
    { year: 2024, month: 3, day: 31 },
    { year: 2025, month: 4, day: 20 },
    { year: 2026, month: 4, day: 5 },
    { year: 2027, month: 3, day: 28 },
    { year: 2028, month: 4, day: 16 },
  ];

  test.each(knownEasters)(
    'Easter $year is $month/$day',
    ({ year, month, day }) => {
      const easter = getEasterDate(year);
      expect(easter.getFullYear()).toBe(year);
      expect(easter.getMonth() + 1).toBe(month); // getMonth is 0-indexed
      expect(easter.getDate()).toBe(day);
    },
  );
});

// ---------------------------------------------------------------------------
// Advent start
// ---------------------------------------------------------------------------
describe('getAdventStart', () => {
  test('2023 Advent starts December 3', () => {
    const start = getAdventStart(2023);
    expect(start.getMonth() + 1).toBe(12);
    expect(start.getDate()).toBe(3);
    expect(start.getDay()).toBe(0); // Sunday
  });

  test('2024 Advent starts December 1', () => {
    const start = getAdventStart(2024);
    expect(start.getMonth() + 1).toBe(12);
    expect(start.getDate()).toBe(1);
    expect(start.getDay()).toBe(0);
  });

  test('2025 Advent starts November 30', () => {
    const start = getAdventStart(2025);
    expect(start.getMonth() + 1).toBe(11);
    expect(start.getDate()).toBe(30);
    expect(start.getDay()).toBe(0);
  });

  test('Advent always starts on a Sunday', () => {
    for (let y = 2020; y <= 2035; y++) {
      expect(getAdventStart(y).getDay()).toBe(0);
    }
  });

  test('Advent always starts between Nov 27 and Dec 3', () => {
    for (let y = 2020; y <= 2035; y++) {
      const start = getAdventStart(y);
      const nov27 = new Date(y, 10, 27);
      const dec3 = new Date(y, 11, 3);
      expect(start >= nov27).toBe(true);
      expect(start <= dec3).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Baptism of the Lord
// ---------------------------------------------------------------------------
describe('getBaptismOfLord', () => {
  test('is always a Sunday', () => {
    for (let y = 2020; y <= 2035; y++) {
      expect(getBaptismOfLord(y).getDay()).toBe(0);
    }
  });

  test('2024 Baptism of the Lord is January 7', () => {
    const d = getBaptismOfLord(2024);
    expect(d.getMonth() + 1).toBe(1);
    expect(d.getDate()).toBe(7);
  });

  test('2025 Baptism of the Lord is January 12', () => {
    const d = getBaptismOfLord(2025);
    expect(d.getMonth() + 1).toBe(1);
    expect(d.getDate()).toBe(12);
  });
});

// ---------------------------------------------------------------------------
// getLiturgicalInfo — color & season
// ---------------------------------------------------------------------------
describe('getLiturgicalInfo', () => {
  // --- Christmastide ---
  test('Christmas Day 2024 is White / Christmastide', () => {
    const info = getLiturgicalInfo(date(2024, 12, 25));
    expect(info.season).toBe('Christmastide');
    expect(info.color).toBe('White');
    expect(info.note).toBe('Christmas Day');
  });

  test('December 29 2024 is White / Christmastide', () => {
    const info = getLiturgicalInfo(date(2024, 12, 29));
    expect(info.season).toBe('Christmastide');
    expect(info.color).toBe('White');
  });

  test('January 3 2025 is White / Christmastide', () => {
    const info = getLiturgicalInfo(date(2025, 1, 3));
    expect(info.season).toBe('Christmastide');
    expect(info.color).toBe('White');
  });

  test('Epiphany Jan 6 2025 carries the Epiphany note', () => {
    const info = getLiturgicalInfo(date(2025, 1, 6));
    expect(info.season).toBe('Christmastide');
    expect(info.note).toBe('Feast of Epiphany');
  });

  // --- Ordinary Time (winter) ---
  test('Day after Baptism of Lord 2025 is Green / Ordinary Time', () => {
    const baptism = getBaptismOfLord(2025); // Jan 12
    const next = addDays(baptism, 1);
    const info = getLiturgicalInfo(next);
    expect(info.season).toBe('Ordinary Time');
    expect(info.color).toBe('Green');
  });

  test('February 1 2025 is Green / Ordinary Time', () => {
    const info = getLiturgicalInfo(date(2025, 2, 1));
    expect(info.season).toBe('Ordinary Time');
    expect(info.color).toBe('Green');
  });

  // --- Lent ---
  test('Ash Wednesday 2025 (March 5) is Purple / Lent', () => {
    const info = getLiturgicalInfo(date(2025, 3, 5));
    expect(info.season).toBe('Lent');
    expect(info.color).toBe('Purple');
  });

  test('Ash Wednesday 2024 (February 14) is Purple / Lent', () => {
    const info = getLiturgicalInfo(date(2024, 2, 14));
    expect(info.season).toBe('Lent');
    expect(info.color).toBe('Purple');
  });

  test('Laetare Sunday 2025 (March 30) is Rose', () => {
    // Easter 2025 = April 20, Laetare = April 20 - 21 = March 30
    const info = getLiturgicalInfo(date(2025, 3, 30));
    expect(info.season).toBe('Lent');
    expect(info.note).toBe('Laetare Sunday');
    expect(info.color).toBe('Rose');
  });

  test('Laetare Sunday 2024 (March 10) is Rose', () => {
    // Easter 2024 = March 31, Laetare = March 31 - 21 = March 10
    const info = getLiturgicalInfo(date(2024, 3, 10));
    expect(info.note).toBe('Laetare Sunday');
    expect(info.color).toBe('Rose');
  });

  // --- Holy Week ---
  test('Palm Sunday 2025 (April 13) is Red', () => {
    const info = getLiturgicalInfo(date(2025, 4, 13));
    expect(info.season).toBe('Holy Week');
    expect(info.note).toBe('Palm Sunday');
    expect(info.color).toBe('Red');
  });

  test('Holy Thursday 2025 (April 17) is White', () => {
    const info = getLiturgicalInfo(date(2025, 4, 17));
    expect(info.season).toBe('Holy Week');
    expect(info.note).toBe('Holy Thursday');
    expect(info.color).toBe('White');
  });

  test('Good Friday 2025 (April 18) is Red', () => {
    const info = getLiturgicalInfo(date(2025, 4, 18));
    expect(info.season).toBe('Holy Week');
    expect(info.note).toBe('Good Friday');
    expect(info.color).toBe('Red');
  });

  test('Holy Saturday 2025 (April 19) is White', () => {
    const info = getLiturgicalInfo(date(2025, 4, 19));
    expect(info.season).toBe('Holy Week');
    expect(info.note).toBe('Holy Saturday');
    expect(info.color).toBe('White');
  });

  // --- Easter Season ---
  test('Easter Sunday 2025 (April 20) is White / Eastertide', () => {
    const info = getLiturgicalInfo(date(2025, 4, 20));
    expect(info.season).toBe('Eastertide');
    expect(info.note).toBe('Easter Sunday');
    expect(info.color).toBe('White');
  });

  test('May 1 2025 is White / Eastertide', () => {
    const info = getLiturgicalInfo(date(2025, 5, 1));
    expect(info.season).toBe('Eastertide');
    expect(info.color).toBe('White');
  });

  test('Pentecost 2025 (June 8) is Red', () => {
    const info = getLiturgicalInfo(date(2025, 6, 8));
    expect(info.season).toBe('Pentecost');
    expect(info.color).toBe('Red');
  });

  // --- Ordinary Time (summer/autumn) ---
  test('June 9 2025 (day after Pentecost) is Green / Ordinary Time', () => {
    const info = getLiturgicalInfo(date(2025, 6, 9));
    expect(info.season).toBe('Ordinary Time');
    expect(info.color).toBe('Green');
  });

  test('September 15 2025 is Green / Ordinary Time', () => {
    const info = getLiturgicalInfo(date(2025, 9, 15));
    expect(info.season).toBe('Ordinary Time');
    expect(info.color).toBe('Green');
  });

  // --- Advent ---
  test('First Sunday of Advent 2025 (Nov 30) is Purple / Advent', () => {
    const info = getLiturgicalInfo(date(2025, 11, 30));
    expect(info.season).toBe('Advent');
    expect(info.color).toBe('Purple');
  });

  test('Gaudete Sunday 2025 (Dec 14) is Rose', () => {
    // Advent 2025 starts Nov 30, Gaudete = Nov 30 + 14 = Dec 14
    const info = getLiturgicalInfo(date(2025, 12, 14));
    expect(info.season).toBe('Advent');
    expect(info.note).toBe('Gaudete Sunday');
    expect(info.color).toBe('Rose');
  });

  test('December 20 2025 is Purple / Advent', () => {
    const info = getLiturgicalInfo(date(2025, 12, 20));
    expect(info.season).toBe('Advent');
    expect(info.color).toBe('Purple');
  });

  test('December 24 2025 is Purple / Advent', () => {
    const info = getLiturgicalInfo(date(2025, 12, 24));
    expect(info.season).toBe('Advent');
    expect(info.color).toBe('Purple');
  });

  // --- Every result has required fields ---
  test('getLiturgicalInfo always returns required fields', () => {
    const testDates = [
      date(2025, 1, 1),
      date(2025, 3, 5),
      date(2025, 4, 20),
      date(2025, 7, 4),
      date(2025, 11, 30),
      date(2025, 12, 25),
    ];
    testDates.forEach((d) => {
      const info = getLiturgicalInfo(d);
      expect(typeof info.season).toBe('string');
      expect(typeof info.color).toBe('string');
      expect(typeof info.colorHex).toBe('string');
      expect(info.colorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(typeof info.description).toBe('string');
      expect(info.description.length).toBeGreaterThan(0);
    });
  });

  // --- Default date (no argument) ---
  test('getLiturgicalInfo with no argument returns valid info', () => {
    const info = getLiturgicalInfo();
    expect(typeof info.season).toBe('string');
    expect(typeof info.color).toBe('string');
  });
});

// ---------------------------------------------------------------------------
// isSameDay
// ---------------------------------------------------------------------------
describe('isSameDay', () => {
  test('same date is the same day', () => {
    expect(isSameDay(new Date(2025, 3, 5), new Date(2025, 3, 5))).toBe(true);
  });

  test('different dates are not the same day', () => {
    expect(isSameDay(new Date(2025, 3, 5), new Date(2025, 3, 6))).toBe(false);
  });

  test('different times on the same day are the same day', () => {
    const morning = new Date(2025, 3, 5, 8, 0, 0);
    const evening = new Date(2025, 3, 5, 22, 0, 0);
    expect(isSameDay(morning, evening)).toBe(true);
  });
});
