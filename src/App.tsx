import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { HowItWorks } from './components/HowItWorks';
import { FeatureCards } from './components/FeatureCards';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AnnotationStudio } from './components/AnnotationStudio';
import { Project, User, AnnotationComment } from './types';
import {
  getStoredUser,
  saveStoredUser,
  getStoredProjects,
  saveStoredProjects,
  getStoredComments,
  saveStoredComments,
  DEFAULT_USERS,
} from './lib/storage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = getStoredUser();
    // Default to Sarah (Lead UI Designer) for seamless instant prototype evaluation
    return stored || DEFAULT_USERS[0];
  });

  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'studio'>('landing');
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [activeProjectId, setActiveProjectId] = useState<string>('demo-hero-project');
  const [comments, setComments] = useState<AnnotationComment[]>(() =>
    getStoredComments('demo-hero-project')
  );

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('annotly_theme');
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  });

  useEffect(() => {
    localStorage.setItem('annotly_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync active project comments when activeProjectId changes
  useEffect(() => {
    const loaded = getStoredComments(activeProjectId);
    setComments(loaded);
  }, [activeProjectId]);

  // Auth handlers
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    saveStoredUser(user);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    saveStoredUser(null);
    setCurrentView('landing');
  };

  // Comments handlers
  const handleToggleResolve = (commentId: string) => {
    const updated = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            status: (c.status === 'open' ? 'resolved' : 'open') as 'open' | 'resolved',
          }
        : c
    );
    setComments(updated);
    saveStoredComments(activeProjectId, updated);
  };

  const handleAddQuickComment = (text: string, xPercent: number, yPercent: number) => {
    const author = currentUser || DEFAULT_USERS[0];
    const nextPin = comments.length > 0 ? Math.max(...comments.map((c) => c.pinNumber)) + 1 : 1;

    const newComment: AnnotationComment = {
      id: `comment-${Date.now()}`,
      projectId: activeProjectId,
      pinNumber: nextPin,
      author: {
        id: author.id,
        name: author.name,
        role: author.role,
        avatarInitial: author.avatarInitial,
        avatarColor: author.avatarColor,
      },
      text,
      createdAt: 'Just now',
      status: 'open',
      elementSelector: 'div.hero-container',
      elementLabel: 'Canvas Pin',
      xPercent,
      yPercent,
      color: 'purple',
      priority: 'medium',
      tag: 'Design',
      replies: [],
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    saveStoredComments(activeProjectId, updated);
  };

  const handleSaveComment = (comment: AnnotationComment) => {
    const updated = [comment, ...comments];
    setComments(updated);
    saveStoredComments(activeProjectId, updated);
  };

  const handleUpdateComment = (comment: AnnotationComment) => {
    const updated = comments.map((c) => (c.id === comment.id ? comment : c));
    setComments(updated);
    saveStoredComments(activeProjectId, updated);
  };

  const handleDeleteComment = (commentId: string) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    saveStoredComments(activeProjectId, updated);
  };

  // Project handlers
  const handleCreateProject = (
    newProjData: Omit<
      Project,
      'id' | 'createdAt' | 'updatedAt' | 'commentsCount' | 'openCount' | 'resolvedCount'
    >
  ) => {
    const newProj: Project = {
      ...newProjData,
      id: `proj-${Date.now()}`,
      createdAt: 'Today',
      updatedAt: 'Just now',
      commentsCount: 0,
      openCount: 0,
      resolvedCount: 0,
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
    setActiveProjectId(newProj.id);
    setCurrentView('studio');
  };

  const handleDeleteProject = (projId: string) => {
    const updated = projects.filter((p) => p.id !== projId);
    setProjects(updated);
    saveStoredProjects(updated);
    if (activeProjectId === projId) {
      setActiveProjectId('demo-hero-project');
    }
  };

  const handleOpenProject = (projId: string) => {
    setActiveProjectId(projId);
    setCurrentView('studio');
  };

  const activeProject =
    projects.find((p) => p.id === activeProjectId) ||
    projects[0] || {
      id: 'demo-hero-project',
      name: 'GrowthBrands Digital Redesign',
      url: 'https://growthbrands.example.com',
      createdAt: 'Oct 24, 2026',
      updatedAt: 'Just now',
      sampleType: 'agency' as const,
      commentsCount: comments.length,
      openCount: comments.filter((c) => c.status === 'open').length,
      resolvedCount: comments.filter((c) => c.status === 'resolved').length,
    };

  return (
    <div className="min-h-screen w-full bg-white font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Navbar rendered on landing and dashboard views */}
      {currentView !== 'studio' && (
        <Navbar
          currentUser={currentUser}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
          onSignOut={handleSignOut}
          onOpenDemo={() => setDemoModalOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* VIEW: LANDING PAGE */}
      {currentView === 'landing' && (
        <main>
          {/* Hero Section matching reference image */}
          <Hero
            comments={comments}
            onToggleResolve={handleToggleResolve}
            onAddQuickComment={handleAddQuickComment}
            onGetStarted={() => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }
            }}
            onWatchDemo={() => setDemoModalOpen(true)}
            onOpenStudio={() => setCurrentView('studio')}
          />

          {/* Trust logos strip */}
          <TrustSection />

          {/* How It Works (3 Steps) */}
          <HowItWorks />

          {/* Feature Cards (4 Cards) */}
          <FeatureCards />

          {/* Testimonials */}
          <Testimonials />

          {/* Pricing Table */}
          <Pricing
            onSelectPlan={(plan) => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }
            }}
          />

          {/* Final CTA Banner */}
          <FinalCTA
            onGetStarted={() => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }
            }}
            onWatchDemo={() => setDemoModalOpen(true)}
          />

          {/* Footer */}
          <Footer
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => {
              setAuthMode('signin');
              setAuthModalOpen(true);
            }}
          />
        </main>
      )}

      {/* VIEW: USER DASHBOARD */}
      {currentView === 'dashboard' && currentUser && (
        <Dashboard
          currentUser={currentUser}
          projects={projects}
          comments={comments}
          onCreateProject={handleCreateProject}
          onOpenProject={handleOpenProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {/* VIEW: LIVE ANNOTATION STUDIO */}
      {currentView === 'studio' && (
        <AnnotationStudio
          project={activeProject}
          currentUser={currentUser || DEFAULT_USERS[0]}
          comments={comments}
          onSaveComment={handleSaveComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onBackToDashboard={() => setCurrentView(currentUser ? 'dashboard' : 'landing')}
        />
      )}

      {/* MODALS */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onLaunchStudio={() => setCurrentView('studio')}
      />
    </div>
  );
}
