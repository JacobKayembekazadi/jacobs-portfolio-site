import { NavItem, Project, Strength, SkillCategory, ExperienceItem, BrandExplorationItem, FAQ, SocialLink } from './types';
import { GithubIcon, LinkedinIcon, TwitterIcon, BrainCircuitIcon, LayersIcon, BarChartIcon } from './components/icons/SocialMediaIcons';
import { BoltIcon, WorkflowTriggerIcon, WorkflowActionIcon, WorkflowCodeIcon, WorkflowConditionalIcon, WorkflowOutputIcon, PlusIconCircle } from './components/icons/InterfaceIcons';
import { FigmaIcon, FramerIcon, WebflowIcon, ZapierIcon, OpenAIIcon } from './components/icons/TechStackIcons'; // Added more tech icons

// Theme Colors (consistent with Athos theme)
export const MAIN_BG_COLOR = 'bg-dark'; // #111111
export const CARD_BG_COLOR = 'bg-card-bg'; // #1C1C1C (similar to gray-900)
export const DARKER_BG_COLOR = 'bg-darker'; // #0A0A0A
export const TEXT_COLOR_LIGHT = 'text-light'; // #FAFAFA
export const TEXT_COLOR_MUTED = 'text-gray-400'; // Standard muted color
export const TEXT_COLOR_HEADLINE = 'text-white'; // Or text-light
export const ACCENT_COLOR_PRIMARY = 'primary'; // '#6C63FF' - use as text-primary, bg-primary
export const ACCENT_COLOR_SECONDARY = 'accent-secondary'; // '#FF6B6B'

export const PERSONAL_INFO = {
  name: "Jacob Kazadi Kayembe",
  initials: "JK",
  tagline: "An AI-Enabled Full Stack Marketer at the forefront of digital transformation.", // Original tagline, kept for other uses if needed
  heroHeadline: {
    part1: "",
    gradient1: "AI-Enabled Full Stack Marketer",
    part2: "",
    gradient2: "",
    part3: ""
  },
  heroSubheadline: "I bridge the gap between innovative AI tools and real-world business solutions, crafting automated systems that scale impact for creators, marketers, and growing teams.",
  narrative: "I don't just use AI tools — I map them to real-world problems. My strength lies in bridging the gap between innovative ideas and robust, automated systems.", // Original narrative
  whyItMatters: "Because the future belongs to those who can translate vision into scalable solutions, leveraging the right tools for transformative impact.", // Original
  profileImageUrl: "/images/jacob-avatar.png.png", // Your professional profile image
  contraUrl: "contra.com/babarogic" // Example URL for verified badge
};

export const NAV_ITEMS: NavItem[] = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#strengths' }, // Map About to Core Strengths
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Brand IDs', href: '#brand-explorations' }, 
];

export const TECH_STACK_HERO_ITEMS = [
  { Icon: OpenAIIcon, name: 'OpenAI' },
  { Icon: ZapierIcon, name: 'Zapier' },
  { Icon: WebflowIcon, name: 'Webflow' },
  { Icon: FramerIcon, name: 'Framer' },
  { Icon: FigmaIcon, name: 'Figma' },
  { Icon: BoltIcon, name: 'AI Automation' },
];


