export interface GitCommit {
  hash: string;
  author: string;
  message: string;
  timestamp: string;
  branch: string;
}

export interface FileChange {
  type: 'added' | 'deleted' | 'modified' | 'renamed';
  filePath: string;
  oldPath?: string; // For renamed files
  diff: string;
}

export interface CodeTask {
  id: string;
  description: string;
  detailedReport: string;
  pushedGitHash: string;
  pushedGitBranch: string;
  fileChanges: FileChange[];
  commit: GitCommit;
}