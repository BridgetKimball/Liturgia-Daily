(function () {
  const core = window.LiturgiaCore;

  if (!core) {
    return;
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
    const headingMatch = markdown.match(/##\s+([^\n]*Prayer[^\n]*)\n/);
    const prayerBlockMatch = markdown.match(
      /##\s+[^\n]*Prayer[^\n]*\n\n([\s\S]*?)\n\n\[Read More Prayers for You\]/
    );

    if (!headingMatch || !prayerBlockMatch) {
      return null;
    }

    const heading = headingMatch[1].trim();
    const prayerText = prayerBlockMatch[1].replace(/\s+/g, ' ').trim();

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

  const today = new Date();
  const info = core.getLiturgicalInfo(today);

  if (info.season === 'Eastertide') {
    document.body.classList.add('easter-white-theme');
  }

  document.getElementById('date-text').textContent = core.formatDate(today);
  document.getElementById('intention-text').textContent = getIntention(info.color);

  const prayerNote = document.getElementById('prayer-note');
  prayerNote.textContent = info.note ? info.season + ' - ' + info.note : info.season;

  const prayerTextEl = document.getElementById('prayer-text');
  prayerTextEl.textContent = 'Loading today\'s prayer...';

  const appIcon = document.querySelector('.app-icon');
  if (appIcon) {
    appIcon.style.backgroundColor = info.darkColorHex;
  }

  document.documentElement.style.setProperty('--current-color', info.colorHex);
  document.documentElement.style.setProperty('--current-dark-color', info.darkColorHex);
  document.documentElement.style.setProperty('--current-dot-border', info.darkColorHex);

  loadSourcePrayer()
    .then(({ heading, prayerText }) => {
      prayerNote.textContent = heading;
      prayerTextEl.textContent = prayerText;
    })
    .catch(() => {
      prayerTextEl.textContent = getDailyPrayer(info.season);
    });
})();
