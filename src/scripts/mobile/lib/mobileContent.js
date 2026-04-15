const {
  addDays,
  getAdventStart,
  getEasterDate,
  getLiturgicalInfo,
  isSameDay,
} = require('./liturgicalCalendar');

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

function getOrdinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = n % 100;
  return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

function formatDateWithOrdinal(date) {
  const weekday = DAY_NAMES[date.getDay()];
  const month = MONTH_NAMES[date.getMonth()];
  return `${weekday}, ${month} ${getOrdinal(date.getDate())}, ${date.getFullYear()}`;
}

function formatMonthDayOrdinal(date) {
  const day = date.getDate();
  const mod10 = day % 10;
  const mod100 = day % 100;
  let suffix = 'th';
  if (mod10 === 1 && mod100 !== 11) suffix = 'st';
  if (mod10 === 2 && mod100 !== 12) suffix = 'nd';
  if (mod10 === 3 && mod100 !== 13) suffix = 'rd';
  return `${MONTH_NAMES[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
}

function getSeasonEndInfo(date, season) {
  const year = date.getFullYear();
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

  if (season === 'Ordinary Time' && date < ashWednesday) {
    return { date: addDays(ashWednesday, -1), label: 'Ash Wednesday' };
  }

  if (season === 'Ordinary Time' && date >= pentecost && date < adventStart) {
    return { date: addDays(adventStart, -1), label: 'First Sunday of Advent' };
  }

  if (season === 'Advent') {
    return { date: christmasEve, label: 'Christmas Eve' };
  }

  if (season === 'Christmastide') {
    const baptism = new Date(year, 0, 1);
    return { date: baptism, label: 'Baptism of the Lord' };
  }

  return null;
}

function parseFeastDayText(markdown, targetDate) {
  const monthName = MONTH_NAMES[targetDate.getMonth()];
  const day = targetDate.getDate();
  const monthRegex = new RegExp(
    `\\#\\s+${monthName}\\s+${targetDate.getFullYear()}([\\s\\S]*?)(?=\\n#\\s+[A-Z][a-z]+\\s+${targetDate.getFullYear()}|\\n#### Month-by-Month Tags|$)`
  );
  const monthMatch = markdown.match(monthRegex);
  const searchBlock = monthMatch ? monthMatch[1] : markdown;

  const escapedDay = String(day).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const bracketAfterDay = new RegExp(`\\[([^\\]]+)\\]\\s*${escapedDay}(?!\\d)`, 'm');
  const dayAfterBracket = new RegExp(`\\b${escapedDay}\\b\\s*\\[([^\\]]+)\\]`, 'm');

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

function getDailyPrayer(season) {
  const prayers = {
    Advent: 'Come, Lord Jesus. Prepare my heart to welcome You with hope, patience, and joyful trust.',
    Christmastide: 'Lord Jesus, Light of the world, let Your peace dwell in my home and guide my steps today.',
    OrdinaryTime: 'Lord, teach me to be faithful in ordinary moments, so every task becomes an act of love.',
    Lent: 'Merciful Father, grant me a repentant heart, deeper prayer, and strength to follow You in sacrifice.',
    HolyWeek: 'Jesus, in Your Passion teach me to remain near You in humility, gratitude, and steadfast love.',
    Eastertide: 'Risen Lord, fill me with Easter joy, renew my hope, and send me to share Your life with others.',
    Pentecost: 'Holy Spirit, kindle in me the fire of Your love so I may witness Christ with courage and charity.',
  };

  const seasonKey = season.replace(/\s+/g, '');
  return prayers[seasonKey] || prayers.OrdinaryTime;
}

function getIntention(color) {
  const intentions = {
    White: 'Intention: Pray for peace in hearts, homes, and communities.',
    Green: 'Intention: Pray for growth in faith and perseverance in daily holiness.',
    Purple: 'Intention: Pray for conversion, healing, and reconciliation.',
    Red: 'Intention: Pray for courage, sacrifice, and faithfulness under trial.',
    Rose: 'Intention: Pray for joy rooted in God\'s mercy and promises.',
  };

  return intentions[color] || 'Intention: Pray for the needs of the Church and the whole world.';
}

