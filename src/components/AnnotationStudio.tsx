import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  MousePointer,
  MapPin,
  Check,
  Search,
  Share2,
  Download,
  Laptop,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  Send,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  Tag,
  Sparkles,
  MessageSquare,
  X,
} from 'lucide-react';
import { Project, User, AnnotationComment, CommentReply } from '../types';
import { DEFAULT_USERS } from '../lib/storage';

interface AnnotationStudioProps {
  project: Project;
  currentUser: User;
  comments: AnnotationComment[];
  onSaveComment: (comment: AnnotationComment) => void;
  onUpdateComment: (comment: AnnotationComment) => void;
  onDeleteComment: (commentId: string) => void;
  onBackToDashboard: () => void;
}

export const AnnotationStudio: React.FC<AnnotationStudioProps> = ({
  project,
  currentUser,
  comments,
  onSaveComment,
  onUpdateComment,
  onDeleteComment,
  onBackToDashboard,
}) => {
  const [activeTool, setActiveTool] = useState<'pin' | 'select' | 'browse'>('pin');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Element hover inspector state
  const [hoveredElement, setHoveredElement] = useState<{
    selector: string;
    label: string;
    rect: { top: number; left: number; width: number; height: number };
  } | null>(null);

  // New Comment Creation Popover state
  const [newCommentPopover, setNewCommentPopover] = useState<{
    xPercent: number;
    yPercent: number;
    elementSelector?: string;
    elementLabel?: string;
  } | null>(null);

  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentPriority, setNewCommentPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newCommentTag, setNewCommentTag] = useState<'Copy' | 'Design' | 'Bug' | 'Layout'>('Design');
  const [newCommentColor, setNewCommentColor] = useState<'purple' | 'red' | 'green' | 'blue' | 'amber'>('purple');
  const [activeAuthor, setActiveAuthor] = useState<User>(currentUser);

  // Replies state
  const [replyInputText, setReplyInputText] = useState<{ [commentId: string]: string }>({});
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(project.url);
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const surfaceRef = useRef<HTMLDivElement>(null);

  // Filtered comments
  const filteredComments = comments.filter((c) => {
    if (activeFilter === 'open' && c.status !== 'open') return false;
    if (activeFilter === 'resolved' && c.status !== 'resolved') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.text.toLowerCase().includes(q) ||
        c.author.name.toLowerCase().includes(q) ||
        (c.tag && c.tag.toLowerCase().includes(q)) ||
        (c.elementLabel && c.elementLabel.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const openCount = comments.filter((c) => c.status === 'open').length;
  const resolvedCount = comments.filter((c) => c.status === 'resolved').length;

  // Handle clicking on review canvas to drop pin
  const handleSurfaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'browse') return;
    if (!surfaceRef.current) return;

    const rect = surfaceRef.current.getBoundingClientRect();
    const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // If hovered element exists, grab its label
    const elementSelector = hoveredElement?.selector || 'div.preview-surface';
    const elementLabel = hoveredElement?.label || 'Page Section';

    setNewCommentPopover({
      xPercent,
      yPercent,
      elementSelector,
      elementLabel,
    });
  };

  const handleElementHover = (
    e: React.MouseEvent,
    selector: string,
    label: string
  ) => {
    if (activeTool === 'browse') return;
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    if (surfaceRef.current) {
      const surfaceRect = surfaceRef.current.getBoundingClientRect();
      setHoveredElement({
        selector,
        label,
        rect: {
          top: rect.top - surfaceRect.top,
          left: rect.left - surfaceRect.left,
          width: rect.width,
          height: rect.height,
        },
      });
    }
  };

  const handleSaveNewComment = () => {
    if (!newCommentText.trim() || !newCommentPopover) return;

    const nextPinNumber =
      comments.length > 0 ? Math.max(...comments.map((c) => c.pinNumber)) + 1 : 1;

    const newComment: AnnotationComment = {
      id: `comment-${Date.now()}`,
      projectId: project.id,
      pinNumber: nextPinNumber,
      author: {
        id: activeAuthor.id,
        name: activeAuthor.name,
        role: activeAuthor.role,
        avatarInitial: activeAuthor.avatarInitial,
        avatarColor: activeAuthor.avatarColor,
      },
      text: newCommentText.trim(),
      createdAt: 'Just now',
      status: 'open',
      elementSelector: newCommentPopover.elementSelector,
      elementLabel: newCommentPopover.elementLabel,
      xPercent: newCommentPopover.xPercent,
      yPercent: newCommentPopover.yPercent,
      color: newCommentColor,
      priority: newCommentPriority,
      tag: newCommentTag,
      replies: [],
    };

    onSaveComment(newComment);
    setNewCommentText('');
    setNewCommentPopover(null);
    setSelectedCommentId(newComment.id);
  };

  const handleToggleResolve = (comment: AnnotationComment) => {
    const updated: AnnotationComment = {
      ...comment,
      status: comment.status === 'open' ? 'resolved' : 'open',
    };
    onUpdateComment(updated);
  };

  const handleAddReply = (commentId: string) => {
    const text = replyInputText[commentId];
    if (!text || !text.trim()) return;

    const targetComment = comments.find((c) => c.id === commentId);
    if (!targetComment) return;

    const newReply: CommentReply = {
      id: `reply-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
        avatarInitial: currentUser.avatarInitial,
        avatarColor: currentUser.avatarColor,
      },
      text: text.trim(),
      createdAt: 'Just now',
    };

    const updated: AnnotationComment = {
      ...targetComment,
      replies: [...(targetComment.replies || []), newReply],
    };

    onUpdateComment(updated);
    setReplyInputText({ ...replyInputText, [commentId]: '' });
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Pin#', 'Author', 'Role', 'Status', 'Tag', 'Priority', 'Element', 'Comment', 'RepliesCount', 'CreatedAt'];
    const rows = comments.map((c) => [
      c.id,
      c.pinNumber,
      `"${c.author.name}"`,
      `"${c.author.role}"`,
      c.status,
      c.tag || '',
      c.priority || '',
      `"${c.elementLabel || c.elementSelector || ''}"`,
      `"${c.text.replace(/"/g, '""')}"`,
      c.replies?.length || 0,
      c.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${project.name.toLowerCase().replace(/\s+/g, '_')}_feedback.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Viewport container width classes: Fluid wide layout for desktop
  const viewportWidthClass = {
    desktop: 'w-full max-w-[1720px]',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]',
  }[viewport];

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none w-full">
      {/* TOP STUDIO TOOLBAR */}
      <header className="h-14 sm:h-16 bg-slate-900 border-b border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 z-40 shrink-0">
        {/* Left: Back & Project Info */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-5 w-px bg-slate-800 shrink-0" />

          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="truncate max-w-[140px] sm:max-w-xs">{project.name}</span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded-md">
                Live DOM
              </span>
            </h2>
          </div>
        </div>

        {/* Center: Tools & Viewports */}
        <div className="flex items-center gap-2">
          {/* Tool selector */}
          <div className="flex items-center p-1 bg-slate-800 rounded-lg text-xs sm:text-sm">
            <button
              onClick={() => setActiveTool('pin')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md transition-colors ${
                activeTool === 'pin'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Pin & Comment (Shortcut: P)"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Pin Tool</span>
            </button>
            <button
              onClick={() => setActiveTool('select')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md transition-colors ${
                activeTool === 'select'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="DOM Inspector Highlight (Shortcut: H)"
            >
              <MousePointer className="w-4 h-4" />
              <span className="hidden md:inline">DOM Inspector</span>
            </button>
            <button
              onClick={() => setActiveTool('browse')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md transition-colors ${
                activeTool === 'browse'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Interact / Click Links (Shortcut: V)"
            >
              <span>Browse</span>
            </button>
          </div>

          {/* Viewport switch */}
          <div className="hidden sm:flex items-center p-1 bg-slate-800 rounded-lg text-xs sm:text-sm">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                viewport === 'desktop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (1440px / Fluid)"
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                viewport === 'tablet' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                viewport === 'mobile' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Export & Share Actions + Mobile Sidebar Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Toggle Comments Button for mobile & tablet */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors lg:hidden ${
              sidebarOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Comments Panel"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="font-mono">{comments.length}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            title="Download feedback as CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shrink-0 shadow-xs"
          >
            {copiedShareLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedShareLink ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE MAIN AREA: REVIEW CANVAS + COMMENTS SIDEBAR */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* REVIEW SURFACE CONTAINER */}
        <div className="flex-1 bg-slate-950/80 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-start relative">
          {/* Surface Header Bar */}
          <div className={`${viewportWidthClass} mb-3 flex items-center justify-between text-xs text-slate-400 px-1`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Inspection Surface: Active</span>
              <span className="text-slate-600">·</span>
              <span className="text-indigo-400 font-mono text-[11px] truncate">{project.url}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSandboxMode(!isSandboxMode)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSandboxMode ? 'Return to Preset Site' : 'Test External URL'}</span>
              </button>
            </div>
          </div>

          {/* EXTERNAL URL NOTICE BANNER (when user toggles external sandbox) */}
          {isSandboxMode && (
            <div className={`${viewportWidthClass} mb-4 p-4 rounded-xl bg-indigo-950/70 border border-indigo-800/80 text-left text-xs space-y-2`}>
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Info className="w-4 h-4 shrink-0" />
                <span>Cross-Origin &amp; Security Policy Notice</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Browser security standards (<strong>X-Frame-Options: SAMEORIGIN</strong> and <strong>CSP frame-ancestors</strong>)
                prevent arbitrary external third-party websites from rendering inside iframes without domain consent.
                In Annotly production, our <strong>Chrome Extension</strong> injects the annotation overlay directly into the user’s
                active tab on any domain. Below, test with our controlled high-fidelity interactive review templates.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://your-custom-site.com"
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={() => alert(`Simulated review connection initiated for: ${customUrlInput}`)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs"
                >
                  Verify URL
                </button>
              </div>
            </div>
          )}

          {/* THE REVIEW WEBPAGE CANVAS */}
          <div
            ref={surfaceRef}
            onClick={handleSurfaceClick}
            onMouseLeave={() => setHoveredElement(null)}
            className={`relative bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${viewportWidthClass} min-h-[720px] select-none ${
              activeTool !== 'browse' ? 'cursor-crosshair' : 'cursor-default'
            }`}
          >
            {/* DOM HOVER OVERLAY BOX */}
            {hoveredElement && activeTool !== 'browse' && (
              <div
                className="absolute pointer-events-none z-20 border-2 border-indigo-500 bg-indigo-500/10 transition-all duration-75 rounded"
                style={{
                  top: hoveredElement.rect.top,
                  left: hoveredElement.rect.left,
                  width: hoveredElement.rect.width,
                  height: hoveredElement.rect.height,
                }}
              >
                <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-indigo-600 text-white text-[10px] font-mono rounded shadow-sm whitespace-nowrap">
                  {hoveredElement.selector}
                </div>
              </div>
            )}

            {/* LIVE ANNOTATION PINS ON CANVAS */}
            {comments.map((comment) => {
              const isSelected = selectedCommentId === comment.id;
              const pinBg =
                comment.color === 'purple'
                  ? 'bg-indigo-600 ring-indigo-400'
                  : comment.color === 'red'
                  ? 'bg-rose-500 ring-rose-400'
                  : comment.color === 'green'
                  ? 'bg-emerald-600 ring-emerald-400'
                  : comment.color === 'amber'
                  ? 'bg-amber-500 ring-amber-400'
                  : 'bg-blue-600 ring-blue-400';

              return (
                <div
                  key={comment.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCommentId(comment.id);
                  }}
                  className={`absolute z-30 transition-transform duration-200 cursor-pointer ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${comment.xPercent}%`,
                    top: `${comment.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${pinBg} text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-offset-1 ring-offset-slate-900 transition-transform`}
                  >
                    {comment.pinNumber}
                  </div>

                  {/* Active Pin Callout Card */}
                  {isSelected && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-9 -top-3 w-72 sm:w-80 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-100"
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full ${comment.author.avatarColor} text-white text-[11px] font-bold flex items-center justify-center`}
                          >
                            {comment.author.avatarInitial}
                          </div>
                          <span className="text-sm font-bold truncate">{comment.author.name}</span>
                          <span className="text-xs text-slate-400">{comment.createdAt}</span>
                        </div>
                        <button
                          onClick={() => setSelectedCommentId(null)}
                          className="text-slate-400 hover:text-white p-1 rounded-md text-xs"
                          title="Close"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">{comment.text}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-indigo-400 font-mono text-[11px] truncate max-w-[140px]">
                          {comment.elementLabel || comment.elementSelector}
                        </span>
                        <button
                          onClick={() => handleToggleResolve(comment)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            comment.status === 'resolved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/40'
                          }`}
                        >
                          {comment.status === 'resolved' ? 'Resolved ✓' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* PENDING COMMENT CREATION CARD */}
            {newCommentPopover && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-50 bg-white rounded-2xl shadow-2xl border border-slate-300 p-4 sm:p-5 w-80 sm:w-96 text-left animate-in fade-in zoom-in-95 duration-150"
                style={{
                  left: `${Math.min(Math.max(newCommentPopover.xPercent, 12), 65)}%`,
                  top: `${Math.min(Math.max(newCommentPopover.yPercent, 8), 65)}%`,
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                    <span className="text-sm font-bold text-slate-900">Add Feedback Pin</span>
                  </div>
                  <button
                    onClick={() => setNewCommentPopover(null)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Cancel"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-3 text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg truncate border border-indigo-100">
                  Target: {newCommentPopover.elementLabel} ({newCommentPopover.elementSelector})
                </div>

                <textarea
                  autoFocus
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Describe the issue, copy change, or design refinement..."
                  rows={3}
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSaveNewComment();
                    }
                  }}
                />

                {/* Tags and Options */}
                <div className="space-y-2.5 mb-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Category:</span>
                    <div className="flex items-center gap-1.5">
                      {(['Design', 'Copy', 'Bug', 'Layout'] as const).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setNewCommentTag(tag)}
                          className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-colors ${
                            newCommentTag === tag
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Pin Color:</span>
                    <div className="flex items-center gap-2">
                      {[
                        { id: 'purple', bg: 'bg-indigo-600' },
                        { id: 'red', bg: 'bg-rose-500' },
                        { id: 'green', bg: 'bg-emerald-600' },
                        { id: 'blue', bg: 'bg-blue-600' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setNewCommentColor(c.id as any)}
                          className={`w-5 h-5 rounded-full ${c.bg} transition-transform ${
                            newCommentColor === c.id ? 'scale-125 ring-2 ring-slate-400 ring-offset-1' : 'hover:scale-110'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setNewCommentPopover(null)}
                    className="px-3 py-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNewComment}
                    disabled={!newCommentText.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-xs"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            )}

            {/* PREVIEW DOM CONTENT: Controlled Webpage Template */}
            <div className="p-6 sm:p-10 space-y-12">
              {/* Site Navbar */}
              <nav
                onMouseEnter={(e) => handleElementHover(e, 'header.site-nav', 'Navigation Bar')}
                className="flex items-center justify-between pb-6 border-b border-slate-200"
              >
                <div className="flex items-center gap-2 font-extrabold text-lg text-slate-900">
                  <span className="text-indigo-600 text-xl">🌱</span>
                  <span>GrowthBrands Agency</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
                  <span
                    onMouseEnter={(e) => handleElementHover(e, 'nav-link.case-studies', 'Nav Link')}
                    className="hover:text-indigo-600 cursor-pointer"
                  >
                    Case Studies
                  </span>
                  <span
                    onMouseEnter={(e) => handleElementHover(e, 'nav-link.services', 'Nav Link')}
                    className="hover:text-indigo-600 cursor-pointer hidden sm:inline"
                  >
                    Services
                  </span>
                  <span
                    onMouseEnter={(e) => handleElementHover(e, 'nav-link.about', 'Nav Link')}
                    className="hover:text-indigo-600 cursor-pointer hidden sm:inline"
                  >
                    About Us
                  </span>
                  <button
                    onMouseEnter={(e) =>
                      handleElementHover(e, 'button.nav-contact', 'Contact Us CTA')
                    }
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                  >
                    Get in Touch
                  </button>
                </div>
              </nav>

              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span
                    onMouseEnter={(e) => handleElementHover(e, 'span.hero-eyebrow', 'Hero Eyebrow')}
                    className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md"
                  >
                    Award-Winning Digital Studio
                  </span>

                  <h1
                    onMouseEnter={(e) => handleElementHover(e, 'h1.hero-title', 'Main Headline (H1)')}
                    className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight"
                  >
                    Digital Solutions
                    <br />
                    for{' '}
                    <span className="border-2 border-indigo-600 rounded px-1.5 py-0.5 bg-indigo-50/40 text-indigo-950">
                      Growing Brands
                    </span>
                  </h1>

                  <p
                    onMouseEnter={(e) =>
                      handleElementHover(e, 'p.hero-subtitle', 'Hero Subtitle Paragraph')
                    }
                    className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg"
                  >
                    We help modern brands craft immersive digital experiences, high-converting
                    e-commerce storefronts, and automated growth marketing engines.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onMouseEnter={(e) =>
                        handleElementHover(e, 'button.btn-primary', 'Primary Action Button')
                      }
                      className="px-5 py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-sm"
                    >
                      Get Started Today
                    </button>
                    <button
                      onMouseEnter={(e) =>
                        handleElementHover(e, 'button.btn-secondary', 'Secondary Learn More Button')
                      }
                      className="px-4 py-2.5 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50"
                    >
                      Explore Our Portfolio
                    </button>
                  </div>
                </div>

                {/* Hero Visual Asset */}
                <div
                  onMouseEnter={(e) =>
                    handleElementHover(e, 'div.hero-image-container', 'Hero Visual Asset Container')
                  }
                  className="lg:col-span-5 relative"
                >
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                    <svg
                      viewBox="0 0 360 240"
                      className="w-full h-48 sm:h-56 object-cover"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <defs>
                        <linearGradient id="studioSky" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#c7d2fe" />
                          <stop offset="70%" stopColor="#e0e7ff" />
                          <stop offset="100%" stopColor="#fef08a" />
                        </linearGradient>
                      </defs>
                      <rect width="360" height="240" fill="url(#studioSky)" />
                      <circle cx="280" cy="80" r="30" fill="#f59e0b" opacity="0.6" />
                      <polygon points="40,220 150,70 260,220" fill="#475569" opacity="0.9" />
                      <polygon points="180,220 280,100 380,220" fill="#334155" />
                      <path d="M-20,240 Q180,160 380,240 Z" fill="#059669" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature Grid inside review page */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {[
                  {
                    title: 'Brand Strategy',
                    desc: 'Positioning, narrative design, and visual identity.',
                    selector: 'card.feature-strategy',
                  },
                  {
                    title: 'Web Engineering',
                    desc: 'Ultra-fast Next.js and Headless Shopify architectures.',
                    selector: 'card.feature-engineering',
                  },
                  {
                    title: 'Growth Marketing',
                    desc: 'Conversion rate optimization and lifecycle automation.',
                    selector: 'card.feature-growth',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    onMouseEnter={(e) => handleElementHover(e, item.selector, item.title)}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      0{i + 1}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR BACKDROP */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-150"
          />
        )}

        {/* RIGHT COMMENTS DOCKED SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? 'flex' : 'hidden lg:flex'
          } fixed lg:static top-14 sm:top-16 bottom-0 right-0 z-50 lg:z-10 w-full sm:w-96 md:w-[400px] lg:w-96 xl:w-[400px] 2xl:w-[440px] bg-slate-900 border-l border-slate-800 flex-col shrink-0 shadow-2xl lg:shadow-none transition-all duration-200`}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white">Project Feedback</span>
                <span className="px-2.5 py-0.5 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono font-semibold rounded-full">
                  {comments.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Author persona switcher */}
                <select
                  value={activeAuthor.id}
                  onChange={(e) => {
                    const found = DEFAULT_USERS.find((u) => u.id === e.target.value);
                    if (found) setActiveAuthor(found);
                  }}
                  className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  title="Switch persona for posting comments"
                >
                  {DEFAULT_USERS.map((u) => (
                    <option key={u.id} value={u.id}>
                      Posting as: {u.name}
                    </option>
                  ))}
                </select>

                {/* Close button for mobile */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                  title="Close sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl text-xs sm:text-sm">
              <button
                onClick={() => setActiveFilter('all')}
                className={`flex-1 py-1.5 rounded-lg text-center font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({comments.length})
              </button>
              <button
                onClick={() => setActiveFilter('open')}
                className={`flex-1 py-1.5 rounded-lg text-center font-semibold transition-colors ${
                  activeFilter === 'open'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Open ({openCount})
              </button>
              <button
                onClick={() => setActiveFilter('resolved')}
                className={`flex-1 py-1.5 rounded-lg text-center font-semibold transition-colors ${
                  activeFilter === 'resolved'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search feedback or elements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {filteredComments.length === 0 ? (
              <div className="py-14 text-center text-slate-500 text-xs sm:text-sm space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
                <p className="font-semibold text-slate-400">No comments found for this filter.</p>
                <p className="text-xs text-slate-500">
                  Click anywhere on the preview surface to place a new feedback pin!
                </p>
              </div>
            ) : (
              filteredComments.map((comment) => {
                const isSelected = selectedCommentId === comment.id;
                const pinBg =
                  comment.color === 'purple'
                    ? 'bg-indigo-600'
                    : comment.color === 'red'
                    ? 'bg-rose-500'
                    : comment.color === 'green'
                    ? 'bg-emerald-600'
                    : 'bg-blue-600';

                return (
                  <div
                    key={comment.id}
                    onClick={() => setSelectedCommentId(comment.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-full ${pinBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {comment.pinNumber}
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full ${comment.author.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                        >
                          {comment.author.avatarInitial}
                        </div>
                        <div className="truncate">
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {comment.author.name}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1.5">
                            {comment.createdAt}
                          </span>
                        </div>
                      </div>

                      {/* Status Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleResolve(comment);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                          comment.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30'
                        }`}
                        title={comment.status === 'resolved' ? 'Click to reopen' : 'Click to resolve'}
                      >
                        {comment.status === 'resolved' ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Resolved</span>
                          </>
                        ) : (
                          <span>Open</span>
                        )}
                      </button>
                    </div>

                    {/* Comment text */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">{comment.text}</p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
                      {comment.tag && (
                        <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-indigo-300 rounded-md font-medium text-[11px]">
                          #{comment.tag}
                        </span>
                      )}
                      {comment.priority && (
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                            comment.priority === 'high'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {comment.priority} priority
                        </span>
                      )}
                      <span className="text-slate-400 font-mono text-[11px] truncate max-w-[140px]">
                        {comment.elementLabel || comment.elementSelector}
                      </span>
                    </div>

                    {/* Replies Thread */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="pl-3.5 border-l-2 border-slate-700 space-y-2.5 my-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="text-xs text-slate-300">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <span className="font-bold text-white text-xs">{reply.author.name}</span>
                              <span className="text-[10px] text-slate-500">{reply.createdAt}</span>
                            </div>
                            <p className="mt-0.5 text-slate-300 leading-relaxed">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Reply Box */}
                    <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2">
                      <div className="flex-1 flex items-center gap-2 bg-slate-950/90 rounded-lg px-2.5 py-1.5 border border-slate-700 focus-within:border-indigo-500">
                        <input
                          type="text"
                          placeholder="Reply to this thread..."
                          value={replyInputText[comment.id] || ''}
                          onChange={(e) =>
                            setReplyInputText({
                              ...replyInputText,
                              [comment.id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddReply(comment.id);
                            }
                          }}
                          className="bg-transparent text-xs text-white placeholder-slate-500 w-full focus:outline-none"
                        />
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          className="text-indigo-400 hover:text-indigo-300 p-0.5"
                          title="Send Reply"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComment(comment.id);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-md"
                        title="Delete Comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