export const SOCIAL_LINKS_HERO: SocialLink[] = [
  // Social links removed from Hero in Athos design, moved to footer
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'project1',
    mainTitle: 'AI-Powered Brand Toolkits & Automated Content Systems',
    features: [
      { icon: BoltIcon, title: 'Rapid Content Generation', description: 'AI models create on-brand content drafts in seconds, not hours.' },
      { icon: BoltIcon, title: 'Brand Voice Adherence', description: 'Custom-trained AI ensures consistent tone and style across all assets.' },
      { icon: BoltIcon, title: 'Seamless CMS Integration', description: 'Automated workflows push content directly to existing platforms.' },
    ],
    workflow: {
      line1: [
        { id: 'p1n1', icon: WorkflowTriggerIcon, label: 'Content Brief Input', subLabel: 'User provides topic' },
        { id: 'p1n2', icon: WorkflowActionIcon, label: 'AI Content Generation', subLabel: 'OpenAI API' },
        { id: 'p1n3', icon: WorkflowCodeIcon, label: 'Brand Filter Applied', subLabel: 'Custom Prompts' },
      ],
      conditionalNode: { id: 'p1n4', icon: WorkflowConditionalIcon, label: 'Review Required?', subLabel: 'Quality Check', isConditional: true },
      line2TrueBranch: [
        { id: 'p1n5', icon: WorkflowActionIcon, label: 'Human Review', subLabel: 'Editor approves' },
        { id: 'p1n6', icon: WorkflowOutputIcon, label: 'Publish to CMS', subLabel: 'Automated Post' },
        { id: 'p1n7', icon: PlusIconCircle, label: '', isPlaceholder: true},
      ],
    },
    url: '#',
    tags: ['AI Integration', 'Content Automation', 'Brand Strategy'],
  },
  {
    id: 'project2',
    mainTitle: 'No-Code/Low-Code MVPs with Agent Workflows',
    features: [
      { icon: BoltIcon, title: 'Accelerated Prototyping', description: 'Launch functional MVPs in days, validating ideas faster.' },
      { icon: BoltIcon, title: 'AI Agent Orchestration', description: 'Complex tasks automated by interconnected AI agents.' },
      { icon: BoltIcon, title: 'Reduced Dev Overhead', description: 'Minimize traditional coding for quicker, cost-effective builds.' },
    ],
    workflow: {
      line1: [
        { id: 'p2n1', icon: WorkflowTriggerIcon, label: 'New Business Idea', subLabel: 'User Input' },
        { id: 'p2n2', icon: WorkflowActionIcon, label: 'No-Code UI Builder', subLabel: 'Framer/Webflow' },
        { id: 'p2n3', icon: WorkflowCodeIcon, label: 'AI Agent Logic', subLabel: 'Make.com/Zapier' },
      ],
      conditionalNode: { id: 'p2n4', icon: WorkflowConditionalIcon, label: 'User Feedback Loop', subLabel: 'Iterative Test', isConditional: true },
      line2TrueBranch: [
        { id: 'p2n5', icon: WorkflowActionIcon, label: 'Iterate Design', subLabel: 'Based on feedback' },
        { id: 'p2n6', icon: WorkflowOutputIcon, label: 'Deploy V2', subLabel: 'Updated MVP' },
        { id: 'p2n7', icon: PlusIconCircle, label: '', isPlaceholder: true},
      ],
    },
    url: '#',
    tags: ['MVP Development', 'No-Code', 'AI Agents'],
  },
  {
    id: 'project3',
    mainTitle: 'AI-Auto-Triage & First-Response for Support Emails',
    features: [
      { icon: BoltIcon, title: 'Instant Email Classification', description: 'AI categorizes urgency and topic of incoming support tickets.' },
      { icon: BoltIcon, title: 'Automated First Response', description: 'AI drafts personalized initial replies for common queries.' },
      { icon: BoltIcon, title: 'Reduced Agent Workload', description: 'Frees up human agents to focus on complex support issues.' },
    ],
    workflow: {
      line1: [
        { id: 'p3n1', icon: WorkflowTriggerIcon, label: 'Incoming Support Email', subLabel: 'Gmail/Outlook' },
        { id: 'p3n2', icon: WorkflowActionIcon, label: 'AI Email Analysis', subLabel: 'OpenAI API' },
        { id: 'p3n3', icon: WorkflowCodeIcon, label: 'Classify & Prioritize', subLabel: 'Urgency/Topic' },
      ],
      conditionalNode: { id: 'p3n4', icon: WorkflowConditionalIcon, label: 'Auto-Reply Possible?', subLabel: 'Confidence Score', isConditional: true },
      line2TrueBranch: [
        { id: 'p3n5', icon: WorkflowActionIcon, label: 'Draft AI Response', subLabel: 'Personalized Template' },
        { id: 'p3n6', icon: WorkflowOutputIcon, label: 'Send to Customer', subLabel: 'Notify Agent' },
        { id: 'p3n7', icon: PlusIconCircle, label: '', isPlaceholder: true},
      ],
    },
    url: '#',
    tags: ['Process Automation', 'AI Classification', 'Customer Service'],
  },
  {
    id: 'project4',
    mainTitle: 'Discovery GPT: Prompt-Pack for Strategic Project Briefs',
    features: [
      { icon: BoltIcon, title: 'Automated Transcription Analysis', description: 'Processes stakeholder calls to extract key insights efficiently.' },
      { icon: BoltIcon, title: 'Structured Strategic Outputs', description: 'Generates draft sitemaps, user personas, and project briefs.' },
      { icon: BoltIcon, title: 'Accelerated Discovery Phase', description: 'Reduces initial documentation time and improves project alignment.' },
    ],
    workflow: {
      line1: [
        { id: 'p4n1', icon: WorkflowTriggerIcon, label: 'Transcript Input', subLabel: 'Stakeholder Call' },
        { id: 'p4n2', icon: WorkflowActionIcon, label: 'AI Analysis', subLabel: 'OpenAI GPT' },
        { id: 'p4n3', icon: WorkflowCodeIcon, label: 'Insight Extraction', subLabel: 'Custom Prompts' },
      ],
      conditionalNode: { id: 'p4n4', icon: WorkflowConditionalIcon, label: 'Define Scope?', subLabel: 'Project Goals', isConditional: true },
      line2TrueBranch: [
        { id: 'p4n5', icon: WorkflowOutputIcon, label: 'Draft Sitemap', subLabel: 'Structured Output' },
        { id: 'p4n6', icon: WorkflowOutputIcon, label: 'Generate Personas', subLabel: 'User Profiles' },
        { id: 'p4n7', icon: PlusIconCircle, label: '', isPlaceholder: true},
      ],
    },
    url: '#',
    tags: ['Prompt Engineering', 'Strategic Planning', 'AI Documentation'],
  },
  {
    id: 'project5',
    mainTitle: 'Lightweight Heuristic Review Template (UX + AODA)',
    features: [
      { icon: BoltIcon, title: 'Rapid UX/AODA Assessment', description: 'Quickly evaluates website navigation and accessibility compliance.' },
      { icon: BoltIcon, title: 'Actionable Clarity Score', description: 'Provides a scoring mechanism for navigation and UX clarity.' },
      { icon: BoltIcon, title: 'Effective Lead Magnet', description: 'Serves as a no-cost tool to attract prospective retainer clients.' },
    ],
    workflow: {
      line1: [
        { id: 'p5n1', icon: WorkflowTriggerIcon, label: 'Website Input', subLabel: 'URL for Review' },
        { id: 'p5n2', icon: WorkflowActionIcon, label: 'Heuristic Eval', subLabel: 'UX Principles' },
        { id: 'p5n3', icon: WorkflowCodeIcon, label: 'AODA Check', subLabel: 'Compliance Points' },
      ],
      conditionalNode: { id: 'p5n4', icon: WorkflowConditionalIcon, label: 'Generate Report?', subLabel: 'Client Request', isConditional: true },
      line2TrueBranch: [
        { id: 'p5n5', icon: WorkflowOutputIcon, label: 'Score Clarity', subLabel: 'UX/AODA Rating' },
        { id: 'p5n6', icon: WorkflowOutputIcon, label: 'Attract Leads', subLabel: 'Retainer Magnet' },
        { id: 'p5n7', icon: PlusIconCircle, label: '', isPlaceholder: true},
      ],
    },
    url: '#',
    tags: ['UX Review', 'AODA Compliance', 'Lead Generation', 'Heuristic Evaluation'],
  },
];

