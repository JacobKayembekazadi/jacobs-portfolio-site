import React from 'react';

export interface NavItem {
  name: string;
  href: string;
}

export interface ProjectFeature {
  icon?: React.ElementType;
  title: string;
  description: string;
}

export interface WorkflowNode {
  id: string;
  icon: React.ElementType;
  label: string;
  subLabel?: string;
  isConditional?: boolean;
  isPlaceholder?: boolean; // For the '+' icon
}

export interface Project {
  id:string;
  mainTitle: string; // Renamed from 'title' for clarity
  features: [ProjectFeature, ProjectFeature, ProjectFeature]; // Array of 3 features
  workflow: {
    line1: WorkflowNode[];
    conditionalNode?: WorkflowNode; // The node that branches
    line2TrueBranch?: WorkflowNode[]; // Nodes after true branch
    // line2FalseBranch could be added if needed for a false path
  };
  imageUrl?: string; // Kept for potential fallback or other uses, but not primary in new card
  tags?: string[]; // Kept for potential metadata, not primary display
  url?: string; // Link for the entire card or a specific call to action if any
}

export interface Strength {
  id: string;
  icon?: React.ElementType;
  title: string;
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  description: string;
  logoUrl?: string;
}

export interface BrandExplorationItem {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  altText: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  url: string;
  Icon: React.ElementType;
}

export interface BlogPost {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  summary: string;
  url: string;
}

// Lead Qualification System Types
export enum ProjectType {
  AI_INTEGRATION = 'AI Integration',
  MARKETING_AUTOMATION = 'Marketing Automation',
  FULL_STACK_DEVELOPMENT = 'Full Stack Development',
  CONSULTATION = 'Consultation',
  STRATEGY = 'Strategy & Planning',
  OTHER = 'Other'
}

export enum TimelineUrgency {
  IMMEDIATE = 'immediate',
  ONE_TO_THREE_MONTHS = '1-3 months',
  THREE_TO_SIX_MONTHS = '3-6 months',
  FUTURE_PLANNING = 'future planning'
}

export enum BudgetRange {
  UNDER_5K = 'Under $5,000',
  FIVE_TO_15K = '$5,000 - $15,000',
  FIFTEEN_TO_50K = '$15,000 - $50,000',
  OVER_50K = 'Over $50,000',
  UNSPECIFIED = 'To be discussed'
}

export enum CompanySize {
  STARTUP = 'Startup (1-10 employees)',
  SMALL = 'Small Business (11-50 employees)',
  MEDIUM = 'Medium Business (51-200 employees)',
  LARGE = 'Large Enterprise (200+ employees)',
  INDIVIDUAL = 'Individual/Freelancer'
}

export enum AIExperienceLevel {
  NONE = 'No prior AI experience',
  BASIC = 'Basic understanding',
  INTERMEDIATE = 'Some implementation experience',
  ADVANCED = 'Advanced AI user'
}

export enum LeadCategory {
  HIGH_VALUE = 'high-value',
  QUALIFIED = 'qualified',
  NURTURE = 'nurture',
  UNQUALIFIED = 'unqualified'
}

export enum LeadStatus {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  RESPONDED = 'responded',
  CONVERTED = 'converted',
  CLOSED = 'closed'
}

export interface ConversationMessage {
  id: string;
  timestamp: Date;
  type: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    extractedData?: Partial<LeadExtractedData>;
    confidence?: number;
  };
}

export interface LeadExtractedData {
  projectType: ProjectType;
  timeline: TimelineUrgency;
  budgetRange: BudgetRange;
  companySize: CompanySize;
  industry: string;
  aiExperience: AIExperienceLevel;
  contactInfo: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  projectDescription: string;
  specificNeeds: string[];
  
  // Enhanced Intelligence Fields
  painPoints?: string[];
  desiredOutcomes?: string[];
  competitorsMentioned?: string[];
  currentSolutions?: string[];
  technicalRequirements?: string[];
  teamSize?: number;
  decisionMakers?: string[];
  urgencyIndicators?: string[];
  budgetConstraints?: string[];
  successMetrics?: string[];
  riskFactors?: string[];
  opportunitySize?: 'small' | 'medium' | 'large' | 'enterprise';
  confidenceScore?: number;
  extractionTimestamp?: Date;
  lastInteractionSentiment?: 'positive' | 'neutral' | 'negative' | 'excited';
  engagementLevel?: 'low' | 'medium' | 'high' | 'very_high';
  readyToBuy?: 'not_ready' | 'researching' | 'evaluating' | 'ready_to_decide';
}

export interface ResponseTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  followUpSequence?: string[];
  attachments?: string[];
}

export interface LeadQualification {
  id: string;
  timestamp: Date;
  visitorId: string;
  conversationHistory: ConversationMessage[];
  extractedData: Partial<LeadExtractedData>;
  qualificationScore: number;
  category: LeadCategory;
  status: LeadStatus;
  assignedResponse?: ResponseTemplate;
  notes?: string;
  nextFollowUp?: Date;
}

export interface QualificationConfig {
  scoringWeights: {
    projectType: number;
    timeline: number;
    budget: number;
    companySize: number;
    aiExperience: number;
  };
  categoryThresholds: {
    highValue: number;
    qualified: number;
    nurture: number;
  };
  autoResponseEnabled: boolean;
  maxConversationLength: number;
}