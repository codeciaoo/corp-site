import { CloudIcon, ChevronDownIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

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
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [title, description, bulletPoints]);

  const maxHeight = Math.max(contentHeight, hoverContentHeight);

  return (
    <div className="rounded-lg border border-teal-600/20 bg-white shadow-md transition-all duration-200 ease-in-out hover:shadow-lg">
      {/* Desktop Version */}
      <div
        className="hidden p-6 md:block"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
            {icon}
          </div>

          <div
            className="relative flex-grow"
            style={{ minHeight: `${maxHeight}px` }}
          >
            {/* Default Content */}
            <div
              ref={defaultContentRef}
              className={`absolute w-full transition-all duration-300 ease-in-out ${isExpanded ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
            >
              <h3 className="mb-1 text-xl font-semibold text-black">{title}</h3>
              <p className="border-t border-gray-200 pt-3 text-sm text-gray-600">
                {description}
              </p>
            </div>

            {/* Hover Content */}
            <div
              ref={hoverContentRef}
              className={`absolute w-full transition-all duration-300 ease-in-out ${isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <ul className="mb-4 space-y-2">
                {bulletPoints.map((point, index) => (
                  <li
                    key={point.id}
                    className="flex items-start gap-2 text-sm text-teal-600"
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <span className="shrink-0">•</span>
                    <span className="flex-grow">{point.text}</span>
                  </li>
                ))}
              </ul>
              {/* <button
                onClick={e => {
                  e.stopPropagation();
                  handleNavigation(e);
                }}
                className="inline-block rounded-full bg-teal-600 px-6 py-1 text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
              >
                MORE
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <button
          className="flex w-full items-center justify-between gap-4 p-4 text-left"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">{title}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">
                {description}
              </p>
            </div>
          </div>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {/* Mobile Expanded Content */}
        <div
          ref={expandedContentRef}
          className="overflow-hidden transition-all duration-200 ease-in-out"
          style={{
            maxHeight: isExpanded
              ? expandedContentRef.current?.scrollHeight + "px"
              : "0",
          }}
        >
          <div className="p-4 pt-0">
            <ul className="mb-4 space-y-2 border-t border-gray-100 pt-4">
              {bulletPoints.map(point => (
                <li
                  key={point.id}
                  className="flex items-start gap-2 text-sm text-teal-600"
                >
                  <span className="shrink-0">•</span>
                  <span className="flex-grow">{point.text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleNavigation}
              className="w-full rounded-full bg-teal-600 px-6 py-2 text-sm text-white transition-all duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
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
