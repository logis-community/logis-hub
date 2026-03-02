export interface Change {
  type: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

export interface ChangeLogItem {
  version: string;
  date: string;
  changes: Change[];
}

export interface ChangeLog {
  title: string;
  subtitle?: string;
  description?: string;
  items: ChangeLogItem[];
}
