export interface Author {
  id: string;
  name: string;
  role: string;
  avatarInitial: string;
  avatarColor: string;
  isCurrentUser?: boolean;
}

export interface CommentReply {
  id: string;
  author: Author;
  text: string;
  createdAt: string;
}

export interface AnnotationComment {
  id: string;
  projectId: string;
  pinNumber: number;
  author: Author;
  text: string;
  createdAt: string;
  status: 'open' | 'resolved';
  elementSelector?: string;
  elementLabel?: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  color: 'purple' | 'red' | 'green' | 'blue' | 'amber';
  priority?: 'low' | 'medium' | 'high';
  tag?: 'Copy' | 'Design' | 'Bug' | 'Layout' | 'Content';
  replies?: CommentReply[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  sampleType: 'agency' | 'ecommerce' | 'saas';
  commentsCount: number;
  openCount: number;
  resolvedCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitial: string;
  avatarColor: string;
}
