export interface PollMetadata {
  type: string;
  answers: { id: string; icon: string; label: string }[];
}
export const pollsMetadata: PollMetadata[] = [
  {
    type: 'emotions',
    answers: [
      { id: 'bad', icon: 'frowning-face.svg', label: 'Bad' },
      { id: 'neutral', icon: 'neutral-face.svg', label: 'Neutral' },
      { id: 'good', icon: 'smiling-face.svg', label: 'Good' },
    ],
  },
  {
    type: 'yes-no',
    answers: [
      { id: 'yes', icon: 'like.svg', label: 'Yes' },
      { id: 'no', icon: 'dislike.svg', label: 'No' },
    ],
  },
];
