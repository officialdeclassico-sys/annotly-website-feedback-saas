import React, { useState } from 'react';
import { Lock, Plus, Check, RefreshCw, X, MessageSquare } from 'lucide-react';
import { AnnotationComment } from '../types';

interface HeroBrowserMockupProps {
  comments: AnnotationComment[];
  onToggleResolve: (commentId: string) => void;
  onAddQuickComment: (text: string, x: number, y: number) => void;
  onOpenStudio?: () => void;
}

export const HeroBrowserMockup: React.FC<HeroBrowserMockupProps> = ({
  comments,
  onToggleResolve,
  onAddQuickComment,
  onOpenStudio,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>('comment-1');
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [pendingPinPos, setPendingPinPos] = useState<{ x: number; y: number } | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const filteredComments = comments.filter((c) => {
    if (activeFilter === 'open') return c.status === 'open';
    if (activeFilter === 'resolved') return c.status === 'resolved';
    return true;
  });

  const openCount = comments.filter((c) => c.status === 'open').length;
  const resolvedCount = comments.filter((c) => c.status === 'resolved').length;

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingPin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPendingPinPos({ x, y });
  };

  const handleSaveNewComment = () => {
    if (!newCommentText.trim() || !pendingPinPos) return;
    onAddQuickComment(newCommentText.trim(), pendingPinPos.x, pendingPinPos.y);
    setNewCommentText('');
    setPendingPinPos(null);
    setIsAddingPin(false);
    setPanelOpen(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Soft background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100/50 via-purple-50/40 to-blue-50/30 rounded-3xl filter blur-2xl -z-10" />

      {/* Main Browser Window */}
      <div className="relative rounded-2xl bg-white border border-slate-200/80 shadow-2xl shadow-indigo-900/10 overflow-hidden transition-all duration-300">
        {/* Top Browser Chrome Bar */}
        <div className="bg-slate-50/90 border-b border-slate-200/70 px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] border border-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] border border-amber-500/50" />
            <span className="w-3 h-3 rounded-full bg-[#10B981] border border-emerald-500/50" />
          </div>

          {/* Address bar matching reference */}
          <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200/90 rounded-md px-3 py-1 flex items-center justify-center gap-1.5 text-xs text-slate-600 shadow-2xs font-mono">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-sans text-xs">https://yourwebsite.com</span>
          </div>

          {/* Mode action indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddingPin(!isAddingPin)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                isAddingPin
                  ? 'bg-indigo-600 text-white shadow-xs animate-pulse'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
              title="Click anywhere on the preview to add a comment"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAddingPin ? 'Click site to drop pin' : 'Drop Pin'}</span>
            </button>
          </div>
        </div>

        {/* Browser Content Area (Sample Website) */}
        <div
          onClick={handleCanvasClick}
          className={`relative bg-gradient-to-b from-slate-50/60 to-white p-5 sm:p-7 min-h-[460px] select-none ${
            isAddingPin ? 'cursor-crosshair' : 'cursor-default'
          }`}
        >
          {/* Sample Website Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 text-base">🌱</span>
              <span className="font-bold text-slate-900 text-sm tracking-tight">Your Website</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <span className="text-slate-900 font-semibold hover:text-indigo-600 cursor-pointer">Home</span>
              <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">Services</span>
              <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">About</span>
              <span className="bg-slate-900 text-white px-3 py-1 rounded-md font-semibold text-[11px] hover:bg-slate-800 cursor-pointer">
                Contact
              </span>
            </div>
          </div>

          {/* Sample Website Hero Content */}
          <div className="pt-6 grid grid-cols-12 gap-4 items-center">
            {/* Left Column */}
            <div className="col-span-12 sm:col-span-7 pr-2 space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                Digital Solutions
                <br />
                for{' '}
                {/* Purple boxed selection outline matching reference */}
                <span className="relative inline-block border-2 border-indigo-600 rounded px-1.5 py-0.5 bg-indigo-50/40 text-indigo-950">
                  Growing Brands
                  {/* Pin 1 marker badge attached to box */}
                  <span className="absolute -top-3.5 -left-3.5 w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-white">
                    1
                  </span>
                </span>
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                We help businesses create beautiful digital experiences that drive real growth.
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="relative inline-block">
                  <button className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-xs hover:bg-slate-800">
                    Get Started
                  </button>
                  {/* Pin 3 marker badge on button */}
                  <span className="absolute -bottom-2.5 -right-2.5 w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-white">
                    3
                  </span>
                </div>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-50">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Column (Hero Visual Mockup) */}
            <div className="col-span-12 sm:col-span-5 relative mt-2 sm:mt-0">
              <div className="relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group">
                {/* Mountain / Valley Landscape SVG */}
                <svg
                  viewBox="0 0 320 200"
                  className="w-full h-36 object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#dbeafe" />
                      <stop offset="60%" stopColor="#e0e7ff" />
                      <stop offset="100%" stopColor="#fef3c7" />
                    </linearGradient>
                    <linearGradient id="mount1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="mount2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="valley" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                  </defs>
                  {/* Sky */}
                  <rect width="320" height="200" fill="url(#skyGrad)" />
                  {/* Distant Sun */}
                  <circle cx="230" cy="70" r="22" fill="#fbbf24" opacity="0.65" />
                  {/* Mountain back layer */}
                  <polygon points="20,180 110,60 190,170" fill="url(#mount1)" opacity="0.85" />
                  <polygon points="120,180 210,40 300,160" fill="url(#mount1)" opacity="0.9" />
                  {/* Fore mountain */}
                  <polygon points="-20,200 70,85 160,200" fill="url(#mount2)" />
                  <polygon points="170,200 250,90 340,200" fill="url(#mount2)" />
                  {/* Green valley & trees */}
                  <path d="M-10,200 Q160,140 330,200 Z" fill="url(#valley)" />
                  <circle cx="90" cy="175" r="4" fill="#047857" />
                  <circle cx="120" cy="170" r="5" fill="#065f46" />
                  <circle cx="160" cy="172" r="4.5" fill="#047857" />
                  <circle cx="210" cy="168" r="6" fill="#065f46" />
                </svg>

                {/* Pin 2 marker badge on image */}
                <span className="absolute bottom-4 left-6 w-6 h-6 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-white">
                  2
                </span>
              </div>
            </div>
          </div>

          {/* FLOATING ANNOTATION SPEECH BUBBLE 1 (Purple - Sarah) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCommentId('comment-1');
            }}
            className={`absolute top-[12%] sm:top-[15%] left-[26%] sm:left-[32%] z-20 max-w-[150px] sm:max-w-[210px] p-2 sm:p-2.5 rounded-xl bg-indigo-600 text-white shadow-xl cursor-pointer transition-all duration-200 transform ${
              selectedCommentId === 'comment-1' ? 'scale-105 ring-2 ring-indigo-400' : 'hover:scale-102'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-indigo-400 border border-white text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">
                S
              </div>
              <div className="flex items-baseline gap-1 text-[10px] sm:text-[11px]">
                <span className="font-bold">Sarah</span>
                <span className="text-indigo-200 text-[9px] sm:text-[10px]">2m ago</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium leading-snug">
              Change this heading to something shorter.
            </p>
            {/* Arrow Stem pointing to Pin 1 */}
            <div className="absolute -bottom-1.5 sm:-bottom-2 left-6 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-indigo-600 transform rotate-45" />
          </div>

          {/* FLOATING ANNOTATION SPEECH BUBBLE 2 (Red - Client) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCommentId('comment-2');
            }}
            className={`absolute top-[26%] sm:top-[30%] right-[3%] sm:right-[6%] z-20 max-w-[140px] sm:max-w-[195px] p-2 sm:p-2.5 rounded-xl bg-white border border-rose-300 shadow-xl cursor-pointer transition-all duration-200 transform ${
              selectedCommentId === 'comment-2' ? 'scale-105 ring-2 ring-rose-400' : 'hover:scale-102'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">
                C
              </div>
              <div className="flex items-baseline gap-1 text-[10px] sm:text-[11px]">
                <span className="font-bold text-slate-800">Client</span>
                <span className="text-slate-400 text-[9px] sm:text-[10px]">10m ago</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-700 font-medium leading-snug">
              Use a different image here.
            </p>
          </div>

          {/* FLOATING ANNOTATION SPEECH BUBBLE 3 (Green - Designer) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCommentId('comment-3');
            }}
            className={`absolute bottom-[16%] sm:bottom-[22%] left-[26%] sm:left-[32%] z-20 max-w-[140px] sm:max-w-[200px] p-2 sm:p-2.5 rounded-xl bg-white border border-emerald-400 shadow-xl cursor-pointer transition-all duration-200 transform ${
              selectedCommentId === 'comment-3' ? 'scale-105 ring-2 ring-emerald-400' : 'hover:scale-102'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">
                D
              </div>
              <div className="flex items-baseline gap-1 text-[10px] sm:text-[11px]">
                <span className="font-bold text-slate-800">Designer</span>
                <span className="text-slate-400 text-[9px] sm:text-[10px]">1h ago</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-700 font-medium leading-snug">
              Make this button bigger.
            </p>
          </div>

          {/* PENDING PIN CREATION MODAL OVERLAY */}
          {pendingPinPos && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-40 bg-white rounded-xl shadow-2xl border border-indigo-200 p-3 w-64 text-left animate-in fade-in zoom-in-95 duration-150"
              style={{
                left: `${Math.min(pendingPinPos.x, 70)}%`,
                top: `${Math.min(pendingPinPos.y, 65)}%`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  Add New Feedback
                </span>
                <button
                  onClick={() => setPendingPinPos(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                autoFocus
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Type your comment here..."
                rows={2}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveNewComment();
                  }
                }}
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setPendingPinPos(null)}
                  className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewComment}
                  disabled={!newCommentText.trim()}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  Post Pin
                </button>
              </div>
            </div>
          )}

          {/* FLOATING 3 COMMENTS DOCKED PANEL ON THE RIGHT */}
          {panelOpen ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-30 w-[calc(100%-1rem)] max-w-[280px] sm:max-w-none sm:w-80 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-2xl p-2.5 sm:p-3.5 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{comments.length} Comments</span>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  title="Minimize Comments"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Filter Tabs matching reference: All (3), Open (2), Resolved (1) */}
              <div className="flex items-center gap-1 py-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-indigo-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All ({comments.length})
                </button>
                <button
                  onClick={() => setActiveFilter('open')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeFilter === 'open'
                      ? 'bg-indigo-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Open ({openCount})
                </button>
                <button
                  onClick={() => setActiveFilter('resolved')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeFilter === 'resolved'
                      ? 'bg-indigo-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Resolved ({resolvedCount})
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
                {filteredComments.map((comment) => {
                  const pinBg =
                    comment.color === 'purple'
                      ? 'bg-indigo-600'
                      : comment.color === 'red'
                      ? 'bg-rose-500'
                      : 'bg-emerald-600';

                  const isSelected = selectedCommentId === comment.id;

                  return (
                    <div
                      key={comment.id}
                      onClick={() => setSelectedCommentId(comment.id)}
                      className={`flex items-center justify-between gap-2 p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-400 bg-indigo-50/50'
                          : 'border-slate-100 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Number Pin Circle */}
                        <div
                          className={`w-5 h-5 rounded-full ${pinBg} text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {comment.pinNumber}
                        </div>

                        {/* Author Avatar */}
                        <div
                          className={`w-5 h-5 rounded-full ${comment.author.avatarColor} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}
                        >
                          {comment.author.avatarInitial}
                        </div>

                        {/* Comment text snippet */}
                        <div className="min-w-0 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-bold text-slate-800 truncate">
                              {comment.author.name}
                            </span>
                            <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 truncate">{comment.text}</p>
                        </div>
                      </div>

                      {/* Status Action Badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleResolve(comment.id);
                        }}
                        className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-0.5 ${
                          comment.status === 'resolved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                        }`}
                        title={comment.status === 'resolved' ? 'Click to reopen' : 'Click to resolve'}
                      >
                        {comment.status === 'resolved' ? (
                          <>
                            <Check className="w-2.5 h-2.5" />
                            <span>Resolved</span>
                          </>
                        ) : (
                          <span>Open</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom footer button to launch Studio */}
              {onOpenStudio && (
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Interactive Preview</span>
                  <button
                    onClick={onOpenStudio}
                    className="text-indigo-600 font-semibold hover:text-indigo-800"
                  >
                    Open in Full Studio →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPanelOpen(true);
              }}
              className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900 text-white rounded-lg shadow-lg text-xs font-semibold hover:bg-indigo-800"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Show {comments.length} Comments</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
