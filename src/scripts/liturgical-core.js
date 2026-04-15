(function () {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const DAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];

  function toDateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

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
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
  }

  function getAdventStart(year) {
    const nov27 = new Date(year, 10, 27);
    const dayOfWeek = nov27.getDay();
    const daysToNextSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    return new Date(year, 10, 27 + daysToNextSunday);
  }

  function getBaptismOfLord(year) {
    const epiphany = new Date(year, 0, 6);
    const epiphanyDay = epiphany.getDay();
    if (epiphanyDay === 0) {
      return new Date(year, 0, 13);
    }
    return new Date(year, 0, 6 + (7 - epiphanyDay));
  }

  function getMonthName(date) {
    return MONTH_NAMES[date.getMonth()];
  }

  function parseFeastDayText(markdown, targetDate) {
    const monthName = getMonthName(targetDate);
    const day = targetDate.getDate();
    const monthRegex = new RegExp(
      '\\#\\s+' + monthName + '\\s+' + targetDate.getFullYear() + '([\\s\\S]*?)(?=\\n#\\s+[A-Z][a-z]+\\s+' + targetDate.getFullYear() + '|\\n#### Month-by-Month Tags|$)'
    );
    const monthMatch = markdown.match(monthRegex);
    const searchBlock = monthMatch ? monthMatch[1] : markdown;

    const escapedDay = String(day).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const bracketAfterDay = new RegExp('\\[([^\\]]+)\\]\\s*' + escapedDay + '(?!\\d)', 'm');
    const dayAfterBracket = new RegExp('\\b' + escapedDay + '\\b\\s*\\[([^\\]]+)\\]', 'm');

    const match = searchBlock.match(bracketAfterDay) || searchBlock.match(dayAfterBracket);
    if (!match) {
      return null;
    }

    const raw = match[1].replace(/\s+/g, ' ').trim();
    if (!raw || !/[A-Za-z]/.test(raw)) {
      return null;
    }

    return raw;
  }

  async function loadSaintFeastDay(date) {
    const sourceUrl = 'https://r.jina.ai/http://www.catholicapostolatecenterfeastdays.org/feast-day-calendar';
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error('Feast day source request failed: ' + response.status);
    }

    const markdown = await response.text();
    return parseFeastDayText(markdown, date);
  }

  function getLiturgicalInfo(date) {
    const d = toDateOnly(date || new Date());
    const year = d.getFullYear();

    const easter = getEasterDate(year);
    const ashWednesday = addDays(easter, -46);
    const pentecost = addDays(easter, 49);
    const adventStart = getAdventStart(year);
    const baptismOfLord = getBaptismOfLord(year);
    const christmas = new Date(year, 11, 25);

    const laetareSunday = addDays(easter, -21);
    const palmSunday = addDays(easter, -7);
    const holyThursday = addDays(easter, -3);
    const goodFriday = addDays(easter, -2);
    const holySaturday = addDays(easter, -1);

    const gaudeteSunday = addDays(adventStart, 14);

    if (d <= baptismOfLord) {
      return {
        season: 'Christmastide',
        note: isSameDay(d, new Date(year, 0, 6)) ? 'Feast of Epiphany' : '',
        color: 'White',
        colorHex: '#FFFFFF',
        darkColorHex: '#C8A951',
        description: 'Celebrating the Nativity of Our Lord Jesus Christ and the revelation of God made flesh.',
      };
    }

    if (d < ashWednesday) {
      return {
        season: 'Ordinary Time',
        note: '',
        color: 'Green',
        colorHex: '#2D7D46',
        darkColorHex: '#1A4D2B',
        description: 'A season of growth in faith, walking with Christ through His public ministry.',
      };
    }

    if (d < easter) {
      if (isSameDay(d, laetareSunday)) {
        return {
          season: 'Lent',
          note: 'Laetare Sunday',
          color: 'Rose',
          colorHex: '#C87697',
          darkColorHex: '#8B4C66',
          description: 'A day of joy in the midst of Lent - "Laetare" means "Rejoice!"',
        };
      }
      if (isSameDay(d, palmSunday)) {
        return {
          season: 'Holy Week',
          note: 'Palm Sunday',
          color: 'Red',
          colorHex: '#C0392B',
          darkColorHex: '#7D1A14',
          description: 'Jesus enters Jerusalem in triumph as the crowd waves palm branches.',
        };
      }
      if (isSameDay(d, holyThursday)) {
        return {
          season: 'Holy Week',
          note: 'Holy Thursday',
          color: 'White',
          colorHex: '#FFFFFF',
          darkColorHex: '#C8A951',
          description: "The Mass of the Lord's Supper - the institution of the Eucharist and holy priesthood.",
        };
      }
      if (isSameDay(d, goodFriday)) {
        return {
          season: 'Holy Week',
          note: 'Good Friday',
          color: 'Red',
          colorHex: '#C0392B',
          darkColorHex: '#7D1A14',
          description: 'The Passion of Our Lord - we commemorate the crucifixion and death of Jesus Christ.',
        };
      }
      if (isSameDay(d, holySaturday)) {
        return {
          season: 'Holy Week',
          note: 'Holy Saturday',
          color: 'White',
          colorHex: '#FFFFFF',
          darkColorHex: '#C8A951',
          description: 'The Church awaits in silent prayer as Christ lies in the tomb. The Easter Vigil begins tonight.',
        };
      }
      return {
        season: 'Lent',
        note: '',
        color: 'Purple',
        colorHex: '#6B3FA0',
        darkColorHex: '#3E1C6E',
        description: 'A season of penance, prayer, and fasting in preparation for Easter.',
      };
    }

    if (d <= pentecost) {
      if (isSameDay(d, pentecost)) {
        return {
          season: 'Pentecost',
          note: 'Pentecost Sunday',
          color: 'Red',
          colorHex: '#C0392B',
          darkColorHex: '#7D1A14',
          description: 'The descent of the Holy Spirit upon the Apostles - the birthday of the Church.',
        };
      }
      return {
        season: 'Eastertide',
        note: isSameDay(d, easter) ? 'Easter Sunday' : '',
        color: 'White',
        colorHex: '#FFFFFF',
        darkColorHex: '#C8A951',
        description: 'Alleluia! We celebrate the Resurrection of Our Lord Jesus Christ for fifty joyful days.',
      };
    }

    if (d < adventStart) {
      return {
        season: 'Ordinary Time',
        note: '',
        color: 'Green',
        colorHex: '#2D7D46',
        darkColorHex: '#1A4D2B',
        description: 'A season of growth in faith, walking with Christ through His public ministry.',
      };
    }

    if (d < christmas) {
      if (isSameDay(d, gaudeteSunday)) {
        return {
          season: 'Advent',
          note: 'Gaudete Sunday',
          color: 'Rose',
          colorHex: '#C87697',
          darkColorHex: '#8B4C66',
          description: 'A day of joy in Advent - "Gaudete" means "Rejoice!" - as Christmas draws near.',
        };
      }
      return {
        season: 'Advent',
        note: '',
        color: 'Purple',
        colorHex: '#6B3FA0',
        darkColorHex: '#3E1C6E',
        description: 'A time of joyful preparation and expectant waiting for the coming of Our Lord.',
      };
    }

    return {
      season: 'Christmastide',
      note: isSameDay(d, christmas) ? 'Christmas Day' : '',
      color: 'White',
      colorHex: '#FFFFFF',
      darkColorHex: '#C8A951',
      description: 'Celebrating the Nativity of Our Lord Jesus Christ and the revelation of God made flesh.',
    };
  }

  function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function formatDate(date) {
    return DAY_NAMES[date.getDay()] + ', ' + MONTH_NAMES[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  function formatDateWithOrdinal(date) {
    const d = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const weekday = DAY_NAMES[date.getDay()];
    return weekday + ', ' + month + ' ' + getOrdinal(d) + ', ' + year;
  }

  function formatMonthDayOrdinal(date) {
    const day = date.getDate();
    const mod10 = day % 10;
    const mod100 = day % 100;
    let suffix = 'th';
    if (mod10 === 1 && mod100 !== 11) suffix = 'st';
    if (mod10 === 2 && mod100 !== 12) suffix = 'nd';
    if (mod10 === 3 && mod100 !== 13) suffix = 'rd';
    return MONTH_NAMES[date.getMonth()] + ' ' + day + suffix + ', ' + date.getFullYear();
  }

  function getSeasonEndInfo(date, season) {
    const d = toDateOnly(date);
    const year = d.getFullYear();

    const easter = getEasterDate(year);
    const ashWednesday = addDays(easter, -46);
    const palmSunday = addDays(easter, -7);
    const holySaturday = addDays(easter, -1);
    const pentecost = addDays(easter, 49);
    const adventStart = getAdventStart(year);
    const christmasEve = new Date(year, 11, 24);

    if (season === 'Eastertide' || season === 'Pentecost') {
      return { date: pentecost, label: 'Pentecost Sunday' };
    }

    if (season === 'Holy Week') {
      return { date: holySaturday, label: 'Holy Saturday' };
    }

    if (season === 'Lent') {
      return { date: addDays(palmSunday, -1), label: 'Before Holy Week' };
    }

    if (season === 'Advent') {
      return { date: christmasEve, label: 'Christmas Eve' };
    }

    if (season === 'Christmastide') {
      const endDate = d.getMonth() === 11 ? getBaptismOfLord(year + 1) : getBaptismOfLord(year);
      return { date: endDate, label: 'Baptism of the Lord' };
    }

    if (season === 'Ordinary Time') {
      if (d < ashWednesday) {
        return { date: addDays(ashWednesday, -1), label: 'Before Lent' };
      }
      return { date: addDays(adventStart, -1), label: 'Before Advent' };
    }

    return null;
  }

  window.LiturgiaCore = {
    MONTH_NAMES,
    DAY_NAMES,
    toDateOnly,
    addDays,
    isSameDay,
    getEasterDate,
    getAdventStart,
    getBaptismOfLord,
    getMonthName,
    parseFeastDayText,
    loadSaintFeastDay,
    getLiturgicalInfo,
    formatDate,
    formatDateWithOrdinal,
    formatMonthDayOrdinal,
    getSeasonEndInfo,
  };
})();
