
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  matchScore: number;
  skills: string[];
  education: Education[];
  experience: WorkExperience[];
  tests?: CandidateTest[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  createdAt: string;
  candidates?: Candidate[];
}

export interface CandidateTest {
  id: string;
  type: 'aptitude' | 'coding';
  name: string;
  status: 'pending' | 'sent' | 'completed';
  score?: number;
  sentAt?: string;
  completedAt?: string;
}

export interface TestQuestion {
  id: string;
  type: 'multiple_choice' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
}
