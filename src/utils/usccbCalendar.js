const { PDFParse } = require('pdf-parse');
const {
  addDays,
  getAdventStart,
  getEasterDate,
  getBaptismOfLord,
} = require('./liturgicalCalendar');

const USCCB_LITURGICAL_CALENDAR_PAGE_URL =
  'https://www.usccb.org/committees/divine-worship/liturgical-calendar';

function normalizeYear(year) {
  const normalizedYear = Number(year);
  if (!Number.isInteger(normalizedYear) || normalizedYear < 1000 || normalizedYear > 9999) {
    throw new Error(`Invalid year: ${year}`);
  }
  return normalizedYear;
}

function buildUsccbCalendarPdfUrl(year) {
  return `https://www.usccb.org/resources/${normalizeYear(year)}cal.pdf`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function extractUsccbCalendarLinksFromHtml(html) {
  const links = [];
  const seenYears = new Set();
  const linkPattern = /href=["']([^"']*?(\d{4})cal\.pdf)["']/gi;

  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const year = Number(match[2]);
    if (seenYears.has(year)) {
      continue;
    }

    seenYears.add(year);
    links.push({
      year,
      url: new URL(match[1], USCCB_LITURGICAL_CALENDAR_PAGE_URL).href,
    });
  }

  return links.sort((left, right) => left.year - right.year);
}

async function fetchUsccbCalendarPageHtml(fetchImpl = fetch) {
  const response = await fetchImpl(USCCB_LITURGICAL_CALENDAR_PAGE_URL);
  if (!response.ok) {
    throw new Error(`Unable to load USCCB calendar page: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function getUsccbCalendarPdfUrl(year, options = {}) {
  const normalizedYear = normalizeYear(year);
  const pageHtml = options.pageHtml || await fetchUsccbCalendarPageHtml(options.fetchImpl);
  const calendarLinks = extractUsccbCalendarLinksFromHtml(pageHtml);
  const matchingLink = calendarLinks.find((link) => link.year === normalizedYear);

  return matchingLink ? matchingLink.url : buildUsccbCalendarPdfUrl(normalizedYear);
}

async function fetchUsccbCalendarPdfText(year, options = {}) {
  const normalizedYear = normalizeYear(year);
  const fetchImpl = options.fetchImpl || fetch;
  const pageHtml = options.pageHtml || await fetchUsccbCalendarPageHtml(fetchImpl);
  const availableYears = extractUsccbCalendarLinksFromHtml(pageHtml).map((link) => link.year);
  const pdfUrl = await getUsccbCalendarPdfUrl(normalizedYear, { pageHtml, fetchImpl });

  const pdfResponse = await fetchImpl(pdfUrl);
  if (!pdfResponse.ok) {
    throw new Error(`Unable to load USCCB calendar PDF for ${normalizedYear}: ${pdfResponse.status} ${pdfResponse.statusText}`);
  }

  const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());
  const parser = new PDFParse({ data: pdfBuffer });

  try {
    const parsed = await parser.getText();
    return {
      year: normalizedYear,
      pageUrl: USCCB_LITURGICAL_CALENDAR_PAGE_URL,
      pdfUrl,
      availableYears,
      text: parsed.text || '',
      pages: parsed.pages || [],
      totalPages: parsed.total || (parsed.pages ? parsed.pages.length : 0),
    };
  } finally {
    await parser.destroy();
  }
}

function getPrincipalCelebrationChecks(year) {
  const normalizedYear = normalizeYear(year);
  const easter = getEasterDate(normalizedYear);
  const ashWednesday = addDays(easter, -46);
  const adventStart = getAdventStart(normalizedYear);
  const previousAdventStart = getAdventStart(normalizedYear - 1);
  const ascension = addDays(easter, 39);
  const pentecost = addDays(easter, 49);
  const corpusChristi = addDays(easter, 63);

  return [
    {
      label: 'First Sunday of Advent (previous liturgical year)',
      pattern: new RegExp(
        `First Sunday of Advent\\s+${escapeRegExp(formatLongDate(previousAdventStart))}`,
        'i',
      ),
    },
    {
      label: 'Ash Wednesday',
      pattern: new RegExp(`Ash Wednesday\\s+${escapeRegExp(formatLongDate(ashWednesday))}`, 'i'),
    },
    {
      label: 'Easter Sunday',
      pattern: new RegExp(`Easter Sunday\\s+${escapeRegExp(formatLongDate(easter))}`, 'i'),
    },
    {
      label: 'The Ascension of the Lord',
      pattern: new RegExp(
        `The Ascension of the Lord.*${escapeRegExp(formatLongDate(ascension))}`,
        'is',
      ),
    },
    {
      label: 'Pentecost Sunday',
      pattern: new RegExp(`Pentecost Sunday\\s+${escapeRegExp(formatLongDate(pentecost))}`, 'i'),
    },
    {
      label: 'The Most Holy Body and Blood of Christ',
      pattern: new RegExp(
        `The Most Holy Body and Blood of Christ\\s+${escapeRegExp(formatLongDate(corpusChristi))}`,
        'i',
      ),
    },
    {
      label: 'First Sunday of Advent (current liturgical year)',
      pattern: new RegExp(
        `First Sunday of Advent\\s+${escapeRegExp(formatLongDate(adventStart))}`,
        'i',
      ),
    },
  ];
}

function comparePrincipalCelebrationsAgainstText(year, pdfText) {
  const normalizedYear = normalizeYear(year);
  const normalizedText = normalizeText(pdfText);
  const checks = getPrincipalCelebrationChecks(normalizedYear).map((check) => ({
    label: check.label,
    matched: check.pattern.test(normalizedText),
    pattern: check.pattern.toString(),
  }));

  return {
    year: normalizedYear,
    passed: checks.every((check) => check.matched),
    checks,
  };
}

async function compareUsccbCalendarAgainstLocalCalendar(year, options = {}) {
  const normalizedYear = normalizeYear(year);
  const report = await fetchUsccbCalendarPdfText(normalizedYear, options);
  const comparison = comparePrincipalCelebrationsAgainstText(normalizedYear, report.text);

  return {
    ...report,
    comparison,
  };
}

module.exports = {
  USCCB_LITURGICAL_CALENDAR_PAGE_URL,
  buildUsccbCalendarPdfUrl,
  comparePrincipalCelebrationsAgainstText,
  compareUsccbCalendarAgainstLocalCalendar,
  extractUsccbCalendarLinksFromHtml,
  fetchUsccbCalendarPageHtml,
  fetchUsccbCalendarPdfText,
  getUsccbCalendarPdfUrl,
  getPrincipalCelebrationChecks,
  normalizeYear,
};