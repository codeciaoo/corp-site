import { CloudIcon, ChevronDownIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface BulletPoint {
  id: string;
  text: string;
}

interface SolutionCardProps {
  title: string;
  description: string;
  bulletPoints: BulletPoint[];
  href: string;
  icon?: React.ReactNode;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  bulletPoints,
  href,
  icon = <CloudIcon className="h-6 w-6 text-teal-600" />,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [hoverContentHeight, setHoverContentHeight] = useState<number>(0);
  const defaultContentRef = useRef<HTMLDivElement>(null);
  const hoverContentRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = href;
  };

  useEffect(() => {
    const updateHeights = () => {
      if (defaultContentRef.current) {
        setContentHeight(defaultContentRef.current.scrollHeight);
      }
      if (hoverContentRef.current) {
        setHoverContentHeight(hoverContentRef.current.scrollHeight);
      }
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [title, description, bulletPoints]);

  const maxHeight = Math.max(contentHeight, hoverContentHeight);

  return (
    <div className="bg-white shadow-md border border-teal-600/20 rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg">
      {/* Desktop Version */}
      <div 
        className="hidden md:block p-6"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-600/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          
          <div 
            className="flex-grow relative"
            style={{ minHeight: `${maxHeight}px` }}
          >
            {/* Default Content */}
            <div 
              ref={defaultContentRef}
              className={`w-full transition-all duration-300 ease-in-out absolute
                ${isExpanded ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
            >
              <h3 className="text-black text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* Hover Content */}
            <div 
              ref={hoverContentRef}
              className={`w-full transition-all duration-300 ease-in-out absolute
                ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <ul className="space-y-2 mb-4">
                {bulletPoints.map((point, index) => (
                  <li 
                    key={point.id} 
                    className="text-teal-600 text-sm flex items-start gap-2"
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <span className="shrink-0">•</span>
                    <span className="flex-grow">{point.text}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation(e);
                }}
                className="inline-block bg-teal-600 text-white px-6 py-1 text-sm rounded-full
                  transition-all duration-200 hover:bg-teal-700 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
              >
                MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <button
          className="w-full p-4 flex items-center justify-between gap-4 text-left"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-black text-lg font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            </div>
          </div>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-600 transition-transform duration-200
              ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>

        {/* Mobile Expanded Content */}
        <div
          ref={expandedContentRef}
          className="overflow-hidden transition-all duration-200 ease-in-out"
          style={{ 
            maxHeight: isExpanded ? expandedContentRef.current?.scrollHeight + 'px' : '0',
          }}
        >
          <div className="p-4 pt-0">
            <ul className="space-y-2 mb-4 border-t border-gray-100 pt-4">
              {bulletPoints.map((point) => (
                <li 
                  key={point.id} 
                  className="text-teal-600 text-sm flex items-start gap-2"
                >
                  <span className="shrink-0">•</span>
                  <span className="flex-grow">{point.text}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={handleNavigation}
              className="w-full bg-teal-600 text-white px-6 py-2 text-sm rounded-full
                transition-all duration-200 hover:bg-teal-700
                focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
            >
              MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;