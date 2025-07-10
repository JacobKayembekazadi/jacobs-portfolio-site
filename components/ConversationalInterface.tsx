import React, { useState, useRef, useEffect } from 'react';
import { ConversationMessage, LeadExtractedData, ProjectType, TimelineUrgency, BudgetRange, CompanySize, AIExperienceLevel } from '../types';

interface ConversationalInterfaceProps {
  onAdviceComplete?: (data: any, messages: ConversationMessage[]) => void;
  onClose: () => void;
}

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({
  onAdviceComplete,
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

  const extractInformationFromResponse = async (userMessage: string, context: ConversationMessage[]): Promise<Partial<LeadExtractedData>> => {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return extractInformationFallback(userMessage, context);
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const extractionPrompt = `
You are an expert business analyst. Extract structured information from this conversation message.

CONTEXT: Previous conversation history:
${context.slice(-3).map(msg => `${msg.type}: ${msg.content}`).join('\n')}

CURRENT MESSAGE: "${userMessage}"

Extract the following information and respond ONLY in valid JSON format:

{
  "projectType": "AI_INTEGRATION" | "MARKETING_AUTOMATION" | "FULL_STACK_DEVELOPMENT" | "CONSULTATION" | "STRATEGY" | "OTHER",
  "timeline": "immediate" | "1-3 months" | "3-6 months" | "future planning",
  "budgetRange": "Under $5,000" | "$5,000 - $15,000" | "$15,000 - $50,000" | "Over $50,000" | "To be discussed",
  "companySize": "Startup (1-10 employees)" | "Small Business (11-50 employees)" | "Medium Business (51-200 employees)" | "Large Enterprise (200+ employees)" | "Individual/Freelancer",
  "aiExperience": "No prior AI experience" | "Basic understanding" | "Some implementation experience" | "Advanced AI user",
  "industry": "detected industry or null",
  "projectDescription": "summary of project needs",
  "specificNeeds": ["array", "of", "specific", "requirements"],
  "contactInfo": {
    "name": "extracted name or null",
    "email": "extracted email or null", 
    "company": "extracted company or null"
  },
  "confidence": 0.0-1.0,
  "painPoints": ["key", "pain", "points"],
  "desiredOutcomes": ["desired", "business", "outcomes"]
}

Only include fields where you have reasonable confidence. Use null for missing information.`;

      const result = await model.generateContent(extractionPrompt);
      const response = await result.response;
      const extractedJson = response.text();
      
      // Parse the JSON response
      const parsed = JSON.parse(extractedJson.replace(/```json|```/g, '').trim());
      
      // Convert to your enum types
      const updates: Partial<LeadExtractedData> = {};
      
      if (parsed.projectType) {
        updates.projectType = ProjectType[parsed.projectType as keyof typeof ProjectType];
      }
      if (parsed.timeline) {
        updates.timeline = TimelineUrgency[parsed.timeline.replace(/[^A-Z_]/g, '_').toUpperCase() as keyof typeof TimelineUrgency];
      }
      if (parsed.budgetRange) {
        updates.budgetRange = BudgetRange[Object.keys(BudgetRange).find(key => 
          BudgetRange[key as keyof typeof BudgetRange] === parsed.budgetRange
        ) as keyof typeof BudgetRange];
      }
      if (parsed.companySize) {
        updates.companySize = CompanySize[Object.keys(CompanySize).find(key => 
          CompanySize[key as keyof typeof CompanySize] === parsed.companySize
        ) as keyof typeof CompanySize];
      }
      if (parsed.aiExperience) {
        updates.aiExperience = AIExperienceLevel[Object.keys(AIExperienceLevel).find(key => 
          AIExperienceLevel[key as keyof typeof AIExperienceLevel] === parsed.aiExperience
        ) as keyof typeof AIExperienceLevel];
      }
      
      // Add new intelligence fields
      if (parsed.industry) updates.industry = parsed.industry;
      if (parsed.projectDescription) updates.projectDescription = parsed.projectDescription;
      if (parsed.specificNeeds) updates.specificNeeds = parsed.specificNeeds;
      if (parsed.contactInfo) updates.contactInfo = parsed.contactInfo;
      
      return updates;
      
    } catch (error) {
      console.error('AI extraction failed:', error);
      return extractInformationFallback(userMessage, context);
    }
  };

  const extractInformationFallback = (userMessage: string, _context: ConversationMessage[]): Partial<LeadExtractedData> => {
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
        return generateIntelligentFallbackResponse(userMessage, extractedData);
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Advanced conversation strategy
      const conversationStrategy = determineConversationStrategy(extractedData, context);
      
      const systemPrompt = `You are Jacob Kazadi's AI Marketing Strategist - an expert at providing ACTIONABLE, SPECIFIC marketing advice and strategies.

Your role is to:
1. PROVIDE IMMEDIATE VALUE: Give specific, actionable advice rather than asking generic questions
2. OFFER STRATEGIC INSIGHTS: Share concrete strategies, tactics, and frameworks
3. BE SOLUTION-FOCUSED: Address their challenges with practical steps they can implement today
4. DEMONSTRATE EXPERTISE: Show deep marketing and AI knowledge through specific recommendations

CONVERSATION APPROACH:
- Listen to their challenge/goal
- Provide 2-3 specific, actionable strategies
- Explain WHY each strategy works
- Give tactical implementation steps
- Offer follow-up insights or related strategies

MARKETING EXPERTISE AREAS:
- AI-powered marketing automation
- Content strategy and creation
- Lead generation and conversion optimization
- Social media strategy
- Email marketing automation
- Growth hacking techniques
- Brand positioning and messaging
- Performance marketing and analytics

RESPONSE FORMAT:
1. Acknowledge their specific situation
2. Provide 2-3 concrete, actionable strategies
3. Include implementation steps
4. Ask ONE follow-up question to offer more specific help

Keep responses helpful, tactical, and immediately valuable. Focus on strategies they can start implementing today.`;

      // Build conversation context
      const conversationHistory = context.slice(-4).map(msg => 
        `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = `${systemPrompt}

Recent conversation:
${conversationHistory}

User just said: "${userMessage}"

Generate a strategic response:`;

      const response = await model.generateContent(prompt);
      const result = await response.response;
      const aiContent = result.text();
      console.log('AI response received:', !!aiContent);
      return aiContent || generateIntelligentFallbackResponse(userMessage, extractedData);
    } catch (error) {
      console.error('Error generating AI response:', error);
      return generateIntelligentFallbackResponse(userMessage, extractedData);
    }
  };

  const determineConversationStrategy = (data: Partial<LeadExtractedData>, context: ConversationMessage[]) => {
    const missingCritical = [];
    const qualitySignals = [];
    
    // Identify missing critical information
    if (!data.projectType) missingCritical.push('project type');
    if (!data.timeline) missingCritical.push('timeline');
    if (!data.budgetRange) missingCritical.push('budget range');
    if (!data.companySize) missingCritical.push('company size');
    if (!data.painPoints?.length) missingCritical.push('pain points');
    
    // Identify quality signals
    if (data.timeline === 'immediate') qualitySignals.push('urgent timeline');
    if (data.budgetRange && ['Over $50,000', '$15,000 - $50,000'].includes(data.budgetRange)) {
      qualitySignals.push('substantial budget');
    }
    if (data.companySize && ['Large Enterprise (200+ employees)', 'Medium Business (51-200 employees)'].includes(data.companySize)) {
      qualitySignals.push('enterprise scale');
    }
    
    // Determine conversation stage
    const messageCount = context.length;
    const stage = messageCount < 4 ? 'discovery' : messageCount < 8 ? 'qualification' : 'closing';
    
    // Determine strategy
    let strategy = 'general_discovery';
    let primaryObjective = 'Build rapport and understand basic needs';
    let nextBestQuestion = 'project goals and challenges';
    let tone = 'friendly and consultative';
    
    if (stage === 'discovery') {
      if (!data.projectType) {
        strategy = 'project_identification';
        primaryObjective = 'Identify the type of project and its scope';
        nextBestQuestion = 'specific AI or automation challenges they face';
      } else if (!data.painPoints?.length) {
        strategy = 'pain_point_discovery';
        primaryObjective = 'Uncover the business problems they need to solve';
        nextBestQuestion = 'their biggest operational challenges or inefficiencies';
      }
    } else if (stage === 'qualification') {
      if (!data.timeline) {
        strategy = 'timeline_urgency';
        primaryObjective = 'Understand project urgency and decision timeline';
        nextBestQuestion = 'when they need this implemented and what\'s driving the timeline';
      } else if (!data.budgetRange) {
        strategy = 'budget_discovery';
        primaryObjective = 'Understand investment capacity without being pushy';
        nextBestQuestion = 'the scale of investment they\'re considering and ROI expectations';
        tone = 'consultative and value-focused';
      }
    } else {
      strategy = 'closing_qualification';
      primaryObjective = 'Confirm fit and guide toward next steps';
      nextBestQuestion = 'decision-making process and stakeholders involved';
      tone = 'confident and action-oriented';
    }
    
    return {
      strategy,
      stage,
      missingCritical,
      qualitySignals,
      primaryObjective,
      nextBestQuestion,
      tone
    };
  };

  const generateIntelligentFallbackResponse = (userMessage: string, data: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Provide actionable marketing advice based on common challenges
    if (lowerMessage.includes('leads') || lowerMessage.includes('lead generation')) {
      return "Here are 3 lead generation strategies that work: 1) Create a lead magnet (free resource) that solves a specific problem for your ideal customer, 2) Set up LinkedIn automation to connect with prospects in your niche, 3) Use AI-powered chatbots on your website to qualify visitors 24/7. Which of these fits your current marketing setup best?";
    }
    
    if (lowerMessage.includes('social media') || lowerMessage.includes('content')) {
      return "For social media success: 1) Use AI tools like ChatGPT to batch-create 30 days of content in 2 hours, 2) Post at optimal times using scheduling tools like Buffer or Later, 3) Engage with your audience within the first hour of posting for maximum reach. What platform are you focusing on most right now?";
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('newsletter')) {
      return "Email marketing ROI averages 4200%! Here's how: 1) Segment your list based on behavior and interests, 2) Use AI to personalize subject lines and content, 3) Set up automated welcome sequences and re-engagement campaigns. Are you currently collecting emails from your website visitors?";
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
      return "AI can transform your marketing: 1) Use ChatGPT for content creation and customer service responses, 2) Implement predictive analytics to identify your best prospects, 3) Automate your lead scoring and nurturing sequences. What repetitive marketing tasks are taking up most of your time?";
    }
    
    if (lowerMessage.includes('conversion') || lowerMessage.includes('sales')) {
      return "Boost conversions with these proven tactics: 1) Add social proof (testimonials, reviews) to your landing pages, 2) Create urgency with limited-time offers or scarcity, 3) Use exit-intent popups with compelling offers. What's your current conversion rate on your main landing page?";
    }
    
    // Default helpful marketing advice
    return "I'd love to give you specific marketing strategies! Here are 3 quick wins: 1) Optimize your Google My Business for local SEO, 2) Create video content (even simple screen recordings work), 3) Use retargeting ads to re-engage website visitors. What's your biggest marketing challenge right now?";
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
    const newExtractedData = await extractInformationFromResponse(currentInput.trim(), messages);
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

    // Smart completion detection
    const shouldComplete = shouldCompleteQualification(updatedExtractedData, [...messages, userMessage, aiMessage]);
    if (shouldComplete.complete) {
      setTimeout(() => {
        onAdviceComplete?.(updatedExtractedData, [...messages, userMessage, aiMessage]);
      }, shouldComplete.delay);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const shouldCompleteQualification = (data: Partial<LeadExtractedData>, messages: ConversationMessage[]) => {
    const messageCount = messages.length;
    const userMessages = messages.filter(m => m.type === 'user');
    
    // Critical information check
    const hasCriticalInfo = !!(data.projectType && data.timeline && (data.budgetRange || data.painPoints?.length));
    
    // Information richness score
    let infoScore = 0;
    if (data.projectType) infoScore += 2;
    if (data.timeline) infoScore += 2;
    if (data.budgetRange) infoScore += 2;
    if (data.companySize) infoScore += 1;
    if (data.painPoints?.length) infoScore += 2;
    if (data.desiredOutcomes?.length) infoScore += 1;
    if (data.contactInfo?.name || data.contactInfo?.email) infoScore += 1;
    
    // Engagement quality assessment
    const avgMessageLength = userMessages.reduce((sum, msg) => sum + msg.content.length, 0) / userMessages.length;
    const hasDetailedResponses = avgMessageLength > 50;
    const hasBusinessFocus = userMessages.some(msg => 
      msg.content.toLowerCase().includes('business') || 
      msg.content.toLowerCase().includes('roi') || 
      msg.content.toLowerCase().includes('team') ||
      msg.content.toLowerCase().includes('process')
    );
    
    // Completion rules
    
    // Early completion for high-value prospects (5+ messages)
    if (messageCount >= 10 && infoScore >= 8 && hasDetailedResponses) {
      return { complete: true, delay: 1500, reason: 'high_value_complete' };
    }
    
    // Standard completion (6+ messages with critical info)
    if (messageCount >= 12 && hasCriticalInfo && infoScore >= 6) {
      return { complete: true, delay: 2000, reason: 'standard_complete' };
    }
    
    // Extended completion for engaged prospects (8+ messages)
    if (messageCount >= 16 && hasCriticalInfo && hasBusinessFocus) {
      return { complete: true, delay: 1000, reason: 'engaged_complete' };
    }
    
    // Force completion if conversation is too long (10+ messages)
    if (messageCount >= 20) {
      return { complete: true, delay: 500, reason: 'max_length_reached' };
    }
    
    // Don't complete if minimal engagement
    if (messageCount >= 8 && !hasDetailedResponses && infoScore < 4) {
      return { complete: true, delay: 3000, reason: 'low_engagement' };
    }
    
    return { complete: false, delay: 0, reason: 'continue_conversation' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Get Actionable Marketing Advice</h3>
            <p className="text-sm text-gray-600">I'll give you specific strategies you can implement today</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close chat"
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