export const CORE_STRENGTHS_DATA: Strength[] = [
  {
    id: 'strength1',
    icon: BrainCircuitIcon,
    title: 'Strategic AI Integration',
    description: 'Expert in mapping AI tools to solve specific business problems and build smart, lean systems for creators, marketers, and small teams.',
  },
  {
    id: 'strength2',
    icon: LayersIcon,
    title: 'Brand & Storytelling Acumen',
    description: 'Deep understanding that brand and storytelling are ultimate differentiators in web development, social content, and project management.',
  },
  {
    id: 'strength3',
    icon: BarChartIcon,
    title: 'Full-Stack Marketing & Operations',
    description: 'Blending strategic communications, brand marketing, graphic design, marketing automation, AI agent building, and business operations for holistic digital success.',
  },
];


export const SKILLS_DATA: SkillCategory[] = [
  {
    name: 'AI & Emerging Technologies',
    skills: ['AI Agent Building & Orchestration', 'AI-Powered Workflow Automation', 'Prompt Engineering (Advanced)', 'AI for Content Generation & Summarization', 'AI for Data Analysis & Classification', 'No-Code/Low-Code MVP Development', 'Midjourney, Sora, OpenAI API'],
  },
  {
    name: 'Website & Digital Expertise',
    skills: ['Website Strategy & Planning', 'UX Design (Wireframing, User Flows)', 'UI Design', 'Conversion Rate Optimization (CRO)', 'WordPress Ecosystem', 'Elementor', 'Framer', 'Webflow (Familiarity)'],
  },
  {
    name: 'Marketing & Brand Communications',
    skills: ['Strategic Communications Management', 'Brand Development & Strategy', 'Storytelling for Brand & Social', 'Copywriting & Content Development', 'Marketing Automation', 'Social Media Strategy'],
  },
  {
    name: 'Tools & Software Proficiency',
    skills: ['Make.com, Zapier', 'Asana, Trello, Jira, ClickUp', 'Figma, Miro', 'Google Workspace', 'VSCode', 'Google Analytics', 'CRM (HubSpot, Salesforce)', 'Documentation Tools (Confluence, Notion, Google Docs)'],
  },
  {
    name: 'Core Project Management',
    skills: ['End-to-End Project Lifecycle', 'Scope, Time, & Budget Management', 'Risk Management', 'Stakeholder Communication', 'Agile (Scrum/Kanban)'],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'AI Strategist & System Designer',
    company: 'Consulting & Freelance Projects',
    period: '2022 - Present',
    description: 'Spearheaded the development and implementation of AI agent workflows and no-code/low-code MVPs to automate complex marketing and operational processes. Designed and deployed AI-powered brand toolkits.',
    logoUrl: 'https://picsum.photos/seed/freelance/50/50' // Keep placeholders for now
  },
  {
    id: 'exp2',
    role: 'Digital Operations & Systems Lead',
    company: 'Various Client Engagements',
    period: '2020 - 2022',
    description: 'Applied systems thinking to optimize business operations, identifying inefficiencies, and designing scalable processes. Managed full-stack marketing initiatives.',
    logoUrl: 'https://picsum.photos/seed/clients/50/50'
  },
  {
    id: 'exp3',
    role: 'Founder & Digital Strategist',
    company: 'Early-Stage Ventures',
    period: '2018 - 2020',
    description: 'Founded and managed a social media and content development agency, gaining foundational experience in client management, strategic communications, and early-stage business operations.',
    logoUrl: 'https://picsum.photos/seed/venture/50/50'
  },
];

