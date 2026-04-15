#!/usr/bin/env node

const {
  compareUsccbCalendarAgainstLocalCalendar,
} = require('./mobile/lib/usccbCalendar');

async function main() {
  const yearArg = process.argv[2] || new Date().getFullYear();
  const year = Number(yearArg);
  const report = await compareUsccbCalendarAgainstLocalCalendar(year);

  console.log(JSON.stringify({
    year: report.year,
    pageUrl: report.pageUrl,
    pdfUrl: report.pdfUrl,
    availableYears: report.availableYears,
    totalPages: report.totalPages,
    comparison: report.comparison,
    preview: report.text.slice(0, 1500),
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});