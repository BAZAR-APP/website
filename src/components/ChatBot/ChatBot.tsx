import React, { useState, useEffect } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { OpenAIService } from './services/openaiService'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  isUser: boolean
  showTopicSelector?: boolean
  isLoading?: boolean
}

export const ChatBot: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('Payment and refunds')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi Fahd !',
      isUser: false,
    },
    {
      id: '2',
      text: 'How can I help you today?',
      isUser: false,
    },
    {
      id: '3',
      text: 'You can ask about:',
      isUser: false,
      showTopicSelector: true,
    },
  ])
  const openaiService = new OpenAIService()

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!openaiService) {
      return 'API key not configured. Please check your environment variables.'
    }

    try {
      const context = `You are a helpful customer service chatbot for a chalet booking service. The user has selected the topic: ${selectedTopic}. Please provide relevant assistance.`
      return await openaiService.generateResponse(userMessage, context)
    } catch (error) {
      toast.error('Failed to generate AI response. Please check your API key.')
      return "I apologize, but I'm having trouble processing your request right now. Please try again or check your API key."
    }
  }

  const handleTopicSelect = async (topic: string) => {
    setSelectedTopic(topic)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: topic,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])

    const aiResponseText = await generateAIResponse(`I want to know about: ${topic}`)

    setMessages((prev) =>
      prev.map((msg) => (msg.isLoading ? { ...msg, text: aiResponseText, isLoading: false } : msg)),
    )
  }

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])

    const aiResponseText = await generateAIResponse(message)

    setMessages((prev) =>
      prev.map((msg) => (msg.isLoading ? { ...msg, text: aiResponseText, isLoading: false } : msg)),
    )
  }

  return (
    <main className="flex w-[382px] h-[634px] flex-col items-start shrink-0 max-md:w-full max-md:max-w-[382px] max-md:mx-auto max-md:my-0 max-sm:w-full max-sm:h-screen max-sm:max-h-[634px]">
      <ChatHeader />

      <section className="flex items-start self-stretch bg-white p-4 max-sm:p-3 flex-1 overflow-hidden">
        <div className="flex w-[350px] flex-col items-start gap-5 p-0 max-sm:w-full h-full">
          <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
            {messages.map((message) => {
              if (message.showTopicSelector) {
                return (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    showTopicSelector={true}
                    selectedTopic={selectedTopic}
                    onTopicSelect={handleTopicSelect}
                  />
                )
              }

              if (message.isLoading) {
                return <ChatMessage key={message.id} message="" isUser={false} isEmpty={true} />
              }

              return <ChatMessage key={message.id} message={message.text} isUser={message.isUser} />
            })}
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2.5">
          <div className="w-1 h-8 bg-gray-600 rounded-[3px]" role="scrollbar" aria-hidden="true" />
        </div>
      </section>

      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  )
}
