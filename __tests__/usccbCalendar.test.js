const {
  buildUsccbCalendarPdfUrl,
  comparePrincipalCelebrationsAgainstText,
  extractUsccbCalendarLinksFromHtml,
  getPrincipalCelebrationChecks,
  normalizeYear,
} = require('../src/utils/usccbCalendar');

describe('USCCB calendar helpers', () => {
  const sampleHtml = `
    <a href="https://www.usccb.org/resources/2026cal.pdf">2026 Calendar</a>
    <a href="https://www.usccb.org/resources/2027cal.pdf">2027 Calendar</a>
    <a href="https://www.usccb.org/resources/2028cal.pdf">2028 Calendar</a>
  `;

  test('extractUsccbCalendarLinksFromHtml finds and sorts future calendar links', () => {
    expect(extractUsccbCalendarLinksFromHtml(sampleHtml)).toEqual([
      { year: 2026, url: 'https://www.usccb.org/resources/2026cal.pdf' },
      { year: 2027, url: 'https://www.usccb.org/resources/2027cal.pdf' },
      { year: 2028, url: 'https://www.usccb.org/resources/2028cal.pdf' },
    ]);
  });

  test('buildUsccbCalendarPdfUrl uses the predictable USCCB PDF pattern', () => {
    expect(buildUsccbCalendarPdfUrl(2029)).toBe('https://www.usccb.org/resources/2029cal.pdf');
  });

  test('normalizeYear rejects invalid input', () => {
    expect(() => normalizeYear('abc')).toThrow('Invalid year: abc');
  });

  test('comparePrincipalCelebrationsAgainstText passes when the expected lines are present', () => {
    const sampleText = `
      First Sunday of Advent November 30, 2025
      Ash Wednesday February 18, 2026
      Easter Sunday April 5, 2026
      The Ascension of the Lord [Thursday] May 14, 2026
      Pentecost Sunday May 24, 2026
      The Most Holy Body and Blood of Christ June 7, 2026
      First Sunday of Advent November 29, 2026
    `;

    const report = comparePrincipalCelebrationsAgainstText(2026, sampleText);

    expect(report.passed).toBe(true);
    expect(report.checks).toHaveLength(getPrincipalCelebrationChecks(2026).length);
  });

  test('comparePrincipalCelebrationsAgainstText flags missing lines', () => {
    const sampleText = 'Easter Sunday April 5, 2026';
    const report = comparePrincipalCelebrationsAgainstText(2026, sampleText);

    expect(report.passed).toBe(false);
    expect(report.checks.some((check) => !check.matched)).toBe(true);
  });
});