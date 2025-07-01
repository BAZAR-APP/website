interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export class GeminiService {
  private baseUrl = '/api/gemini'

  async generateResponse(message: string, context: string = ''): Promise<string> {
    try {
      const prompt = context
        ? `Context: ${context}\n\nUser: ${message}\n\nPlease provide a helpful response as a customer service chatbot.`
        : `User: ${message}\n\nPlease provide a helpful response as a customer service chatbot.`

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to generate response')
      }

      const data: GeminiResponse = await response.json()

      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text
      } else {
        throw new Error('No response generated')
      }
    } catch (error) {
      throw error
    }
  }
}
