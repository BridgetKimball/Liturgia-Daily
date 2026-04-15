/**
 * Liturgia Daily - Liturgical Calendar Engine
 *
 * Calculates the Roman Rite liturgical season and color for any given date.
 *
 * Seasons and colors:
 *   Advent          → Purple  (Rose on Gaudete Sunday)
 *   Christmastide   → White
 *   Ordinary Time   → Green
 *   Lent            → Purple  (Rose on Laetare Sunday)
 *   Palm Sunday     → Red
 *   Good Friday     → Red
 *   Holy Saturday   → White
 *   Easter Season   → White
 *   Pentecost       → Red
 */

/**
 * Returns a Date representing only the calendar date (midnight UTC) so that
 * two dates representing the same day always compare equal.
 *
 * @param {Date} date
 * @returns {Date}
 */
function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Returns a new Date offset by the given number of days.
 *
 * @param {Date} date
 * @param {number} days  positive or negative integer
 * @returns {Date}
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns true when two dates represent the same calendar day.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Computes Easter Sunday for the given year using the
 * Meeus/Jones/Butcher algorithm (Gregorian calendar).
 *
 * @param {number} year  four-digit calendar year
 * @returns {Date}
 */
function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

/**
 * Returns the First Sunday of Advent for the given year.
 * Advent begins on the Sunday between November 27 and December 3 (inclusive).
 *
 * @param {number} year
 * @returns {Date}
 */
function getAdventStart(year) {
  const nov27 = new Date(year, 10, 27); // November 27 (month is 0-indexed)
  const dayOfWeek = nov27.getDay(); // 0 = Sunday
  const daysToNextSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  return new Date(year, 10, 27 + daysToNextSunday);
}

/**
 * Returns the date of the Baptism of the Lord for the given year.
 * This is the Sunday after Epiphany (January 6). When Epiphany falls on
 * Sunday, the Baptism of the Lord is celebrated on the following Sunday
 * (January 13).
 *
 * @param {number} year
 * @returns {Date}
 */
function getBaptismOfLord(year) {
  const epiphany = new Date(year, 0, 6); // January 6
  const epiphanyDay = epiphany.getDay(); // 0 = Sunday
  if (epiphanyDay === 0) {
    return new Date(year, 0, 13);
  }
  return new Date(year, 0, 6 + (7 - epiphanyDay));
}

/**
 * Returns the full liturgical information for a given date.
 *
 * @param {Date} [date=new Date()]  defaults to today
 * @returns {{
 *   season: string,
 *   note: string,
 *   color: string,
 *   colorHex: string,
 *   darkColorHex: string,
 *   description: string
 * }}
 */
