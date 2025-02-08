// types/podcast.ts
export interface DialogueTurn {
  role: 'user' | 'assistant';
  speaker: string;
  content: string;
  startTime: number;
}

export interface PodcastPlayerProps {
  conversation: DialogueTurn[];
  isGenerating: boolean;
  children?: React.ReactNode;
}
