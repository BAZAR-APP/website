// generateInvoicePDF.ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { getArabicFontBytes } from './fontCache';

/* ----------------------------------------------------------
   helper – draw Arabic / RTL text  (uses fontkit internally)
----------------------------------------------------------- */
function englishToArabicName(name: string) {
  const map: Record<string, string> = {
    a: 'ا', b: 'ب', c: 'ك', d: 'د', e: 'ي', f: 'ف',
    g: 'ج', h: 'ه', i: 'ي', j: 'ج', k: 'ك',
    l: 'ل', m: 'م', n: 'ن', o: 'و', p: 'ب',
    q: 'ق', r: 'ر', s: 'س', t: 'ت', u: 'و',
    v: 'ف', w: 'و', x: 'كس', y: 'ي', z: 'ز',
    ' ': ' '
  };

  return name
    .toLowerCase()
    .split('')
    .map(char => map[char] || char)
    .join('');
}

function fixRTL(text: string) {
  if (!text) return text;

  // reverse for RTL display
  return text.split('').reverse().join('');
}

function drawArabicText(
  page: any,
  text: string,
  x: number,
  y: number,
  font: any,
  fontSize: number,
  color: any,
) {
  page.drawText(fixRTL(text), {
    x,
    y,
    size: fontSize,
    font,
    color,
  });
}


