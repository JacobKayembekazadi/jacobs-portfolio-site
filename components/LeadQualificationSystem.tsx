import React, { useState } from 'react';
import ConversationalInterface from './ConversationalInterface';
import { 
  LeadQualification, 
  LeadExtractedData, 
  ConversationMessage, 
  LeadCategory, 
  LeadStatus, 
  ProjectType,
  TimelineUrgency,
  BudgetRange,
  CompanySize,
  AIExperienceLevel,
  QualificationConfig
} from '../types';

interface LeadQualificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadQualified: (lead: LeadQualification) => void;
}

const DEFAULT_CONFIG: QualificationConfig = {
  scoringWeights: {
    projectType: 0.25,
    timeline: 0.30,
    budget: 0.25,
    companySize: 0.15,
    aiExperience: 0.05
  },
  categoryThresholds: {
    highValue: 80,
    qualified: 60,
    nurture: 40
  },
  autoResponseEnabled: true,
  maxConversationLength: 20
};

const LeadQualificationSystem: React.FC<LeadQualificationSystemProps> = ({
  isOpen,
  onClose,
  onLeadQualified
}) => {
  const [currentLead, setCurrentLead] = useState<LeadQualification | null>(null);
  const [showConversation, setShowConversation] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const calculateQualificationScore = (data: Partial<LeadExtractedData>): number => {
    let score = 0;
    const { scoringWeights } = DEFAULT_CONFIG;

    // Project Type Scoring
    if (data.projectType) {
      switch (data.projectType) {
        case ProjectType.AI_INTEGRATION:
          score += 100 * scoringWeights.projectType;
          break;
        case ProjectType.MARKETING_AUTOMATION:
          score += 90 * scoringWeights.projectType;
          break;
        case ProjectType.FULL_STACK_DEVELOPMENT:
          score += 70 * scoringWeights.projectType;
          break;
        case ProjectType.STRATEGY:
          score += 85 * scoringWeights.projectType;
          break;
        case ProjectType.CONSULTATION:
          score += 60 * scoringWeights.projectType;
          break;
        default:
          score += 40 * scoringWeights.projectType;
      }
    }

    // Timeline Scoring
    if (data.timeline) {
      switch (data.timeline) {
        case TimelineUrgency.IMMEDIATE:
          score += 100 * scoringWeights.timeline;
          break;
        case TimelineUrgency.ONE_TO_THREE_MONTHS:
          score += 85 * scoringWeights.timeline;
          break;
        case TimelineUrgency.THREE_TO_SIX_MONTHS:
          score += 70 * scoringWeights.timeline;
          break;
        case TimelineUrgency.FUTURE_PLANNING:
          score += 40 * scoringWeights.timeline;
          break;
      }
    }

    // Budget Scoring
    if (data.budgetRange) {
      switch (data.budgetRange) {
        case BudgetRange.OVER_50K:
          score += 100 * scoringWeights.budget;
          break;
        case BudgetRange.FIFTEEN_TO_50K:
          score += 80 * scoringWeights.budget;
          break;
        case BudgetRange.FIVE_TO_15K:
          score += 60 * scoringWeights.budget;
          break;
        case BudgetRange.UNDER_5K:
          score += 30 * scoringWeights.budget;
          break;
        default:
          score += 50 * scoringWeights.budget;
      }
    }

    // Company Size Scoring
    if (data.companySize) {
      switch (data.companySize) {
        case CompanySize.LARGE:
          score += 90 * scoringWeights.companySize;
          break;
        case CompanySize.MEDIUM:
          score += 80 * scoringWeights.companySize;
          break;
        case CompanySize.SMALL:
          score += 70 * scoringWeights.companySize;
          break;
        case CompanySize.STARTUP:
          score += 85 * scoringWeights.companySize;
          break;
        case CompanySize.INDIVIDUAL:
          score += 40 * scoringWeights.companySize;
          break;
      }
    }

    // AI Experience Scoring
    if (data.aiExperience) {
      switch (data.aiExperience) {
        case AIExperienceLevel.ADVANCED:
          score += 70 * scoringWeights.aiExperience;
          break;
        case AIExperienceLevel.INTERMEDIATE:
          score += 85 * scoringWeights.aiExperience;
          break;
        case AIExperienceLevel.BASIC:
          score += 100 * scoringWeights.aiExperience;
          break;
        case AIExperienceLevel.NONE:
          score += 90 * scoringWeights.aiExperience;
          break;
      }
    }

    return Math.round(score);
  };

  const categorizeLeadByScore = (score: number): LeadCategory => {
    const { categoryThresholds } = DEFAULT_CONFIG;
    
    if (score >= categoryThresholds.highValue) {
      return LeadCategory.HIGH_VALUE;
    } else if (score >= categoryThresholds.qualified) {
      return LeadCategory.QUALIFIED;
    } else if (score >= categoryThresholds.nurture) {
      return LeadCategory.NURTURE;
    } else {
      return LeadCategory.UNQUALIFIED;
    }
  };

  const generatePersonalizedResponse = (category: LeadCategory, data: Partial<LeadExtractedData>): string => {
    const projectTypeText = data.projectType ? data.projectType.toLowerCase() : 'your project';
    const timelineText = data.timeline === TimelineUrgency.IMMEDIATE ? 'urgent timeline' : 'upcoming project';

    switch (category) {
      case LeadCategory.HIGH_VALUE:
        return `Thank you for sharing details about your ${projectTypeText}! Based on your ${timelineText} and requirements, this sounds like an excellent fit for my expertise. I'd love to schedule a priority consultation to discuss how we can bring your vision to life. I'll be in touch within the next few hours to coordinate our next steps.`;
      
      case LeadCategory.QUALIFIED:
        return `I appreciate you taking the time to discuss your ${projectTypeText} needs. This looks like a great opportunity for collaboration! I'll prepare some relevant case studies and initial recommendations. Expect to hear from me within 24 hours to schedule our consultation call.`;
      
      case LeadCategory.NURTURE:
        return `Thanks for your interest in ${projectTypeText} solutions! While your project timeline allows for some planning, I'd like to keep you informed about relevant insights and case studies. I'll add you to my newsletter and follow up as your project develops.`;
      
      default:
        return `Thank you for reaching out about your ${projectTypeText}. I'll review your requirements and get back to you soon with some initial thoughts and next steps.`;
    }
  };

  const handleQualificationComplete = async (
    extractedData: Partial<LeadExtractedData>, 
    messages: ConversationMessage[]
  ) => {
    const score = calculateQualificationScore(extractedData);
    const category = categorizeLeadByScore(score);
    const personalizedResponse = generatePersonalizedResponse(category, extractedData);

    const leadQualification: LeadQualification = {
      id: `lead_${Date.now()}`,
      timestamp: new Date(),
      visitorId: `visitor_${Date.now()}`,
      conversationHistory: messages,
      extractedData,
      qualificationScore: score,
      category,
      status: LeadStatus.NEW,
      notes: personalizedResponse
    };

    setCurrentLead(leadQualification);
    setShowConversation(false);
    setShowResults(true);

    // Save to localStorage for persistence
    const existingLeads = JSON.parse(localStorage.getItem('qualifiedLeads') || '[]');
    existingLeads.push(leadQualification);
    localStorage.setItem('qualifiedLeads', JSON.stringify(existingLeads));

    // Notify parent component
    onLeadQualified(leadQualification);
  };

  const handleClose = () => {
    setShowConversation(false);
    setShowResults(false);
    setCurrentLead(null);
    onClose();
  };

  const getCategoryColor = (category: LeadCategory): string => {
    switch (category) {
      case LeadCategory.HIGH_VALUE:
        return 'text-green-700 bg-green-100';
      case LeadCategory.QUALIFIED:
        return 'text-blue-700 bg-blue-100';
      case LeadCategory.NURTURE:
        return 'text-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: LeadCategory): string => {
    switch (category) {
      case LeadCategory.HIGH_VALUE:
        return '🌟';
      case LeadCategory.QUALIFIED:
        return '✅';
      case LeadCategory.NURTURE:
        return '🌱';
      default:
        return '📋';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {showConversation && (
        <ConversationalInterface
          onQualificationComplete={handleQualificationComplete}
          onClose={handleClose}
        />
      )}

      {showResults && currentLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Qualification Complete!</h3>
                <p className="text-sm text-gray-600">Here's what I learned about your project</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Results */}
            <div className="p-6 space-y-6">
              {/* Score and Category */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryIcon(currentLead.category)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentLead.category)}`}>
                    {currentLead.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">{currentLead.qualificationScore}/100</p>
                <p className="text-sm text-gray-600">Qualification Score</p>
              </div>

              {/* Extracted Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLead.extractedData.projectType && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Project Type</h4>
                    <p className="text-sm text-gray-600">{currentLead.extractedData.projectType}</p>
                  </div>
                )}
                
                {currentLead.extractedData.timeline && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Timeline</h4>
                    <p className="text-sm text-gray-600">{currentLead.extractedData.timeline}</p>
                  </div>
                )}
                
                {currentLead.extractedData.budgetRange && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Budget Range</h4>
                    <p className="text-sm text-gray-600">{currentLead.extractedData.budgetRange}</p>
                  </div>
                )}
                
                {currentLead.extractedData.companySize && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Company Size</h4>
                    <p className="text-sm text-gray-600">{currentLead.extractedData.companySize}</p>
                  </div>
                )}
              </div>

              {/* Personalized Response */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                <p className="text-sm text-blue-800">{currentLead.notes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Perfect! I'll wait for your response
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setShowConversation(true);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Continue Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadQualificationSystem; 