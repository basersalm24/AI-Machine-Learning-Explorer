
export interface Concept {
  title: string;
  description: string;
  icon: JSX.Element;
}

export enum Sentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
  Unknown = 'Unknown',
}
