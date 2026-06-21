(function () {
  const core = window.LiturgiaCore;

  if (!core) {
    return;
  }

  const today = new Date();
  const info = core.getLiturgicalInfo(today);
  core.applySeasonTheme(info);

  document.getElementById('season-label').textContent = info.season;
  document.getElementById('widget-season').textContent = info.season;
  document.getElementById('color-text').textContent = info.color;
  document.getElementById('widget-color').textContent = info.color;
  document.getElementById('date-text').textContent = core.formatDateWithOrdinal(today);
  document.getElementById('description-text').textContent = info.description;

  const seasonEndEl = document.getElementById('season-end');
  const seasonEndInfo = core.getSeasonEndInfo(today, info.season);
  if (seasonEndInfo) {
    seasonEndEl.textContent = 'Season ends: ' + core.formatMonthDayOrdinal(seasonEndInfo.date);
  } else {
    seasonEndEl.style.display = 'none';
  }

  const noteEl = document.getElementById('note-label');
  if (info.note) {
    noteEl.textContent = info.note;
  } else {
    noteEl.style.display = 'none';
  }

  const appIcon = document.querySelector('.app-icon');
  if (appIcon) {
    appIcon.style.backgroundColor = info.darkColorHex;
  }

  const colorDot = document.getElementById('color-dot');
  if (colorDot) {
    colorDot.style.backgroundColor = info.colorHex;
  }

  const saintFeastEl = document.getElementById('saint-feast');
  core.loadSaintFeastDay(today)
    .then((saintName) => {
      if (saintName) {
        saintFeastEl.textContent = saintName;
        saintFeastEl.hidden = false;
      } else {
        saintFeastEl.hidden = true;
      }
    })
    .catch(() => {
      saintFeastEl.hidden = true;
    });

  document.documentElement.style.setProperty('--current-color', info.colorHex);
  document.documentElement.style.setProperty('--current-dark-color', info.darkColorHex);
  document.documentElement.style.setProperty('--current-dot-border', info.darkColorHex);
})();
