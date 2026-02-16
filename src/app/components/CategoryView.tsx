import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Plus, Pin, MessageSquare, Eye, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Thread = {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  replies: number;
  views: number;
  lastActivity: string;
  lastActivityMinutes: number; // For sorting
  isPinned: boolean;
  isHot: boolean;
};

const initialThreads: Thread[] = [
  {
    id: 1,
    title: "Parim sülearvuti kuni 1000€?",
    author: "TechFan",
    authorAvatar: "TF",
    replies: 45,
    views: 1230,
    lastActivity: "5 minutit tagasi",
    lastActivityMinutes: 5,
    isPinned: true,
    isHot: true,
  },
  {
    id: 2,
    title: "Lenovo vs Dell ärikasutuses",
    author: "BusinessUser",
    authorAvatar: "BU",
    replies: 23,
    views: 567,
    lastActivity: "2 tundi tagasi",
    lastActivityMinutes: 120,
    isPinned: false,
    isHot: false,
  },
  {
    id: 3,
    title: "M3 MacBook Pro kogemused?",
    author: "AppleFan",
    authorAvatar: "AF",
    replies: 67,
    views: 2341,
    lastActivity: "30 minutit tagasi",
    lastActivityMinutes: 30,
    isPinned: false,
    isHot: true,
  },
  {
    id: 4,
    title: "Gaming sülearvuti soovitused 2026",
    author: "GamerPro",
    authorAvatar: "GP",
    replies: 89,
    views: 3456,
    lastActivity: "1 tund tagasi",
    lastActivityMinutes: 60,
    isPinned: true,
    isHot: true,
  },
  {
    id: 5,
    title: "SSD upgrade vana laptopile",
    author: "DIYer",
    authorAvatar: "DI",
    replies: 12,
    views: 234,
    lastActivity: "4 tundi tagasi",
    lastActivityMinutes: 240,
    isPinned: false,
    isHot: false,
  },
  {
    id: 6,
    title: "Chromebook vs Windows laptop üliõpilasele",
    author: "Student2026",
    authorAvatar: "ST",
    replies: 34,
    views: 890,
    lastActivity: "6 tundi tagasi",
    lastActivityMinutes: 360,
    isPinned: false,
    isHot: false,
  },
  {
    id: 7,
    title: "Millal tasub Windowsi uuendada?",
    author: "WinUser",
    authorAvatar: "WU",
    replies: 18,
    views: 445,
    lastActivity: "8 tundi tagasi",
    lastActivityMinutes: 480,
    isPinned: false,
    isHot: false,
  },
  {
    id: 8,
    title: "Parim monitor kodukontoris",
    author: "HomeOffice",
    authorAvatar: "HO",
    replies: 56,
    views: 1890,
    lastActivity: "12 tundi tagasi",
    lastActivityMinutes: 720,
    isPinned: false,
    isHot: true,
  },
];

const categoryInfo: Record<string, { name: string; description: string; icon: string }> = {
  arvutid: {
    name: "Arvutid ja IT",
    description: "Arvutid, sülearvutid, tahvelarvutid ja IT-varustus",
    icon: "💻",
  },
  mobiil: {
    name: "Mobiilid ja seadmed",
    description: "Nutitelefonid, kellad ja muud mobiilsed seadmed",
    icon: "📱",
  },
  kodutehnika: {
    name: "Kodutehnika",
    description: "Pesumasinad, külmikud, pliidid ja muu kodutehnika",
    icon: "🏠",
  },
  meelelahutus: {
    name: "Meelelahutus",
    description: "Televiisorid, audiovarustus, mängud ja konsoolid",
    icon: "🎮",
  },
  auto: {
    name: "Auto ja transport",
    description: "Autod, varuosad, rehvid ja tarvikud",
    icon: "🚗",
  },
  sport: {
    name: "Sport ja vaba aeg",
    description: "Spordivahendid, jalgrattad ja välivarustus",
    icon: "⚽",
  },
};

