import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { formatMoneyPdf } from './formatMoney.mjs';

function wrapText(text, maxChars) {
  const words = String(text ?? '').split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : ['—'];
}

/**
 * @returns {Promise<Uint8Array>}
 */
export async function generateEnrollmentInvoicePdf({
  invoiceNumber,
  invoiceDate,
  learnerName,
  learnerEmail,
  courseTitle,
  programCode,
  amount,
  currency,
  paymentId,
  orderId,
  country,
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const { width, height } = page.getSize();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const primary = rgb(0.12, 0.25, 0.69);
  const muted = rgb(0.39, 0.45, 0.55);
  const border = rgb(0.89, 0.91, 0.94);
  const dark = rgb(0.06, 0.09, 0.16);

  let y = height - 48;

  page.drawText('ZYVOTRIX', { x: 48, y, size: 22, font: fontBold, color: primary });
  page.drawText('Tax Invoice / Payment Receipt', {
    x: 48,
    y: y - 22,
    size: 11,
    font,
    color: muted,
  });

  page.drawText(`Invoice #${invoiceNumber}`, {
    x: width - 220,
    y,
    size: 11,
    font: fontBold,
    color: dark,
  });
  page.drawText(`Date: ${invoiceDate}`, {
    x: width - 220,
    y: y - 18,
    size: 10,
    font,
    color: muted,
  });

  y -= 56;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 1, color: border });

  y -= 28;
  page.drawText('Bill To', { x: 48, y, size: 10, font: fontBold, color: muted });
  page.drawText(learnerName || 'Learner', { x: 48, y: y - 16, size: 12, font: fontBold, color: dark });
  page.drawText(learnerEmail, { x: 48, y: y - 32, size: 10, font, color: muted });
  if (country) {
    page.drawText(country, { x: 48, y: y - 46, size: 10, font, color: muted });
  }

  y -= 90;
  page.drawRectangle({
    x: 48,
    y: y - 72,
    width: width - 96,
    height: 72,
    borderColor: border,
    borderWidth: 1,
    color: rgb(0.98, 0.99, 1),
  });

  page.drawText('Description', { x: 56, y: y - 20, size: 10, font: fontBold, color: muted });
  page.drawText('Amount', {
    x: width - 120,
    y: y - 20,
    size: 10,
    font: fontBold,
    color: muted,
  });

  const titleLines = wrapText(`${courseTitle} (${programCode})`, 52);
  page.drawText(titleLines[0], { x: 56, y: y - 40, size: 11, font, color: dark });
  if (titleLines[1]) {
    page.drawText(titleLines[1], { x: 56, y: y - 54, size: 10, font, color: muted });
  }

  const formattedAmount = formatMoneyPdf(amount, currency);
  page.drawText(formattedAmount, {
    x: width - 120,
    y: y - 40,
    size: 11,
    font: fontBold,
    color: dark,
  });

  y -= 110;
  page.drawText('Payment Details', { x: 48, y, size: 10, font: fontBold, color: muted });
  page.drawText(`Payment ID: ${paymentId || '—'}`, { x: 48, y: y - 18, size: 10, font, color: dark });
  page.drawText(`Order ID: ${orderId || '—'}`, { x: 48, y: y - 34, size: 10, font, color: dark });
  page.drawText(`Status: Paid`, { x: 48, y: y - 50, size: 10, font, color: rgb(0.09, 0.64, 0.29) });

  y -= 90;
  page.drawRectangle({
    x: width - 248,
    y: y - 52,
    width: 200,
    height: 52,
    color: rgb(0.95, 0.97, 1),
    borderColor: primary,
    borderWidth: 1,
  });
  page.drawText('Total Paid', { x: width - 236, y: y - 18, size: 10, font, color: muted });
  page.drawText(formattedAmount, {
    x: width - 236,
    y: y - 38,
    size: 16,
    font: fontBold,
    color: primary,
  });

  const footerY = 72;
  page.drawLine({
    start: { x: 48, y: footerY + 24 },
    end: { x: width - 48, y: footerY + 24 },
    thickness: 1,
    color: border,
  });
  page.drawText('Zyvotrix — Practical Tech Learning for Career Growth', {
    x: 48,
    y: footerY,
    size: 9,
    font,
    color: muted,
  });
  page.drawText('admin@zyvotrix.com  |  www.zyvotrix.com', {
    x: 48,
    y: footerY - 14,
    size: 9,
    font,
    color: muted,
  });
  page.drawText('This is a computer-generated invoice and does not require a signature.', {
    x: 48,
    y: footerY - 28,
    size: 8,
    font,
    color: muted,
  });

  return pdf.save();
}
