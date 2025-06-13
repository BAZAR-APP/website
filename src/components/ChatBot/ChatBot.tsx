import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  showTopicSelector?: boolean;
}

export const ChatBot: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('Payment and refunds');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi Fahd !',
      isUser: false
    },
    {
      id: '2',
      text: 'How can I help you today?',
      isUser: false
    },
    {
      id: '3',
      text: 'You can ask about:',
      isUser: false,
      showTopicSelector: true
    }
  ]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: topic,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add empty AI response placeholder
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your message: "${message}". How else can I assist you?`,
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <main className="flex w-[382px] h-[634px] flex-col items-start shrink-0 max-md:w-full max-md:max-w-[382px] max-md:mx-auto max-md:my-0 max-sm:w-full max-sm:h-screen max-sm:max-h-[634px]">
      <ChatHeader />
      
      <section className="flex items-start self-stretch bg-white p-4 max-sm:p-3 flex-1 overflow-hidden">
        <div className="flex w-[350px] flex-col items-start gap-5 p-0 max-sm:w-full h-full">
          <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
            {messages.map((message, index) => {
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
                );
              }
              
              if (message.text === '' && !message.isUser) {
                return (
                  <ChatMessage
                    key={message.id}
                    message=""
                    isUser={false}
                    isEmpty={true}
                  />
                );
              }
              
              return (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                />
              );
            })}
          </div>
        </div>
        
        <div className="flex items-start gap-2.5 pt-2.5">
          <div className="w-1 h-8 bg-gray-600 rounded-[3px]" role="scrollbar" aria-hidden="true" />
        </div>
      </section>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
};
