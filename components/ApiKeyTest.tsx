'use client';

import { useEffect } from 'react';

// components/ApiKeyTest.tsx (DELETE after testing)
export const ApiKeyTest = () => {
  useEffect(() => {
    console.log('=== API KEY TEST ===');
    console.log('Client-side GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'YES' : 'NO');
    console.log('Client-side NEXT_PUBLIC_GITHUB_TOKEN:', process.env.NEXT_PUBLIC_GITHUB_TOKEN ? 'YES' : 'NO');
    
    if (process.env.GITHUB_TOKEN) {
      console.log('GITHUB_TOKEN prefix:', process.env.GITHUB_TOKEN.substring(0, 10) + '...');
    }
    
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      console.log('NEXT_PUBLIC_GITHUB_TOKEN prefix:', process.env.NEXT_PUBLIC_GITHUB_TOKEN.substring(0, 10) + '...');
    }
    
    console.log('=== END TEST ===');
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50">
      <strong className="font-bold">API Key Test Active!</strong>
      <span className="block sm:inline"> Check console for results.</span>
    </div>
  );
}; 