function extractPrayerFromMarkdown(markdown) {
  const pageStartMatch = markdown.match(/#\s+Today[’']s Prayer for\s+You/i);
  if (!pageStartMatch) {
    return null;
  }

  const sectionMarkdown = markdown.slice(pageStartMatch.index);
  const sectionEndIndex = sectionMarkdown.search(/\n##\s+PRAYER RESOURCES/i);
  const prayerSection = sectionEndIndex >= 0 ? sectionMarkdown.slice(0, sectionEndIndex) : sectionMarkdown;

  const headingMatch = prayerSection.match(/##\s+([^\n]+)\n/);
  const prayerBlockMatch = prayerSection.match(
    /##\s+[^\n]+\n(?:\n|(?:!\[[^\]]*\]\([^)]+\)\n)+)([\s\S]*?)(?=\n\n\[Read More Prayers for You\]|\n\n##\s+PRAYER RESOURCES|$)/i
  );

  if (!headingMatch || !prayerBlockMatch) {
    return null;
  }

  const heading = headingMatch[1].trim();
  const prayerText = prayerBlockMatch[1]
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();

  if (!prayerText) {
    return null;
  }

  return { heading, prayerText };
}

async function loadSourcePrayer() {
  const sourceUrl = 'https://r.jina.ai/http://www.heartofthenation.org/prayer-resources/todays-prayer-for-you';
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error('Prayer source request failed: ' + response.status);
  }

  const markdown = await response.text();
  const parsed = extractPrayerFromMarkdown(markdown);
  if (!parsed) {
    throw new Error('Unable to parse prayer text from source content.');
  }

  return parsed;
}

function normalizeSection(text) {
  if (!text) {
    return '';
  }

  return text
    .replace(/\r/g, '')
    .replace(/^\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSection(markdown, heading) {
  const sectionRegex = new RegExp(
    '\\n##\\s+' + escapeRegExp(heading) + '\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)',
    'i'
  );
  const match = markdown.match(sectionRegex);
  return match ? normalizeSection(match[1]) : '';
}

function parseWordOfDay(markdown) {
  const liturgicalDayMatch = markdown.match(/Date\s+\d{2}\/\d{2}\/\d{4}\s*\n\s*\n([^\n]+)/i);

  const reading = extractSection(markdown, 'Reading of the day');
  const gospel = extractSection(markdown, 'Gospel of the day');
  const pope = extractSection(markdown, 'The words of the popes');

  return {
    liturgicalDay: liturgicalDayMatch ? liturgicalDayMatch[1].trim() : '',
    reading,
    gospel,
    pope,
  };
}

function getDateBasedWordOfDayPrintUrl(date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return 'https://r.jina.ai/http://www.vaticannews.va/en/word-of-the-day/' + year + '/' + month + '/' + day + '.print.html';
}

async function loadDailyReadings(date) {
  const response = await fetch(getDateBasedWordOfDayPrintUrl(date), {
    cache: 'no-store',
  });

  let markdown = '';
  if (response.ok) {
    markdown = await response.text();
  }

  if (!markdown || !/##\s+Reading of the day/i.test(markdown)) {
    const fallbackResponse = await fetch('https://r.jina.ai/http://www.vaticannews.va/en/word-of-the-day.html', {
      cache: 'no-store',
    });

    if (!fallbackResponse.ok) {
      throw new Error('Failed to fetch reading source.');
    }

    markdown = await fallbackResponse.text();
  }

  return parseWordOfDay(markdown);
}

module.exports = {
  formatDateWithOrdinal,
  formatMonthDayOrdinal,
  getSeasonEndInfo,
  loadSaintFeastDay,
  getDailyPrayer,
  getIntention,
  loadSourcePrayer,
  loadDailyReadings,
  getDateBasedWordOfDayPrintUrl,
};
