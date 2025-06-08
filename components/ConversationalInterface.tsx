import React, { useState, useRef, useEffect } from 'react';
import { ConversationMessage, LeadExtractedData, ProjectType, TimelineUrgency, BudgetRange, CompanySize, AIExperienceLevel } from '../types';

interface ConversationalInterfaceProps {
  onQualificationComplete: (data: Partial<LeadExtractedData>, messages: ConversationMessage[]) => void;
  onClose: () => void;
}

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({
  onQualificationComplete,
  onClose
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'assistant',
      content: "Hi! I'm Jacob's AI assistant. I'd love to learn about your project and see how I can help. What brings you here today?"
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<Partial<LeadExtractedData>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractInformationFromResponse = (userMessage: string, _context: ConversationMessage[]): Partial<LeadExtractedData> => {
    const lowerMessage = userMessage.toLowerCase();
    const updates: Partial<LeadExtractedData> = {};

    // Extract project type
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
      updates.projectType = ProjectType.AI_INTEGRATION;
    } else if (lowerMessage.includes('marketing') || lowerMessage.includes('automation')) {
      updates.projectType = ProjectType.MARKETING_AUTOMATION;
    } else if (lowerMessage.includes('web') || lowerMessage.includes('app') || lowerMessage.includes('development')) {
      updates.projectType = ProjectType.FULL_STACK_DEVELOPMENT;
    } else if (lowerMessage.includes('consultation') || lowerMessage.includes('advice')) {
      updates.projectType = ProjectType.CONSULTATION;
    }

    // Extract timeline urgency
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      updates.timeline = TimelineUrgency.IMMEDIATE;
    } else if (lowerMessage.includes('month') || lowerMessage.includes('soon')) {
      updates.timeline = TimelineUrgency.ONE_TO_THREE_MONTHS;
    } else if (lowerMessage.includes('quarter') || lowerMessage.includes('planning')) {
      updates.timeline = TimelineUrgency.THREE_TO_SIX_MONTHS;
    }

    // Extract budget hints
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      if (lowerMessage.includes('small') || lowerMessage.includes('limited')) {
        updates.budgetRange = BudgetRange.UNDER_5K;
      } else if (lowerMessage.includes('substantial') || lowerMessage.includes('significant')) {
        updates.budgetRange = BudgetRange.OVER_50K;
      }
    }

    // Extract company size
    if (lowerMessage.includes('startup')) {
      updates.companySize = CompanySize.STARTUP;
    } else if (lowerMessage.includes('enterprise') || lowerMessage.includes('large company')) {
      updates.companySize = CompanySize.LARGE;
    } else if (lowerMessage.includes('small business')) {
      updates.companySize = CompanySize.SMALL;
    }

    // Extract AI experience
    if (lowerMessage.includes('new to ai') || lowerMessage.includes('never used ai')) {
      updates.aiExperience = AIExperienceLevel.NONE;
    } else if (lowerMessage.includes('experienced') || lowerMessage.includes('advanced')) {
      updates.aiExperience = AIExperienceLevel.ADVANCED;
    }

    return updates;
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const responses = [
      "That's interesting! Can you tell me more about your specific goals for this project?",
      "I'd love to help with that. What's your timeline looking like for this initiative?",
      "Great question! What's your experience been with AI tools so far?",
      "That sounds like a valuable project. What's your budget range for something like this?",
      "I can definitely help with that. Are you looking for a complete solution or specific components?",
      "Excellent! What size is your team or organization?",
      "That's exactly the kind of challenge I specialize in. What's the biggest pain point you're facing right now?"
    ];
    
    // Simple response selection based on message content
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Budget is always an important consideration. I work with clients across different budget ranges. What range are you thinking for this project?";
    } else if (lowerMessage.includes('timeline') || lowerMessage.includes('urgent') || lowerMessage.includes('when')) {
      return "Timeline is crucial for planning. Are you looking for something immediate, or do we have some time to build this properly?";
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
      return "AI and automation are my specialties! What specific processes are you looking to automate or enhance with AI?";
    } else if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('app')) {
      return "Web development with AI integration is one of my favorite projects. Are you looking for a completely new build or enhancing an existing system?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateAIResponse = async (userMessage: string, context: ConversationMessage[]): Promise<string> => {
    try {
      console.log('Starting AI response generation with Gemini...');
      
      // Use dynamic import to avoid SSR issues
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      
      const apiKey = process.env.GEMINI_API_KEY;
      console.log('Gemini API key available:', !!apiKey);
      
      if (!apiKey) {
        console.warn('Gemini API key not configured, using fallback responses');
        return generateFallbackResponse(userMessage);
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const systemPrompt = `You are Jacob Kazadi's AI assistant helping to qualify potential clients for AI integration and marketing automation services. 

Based on the conversation, provide a helpful, professional response that:
1. Acknowledges their message
2. Asks a relevant follow-up question to gather more information about their project
3. Keeps the conversation focused on understanding their needs, timeline, budget, and technical requirements
4. Maintains a warm, professional tone
5. Keeps responses concise (2-3 sentences max)

Current information gathered: ${JSON.stringify(extractedData)}`;

      // Build conversation context
      const conversationHistory = context.slice(-4).map(msg => 
        `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = `${systemPrompt}

Conversation history:
${conversationHistory}

User: ${userMessage}

Please provide a helpful response:`;

      const response = await model.generateContent(prompt);
      const result = await response.response;
      const aiContent = result.text();
      console.log('AI response received:', !!aiContent);
      return aiContent || "I'd love to learn more about your project. Could you tell me what specific challenges you're looking to solve?";
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'd love to learn more about your project. Could you tell me what specific challenges you're looking to solve?";
    }
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'user',
      content: currentInput.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    // Extract information from user message
    const newExtractedData = extractInformationFromResponse(currentInput.trim(), messages);
    const updatedExtractedData = { ...extractedData, ...newExtractedData };
    setExtractedData(updatedExtractedData);

    // Generate AI response
    const aiResponseContent = await generateAIResponse(currentInput.trim(), [...messages, userMessage]);
    
    const aiMessage: ConversationMessage = {
      id: (Date.now() + 1).toString(),
      timestamp: new Date(),
      type: 'assistant',
      content: aiResponseContent,
      metadata: {
        extractedData: newExtractedData,
        confidence: 0.8
      }
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);

    // Check if we have enough information to complete qualification
    const hasEnoughInfo = Object.keys(updatedExtractedData).length >= 3;
    if (hasEnoughInfo && messages.length >= 6) {
      setTimeout(() => {
        onQualificationComplete(updatedExtractedData, [...messages, userMessage, aiMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Let's Discuss Your Project</h3>
            <p className="text-sm text-gray-600">Tell me about your AI and automation needs</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationalInterface; 