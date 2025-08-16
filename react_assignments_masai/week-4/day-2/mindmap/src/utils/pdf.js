import jsPDF from "jspdf";

export function exportPDF(entries, month) {
  const doc = new jsPDF();
  doc.text(`MindTrack Journal - ${month}`, 10, 10);
  let y = 20;
  entries.filter(e => e.date.startsWith(month)).forEach(e => {
    doc.text(`${e.date}: Study ${e.studyHours}h, Sleep ${e.sleepHours}h`, 10, y);
    y += 8;
    if (y > 280) { doc.addPage(); y = 20; }
  });
  doc.save(`mindtrack-${month}.pdf`);
}
