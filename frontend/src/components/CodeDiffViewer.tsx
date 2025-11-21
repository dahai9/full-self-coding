import React from 'react';
import { FileChange } from '../types';

interface CodeDiffViewerProps {
  fileChanges: FileChange[];
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({ fileChanges }) => {
  const getStatusClass = (type: FileChange['type']) => {
    switch (type) {
      case 'added': return 'added';
      case 'deleted': return 'deleted';
      case 'modified': return 'modified';
      case 'renamed': return 'renamed';
      default: return '';
    }
  };

  const renderSingleFileDiff = (diffText: string, fileType: 'added' | 'deleted') => {
    const lines = diffText.split('\n');
    let lineNum = 1;

    return lines.map((line, index) => {
      let content = line;
      let showLineNum = true;

      // Skip diff headers
      if (line.startsWith('@@') || line.startsWith('---') || line.startsWith('+++') || line.startsWith('diff')) {
        showLineNum = false;
        content = line;
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        content = '+' + line.substring(1);
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        content = '-' + line.substring(1);
      } else if (line.startsWith(' ')) {
        content = ' ' + line.substring(1);
      }

      const lineType = line.startsWith('+') && !line.startsWith('+++') ? 'added' :
                      line.startsWith('-') && !line.startsWith('---') ? 'deleted' : 'context';

      return (
        <div key={index} className="diff-row">
          <div className="diff-line-numbers">
            {showLineNum ? lineNum++ : ''}
          </div>
          <div className={`diff-line-content ${lineType}`}>
            {content}
          </div>
        </div>
      );
    });
  };

  const renderSideBySideDiff = (diffText: string) => {
    const lines = diffText.split('\n');
    const leftLines: JSX.Element[] = [];
    const rightLines: JSX.Element[] = [];
    let leftLineNum = 1;
    let rightLineNum = 1;

    lines.forEach((line, index) => {
      if (line.startsWith('@@')) {
        // Parse hunk header to get line numbers
        const match = line.match(/-(\d+)/);
        if (match) {
          leftLineNum = parseInt(match[1]);
        }
        const rightMatch = line.match(/\+(\d+)/);
        if (rightMatch) {
          rightLineNum = parseInt(rightMatch[1]);
        }

        // Add header to both sides
        leftLines.push(
          <div key={`left-${index}`} className="diff-row">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content context">{line}</div>
          </div>
        );
        rightLines.push(
          <div key={`right-${index}`} className="diff-row">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content context">{line}</div>
          </div>
        );
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        // Added line - only on right side
        leftLines.push(
          <div key={`left-${index}`} className="diff-row empty">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content empty"></div>
          </div>
        );
        rightLines.push(
          <div key={`right-${index}`} className="diff-row">
            <div className="diff-line-numbers">{rightLineNum++}</div>
            <div className="diff-line-content added">{'+' + line.substring(1)}</div>
          </div>
        );
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        // Deleted line - only on left side
        leftLines.push(
          <div key={`left-${index}`} className="diff-row">
            <div className="diff-line-numbers">{leftLineNum++}</div>
            <div className="diff-line-content deleted">{'-' + line.substring(1)}</div>
          </div>
        );
        rightLines.push(
          <div key={`right-${index}`} className="diff-row empty">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content empty"></div>
          </div>
        );
      } else if (line.startsWith(' ')) {
        // Context line - on both sides
        leftLines.push(
          <div key={`left-${index}`} className="diff-row">
            <div className="diff-line-numbers">{leftLineNum++}</div>
            <div className="diff-line-content context">{line.substring(1)}</div>
          </div>
        );
        rightLines.push(
          <div key={`right-${index}`} className="diff-row">
            <div className="diff-line-numbers">{rightLineNum++}</div>
            <div className="diff-line-content context">{line.substring(1)}</div>
          </div>
        );
      } else if (line.startsWith('---') || line.startsWith('+++')) {
        // File headers - show on both sides
        leftLines.push(
          <div key={`left-${index}`} className="diff-row">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content context">{line}</div>
          </div>
        );
        rightLines.push(
          <div key={`right-${index}`} className="diff-row">
            <div className="diff-line-numbers"></div>
            <div className="diff-line-content context">{line}</div>
          </div>
        );
      }
    });

    return { leftLines, rightLines };
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        Code Changes
      </div>
      <div className="terminal-content">
        {fileChanges.map((fileChange, fileIndex) => {
          const isAddedOrDeleted = fileChange.type === 'added' || fileChange.type === 'deleted';

          return (
            <div key={fileIndex} className="diff-viewer" style={{ marginBottom: '20px' }}>
              <div className="file-header">
                <div className="file-path">
                  {fileChange.type === 'renamed' && `${fileChange.oldPath} → `}
                  {fileChange.filePath}
                </div>
                <div className={`file-status ${getStatusClass(fileChange.type)}`}>
                  {fileChange.type}
                </div>
              </div>
              <div className="diff-content">
                {isAddedOrDeleted ? (
                  // Single file view for added/deleted files
                  <div className="diff-container">
                    <div className="diff-column" style={{ minWidth: '100%' }}>
                      <div className="diff-header">
                        {fileChange.type === 'added' ? 'New File' : 'Deleted File'}
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        {renderSingleFileDiff(fileChange.diff, fileChange.type)}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Side-by-side view for modified files
                  <div className="diff-container">
                    <div className="diff-column">
                      <div className="diff-header">Original</div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        {(() => {
                          const { leftLines } = renderSideBySideDiff(fileChange.diff);
                          return leftLines;
                        })()}
                      </div>
                    </div>
                    <div className="diff-column">
                      <div className="diff-header">Modified</div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        {(() => {
                          const { rightLines } = renderSideBySideDiff(fileChange.diff);
                          return rightLines;
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};