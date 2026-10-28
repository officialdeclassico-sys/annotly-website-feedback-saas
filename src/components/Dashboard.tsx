import React, { useState } from 'react';
import {
  Plus,
  Search,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Users,
  FolderKanban,
  Sparkles,
  Layers,
  Settings,
  Share2,
  Trash2,
  X,
  ArrowRight,
  ShieldAlert,
  Clock,
  ShieldCheck,
  Check,
  Download,
  Mail,
  UserCheck,
  Eye,
  Sliders,
  Bell,
} from 'lucide-react';
import { Project, User, AnnotationComment } from '../types';
import { DEFAULT_USERS } from '../lib/storage';

interface DashboardProps {
  currentUser: User;
  projects: Project[];
  comments: AnnotationComment[];
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'commentsCount' | 'openCount' | 'resolvedCount'>) => void;
  onOpenProject: (projectId: string) => void;
  onDeleteProject?: (projectId: string) => void;
  onUpdateUser?: (updated: User) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  projects,
  comments,
  onCreateProject,
  onOpenProject,
  onDeleteProject,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'settings' | 'profile'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectSample, setNewProjectSample] = useState<'agency' | 'ecommerce' | 'saas'>('agency');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Reviewer');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Selected project for quick details drawer
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  // Profile edit state
  const [editName, setEditName] = useState(currentUser.name);
  const [editRole, setEditRole] = useState(currentUser.role);
  const [profileSaved, setProfileSaved] = useState(false);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOpen = projects.reduce((acc, p) => acc + p.openCount, 0);
  const totalResolved = projects.reduce((acc, p) => acc + p.resolvedCount, 0);

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !newProjectUrl.trim()) return;

    onCreateProject({
      name: newProjectName.trim(),
      url: newProjectUrl.trim(),
      sampleType: newProjectSample,
    });

    setNewProjectName('');
    setNewProjectUrl('');
    setNewProjectModalOpen(false);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteEmail('');
      setInviteModalOpen(false);
    }, 1500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...currentUser,
        name: editName.trim() || currentUser.name,
        role: editRole.trim() || currentUser.role,
      });
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 w-full">
      {/* Top Welcome Bar: Uses standardized app-container tokens */}
      <div className="bg-white border-b border-slate-200/80 w-full shadow-2xs">
        <div className="app-container py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">
                  WORKSPACE OVERVIEW
                </span>
                <span className="text-slate-300 font-bold">·</span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">{currentUser.role}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Collaborate with clients, leave element-anchored pins, and track website feedback in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <button
                onClick={() => setNewProjectModalOpen(true)}
                className="flex items-center justify-center gap-2.5 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm sm:text-base rounded-xl shadow-xs transition-all duration-150 min-h-[44px]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Review Project</span>
              </button>

              <button
                onClick={() => onOpenProject(projects[0]?.id || 'demo-hero-project')}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm sm:text-base rounded-xl transition-colors min-h-[44px]"
              >
                <Layers className="w-4 h-4" />
                <span>Launch Live Studio</span>
              </button>
            </div>
          </div>

          {/* 4 Statistics KPI Cards: Arranged in one balanced row on desktop, 2x2 on tablet, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 mt-8 lg:mt-10">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-600 mb-3">
                <span className="text-sm font-semibold">Active Projects</span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {projects.length}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Monitored review surfaces</p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-600 mb-3">
                <span className="text-sm font-semibold">Open Comments</span>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {totalOpen}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Pending resolution</p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-600 mb-3">
                <span className="text-sm font-semibold">Resolved Tasks</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {totalResolved}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Approved and verified</p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-600 mb-3">
                <span className="text-sm font-semibold">Workspace Seats</span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                4 active
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Full team collaboration</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-10 mt-8 lg:mt-10 border-b border-slate-200 text-sm sm:text-base font-bold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Projects ({projects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`pb-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'team'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Team &amp; Roles</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Settings &amp; Export</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Account &amp; Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Uses standardized app-container token */}
      <div className="app-container pt-8 lg:pt-10">
        {/* TAB 1: PROJECTS LIST & DETAILS */}
        {activeTab === 'projects' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Search Bar & Project Count */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-[420px]">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search review projects or target URLs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm sm:text-base bg-white border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                />
              </div>

              <div className="text-sm sm:text-base text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of {projects.length} review projects
              </div>
            </div>

            {/* Project Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on wide desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-7">
              {filteredProjects.map((project) => {
                const total = project.openCount + project.resolvedCount;
                const percentResolved = total > 0 ? Math.round((project.resolvedCount / total) * 100) : 0;

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all p-6 sm:p-7 flex flex-col justify-between text-left group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">
                          {project.sampleType} review
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{project.updatedAt}</span>
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </h3>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 mt-2 truncate"
                      >
                        <span className="truncate">{project.url}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>

                      {/* Feedback status stats */}
                      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <div className="flex items-center justify-between text-sm sm:text-base">
                          <span className="text-slate-800 font-semibold flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-indigo-600" />
                            {project.commentsCount} Feedback items
                          </span>
                          <span className="text-slate-600 font-mono text-xs sm:text-sm font-bold">
                            {percentResolved}% done
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden flex">
                          <div
                            className="bg-emerald-500 h-full transition-all duration-300"
                            style={{ width: `${percentResolved}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-rose-600 font-bold">
                            {project.openCount} open issues
                          </span>
                          <span className="text-emerald-700 font-bold">
                            {project.resolvedCount} resolved
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: View Details & Launch Studio */}
                    <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setInspectingProject(project)}
                        className="p-2.5 px-3.5 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
                        title="View Project Details & Breakdown"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>

                      <button
                        onClick={() => onOpenProject(project.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                      >
                        <span>Launch Studio</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {onDeleteProject && project.id !== 'demo-hero-project' && (
                        <button
                          onClick={() => onDeleteProject(project.id)}
                          className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TEAM & ROLES */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-7 text-left shadow-2xs w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Workspace Teammates &amp; Access Roles</h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Manage active collaborators, guest clients, and role-based editing permissions across all projects.
                </p>
              </div>

              <button
                onClick={() => setInviteModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-indigo-700 shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Invite Teammate</span>
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-5">Member</th>
                    <th className="py-4 px-5">Role &amp; Title</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5">Access Rights</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  {DEFAULT_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-5 px-5">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-11 h-11 rounded-full ${user.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            {user.avatarInitial}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{user.name}</span>
                              {user.id === currentUser.id && (
                                <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-md border border-indigo-100">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-400 mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-5">
                        <span className="font-semibold text-slate-700 bg-slate-100 border border-slate-200/90 px-3 py-1 rounded-lg text-xs sm:text-sm">
                          {user.role}
                        </span>
                      </td>

                      <td className="py-5 px-5">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-700 font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>

                      <td className="py-5 px-5 text-slate-600 text-xs sm:text-sm">
                        {user.role.includes('Designer') || user.role.includes('Lead')
                          ? 'Full Edit & Pin'
                          : user.role.includes('Client')
                          ? 'Comment & Review'
                          : 'Full Workspace Admin'}
                      </td>

                      <td className="py-5 px-5 text-right">
                        <button
                          onClick={() => alert(`Permissions configured for ${user.name}`)}
                          className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 font-bold px-3 py-1.5 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-5 rounded-2xl">
              <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                <strong>Multi-User Permission Model:</strong> Editors can create pins, edit comments and reply;
                Reviewers can leave feedback; Workspace Admins can delete projects and manage workspace billing.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & EXPORT */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-8 text-left shadow-2xs w-full">
            <div className="pb-5 border-b border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Workspace Configuration &amp; Data Portability
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Configure team integrations, export feedback data in bulk, and manage browser companion extensions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Data Backup */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Download className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                      Jira, Slack &amp; JSON Export
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Download all feedback pins, element paths, author timestamps, and reply threads in standardized JSON format for automated Jira task creation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const dataStr =
                      'data:text/json;charset=utf-8,' +
                      encodeURIComponent(JSON.stringify({ projects, comments }, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', 'annotly_workspace_export.json');
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-sm font-semibold rounded-xl shadow-2xs transition-colors"
                >
                  Export Workspace JSON
                </button>
              </div>

              {/* Card 2: Chrome Extension */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                      Chrome Extension Companion
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Annotate password-protected staging domains or sites with strict Same-Origin iframe headers directly in your active browser tab.
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100 p-3 rounded-xl">
                  Extension Status: Architecture ready for Google Web Store
                </div>
              </div>

              {/* Card 3: Security & Team Privacy */}
              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                      Security &amp; Encryption
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Role-based access control (RBAC), end-to-end encrypted metadata, and isolated client review portals.
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-emerald-800 font-semibold bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                  Enforced: Client Portal Privacy Active
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACCOUNT & PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-8 text-left shadow-2xs max-w-3xl">
            <div className="pb-5 border-b border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                User Profile &amp; Preferences
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Update your display name, notification preferences, and team role.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full ${currentUser.avatarColor} text-white font-extrabold text-2xl flex items-center justify-center shadow-md`}
                >
                  {currentUser.avatarInitial}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-sm text-slate-400">{currentUser.email}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                  Workspace Role
                </label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-xs transition-colors"
                >
                  {profileSaved ? 'Profile Saved ✓' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* QUICK DETAILS SLIDE-OVER DRAWER FOR INSPECTING A PROJECT */}
      {inspectingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 text-left space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  PROJECT SPECIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {inspectingProject.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingProject(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Target Web URL:</span>
                <a
                  href={inspectingProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline font-mono text-xs sm:text-sm font-semibold truncate max-w-[280px]"
                >
                  {inspectingProject.url}
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-bold text-slate-900">{inspectingProject.commentsCount}</div>
                  <div className="text-xs text-slate-500">Total Pins</div>
                </div>
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-center">
                  <div className="text-2xl font-bold text-rose-600">{inspectingProject.openCount}</div>
                  <div className="text-xs text-rose-700">Open Tasks</div>
                </div>
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                  <div className="text-2xl font-bold text-emerald-600">{inspectingProject.resolvedCount}</div>
                  <div className="text-xs text-emerald-700">Resolved</div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm">
                This project was created on {inspectingProject.createdAt} using the {inspectingProject.sampleType} template.
                You can review, annotate DOM elements, and coordinate feedback directly in the studio.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setInspectingProject(null)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = inspectingProject.id;
                  setInspectingProject(null);
                  onOpenProject(id);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xs flex items-center gap-2"
              >
                <span>Launch in Live Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-xl font-bold text-slate-900">Create New Review Project</h3>
              <button
                onClick={() => setNewProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme SaaS Redesign 2026"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  Target Website URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={newProjectUrl}
                  onChange={(e) => setNewProjectUrl(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                  Preset Website Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'agency', label: 'Agency Landing' },
                    { id: 'ecommerce', label: 'E-Commerce Store' },
                    { id: 'saas', label: 'SaaS Dashboard' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setNewProjectSample(preset.id as any)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-center transition-all ${
                        newProjectSample === preset.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-xs"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITE TEAMMATE MODAL */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-xl font-bold text-slate-900">Invite Collaborator</h3>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inviteSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Invitation Sent!</h4>
                <p className="text-sm text-slate-500">
                  {inviteEmail} has been invited with {inviteRole} permissions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    Teammate Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="colleague@agency.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Reviewer">Reviewer (Can comment and view)</option>
                    <option value="Editor">Editor (Can pin, resolve, and manage feedback)</option>
                    <option value="Admin">Admin (Full project management)</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-xs"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
