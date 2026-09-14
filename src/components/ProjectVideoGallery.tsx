import React, { useState } from 'react';
import { ProjectVideo } from '../types';
import { 
  Play, 
  Film, 
  Youtube, 
  Clock, 
  MapPin, 
  Tag, 
  Plus, 
  X, 
  Search, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '../utils/youtube';
import { appStore } from '../services/store';

interface ProjectVideoGalleryProps {
  videos: ProjectVideo[];
  onBookService?: (serviceTitle?: string) => void;
  onOpenAdmin?: () => void;
}

export const ProjectVideoGallery: React.FC<ProjectVideoGalleryProps> = ({
  videos,
  onBookService,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<ProjectVideo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Quick Add Video Form State (for Admin or authorized staff)
  const [videoTitle, setVideoTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState<ProjectVideo['category']>('smart-living');
  const [clientLocation, setClientLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Project Videos' },
    { id: 'smart-living', label: 'Smart Home & Automation' },
    { id: 'power-energy', label: 'Solar Inverter & ATS' },
    { id: 'security-access', label: 'Security & Auto-Gates' },
    { id: 'academy-labs', label: 'Academy Labs & Students' },
  ];

  const filteredVideos = videos.filter((vid) => {
    const matchesCategory = selectedCategory === 'all' || vid.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.clientOrLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYouTubeId(youtubeUrl);
    if (!ytId) {
      alert('Please enter a valid YouTube URL or Video ID (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/...)');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    appStore.addVideo({
      title: videoTitle,
      youtubeUrl,
      youtubeId: ytId,
      thumbnailUrl: getYouTubeThumbnailUrl(ytId),
      category,
      clientOrLocation: clientLocation || 'Lagos, Nigeria',
      duration: duration || '3:45',
      description,
      tags: tags.length > 0 ? tags : ['Project Showcase'],
      dateCompleted: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });

    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setShowAddModal(false);
      setVideoTitle('');
      setYoutubeUrl('');
      setClientLocation('');
      setDuration('');
      setDescription('');
      setTagsInput('');
    }, 1200);
  };

  const previewYtId = extractYouTubeId(youtubeUrl);

  return (
    <section id="videos-section" className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors duration-200">
      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-500/30 mb-4">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Turnkey Engineering Video Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Watch Our Projects in Real Action
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore walkthroughs of executed commercial solar microgrids, automated estate gates, KNX smart penthouses, and student lab training sessions.
            </p>
          </div>

          {/* Search and Quick Add Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos, location, hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Drop in YouTube Link</span>
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-800/40 border border-slate-800">
            <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No project videos found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or category filter, or drop in a new YouTube link to showcase.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group flex flex-col justify-between bg-slate-800/50 border border-slate-700/70 hover:border-red-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Video Thumbnail & Play Trigger */}
                <div 
                  className="relative aspect-video w-full bg-slate-950 cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideo(video)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:bg-red-500 group-hover:scale-110 transition-all">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white flex items-center gap-1 backdrop-blur-xs">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-300 backdrop-blur-xs">
                    {video.dateCompleted}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Tags */}
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300 truncate font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        <span className="truncate">{video.clientOrLocation}</span>
                      </span>
                    </div>

                    <h3 
                      onClick={() => setActiveVideo(video)}
                      className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer mb-2"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {video.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 text-slate-300 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Video</span>
                      </button>

                      {onBookService && (
                        <button
                          onClick={() => onBookService(video.title)}
                          className="text-xs font-medium text-slate-300 hover:text-white hover:underline transition-colors"
                        >
                          Request Similar Build
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Playback Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(activeVideo.youtubeId, true)}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{activeVideo.clientOrLocation}</span>
                  <span>•</span>
                  <span>Completed {activeVideo.dateCompleted}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {activeVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open on YouTube</span>
                </a>

                {onBookService && (
                  <button
                    onClick={() => {
                      const title = activeVideo.title;
                      setActiveVideo(null);
                      onBookService(title);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all"
                  >
                    Consult on this Project
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Quick Drop YouTube Link Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {addSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Video Published!</h3>
                <p className="text-xs text-slate-400">
                  Your project video has been embedded and is live in the gallery showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400 font-bold mb-1">
                  <Youtube className="w-4 h-4" />
                  <span>Admin Showcase Manager</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Drop In YouTube Project Video
                </h3>
                <p className="text-xs text-slate-400">
                  Simply paste any standard or Short YouTube URL. We will automatically extract the ID and thumbnail.
                </p>

                {/* YouTube Link Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    YouTube URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>
                  {previewYtId && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                      <img
                        src={getYouTubeThumbnailUrl(previewYtId)}
                        alt="Preview"
                        className="w-16 h-10 object-cover rounded"
                      />
                      <span className="text-[11px] font-mono text-emerald-400">
                        Valid YouTube ID: {previewYtId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Video Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Project Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20kVA Hybrid Solar Inverter + Smart ATS Switchover Commissioning"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Category & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Engineering Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="smart-living">Smart Living & Automation</option>
                      <option value="power-energy">Solar & ATS Systems</option>
                      <option value="security-access">Security & Auto-Gates</option>
                      <option value="academy-labs">Academy Labs & Hands-on</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Duration (e.g. 4:20)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4:15"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Client / Location & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Client / Site Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Banana Island, Ikoyi, Lagos"
                      value={clientLocation}
                      onChange={(e) => setClientLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Solar, Inverter, Felicity, ATS"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Project Walkthrough Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Key deliverables shown in the video: e.g. automatic generator crank, lithium battery bank balancing, smart app remote control..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Publish Video to Showcase</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