export const BRAND_EXPLORATIONS_DATA: BrandExplorationItem[] = [
  {
    id: 'brand1',
    imageUrl: '/images/brand/aethel-headphones.jpg.jpg',
    title: 'Aethel Audio Lifestyle',
    description: 'AI-assisted product photography for premium headphones.',
    altText: 'Premium headphones on a wooden table with coffee and plant',
  },
  {
    id: 'brand2',
    imageUrl: '/images/brand/earth-day-island.jpg.jpg',
    title: 'Happy Earth Day Campaign',
    description: 'AI-generated imagery for environmental awareness and conservation.',
    altText: 'Heart-shaped island with lush greenery surrounded by ocean and wildlife',
  },
  {
    id: 'brand3',
    imageUrl: '/images/brand/mangrove-website.jpg.jpg',
    title: 'Nature Breathes Website',
    description: 'Environmental website design featuring mangrove conservation.',
    altText: 'Website design showing mangrove trees on an island',
  },
  {
    id: 'brand4',
    imageUrl: '/images/brand/mangrove-illustration.jpg.jpg',
    title: 'Eco-Design Illustration',
    description: 'Artistic representation of mangrove ecosystems for environmental campaigns.',
    altText: 'Illustrated mangrove trees on a small island surrounded by water',
  },
  {
    id: 'brand5',
    imageUrl: '/images/brand/mobile-island-ar.jpg.jpg',
    title: 'Plant Hope AR Experience',
    description: 'Augmented reality concept for environmental awareness on mobile.',
    altText: 'Mobile phone displaying an AR island with mangroves emerging from screen',
  },
  {
    id: 'brand6',
    imageUrl: '/images/brand/salt-conversation.jpg.jpg',
    title: 'Conversational UI Concepts',
    description: 'Exploring AI in user interface design for interactive experiences.',
    altText: 'Creative composition with salt shakers and miniature figures with chat bubble',
  },
  {
    id: 'brand7',
    imageUrl: '/images/brand/salt-comment.jpg.png',
    title: 'Social Engagement Design',
    description: 'Interactive social media concept with playful visual metaphors.',
    altText: 'Salt shaker with miniature figure and comment bubble',
  },
  {
    id: 'brand8',
    imageUrl: '/images/brand/sync-dinner.jpg.png',
    title: 'Sync Food Delivery',
    description: 'Modern food delivery app branding with progress visualization.',
    altText: 'Food delivery concept showing curry dish with loading bar design',
  },
  {
    id: 'brand9',
    imageUrl: '/images/brand/billboard-tide.jpg.png',
    title: 'Hold Back The Tide Billboard',
    description: 'Impactful outdoor advertising for environmental conservation.',
    altText: 'Billboard showing dramatic wave around island with conservation message',
  },
  {
    id: 'brand10',
    imageUrl: '/images/brand/building-wave.jpg.png',
    title: 'Urban Environmental Campaign',
    description: 'Building-scale environmental awareness installation.',
    altText: 'Building corner with large-scale wave and island projection for mangrove restoration',
  },
];


