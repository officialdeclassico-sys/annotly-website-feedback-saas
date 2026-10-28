import { AnnotationComment, Project, User } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'annotly_user',
  PROJECTS: 'annotly_projects',
  COMMENTS: 'annotly_comments',
  WORKSPACE_MEMBERS: 'annotly_members',
};

export const DEFAULT_USERS: User[] = [
  {
    id: 'user-sarah',
    name: 'Sarah',
    email: 'sarah@designcraft.studio',
    role: 'Lead UI Designer',
    avatarInitial: 'S',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'user-client',
    name: 'Client',
    email: 'marcus@growthbrands.io',
    role: 'Client Reviewer',
    avatarInitial: 'C',
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'user-designer',
    name: 'Designer',
    email: 'alex@annotly.team',
    role: 'Product Designer',
    avatarInitial: 'D',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'user-arjun',
    name: 'Arjun M.',
    email: 'arjun@productflow.co',
    role: 'Product Manager',
    avatarInitial: 'A',
    avatarColor: 'bg-blue-600',
  },
];

export const INITIAL_HERO_COMMENTS: AnnotationComment[] = [
  {
    id: 'comment-1',
    projectId: 'demo-hero-project',
    pinNumber: 1,
    author: {
      id: 'user-sarah',
      name: 'Sarah',
      role: 'Lead Designer',
      avatarInitial: 'S',
      avatarColor: 'bg-indigo-600',
    },
    text: 'Change this heading to something shorter.',
    createdAt: '2m ago',
    status: 'open',
    elementSelector: 'h1.hero-title',
    elementLabel: 'Heading 1',
    xPercent: 53,
    yPercent: 32,
    color: 'purple',
    priority: 'medium',
    tag: 'Copy',
    replies: [
      {
        id: 'reply-1',
        author: {
          id: 'user-designer',
          name: 'Designer',
          role: 'Product Designer',
          avatarInitial: 'D',
          avatarColor: 'bg-emerald-600',
        },
        text: 'Agreed! Maybe: "Digital Growth for Modern Brands"?',
        createdAt: '1m ago',
      },
    ],
  },
  {
    id: 'comment-2',
    projectId: 'demo-hero-project',
    pinNumber: 2,
    author: {
      id: 'user-client',
      name: 'Client',
      role: 'Client Reviewer',
      avatarInitial: 'C',
      avatarColor: 'bg-rose-500',
    },
    text: 'Use a different image here.',
    createdAt: '10m ago',
    status: 'open',
    elementSelector: 'div.hero-image-container',
    elementLabel: 'Hero Visual Asset',
    xPercent: 81,
    yPercent: 44,
    color: 'red',
    priority: 'high',
    tag: 'Design',
  },
  {
    id: 'comment-3',
    projectId: 'demo-hero-project',
    pinNumber: 3,
    author: {
      id: 'user-designer',
      name: 'Designer',
      role: 'Product Designer',
      avatarInitial: 'D',
      avatarColor: 'bg-emerald-600',
    },
    text: 'Make this button bigger.',
    createdAt: '1h ago',
    status: 'resolved',
    elementSelector: 'button.btn-primary',
    elementLabel: 'Primary CTA Button',
    xPercent: 51,
    yPercent: 68,
    color: 'green',
    priority: 'low',
    tag: 'Layout',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'demo-hero-project',
    name: 'GrowthBrands Digital Redesign',
    url: 'https://growthbrands.example.com',
    createdAt: 'Oct 24, 2026',
    updatedAt: '2 mins ago',
    sampleType: 'agency',
    commentsCount: 3,
    openCount: 2,
    resolvedCount: 1,
  },
  {
    id: 'project-storefront',
    name: 'Luminary E-Commerce Checkout',
    url: 'https://luminary-store.staging.dev',
    createdAt: 'Oct 21, 2026',
    updatedAt: '3 hours ago',
    sampleType: 'ecommerce',
    commentsCount: 5,
    openCount: 1,
    resolvedCount: 4,
  },
  {
    id: 'project-saas',
    name: 'PulseFlow App Dashboard v3',
    url: 'https://app.pulseflow.io',
    createdAt: 'Oct 18, 2026',
    updatedAt: 'Yesterday',
    sampleType: 'saas',
    commentsCount: 8,
    openCount: 3,
    resolvedCount: 5,
  },
];

// Storage helpers
export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredUser(user: User | null): void {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to save user', e);
  }
}

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
}

export function getStoredComments(projectId: string = 'demo-hero-project'): AnnotationComment[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.COMMENTS}_${projectId}`);
    if (!raw) {
      if (projectId === 'demo-hero-project') {
        localStorage.setItem(`${STORAGE_KEYS.COMMENTS}_${projectId}`, JSON.stringify(INITIAL_HERO_COMMENTS));
        return INITIAL_HERO_COMMENTS;
      }
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return projectId === 'demo-hero-project' ? INITIAL_HERO_COMMENTS : [];
  }
}

export function saveStoredComments(projectId: string, comments: AnnotationComment[]): void {
  try {
    localStorage.setItem(`${STORAGE_KEYS.COMMENTS}_${projectId}`, JSON.stringify(comments));
    
    // Also update project counts
    const projects = getStoredProjects();
    const openCount = comments.filter((c) => c.status === 'open').length;
    const resolvedCount = comments.filter((c) => c.status === 'resolved').length;
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            commentsCount: comments.length,
            openCount,
            resolvedCount,
            updatedAt: 'Just now',
          }
        : p
    );
    saveStoredProjects(updated);
  } catch (e) {
    console.error('Failed to save comments', e);
  }
}
