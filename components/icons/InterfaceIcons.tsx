
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.375A2.25 2.25 0 015.25 4.125h12a2.25 2.25 0 012.25 2.25v4.073M8.25 12h7.5M12 17.25h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25v2.25" />
  </svg>
);

// Icon for "Verified Expert" badge, similar to Framer's simple bolt or a flag
export const VerifiedBadgeIcon: React.FC<IconProps> = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path d="M10 1.354l1.26.879 1.063 1.99.187 2.194L15 7.5l.305 2.306L14.062 12l-.937 2.194-2.125.652L10 16.646l-1-.879-1.063-1.99-.187-2.194L5 10.5l-.305-2.306L5.938 6l.937-2.194 2.125-.652L10 1.354zM8.995 13.5l4.242-4.242-1.414-1.414L8.995 10.672 7.172 8.85l-1.414 1.414L8.995 13.5z" />
  </svg>
);


// Workflow Icons & Feature Icons
export const BoltIcon: React.FC<IconProps> = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

export const WorkflowTriggerIcon: React.FC<IconProps> = (props) => ( // Similar to Hubspot orange icon
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-500" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.96 0-3.63-1.04-4.52-2.56l1.53-1.02c.62.92 1.63 1.58 2.99 1.58s2.37-.65 2.99-1.58l1.53 1.02C15.63 15.96 13.96 17 12 17zm0-5.5c-1.96 0-3.63-1.04-4.52-2.56l1.53-1.02C9.63 8.79 10.64 9.5 12 9.5s2.37-.7 2.99-1.58l1.53 1.02C15.63 10.46 13.96 11.5 12 11.5z"/>
  </svg>
);

export const WorkflowActionIcon: React.FC<IconProps> = (props) => ( // Generic cog or process
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-500" {...props}>
    <path d="M19.44 12.99l-.01.02c0 .09-.01.19-.02.28l1.68 1.32c.36.28.45.78.19 1.14l-1.59 2.76c-.26.36-.76.45-1.12.2l-1.99-1.37c-.55.41-1.15.75-1.79.99l-.29 2.1c-.08.43-.47.74-.92.74h-3.19c-.45 0-.84-.31-.92-.74l-.29-2.11c-.64-.24-1.24-.58-1.79-.99l-1.99 1.37c-.36.25-.86-.16-1.12-.2l-1.59-2.76c-.26-.36-.17-.85.19-1.14l1.68-1.32c-.01-.09-.02-.19-.02-.28V11l.01-.02c0-.09.01-.19.02-.28l-1.68-1.32c-.36-.28-.45-.78-.19-1.14l1.59-2.76c.26-.36.76-.45 1.12-.2l1.99 1.37c.55-.41 1.15-.75 1.79-.99l.29-2.1c.08.43-.47.74-.92.74h3.19c.45 0 .84.31.92.74l.29 2.11c.64.24 1.24.58 1.79.99l1.99-1.37c.36-.25.86-.16 1.12.2l1.59 2.76c.26.36.17.85-.19 1.14l-1.68 1.32c.01.09.02.19.02.28v1.98zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);

export const WorkflowCodeIcon: React.FC<IconProps> = (props) => ( //  {1}
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-sky-500" {...props}>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    <text x="12" y="16" fontSize="10" fill="currentColor" textAnchor="middle" fontWeight="bold">{'{1}'}</text>
  </svg>
);


export const WorkflowConditionalIcon: React.FC<IconProps> = (props) => ( // Split icon
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-500" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h3l-4 4-4-4h3V7z"/>
  </svg>
);

export const WorkflowOutputIcon: React.FC<IconProps> = (props) => ( // Like Slack icon
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-500" {...props}>
     <path d="M5.04 15.12c0-1.05.85-1.9 1.9-1.9h2.89v-1.9H7.83c-1.05 0-1.9-.85-1.9-1.9s.85-1.9 1.9-1.9h1.9c1.05 0 1.9.85 1.9 1.9v2.89h1.9c1.05 0 1.9.85 1.9 1.9s-.85 1.9-1.9 1.9h-1.9c-1.05 0-1.9-.85-1.9-1.9v-1.9H6.94c-1.05.01-1.9-.84-1.9-1.89zm1.9-6.68c-.49 0-.9.4-.9.9s.4.9.9.9h.95v1.9H7.83c-.49 0-.9.4-.9.9s.4.9.9.9h1.9c.49 0 .9-.4.9-.9v-1.9h1.9c.49 0 .9-.4.9-.9s-.4-.9-.9-.9h-1.9c-.49 0-.9.4-.9.9V9.38H6.94zm10.12 1.9c0 1.05-.85 1.9-1.9 1.9h-2.89v1.9h1.9c1.05 0 1.9.85 1.9 1.9s-.85 1.9-1.9 1.9h-1.9c-1.05 0-1.9-.85-1.9-1.9v-2.89H8.88c-1.05 0-1.9-.85-1.9-1.9s.85-1.9 1.9-1.9h1.9c1.05 0 1.9.85 1.9 1.9v1.9h1.9c1.05 0 1.9.85 1.9 1.89zm-1.9 6.68c.49 0 .9-.4.9-.9s-.4-.9-.9-.9h-.95v-1.9h1.9c.49 0 .9-.4.9-.9s-.4-.9-.9-.9h-1.9c-.49 0-.9.4-.9.9v1.9H13.2c-.49 0-.9.4-.9.9s.4.9.9.9h1.86z"/>
  </svg>
);

export const PlusIconCircle: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-slate-400" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