export const FAQ_DATA: FAQ[] = [
  {
    id: 'faq1',
    question: 'What kind of AI solutions do you specialize in?',
    answer: 'I specialize in mapping AI tools to real-world business problems, focusing on AI agent orchestration, workflow automation, content generation systems, and data analysis to create smart, lean solutions for creators, marketers, and small teams.',
  },
  {
    id: 'faq2',
    question: 'How do you approach new projects?',
    answer: 'My approach is rooted in systems thinking and strategic AI integration. I start by understanding the core business objectives, then identify leverage points where AI and automation can deliver maximum impact, ensuring solutions are scalable and enhance human creativity, not replace it.',
  },
  {
    id: 'faq3',
    question: 'What is your experience with full-stack marketing?',
    answer: 'I blend strategic communications, brand marketing, graphic design, marketing automation, AI agent building, and business operations for holistic digital success. This includes everything from strategy and planning to execution and optimization across various digital channels.',
  },
   {
    id: 'faq4',
    question: 'Can you help with both strategy and execution?',
    answer: 'Absolutely. My strength lies in bridging the gap between innovative ideas and robust, automated systems. I can help define the strategy and also have the technical and operational skills to manage or implement the execution, particularly with AI-driven solutions and digital marketing campaigns.',
  },
];



// Updated footer social links with Jacob's specific profiles
export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jacob-kazadi-kayembe-2b89a9193/', Icon: LinkedinIcon },
  { name: 'Twitter', url: 'https://x.com/kayembe_jacob', Icon: TwitterIcon },
  { name: 'GitHub', url: 'https://github.com/JacobKayembekazadi', Icon: GithubIcon },
];

// For Footer navigation links, similar to Athos
export const FOOTER_NAV_LINKS_COLUMN1: NavItem[] = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#strengths' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
];

export const FOOTER_NAV_LINKS_COLUMN2: NavItem[] = [
  { name: 'Brand IDs', href: '#brand-explorations' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];
