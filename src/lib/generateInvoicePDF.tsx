import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface InvoiceItem {
    label: string;
    amount: number;
}

export interface CustomizationItem {
    title: string;
    price: number;
}

export interface InvoiceData {
    invoiceNo: string;
    issuedOn: string;
    dueOn: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    address: string;
    chaletTitle: string;
    chaletImage: string;
    chaletAddress: string;
    startDate: string;
    endDate: string;
    guests: number;
    location: string;
    items: InvoiceItem[];
    customization?: CustomizationItem[];
    totalAmount: number;
    paymentStatus: 'paid' | 'half';
    paidAmount: number;
    noOfNights: number;
    perNightCost: number;
    refundableDepositAmount: number;
    startTime?: string;
    endTime?: string;
}

async function getBase64FromUrl(url: string): Promise<string> {
    try {
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn('[generateInvoicePDF] Image fetch failed (likely CORS). Ensure your S3 bucket allows the current origin.', error);
        return url;
    }
}

export async function generateInvoicePDF(data: InvoiceData, lang: string) {
    try {
        const isAr = lang === 'ar';
        console.log(`[generateInvoicePDF] Starting generation (${lang}) for:`, data.invoiceNo);

        const base64ChaletImage = data.chaletImage ? await getBase64FromUrl(data.chaletImage) : '';

        const container = document.createElement('div');
        container.style.width = '700px';
        container.style.height = '990px';
        container.style.padding = '0';
        container.style.backgroundColor = '#ffffff';
        container.style.color = '#19191A';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.lineHeight = '1.4';
        container.style.direction = isAr ? 'rtl' : 'ltr';

        const t = {
            invoice: isAr ? 'رقم الفاتورة' : 'Invoice No.',
            issuedOn: isAr ? 'تاريخ الإصدار' : 'Issued on',
            paymentDue: isAr ? 'تاريخ الاستحقاق' : 'Payment Due',
            billedTo: isAr ? 'الفاتورة إلى:' : 'Billed To:',
            location: isAr ? 'الموقع' : 'Location',
            dates: isAr ? 'التواريخ' : 'Dates',
            guests: isAr ? 'ضيوف' : 'Guests',
            nights: isAr ? 'ليالي' : 'nights',
            total: isAr ? 'المجموع (KWD)' : 'Total (KWD)',
            totalPaidVia: isAr ? 'مدفوع عبر' : 'Paid Via',
            checkInOutTimes: isAr ? 'أوقات تسجيل الوصول / المغادرة' : 'Check-in / Check-out times',
            checkIn: isAr ? 'تسجيل الوصول:' : 'Check-in:',
            checkOut: isAr ? 'المغادرة:' : 'Checkout:',
            cancellationPolicy: isAr ? 'سياسة الإلغاء' : 'Cancellation Policy',
            cancelUpTo: isAr ? 'يمكن الإلغاء حتى 72 ساعة قبل تسجيل الوصول للحصول على استرداد.' : 'Cancel up to 72 hours before check-in for refund.',
            refundInstructions: isAr ? 'تعليمات الاسترداد' : 'Refund Instructions',
            refundableDeposit: isAr ? 'الوديعة الأمنية القابلة للاسترداد:' : 'Refundable Security Deposit:',
            refundMethod: isAr ? 'طريقة الاسترداد: نفس طريقة الدفع' : 'Refund Method: Same payment method',
            refundPeriod: isAr ? 'فترة الاسترداد: 72 ساعة بعد المغادرة' : 'Refund Period: 72 hours after checkout',
            depositInfo: isAr ? 'معلومات الوديعة' : 'Deposit Info',
            depositLongText: isAr ? `مطلوب وديعة أمنية قابلة للاسترداد بقيمة ${data.refundableDepositAmount} KWD وسيتم إرجاعها خلال 72 ساعة بعد المغادرة، إذا لم يتم الإبلاغ عن أي أضرار.` : `A refundable security deposit of ${data.refundableDepositAmount} KWD is required and will be returned within 72 hours after checkout, if no damages are reported.`,
            kwd: 'KWD',
            viewOnline: isAr ? 'أو عرض الحجز عبر الإنترنت' : 'Or View Booking Online',
            address: 'Kuwait, Souq Al-Manakh, Ground Floor, Office No. 318.',
            email: 'support@bazar.com'
        };

        const primaryColor = '#1E3A5F';
        const secondaryColor = '#E5E5E5';
        const backgroundColor = '#F9FAFB';
        const textGrey = '#8E8E93';

        const calenderLogo = `${window.location.origin}/images/calender.svg`;
        const knetLogo = `${window.location.origin}/images/Knet.svg`;
        const mainLogo = `${window.location.origin}/images/Logo-white.svg`;
        const footerLogo = `${window.location.origin}/images/Logo.svg`;
        const locationLogo = `${window.location.origin}/images/location.svg`;
        const groupLogo = `${window.location.origin}/images/group.svg`;
        const qrCodeLogo = `${window.location.origin}/images/qr-code.svg`;
        const paidLogo = `${window.location.origin}/images/paidLogo.png`;
        const clockLogo = `${window.location.origin}/images/clockPdf.svg`;

        container.innerHTML = `
<div style="font-family: Arial, sans-serif; padding: 20px; height: 100%; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; flex-direction: column; height: 100%;">

    <!-- Header Section -->
    <div style="background-color: ${primaryColor}; border-radius: 16px; padding: 22px; color: white; display: flex; flex-direction: column; margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; align-items: start; flex-direction: ${isAr ? 'row-reverse' : 'row'};">
        <img src="${mainLogo}" style="height: 40px;" />
        <div style="text-align: ${isAr ? 'left' : 'right'};">
          <div style="font-size: 14px; margin-bottom: 4px;">${t.invoice}</div>
          <div style="font-size: 18px;">#${data.invoiceNo.slice(-6).toUpperCase()}</div>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <div style="font-size: 14px; margin-bottom: 10px; text-align: ${isAr ? 'right' : 'left'};">${t.billedTo}</div>
        <div style="display: flex; justify-content: space-between; flex-direction: ${isAr ? 'row-reverse' : 'row'};">
          <div style="text-align: ${isAr ? 'right' : 'left'};">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${data.guestName}</div>
            <div style="font-size: 14px; margin-bottom: 5px;">+965 ${data.guestPhone}</div>
            <div style="font-size: 14px;">${data.guestEmail}</div>
          </div>
          <div style="text-align: ${isAr ? 'left' : 'right'};">
            <div style="font-size: 14px; margin-bottom: 4px;">${t.issuedOn}</div>
            <div style="font-size: 14px;  margin-bottom: 15px;">${data.issuedOn}</div>
            <div style="font-size: 14px; margin-bottom: 4px;">${t.paymentDue}</div>
            <div style="font-size: 14px;">${data.dueOn}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details Section -->
    <div style="background-color: ${backgroundColor}; border-radius: 8px; padding: 16px; margin-bottom: 20px; display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-direction: ${isAr ? 'row-reverse' : 'row'}; justify-content: start; width: 100%;">
        ${base64ChaletImage ? `<img src="${base64ChaletImage}" crossorigin="anonymous" style="width: 47px; height: 30px; object-fit: contain; border-radius: 10px; margin-bottom: -12px;" />` : `<div style="width: 80px; height: 80px; background-color: ${backgroundColor}; border-radius: 10px;"></div>`}
        <div style="display: flex; align-items: center; font-size: 16px; font-weight: bold; text-align: center;">${data.chaletTitle}</div>
      </div>

      <!-- Date -->
      <div style="display: flex; align-items: center; gap: 5px; margin-top: 12px; margin-bottom: 6px; font-size: 12px; flex-direction: ${isAr ? 'row-reverse' : 'row'}; justify-content: start; width: 100%;">
        <img src="${calenderLogo}" style="width: 12px; margin-bottom: -6px;" />
        <div style="color: #9EA0A2; display: flex; align-items: center;">From ${data.startDate} To ${data.endDate}</div>
      </div>

      <!-- Guests -->
      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 6px; font-size: 12px; flex-direction: ${isAr ? 'row-reverse' : 'row'}; justify-content: start; width: 100%;">
        <img src="${groupLogo}" style="width: 12px; margin-bottom: -6px;" />
        <div style="color: #9EA0A2; display: flex; align-items: center;">${data.guests} ${t.guests}</div>
      </div>

      <!-- Chalet Address -->
      <div style="display: flex; align-items: center; gap: 5px; font-size: 12px; flex-direction: ${isAr ? 'row-reverse' : 'row'}; justify-content: flex-start; width: 100%;">
        <img src="${locationLogo}" style="width: 12px; margin-bottom: -6px;" />
        <span style="color: #9EA0A2; display: flex; align-items: center;">${data.chaletAddress}</span>
      </div>

      <hr style="border: none; border-top: 1px solid ${secondaryColor}; margin: 16px 0;" />

      <!-- Price Breakdown -->
      <div style="font-size: 14px; width: 100%;">
        ${data.noOfNights > 0 ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px; flex-direction: ${isAr ? 'row-reverse' : 'row'};"><span style="margin-bottom: 5px; color: #19191A">${data.perNightCost?.toFixed(0)} KWD x ${data.noOfNights} ${t.nights}</span><span>${(data.perNightCost * data.noOfNights).toFixed(2)} KWD</span></div>` : ''}
        ${data.customization?.map(item => `<div style="display: flex; justify-content: space-between; margin-bottom: 8px; flex-direction: ${isAr ? 'row-reverse' : 'row'};"><span>${item.title}</span><span>${item.price.toFixed(2)} KWD</span></div>`).join('') || ''}
      </div>
    </div>

    <!-- Total Section -->
    <div style="display: flex; justify-content: flex-end; margin-bottom: 25px;">
      <div style="background-color: ${backgroundColor}; border-radius: 8px; padding: 12px 20px; display: flex; align-items: center; gap: 10px; flex-direction: ${isAr ? 'row-reverse' : 'row'};">
        <div style="display: flex; align-items: center; gap: 5px; font-size: 11px; color: ${textGrey}; flex-direction: ${isAr ? 'row-reverse' : 'row'};">
          <span style="color: #484A4C; font-size: 12px">${t.total}</span>
          <span style="color: #484A4C; font-size: 6px;">${t.totalPaidVia}</span>
          <img src="${paidLogo}" style="width: 11.5px; margin-bottom: -6px; object-fit: contain;"/>
        </div>
        <div style="font-size: 23px; font-weight: bold; margin-bottom: 10px;">${data.totalAmount.toFixed(2)}</div>
      </div>
    </div>

    <!-- Footer Section -->
    <hr style="border: none; border-top: 1px solid ${secondaryColor}; margin-bottom: 20px;" />
    <img src="${footerLogo}" style="width: 120px; margin-bottom: 8px;" />
    <div style="display: grid; grid-template-columns: 1fr 1fr 1.5fr; margin-bottom: 20px; gap: 20px; flex-direction: ${isAr ? 'row-reverse' : 'row'}; text-align: ${isAr ? 'right' : 'left'};">

      <!-- Column 1 -->
      <div>
        <div style="font-size: 11px; color: #121722; margin-bottom: 4px;">${t.address}</div>
        <div style="font-size: 11px; color: #29397E; text-decoration: underline;">${t.email}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 5px;">
          <img src="${qrCodeLogo}" style="width: 20px; margin-bottom: -10px;" />
          <div style="font-size: 9px; color: #29397E;">${t.viewOnline}</div>
        </div>
      </div>

      <!-- Column 2 -->
      <div>
        <div style="font-size: 12px; color: #121722; font-weight: bold; margin-bottom: 4px;">${t.checkInOutTimes}</div>
        <div style="font-size: 11px; color: #8E8E93; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 5px; height: 20px; font-size: 12px; direction: ${isAr ? 'rtl' : 'ltr'};">
            <img src="${clockLogo}" style="width: 12px; margin-bottom: -8px;" />
            <span>${t.checkIn} ${data.startTime || '02:00 PM'}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 5px; height: 20px; font-size: 12px; margin-top: 5px; direction: ${isAr ? 'rtl' : 'ltr'};">
            <img src="${clockLogo}" style="width: 12px; margin-bottom: -8px;" />
            <span>${t.checkOut} ${data.endTime || '12:00 PM'}</span>
          </div>
        </div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">${t.cancellationPolicy}</div>
        <div style="font-size: 11px; color: ${textGrey};">${t.cancelUpTo}</div>
      </div>

      <!-- Column 3 -->
      <div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">${t.refundInstructions}</div>
        <div style="font-size: 11px; color: #8E8E93; margin-bottom: 12px;">
          <div>${t.refundableDeposit} ${data.refundableDepositAmount?.toFixed(0)} KWD</div>
          <div>${t.refundMethod}</div>
          <div>${t.refundPeriod}</div>
        </div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">${t.depositInfo}</div>
        <div style="font-size: 11px; color: ${textGrey};">${t.depositLongText}</div>
      </div>
    </div>

  </div>
</div>
`;

        // Append to body to ensure html2canvas can render it correctly
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        document.body.appendChild(container);

        // Wait for images to load
        const images = Array.from(container.querySelectorAll('img'));
        await Promise.all(
            images.map(img =>
                img.decode?.().catch(() => { }) ||
                new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })
            )
        );

        const canvas = await html2canvas(container, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${data.invoiceNo}.pdf`);

        document.body.removeChild(container);
        console.log('[generateInvoicePDF] PDF generated successfully.');
    } catch (error) {
        console.error('[generateInvoicePDF] Error generating PDF:', error);
        throw error;
    }
}
