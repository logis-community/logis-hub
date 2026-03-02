export const CommitTypes = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "test",
  "chore",
] as const;

export type CommitType = (typeof CommitTypes)[number];
export interface Change {
  type: CommitType | string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

export interface ReleaseInfo {
  version: string;
  date: string;
  changes: Change[];
}

export interface ChangeLog {
  title: string;
  subtitle?: string;
  description?: string;
  releases: ReleaseInfo[];
}
