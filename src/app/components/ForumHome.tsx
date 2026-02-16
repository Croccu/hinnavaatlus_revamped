import { Link } from "react-router";
import { MessageSquare, Users, Eye, Pin, TrendingUp } from "lucide-react";

const categories = [
  {
    id: "arvutid",
    name: "Arvutid ja IT",
    description: "Arvutid, sülearvutid, tahvelarvutid ja IT-varustus",
    topics: 15420,
    posts: 89234,
    icon: "💻",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "mobiil",
    name: "Mobiilid ja seadmed",
    description: "Nutitelefonid, kellad ja muud mobiilsed seadmed",
    topics: 12380,
    posts: 67891,
    icon: "📱",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "kodutehnika",
    name: "Kodutehnika",
    description: "Pesumasinad, külmikud, pliidid ja muu kodutehnika",
    topics: 8920,
    posts: 45672,
    icon: "🏠",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "meelelahutus",
    name: "Meelelahutus",
    description: "Televiisorid, audiovarustus, mängud ja konsoolid",
    topics: 10234,
    posts: 56783,
    icon: "🎮",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "auto",
    name: "Auto ja transport",
    description: "Autod, varuosad, rehvid ja tarvikud",
    topics: 7650,
    posts: 34521,
    icon: "🚗",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "sport",
    name: "Sport ja vaba aeg",
    description: "Spordivahendid, jalgrattad ja välivarustus",
    topics: 5430,
    posts: 23456,
    icon: "⚽",
    color: "bg-teal-100 text-teal-600",
  },
];

const popularThreads = [
  {
    id: 1,
    title: "Parim sülearvuti kuni 1000€?",
    category: "Arvutid ja IT",
    author: "TechFan",
    replies: 45,
    views: 1230,
    isPinned: true,
  },
  {
    id: 2,
    title: "iPhone 15 Pro vs Samsung S24 Ultra",
    category: "Mobiilid ja seadmed",
    author: "MobileUser",
    replies: 67,
    views: 2340,
    isPinned: false,
  },
  {
    id: 3,
    title: "Kus osta odavalt pesumasinat?",
    category: "Kodutehnika",
    author: "KoduOtsija",
    replies: 23,
    views: 890,
    isPinned: false,
  },
  {
    id: 4,
    title: "PS5 või Xbox Series X 2026?",
    category: "Meelelahutus",
    author: "Gamer123",
    replies: 89,
    views: 3450,
    isPinned: true,
  },
];

export function ForumHome() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Tere tulemast Hinnavaatlus Foorumisse!</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-4">
            Jaga kogemusi, küsi nõu ja aita teisi teha nutikaid ostuotsuseid
          </p>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-100 transition-colors">
            Alusta uut teemat
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Kategooriad</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{category.topics.toLocaleString()} teemat</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{category.posts.toLocaleString()} postitust</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Forum Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Foorumi statistika</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Teemasid</span>
              <span className="font-semibold text-gray-900 dark:text-white">60,034</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Postitusi</span>
              <span className="font-semibold text-gray-900 dark:text-white">317,557</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Liikmeid</span>
              <span className="font-semibold text-gray-900 dark:text-white">24,891</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Aktiivne täna</span>
              <span className="font-semibold text-green-600 dark:text-green-500">1,234</span>
            </div>
          </div>
        </div>

        {/* Popular Threads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Populaarsed teemad</h3>
          </div>
          <div className="space-y-4">
            {popularThreads.map((thread) => (
              <Link
                key={thread.id}
                to={`/thread/${thread.id}`}
                className="block group"
              >
                <div className="flex items-start gap-2">
                  {thread.isPinned && (
                    <Pin className="w-4 h-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {thread.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {thread.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {thread.views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Praegu kohal</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">1,234 kasutajat</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["User1", "TechGuru", "Shopper", "Admin", "ModUser", "+1229"].map((user) => (
              <span
                key={user}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {user}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}