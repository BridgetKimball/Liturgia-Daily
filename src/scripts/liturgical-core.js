(function () {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const DAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];

  const THEME_TOKENS_BY_COLOR = {
    White: {
      '--bg-1': '#2a1603',
      '--bg-2': '#6e4b17',
      '--bg-3': '#8a6a32',
      '--glow-1': 'rgba(255, 220, 145, 0.18)',
      '--glow-2': 'rgba(255, 194, 102, 0.14)',
      '--glass': 'rgba(20, 12, 6, 0.56)',
      '--glass-border': 'rgba(247, 238, 220, 0.13)',
      '--text-primary': '#f4efe6',
      '--text-secondary': '#ded2bf',
      '--text-muted': '#c2b49b',
      '--heading-color': '#d7c9ac',
      '--reflection-text': '#ece4d6',
      '--card': '#e8e1c9',
      '--card-accent': '#cfad42',
      '--widget-text': '#6f5a20',
      '--widget-season': '#c5a036',
      '--widget-color': '#c5a036',
      '--widget-dot': '#ceb05f',
      '--saint-feast-color': '#f7ead0',
      '--button-bg-1': 'rgba(18, 10, 5, 0.84)',
      '--button-bg-2': 'rgba(56, 31, 8, 0.8)',
      '--button-border': 'rgba(245, 239, 213, 0.28)',
      '--button-text': '#f5efd5',
      '--top-button-bg-1': 'rgba(20, 12, 6, 0.9)',
      '--top-button-bg-2': 'rgba(74, 41, 12, 0.9)',
      '--top-button-border': 'rgba(245, 239, 213, 0.24)',
      '--nav-bg-1': 'rgba(16, 9, 4, 0.97)',
      '--nav-bg-2': 'rgba(54, 31, 11, 0.95)',
      '--nav-border': 'rgba(245, 239, 213, 0.2)',
      '--nav-title': '#f5efd5',
      '--nav-link-text': '#f5efd5',
      '--nav-link-bg': 'rgba(255, 255, 255, 0.04)',
      '--nav-link-border': 'rgba(245, 239, 213, 0.2)',
      '--nav-link-hover-bg': 'rgba(245, 239, 213, 0.12)',
      '--brand-rule': 'rgba(247, 238, 220, 0.45)',
    },
    Green: {
      '--bg-1': '#0b2215',
      '--bg-2': '#1d4d30',
      '--bg-3': '#3f7a53',
      '--glow-1': 'rgba(140, 224, 157, 0.18)',
      '--glow-2': 'rgba(119, 191, 133, 0.14)',
      '--glass': 'rgba(10, 28, 17, 0.6)',
      '--glass-border': 'rgba(218, 238, 223, 0.16)',
      '--text-primary': '#eaf4ec',
      '--text-secondary': '#cde1d1',
      '--text-muted': '#b1c9b7',
      '--heading-color': '#d3e8d8',
      '--reflection-text': '#e9f3eb',
      '--card': '#e7f0e4',
      '--card-accent': '#2f7d46',
      '--widget-text': '#235635',
      '--widget-season': '#2f7d46',
      '--widget-color': '#2f7d46',
      '--widget-dot': '#4f9863',
      '--saint-feast-color': '#d9eedf',
      '--button-bg-1': 'rgba(11, 31, 18, 0.88)',
      '--button-bg-2': 'rgba(35, 82, 52, 0.82)',
      '--button-border': 'rgba(215, 236, 221, 0.36)',
      '--button-text': '#eef7f1',
      '--top-button-bg-1': 'rgba(9, 28, 16, 0.92)',
      '--top-button-bg-2': 'rgba(29, 84, 52, 0.9)',
      '--top-button-border': 'rgba(219, 238, 224, 0.28)',
      '--nav-bg-1': 'rgba(8, 24, 14, 0.97)',
      '--nav-bg-2': 'rgba(25, 74, 45, 0.95)',
      '--nav-border': 'rgba(214, 236, 221, 0.24)',
      '--nav-title': '#e7f4eb',
      '--nav-link-text': '#e8f4eb',
      '--nav-link-bg': 'rgba(231, 245, 235, 0.06)',
      '--nav-link-border': 'rgba(216, 236, 222, 0.25)',
      '--nav-link-hover-bg': 'rgba(216, 236, 222, 0.16)',
      '--brand-rule': 'rgba(219, 238, 225, 0.46)',
    },
    Purple: {
      '--bg-1': '#1b1029',
      '--bg-2': '#3c245e',
      '--bg-3': '#5b3d84',
      '--glow-1': 'rgba(179, 145, 233, 0.16)',
      '--glow-2': 'rgba(136, 110, 196, 0.14)',
      '--glass': 'rgba(20, 12, 33, 0.62)',
      '--glass-border': 'rgba(231, 221, 250, 0.18)',
      '--text-primary': '#f1ecf8',
      '--text-secondary': '#d9cdef',
      '--text-muted': '#bcaed9',
      '--heading-color': '#d9caee',
      '--reflection-text': '#eee7f8',
      '--card': '#ece4f7',
      '--card-accent': '#6b3fa0',
      '--widget-text': '#4d2f75',
      '--widget-season': '#6b3fa0',
      '--widget-color': '#6b3fa0',
      '--widget-dot': '#8056b5',
      '--saint-feast-color': '#e6dbf6',
      '--button-bg-1': 'rgba(23, 13, 40, 0.88)',
      '--button-bg-2': 'rgba(63, 39, 104, 0.82)',
      '--button-border': 'rgba(229, 216, 249, 0.32)',
      '--button-text': '#f3ecfa',
      '--top-button-bg-1': 'rgba(22, 13, 38, 0.92)',
      '--top-button-bg-2': 'rgba(70, 43, 116, 0.9)',
      '--top-button-border': 'rgba(226, 212, 246, 0.28)',
      '--nav-bg-1': 'rgba(18, 10, 31, 0.97)',
      '--nav-bg-2': 'rgba(58, 35, 96, 0.95)',
      '--nav-border': 'rgba(228, 215, 247, 0.24)',
      '--nav-title': '#f1e9fa',
      '--nav-link-text': '#f2ecfa',
      '--nav-link-bg': 'rgba(242, 235, 251, 0.06)',
      '--nav-link-border': 'rgba(225, 211, 247, 0.24)',
      '--nav-link-hover-bg': 'rgba(226, 213, 248, 0.16)',
      '--brand-rule': 'rgba(229, 217, 248, 0.44)',
    },
    Red: {
      '--bg-1': '#2b0d0d',
      '--bg-2': '#631f1f',
      '--bg-3': '#8c3434',
      '--glow-1': 'rgba(236, 130, 110, 0.16)',
      '--glow-2': 'rgba(201, 97, 83, 0.14)',
      '--glass': 'rgba(36, 10, 10, 0.62)',
      '--glass-border': 'rgba(250, 222, 216, 0.18)',
      '--text-primary': '#f9ece9',
      '--text-secondary': '#edc9c2',
      '--text-muted': '#d9aba4',
      '--heading-color': '#efcdc6',
      '--reflection-text': '#f6e5e1',
      '--card': '#f3e5e1',
      '--card-accent': '#c0392b',
      '--widget-text': '#7b261f',
      '--widget-season': '#b03629',
      '--widget-color': '#b03629',
      '--widget-dot': '#cb6255',
      '--saint-feast-color': '#f6ddda',
      '--button-bg-1': 'rgba(40, 11, 11, 0.9)',
      '--button-bg-2': 'rgba(103, 31, 31, 0.84)',
      '--button-border': 'rgba(247, 218, 212, 0.32)',
      '--button-text': '#faecea',
      '--top-button-bg-1': 'rgba(40, 10, 10, 0.92)',
      '--top-button-bg-2': 'rgba(108, 33, 33, 0.9)',
      '--top-button-border': 'rgba(246, 214, 208, 0.28)',
      '--nav-bg-1': 'rgba(33, 9, 9, 0.97)',
      '--nav-bg-2': 'rgba(90, 27, 27, 0.95)',
      '--nav-border': 'rgba(246, 213, 207, 0.24)',
      '--nav-title': '#faece9',
      '--nav-link-text': '#f9ece9',
      '--nav-link-bg': 'rgba(249, 236, 234, 0.06)',
      '--nav-link-border': 'rgba(245, 210, 206, 0.24)',
      '--nav-link-hover-bg': 'rgba(245, 210, 206, 0.16)',
      '--brand-rule': 'rgba(246, 214, 208, 0.44)',
    },
    Rose: {
      '--bg-1': '#331923',
      '--bg-2': '#6d334a',
      '--bg-3': '#96536e',
      '--glow-1': 'rgba(239, 163, 191, 0.16)',
      '--glow-2': 'rgba(203, 126, 156, 0.14)',
      '--glass': 'rgba(38, 16, 25, 0.62)',
      '--glass-border': 'rgba(250, 224, 234, 0.18)',
      '--text-primary': '#f9edf2',
      '--text-secondary': '#ecced9',
      '--text-muted': '#d8afbf',
      '--heading-color': '#edcfda',
      '--reflection-text': '#f8e8ed',
      '--card': '#f5e6ed',
      '--card-accent': '#c87697',
      '--widget-text': '#7c3f59',
      '--widget-season': '#b56284',
      '--widget-color': '#b56284',
      '--widget-dot': '#cd7fa0',
      '--saint-feast-color': '#f6dfe8',
      '--button-bg-1': 'rgba(43, 18, 28, 0.9)',
      '--button-bg-2': 'rgba(112, 54, 77, 0.84)',
      '--button-border': 'rgba(247, 218, 229, 0.34)',
      '--button-text': '#faedf2',
      '--top-button-bg-1': 'rgba(42, 17, 27, 0.92)',
      '--top-button-bg-2': 'rgba(120, 58, 82, 0.9)',
      '--top-button-border': 'rgba(245, 213, 226, 0.28)',
      '--nav-bg-1': 'rgba(34, 13, 22, 0.97)',
      '--nav-bg-2': 'rgba(99, 45, 68, 0.95)',
      '--nav-border': 'rgba(245, 212, 225, 0.24)',
      '--nav-title': '#f9edf2',
      '--nav-link-text': '#f9edf2',
      '--nav-link-bg': 'rgba(250, 236, 243, 0.06)',
      '--nav-link-border': 'rgba(245, 211, 224, 0.24)',
      '--nav-link-hover-bg': 'rgba(245, 211, 224, 0.16)',
      '--brand-rule': 'rgba(245, 213, 226, 0.44)',
    },
  };

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

  function applySeasonTheme(info) {
    if (!info || !info.color) {
      return;
    }

    const tokens = THEME_TOKENS_BY_COLOR[info.color] || THEME_TOKENS_BY_COLOR.White;
    const rootStyle = document.documentElement.style;
    Object.entries(tokens).forEach(([name, value]) => {
      rootStyle.setProperty(name, value);
    });
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
    applySeasonTheme,
  };
})();