function getLiturgicalInfo(date) {
  const d = toDateOnly(date || new Date());
  const year = d.getFullYear();

  // --- Key dates for the current calendar year ---
  const easter = getEasterDate(year);
  const ashWednesday = addDays(easter, -46);
  const pentecost = addDays(easter, 49);
  const adventStart = getAdventStart(year);
  const baptismOfLord = getBaptismOfLord(year);
  const christmas = new Date(year, 11, 25); // Dec 25 of this year

  // Special days within Lent / Holy Week
  const laetareSunday = addDays(easter, -21); // 4th Sunday of Lent
  const palmSunday = addDays(easter, -7);
  const holyThursday = addDays(easter, -3);
  const goodFriday = addDays(easter, -2);
  const holySaturday = addDays(easter, -1);

  // Special Sunday within Advent
  const gaudeteSunday = addDays(adventStart, 14); // 3rd Sunday of Advent

  // --- Season determination (chronological within the calendar year) ---

  // Christmastide: January 1 through Baptism of the Lord
  if (d <= baptismOfLord) {
    return {
      season: 'Christmastide',
      note: isSameDay(d, new Date(year, 0, 6)) ? 'Feast of Epiphany' : '',
      color: 'White',
      colorHex: '#FFFFFF',
      darkColorHex: '#C8A951',
      description:
        'Celebrating the Nativity of Our Lord Jesus Christ and the revelation of God made flesh.',
    };
  }

  // Ordinary Time (winter): after Baptism of the Lord through Ash Wednesday eve
  if (d < ashWednesday) {
    return {
      season: 'Ordinary Time',
      note: '',
      color: 'Green',
      colorHex: '#2D7D46',
      darkColorHex: '#1A4D2B',
      description:
        'A season of growth in faith, walking with Christ through His public ministry.',
    };
  }

  // Lent & Holy Week: Ash Wednesday through Holy Saturday
  if (d < easter) {
    if (isSameDay(d, laetareSunday)) {
      return {
        season: 'Lent',
        note: 'Laetare Sunday',
        color: 'Rose',
        colorHex: '#C87697',
        darkColorHex: '#8B4C66',
        description:
          'A day of joy in the midst of Lent — "Laetare" means "Rejoice!"',
      };
    }
    if (isSameDay(d, palmSunday)) {
      return {
        season: 'Holy Week',
        note: 'Palm Sunday',
        color: 'Red',
        colorHex: '#C0392B',
        darkColorHex: '#7D1A14',
        description:
          'Jesus enters Jerusalem in triumph as the crowd waves palm branches.',
      };
    }
    if (isSameDay(d, holyThursday)) {
      return {
        season: 'Holy Week',
        note: 'Holy Thursday',
        color: 'White',
        colorHex: '#FFFFFF',
        darkColorHex: '#C8A951',
        description:
          'The Mass of the Lord\'s Supper — the institution of the Eucharist and holy priesthood.',
      };
    }
    if (isSameDay(d, goodFriday)) {
      return {
        season: 'Holy Week',
        note: 'Good Friday',
        color: 'Red',
        colorHex: '#C0392B',
        darkColorHex: '#7D1A14',
        description:
          'The Passion of Our Lord — we commemorate the crucifixion and death of Jesus Christ.',
      };
    }
    if (isSameDay(d, holySaturday)) {
      return {
        season: 'Holy Week',
        note: 'Holy Saturday',
        color: 'White',
        colorHex: '#FFFFFF',
        darkColorHex: '#C8A951',
        description:
          'The Church awaits in silent prayer as Christ lies in the tomb. The Easter Vigil begins tonight.',
      };
    }
    return {
      season: 'Lent',
      note: '',
      color: 'Purple',
      colorHex: '#6B3FA0',
      darkColorHex: '#3E1C6E',
      description:
        'A season of penance, prayer, and fasting in preparation for Easter.',
    };
  }

  // Easter Season: Easter Sunday through Pentecost
  if (d <= pentecost) {
    if (isSameDay(d, pentecost)) {
      return {
        season: 'Pentecost',
        note: 'Pentecost Sunday',
        color: 'Red',
        colorHex: '#C0392B',
        darkColorHex: '#7D1A14',
        description:
          'The descent of the Holy Spirit upon the Apostles — the birthday of the Church.',
      };
    }
    return {
      season: 'Eastertide',
      note: isSameDay(d, easter) ? 'Easter Sunday' : '',
      color: 'White',
      colorHex: '#FFFFFF',
      darkColorHex: '#C8A951',
      description:
        'Alleluia! We celebrate the Resurrection of Our Lord Jesus Christ for fifty joyful days.',
    };
  }

  // Ordinary Time (summer / autumn): after Pentecost through Advent eve
  if (d < adventStart) {
    return {
      season: 'Ordinary Time',
      note: '',
      color: 'Green',
      colorHex: '#2D7D46',
      darkColorHex: '#1A4D2B',
      description:
        'A season of growth in faith, walking with Christ through His public ministry.',
    };
  }

  // Advent: First Sunday of Advent through December 24
  if (d < christmas) {
    if (isSameDay(d, gaudeteSunday)) {
      return {
        season: 'Advent',
        note: 'Gaudete Sunday',
        color: 'Rose',
        colorHex: '#C87697',
        darkColorHex: '#8B4C66',
        description:
          'A day of joy in Advent — "Gaudete" means "Rejoice!" — as Christmas draws near.',
      };
    }
    return {
      season: 'Advent',
      note: '',
      color: 'Purple',
      colorHex: '#6B3FA0',
      darkColorHex: '#3E1C6E',
      description:
        'A time of joyful preparation and expectant waiting for the coming of Our Lord.',
    };
  }

  // Christmastide: December 25 through December 31
  return {
    season: 'Christmastide',
    note: isSameDay(d, christmas) ? 'Christmas Day' : '',
    color: 'White',
    colorHex: '#FFFFFF',
    darkColorHex: '#C8A951',
    description:
      'Celebrating the Nativity of Our Lord Jesus Christ and the revelation of God made flesh.',
  };
}

module.exports = {
  getLiturgicalInfo,
  getEasterDate,
  getAdventStart,
  getBaptismOfLord,
  addDays,
  isSameDay,
  toDateOnly,
};
