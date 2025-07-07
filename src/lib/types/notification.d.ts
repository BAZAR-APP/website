export interface NotificationResponse {
  total: number
  limit: number
  data: NotificationMessage[]
}

export interface NotificationMessage {
  id: string
  messageTitle: string
  messageBody: string
  inAppMessageTitle: string | null
  inAppMessageBody: string | null
  additionalData: {
    userContext: string
    action: string
    bookingId?: string
  }
  state: 'not_opened' | 'opened' | string
  createdAt: string
  updatedAt: string
}
