
export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface RSVPFormData {
  attendance: 'yes' | 'no' | 'maybe';
  side: 'groom' | 'bride' | 'friend';
  guests: number;
  message: string;
}
