import React, { useState } from 'react';
import { ProjectVideo } from '../../types';
import { appStore } from '../../services/store';
import { extractYouTubeId, getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from '../../utils/youtube';
import { 
  Youtube, 
  Plus, 
  Trash2, 
  Play, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  X,
  Film
} from 'lucide-react';

interface AdminVideosManagerProps {
  videos: ProjectVideo[];
  onRefresh?: () => void;
}

export const AdminVideosManager: React.FC<AdminVideosManagerProps> = ({
  videos,
  onRefresh,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<ProjectVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectVideo['category']>('smart-living');
  const [clientOrLocation, setClientOrLocation] = useState('');
  const [duration, setDuration] = useState('3:45');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setYoutubeUrl('');
    setTitle('');
    setCategory('smart-living');
    setClientOrLocation('');
    setDuration('3:45');
    setDescription('');
    setTagsInput('');
    setIsSuccess(false);
  };

  const parsedId = extractYouTubeId(youtubeUrl);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedId) {
      alert('Please enter a valid YouTube link or video ID.');
      return;
    }
    if (!title.trim()) {
      alert('Please provide a project title.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    appStore.addVideo({
      title,
      youtubeUrl,
      youtubeId: parsedId,
      thumbnailUrl: getYouTubeThumbnailUrl(parsedId),
      category,
      clientOrLocation: clientOrLocation || 'Lagos, Nigeria',
      duration: duration || '3:30',
      description: description || 'Turnkey engineering site deployment executed by Ebentrick Global Services Ltd.',
      tags: tags.length > 0 ? tags : ['Showcase', 'Engineering'],
      dateCompleted: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowAddModal(false);
      resetForm();
      if (onRefresh) onRefresh();
    }, 1200);
  };

  const handleDelete = (id: string, vTitle: string) => {
    if (confirm(`Remove video "${vTitle}" from the public showcase?`)) {
      appStore.deleteVideo(id);
      if (onRefresh) onRefresh();
    }
  };

  const filteredVideos = videos.filter(v => 
    searchQuery === '' ||
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.clientOrLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-display font-bold text-white">
            Project Video Showcase Manager ({videos.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Admins simply drop in a YouTube link to publish real installation walkthroughs and student lab showcases.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Drop In YouTube Video</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search videos by project title, client, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Thumbnail */}
              <div 
                className="relative aspect-video w-full bg-slate-950 cursor-pointer group"
                onClick={() => setPreviewVideo(vid)}
              >
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  {vid.duration}
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-300">
                  {vid.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{vid.clientOrLocation}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-2 mb-2">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {vid.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setPreviewVideo(vid)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Test Player</span>
              </button>

              <button
                onClick={() => handleDelete(vid.id, vid.title)}
                className="p-1.5 rounded-lg text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40"
                title="Remove Video"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Video Published!</h3>
                <p className="text-xs text-slate-400">
                  The video has been embedded and is live in the public Project Video Gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400 font-bold mb-1">
                  <Youtube className="w-4 h-4" />
                  <span>Admin Video Publisher</span>
                </div>
                <h3 className="text-xl font-bold text-white">Drop in YouTube Project Link</h3>
                <p className="text-xs text-slate-400">
                  Paste the YouTube link. The system extracts the embed and thumbnail automatically.
                </p>

                {/* URL Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-red-500"
                  />
                  {parsedId && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                      <img
                        src={getYouTubeThumbnailUrl(parsedId)}
                        alt="Thumbnail"
                        className="w-16 h-10 object-cover rounded"
                      />
                      <span className="text-[11px] font-mono text-emerald-400">
                        Extracted ID: {parsedId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Project Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15kVA Solar Inverter + Lithium Battery Commissioning"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <option value="smart-living">Smart Living & Automation</option>
                      <option value="power-energy">Solar & Power ATS</option>
                      <option value="security-access">Security & Auto-Gates</option>
                      <option value="academy-labs">Academy Labs & Hands-on</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Client / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      value={clientOrLocation}
                      onChange={(e) => setClientOrLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Duration & Tags */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3:45"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Solar, Inverter, Lithium"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Walkthrough Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the scope, hardware, and client outcome..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Publish Video</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setPreviewVideo(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950">
              <h3 className="text-sm font-bold text-white truncate max-w-md">
                {previewVideo.title}
              </h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(previewVideo.youtubeId, true)}
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
