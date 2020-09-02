export type Obj<T = any> = Record<string, T>;
export const delay = t => new Promise(resolve => setTimeout(resolve, t));