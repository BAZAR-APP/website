import { SMSService } from '@/lib/sendSms';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, message } = await request.json();
    
    if (!phoneNumber || !message) {
      return NextResponse.json({ message: 'Phone number and message are required' }, { status: 400 });
    }

    const smsService = new SMSService();
    await smsService.sendPhoneMessage(phoneNumber, message);
    
    return NextResponse.json({ message: 'SMS sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send SMS' }, { status: 500 });
  }
}