type FilterTab = "all" | "pinned" | "popular";
type SortOption = "lastUpdated" | "newest" | "oldest" | "mostReplies";

const ITEMS_PER_PAGE = 4;

export function CategoryView() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryInfo[categoryId || ""] || categoryInfo.arvutid;

  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortOption>("lastUpdated");
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");

  // Filter and sort threads
  const filteredAndSortedThreads = useMemo(() => {
    let result = [...threads];

    // Filter
    if (filterTab === "pinned") {
      result = result.filter((t) => t.isPinned);
    } else if (filterTab === "popular") {
      result = result.filter((t) => t.isHot);
    }

    // Sort
    switch (sortBy) {
      case "lastUpdated":
        result.sort((a, b) => a.lastActivityMinutes - b.lastActivityMinutes);
        break;
      case "newest":
        result.sort((a, b) => a.lastActivityMinutes - b.lastActivityMinutes);
        break;
      case "oldest":
        result.sort((a, b) => b.lastActivityMinutes - a.lastActivityMinutes);
        break;
      case "mostReplies":
        result.sort((a, b) => b.replies - a.replies);
        break;
    }

    return result;
  }, [threads, filterTab, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedThreads.length / ITEMS_PER_PAGE);
  const paginatedThreads = filteredAndSortedThreads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filter/sort changes
  const handleFilterChange = (tab: FilterTab) => {
    setFilterTab(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  const handleCreateTopic = () => {
    if (!newTopicTitle.trim()) return;

    const newThread: Thread = {
      id: Math.max(...threads.map((t) => t.id)) + 1,
      title: newTopicTitle,
      author: "Sina",
      authorAvatar: "SI",
      replies: 0,
      views: 1,
      lastActivity: "Just nüüd",
      lastActivityMinutes: 0,
      isPinned: false,
      isHot: false,
    };

    setThreads([newThread, ...threads]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setIsNewTopicOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tagasi foorumisse
        </Link>
      </div>

      {/* Category Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-3xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewTopicOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Uus teema</span>
          </button>
        </div>
      </div>

      {/* Filter/Sort Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTab === "all"
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Kõik teemad
            </button>
            <button
              onClick={() => handleFilterChange("pinned")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTab === "pinned"
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Kinnitatud
            </button>
            <button
              onClick={() => handleFilterChange("popular")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTab === "popular"
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Populaarsed
            </button>
          </div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="lastUpdated">Viimati uuendatud</option>
            <option value="newest">Uusimad enne</option>
            <option value="oldest">Vanemad enne</option>
            <option value="mostReplies">Enim vastuseid</option>
          </select>
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-3">
        {paginatedThreads.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Teemad puuduvad</p>
          </div>
        ) : (
          paginatedThreads.map((thread) => (
            <Link
              key={thread.id}
              to={`/thread/${thread.id}`}
              className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {thread.authorAvatar}
                  </div>

                  {/* Thread Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      {thread.isPinned && (
                        <Pin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      )}
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex-1">
                        {thread.title}
                      </h3>
                      {thread.isHot && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                          Populaarne
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium">{thread.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {thread.lastActivity}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{thread.replies} vastust</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{thread.views.toLocaleString()} vaatamist</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eelmine
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                page === currentPage
                  ? "bg-blue-600 dark:bg-blue-500 text-white"
                  : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Järgmine
          </button>
        </div>
      )}

      {/* New Topic Dialog */}
      <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Uus teema</DialogTitle>
            <DialogDescription>
              Loo uus teema kategoorias "{category.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pealkiri
              </label>
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder="Sisesta teema pealkiri..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sisu
              </label>
              <textarea
                value={newTopicContent}
                onChange={(e) => setNewTopicContent(e.target.value)}
                placeholder="Kirjuta oma teema sisu..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsNewTopicOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            >
              Tühista
            </button>
            <button
              onClick={handleCreateTopic}
              disabled={!newTopicTitle.trim()}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Loo teema
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