export const generateBookingInvoicePDF = async (
  invoiceData: InvoiceData,
  lang: 'en' | 'ar',
): Promise<void> => {
  try {
    const {
      bookingId,
      totalAmount,
      refundableAmount,
      guestName,
      createdAt,
      paymentStatus,
      paidAmount,
      remainingAmount,
    } = invoiceData;




    /* ---------- validation & helpers ---------- */
    if (typeof bookingId !== 'string' || bookingId.length === 0) {
      console.error('Invalid bookingId:', bookingId);
      alert('Failed to generate invoice: Invalid Booking ID.');
      return;
    }

    const formatDate = (d: Date | string): string => {
      const date = typeof d === 'string' ? new Date(d) : d;
      if (isNaN(date.getTime())) return 'Invalid Date';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const formatReferenceNumber = (id: string, ca?: Date | string): string => {
      if (typeof id !== 'string' || id.length === 0) return 'REF_INVALID_ID';
      const date = ca ? (typeof ca === 'string' ? new Date(ca) : ca) : new Date();
      if (isNaN(date.getTime())) {
        const n = new Date();
        return `RE/25/${String(n.getMonth() + 1).padStart(2, '0')}/${String(n.getDate()).padStart(2, '0')}/${id.substring(0, 3)}`;
      }
      return `RE/25/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${id.substring(0, 3)}`;
    };

    const formattedBookingDate = formatDate(createdAt || new Date());
    const referenceNumber = formatReferenceNumber(bookingId, createdAt);

    /* ---------- create PDF ---------- */
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage();
    const { width: pageWidth, height: pageHeight } = page.getSize();

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const arabicFontBytes = await getArabicFontBytes();
    const arabicFont = await pdfDoc.embedFont(arabicFontBytes);
    const font = lang === 'ar' ? arabicFont : helveticaFont;

    /* ---------- load & embed logo ---------- */
    const logoBytes = await fetch('/images/pdf_logo.png').then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.7);

    const margin = 30;
    const logoX = margin;
    const logoY = pageHeight - margin - logoDims.height;

    page.drawImage(logoImage, {
      x: logoX - 20,
      y: logoY + 30,
      width: logoDims.width,
      height: logoDims.height,
    });

    /* ---------- layout constants ---------- */
    const fontSize = 10;
    const headerFontSize = 10;
    const titleFontSize = 20;
    const footerFontSize = 10;

    let yPosition = pageHeight - margin - logoDims.height - 10;

    /* ---------- company info (top-right) ---------- */

const companyInfoX = pageWidth - margin - 120;
const companyInfoY = yPosition + 90;

if (lang === 'ar') {
  const companyInfoLinesAr = [
    'شركة بازار ريل استيت العقارية',
    'سوق الملاح',
  ];

  // Draw regular Arabic lines
  companyInfoLinesAr.forEach((line, index) => {
    drawArabicText(page, line, companyInfoX, companyInfoY - index * 12, arabicFont, headerFontSize, rgb(0, 0, 0));
  });

  // Draw line with Arabic + English number (Ground Floor - Office (318))
  const lineY = companyInfoY - companyInfoLinesAr.length * 12;
  const arabicPart = 'الدور الأرضي - مكتب ';
  const englishPart = '(318)';

  // Arabic part
  drawArabicText(page, arabicPart, companyInfoX, lineY, arabicFont, headerFontSize, rgb(0, 0, 0));
  // English part
  page.drawText(englishPart, {
    x: companyInfoX + arabicFont.widthOfTextAtSize(arabicPart, headerFontSize),
    y: lineY,
    size: headerFontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // Draw Kuwait
  const kuwaitY = lineY - 12;
  page.drawText('Kuwait', {
    x: companyInfoX,
    y: kuwaitY,
    size: headerFontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
} else {
  const companyInfoLinesEn = [
    'Bazaar Real Estate Company',
    'Al Muhallab Street',
    'Ground Floor - Office (318)',
    'Kuwait',
  ];

  companyInfoLinesEn.forEach((line, index) => {
    page.drawText(line, {
      x: companyInfoX,
      y: companyInfoY - index * 12,
      size: headerFontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });
}

// Draw underline
const underlineY = companyInfoY - 50;
page.drawLine({
  start: { x: margin, y: underlineY },
  end: { x: pageWidth - margin, y: underlineY },
  thickness: 1,
  color: rgb(0, 0, 0),
});

yPosition -= 30;



    /* ---------- title (centered) ---------- */
    const titleText = lang === 'ar' ? 'سند صرف' : 'Payment Voucher';
    const titleWidth = font.widthOfTextAtSize(titleText, titleFontSize);
    const titleX = (pageWidth - titleWidth) / 2;
    page.drawText(titleText, {
      x: titleX,
      y: yPosition + 30,
      size: titleFontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;

    /* ---------- date & reference (right) ---------- */
    const dateText =
      lang === 'ar' ? `التاريخ : ${formattedBookingDate}` : `Date: ${formattedBookingDate}`;
    const dateRefX = pageWidth - margin - 100;

    if (lang === 'ar') {
      drawArabicText(page, dateText, dateRefX - 24, yPosition, arabicFont, fontSize, rgb(0, 0, 0));
      yPosition -= 15;
      
      // Draw Arabic label on first line
      const arabicRefLabel = 'رقم العقد :';
      drawArabicText(page, arabicRefLabel, dateRefX -24 , yPosition, arabicFont, fontSize, rgb(0, 0, 0));
      
      yPosition -= 12;
      page.drawText(referenceNumber, {
        x: dateRefX - 24,
        y: yPosition,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    } else {
      page.drawText(dateText, { x: dateRefX - 434, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      yPosition -= 15;
      
      // Draw label on first line
      page.drawText('Contract No:', { x: dateRefX - 434, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      
      // Draw reference number on new line below
      yPosition -= 12;
      page.drawText(referenceNumber, { x: dateRefX - 434, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
    }
    yPosition -= 15;

//     /* ---------- beneficiary ---------- */

const beneficiaryY = yPosition;
const beneficiaryX = pageWidth - margin - 120; 

const rawGuestText = guestName; 
const referenceNumberText = referenceNumber; 
const pobText = 'P.O.B. (232100400383)';


if (lang === 'ar') {
  const arabicLabel = 'أدفعوا إلى السادة';

  drawArabicText(page, arabicLabel, beneficiaryX, beneficiaryY, arabicFont, fontSize, rgb(0, 0, 0));

  page.drawText(referenceNumberText, {
    x: beneficiaryX,
    y: beneficiaryY - 12,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // P.O.B.
  page.drawText(pobText, {
    x: beneficiaryX,
    y: beneficiaryY - 24,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  

  // Guest name
  page.drawText(rawGuestText, {
    x: beneficiaryX,
    y: beneficiaryY - 36,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

} else {
  // English
  const englishLabel = 'For the benefit of:';
  page.drawText(englishLabel, {
    x: beneficiaryX - 413,
    y: beneficiaryY,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(referenceNumberText, {
    x: beneficiaryX - 413,
    y: beneficiaryY - 12,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(rawGuestText, {
    x: beneficiaryX - 413,
    y: beneficiaryY - 24,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(pobText, {
    x: beneficiaryX - 413,
    y: beneficiaryY - 36,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
}

yPosition = beneficiaryY - 50;






    /* ---------- table ---------- */
    const tableTopY = yPosition;
    const tableLeftX = margin;
    const tableRightX = pageWidth - margin;
    const middleX = (tableLeftX + tableRightX) / 2;

    /* ---------- header ---------- */
    const headerLabel = lang === 'ar' ? 'القيمة' : 'Value';
    const headerDescription = lang === 'ar' ? 'الوصف' : 'Description';
    const headerY = tableTopY - 10;

    if (lang === 'ar') {
      drawArabicText(page, headerLabel, tableLeftX + 5, headerY, arabicFont, fontSize, rgb(0, 0, 0));
      drawArabicText(page, headerDescription, middleX + 5, headerY, arabicFont, fontSize, rgb(0, 0, 0));
    } else {
      page.drawText(headerLabel, { x: middleX + 160, y: headerY, size: fontSize, font, color: rgb(0, 0, 0) });
      page.drawText(headerDescription, { x: tableLeftX + 5, y: headerY, size: fontSize, font, color: rgb(0, 0, 0) });
    }

    page.drawLine({
      start: { x: tableLeftX, y: headerY - 4 },
      end: { x: tableRightX, y: headerY - 4 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });


/* ---------- Calculate display amount based on payment status ---------- */
const isHalfPaid = paymentStatus === 'halfPaid';
const displayAmount = isHalfPaid && paidAmount !== undefined ? paidAmount : totalAmount;

/* ---------- row 1 : Paid Amount ---------- */
const row1Y = tableTopY - 25;

if (lang === 'ar') {
  const paidDesc = 'المبلغ المدفوع';
  const paidValue = `KWD ${displayAmount}`;

  drawArabicText(page, paidDesc, middleX + 5, row1Y, arabicFont, fontSize, rgb(0, 0, 0));
  page.drawText(paidValue, {
    x: tableLeftX + 5,
    y: row1Y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
} else {
  const paidDescription = 'Paid Amount';
  const paidValue = `KWD ${displayAmount}`;

  page.drawText(paidValue, { x: middleX + 160, y: row1Y, size: fontSize, font, color: rgb(0, 0, 0) });
  page.drawText(paidDescription, { x: tableLeftX + 5, y: row1Y, size: fontSize, font, color: rgb(0, 0, 0) });
}

page.drawLine({
  start: { x: tableLeftX, y: row1Y - 3 },
  end: { x: tableRightX, y: row1Y - 3 },
  thickness: 1,
  color: rgb(0, 0, 0),
});

/* ---------- row 2 : Total ---------- */
const row2Y = row1Y - 15;

if (lang === 'ar') {
  const totalDesc = 'المجموع';
  const totalValue = `KWD ${displayAmount}`;

  drawArabicText(page, totalDesc, middleX + 5, row2Y, arabicFont, fontSize, rgb(0, 0, 0));
  page.drawText(totalValue, {
    x: tableLeftX + 5,
    y: row2Y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
} else {
  const totalDescription = 'Total';
  const totalValue = `KWD ${displayAmount}`;

  page.drawText(totalValue, { x: middleX + 160, y: row2Y, size: fontSize, font, color: rgb(0, 0, 0) });
  page.drawText(totalDescription, { x: tableLeftX + 5, y: row2Y, size: fontSize, font, color: rgb(0, 0, 0) });
}

yPosition = row2Y - 15;


    /* ---------- footer signature ---------- */
    const safeName = lang === 'ar'
  ? fixRTL(englishToArabicName(guestName))
  : guestName;

      const signatureText = lang === 'ar' ? 'توقيع المستلم' : 'Signature of Recipient';
      if (lang === 'ar') {
        drawArabicText(page, signatureText, margin, yPosition - 30, arabicFont, footerFontSize, rgb(0, 0, 0));
        drawArabicText(page, safeName, margin, yPosition - 45, arabicFont, fontSize, rgb(0, 0, 0));
      } else {
        page.drawText(signatureText, { x: margin + 434, y: yPosition - 30, size: footerFontSize, font: helveticaFont, color: rgb(0, 0, 0) });
        page.drawText(guestName,      { x: margin + 434, y: yPosition - 45, size: fontSize,       font: helveticaFont, color: rgb(0, 0, 0) });
      }

    /* ---------- download ---------- */
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice_${bookingId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('PDF generated successfully with logo.');
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Failed to generate invoice PDF. Please try again or contact support.');
  }
};

/* ---------- TS interface ---------- */
export interface InvoiceData {
  bookingId: string;
  startDate: Date | string;
  endDate: Date | string;
  totalAmount: number;
  refundableAmount: string;
  chaletTitle: string;
  hostName: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  createdAt?: Date | string;
  paymentStatus?: 'fullPaid' | 'halfPaid';
  paidAmount?: number;
  remainingAmount?: number;
}