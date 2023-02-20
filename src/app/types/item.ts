import { User } from './user';
import { Function } from './function';
export type Item = {
  functions: Function[];
  groupName: string;
  id: number;
  minValue: string;
  maxValue: string;
  users: User[];
  warning?: string;
};
