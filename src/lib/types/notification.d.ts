export interface NotificationResponse {
  info: {
    total: number
    limit: number
  }
  messages: NotificationMessage[]
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
  }
  state: 'not_opened' | 'opened' | string
  createdAt: string
  updatedAt: string
}
