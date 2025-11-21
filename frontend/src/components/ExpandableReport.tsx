import React, { useState } from 'react';

interface ExpandableReportProps {
  report: string;
  maxHeight?: string;
}

export const ExpandableReport: React.FC<ExpandableReportProps> = ({ report, maxHeight = '300px' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-report">
      <button className="expand-button" onClick={toggleExpand}>
        <span>{isExpanded ? '▼' : '▶'}</span>
        <span>{isExpanded ? 'Collapse Report' : 'Expand Report'}</span>
      </button>
      {isExpanded && (
        <div className="report-content" style={{ maxHeight }}>
          {report}
        </div>
      )}
    </div>
  );
};