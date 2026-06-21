(function () {
  const core = window.LiturgiaCore;

  if (!core) {
    return;
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

  function cleanPopeSection(text) {
    if (!text) {
      return '';
    }

    return text
      .replace(/\n*!\[[^\]]*\]\([^\)]+\)\s*/gi, '\n')
      .replace(/\n?Coming\s+soon[\s\S]*$/i, '')
      .replace(/\n?\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}\s*$/i, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function parseWordOfDay(markdown) {
    const liturgicalDayMatch = markdown.match(/Date\s+\d{2}\/\d{2}\/\d{4}\s*\n\s*\n([^\n]+)/i);

    const reading = extractSection(markdown, 'Reading of the day');
    const gospel = extractSection(markdown, 'Gospel of the day');
    const pope = cleanPopeSection(extractSection(markdown, 'The words of the popes'));

    return {
      liturgicalDay: liturgicalDayMatch ? liturgicalDayMatch[1].trim() : '',
      reading,
      gospel,
      pope,
    };
  }

  function getDateBasedWordOfDayPrintUrl() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return 'https://r.jina.ai/http://www.vaticannews.va/en/word-of-the-day/' + year + '/' + month + '/' + day + '.print.html';
  }

  async function loadDailyReadings() {
    const readingEl = document.getElementById('reading-text');
    const gospelEl = document.getElementById('gospel-text');
    const popeEl = document.getElementById('pope-text');
    const readingNote = document.getElementById('reading-note');

    const fallback = {
      reading: 'Daily readings are temporarily unavailable. Tap the button below to open Vatican Word of the Day directly.',
      gospel: 'Please use the Vatican source page for the complete Gospel text and references for today.',
      pope: 'A daily papal reflection is available on the Vatican Word of the Day page.',
    };

    try {
      const response = await fetch(getDateBasedWordOfDayPrintUrl(), {
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

      const parsed = parseWordOfDay(markdown);

      readingEl.textContent = parsed.reading || fallback.reading;
      gospelEl.textContent = parsed.gospel || fallback.gospel;
      popeEl.textContent = parsed.pope || fallback.pope;

      if (parsed.liturgicalDay) {
        readingNote.textContent = parsed.liturgicalDay;
      }
    } catch (error) {
      readingEl.textContent = fallback.reading;
      gospelEl.textContent = fallback.gospel;
      popeEl.textContent = fallback.pope;
    }
  }

  const today = new Date();
  const info = core.getLiturgicalInfo(today);
  core.applySeasonTheme(info);

  document.documentElement.style.setProperty('--liturgical-color', info.colorHex);
  document.documentElement.style.setProperty('--liturgical-color-dark', info.darkColorHex);
  document.documentElement.style.setProperty('--current-color', info.colorHex);
  document.documentElement.style.setProperty('--current-dark-color', info.darkColorHex);
  document.documentElement.style.setProperty('--current-dot-border', info.darkColorHex);
  document.getElementById('date-text').textContent = core.formatDateWithOrdinal(today);

  const noteSuffix = info.note ? ' - ' + info.note : '';
  document.getElementById('reading-note').textContent = info.season + noteSuffix;

  loadDailyReadings();
})();
