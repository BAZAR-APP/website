import axios from 'axios';

export class SMSService {
  private username: string;
  private password: string;
  private customerId: string;
  private senderText: string;

  constructor() {
    this.username = process.env.SMSBOX_USERNAME || 'valueandgrowth';
    this.password = process.env.SMSBOX_PASSWORD || 'VGA112233';
    this.customerId = process.env.SMSBOX_CUSTOMER_ID || '3441';
    this.senderText = process.env.SMSBOX_SENDER_TEXT || 'V G A';
  }

  async sendPhoneMessage(toPhoneNumber: string, message: string): Promise<void> {
    try {
      const encodedMessage = encodeURIComponent(message);
      const encodedSender = encodeURIComponent(this.senderText);
      
      const url = `https://smsbox.com/smsgateway/services/messaging.asmx/Http_SendSMS` +
        `?username=${this.username}` +
        `&password=${this.password}` +
        `&customerid=${this.customerId}` +
        `&sendertext=${encodedSender}` +
        `&messagebody=${encodedMessage}` +
        `&recipientnumbers=${toPhoneNumber}` +
        `&defdate=&isblink=false&isflash=false`;

      const response = await axios.post(url);
      console.log(`SMS sent to ${toPhoneNumber}, response:`, response.data);
    } catch (error) {
      console.error(`Failed to send SMS to ${toPhoneNumber}:`, error);
      throw new Error('Failed to send SMS');
    }
  }
}