import React, { useState, ReactNode, Activity } from 'react';

interface TooltipProps {
  children: ReactNode;
  text?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!text) {
    return children;
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <Activity mode={isVisible ? 'visible' : 'hidden'}>
        <div className="absolute left-1/2 bottom-full -translate-x-1/2 px-3 py-1.5 mb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md whitespace-nowrap z-50">
          {text}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-200 -mt-1"></div>
        </div>
      </Activity>
    </div>
  );
};
