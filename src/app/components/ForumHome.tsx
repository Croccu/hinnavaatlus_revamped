import { Link, useNavigate } from "react-router";
import {
  MessageSquare,
  Users,
  Eye,
  Pin,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useMemo } from "react";
import { getCurrentUser } from "../storage";
import { useLayoutContext } from "./Layout";

const categories = [
  {
    id: "arvutid",
    name: "Arvutid ja IT",
    description: "Arvutid, sülearvutid, tahvelarvutid ja IT-varustus",
    topics: 15420,
    posts: 89234,
    icon: "💻",
    color: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20",
  },
  {
    id: "mobiil",
    name: "Mobiilid ja seadmed",
    description: "Nutitelefonid, kellad ja muud mobiilsed seadmed",
    topics: 12380,
    posts: 67891,
    icon: "📱",
    color: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20",
  },
  {
    id: "kodutehnika",
    name: "Kodutehnika",
    description: "Pesumasinad, külmikud, pliidid ja muu kodutehnika",
    topics: 8920,
    posts: 45672,
    icon: "🏠",
    color: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
  },
  {
    id: "meelelahutus",
    name: "Meelelahutus",
    description: "Televiisorid, audiovarustus, mängud ja konsoolid",
    topics: 10234,
    posts: 56783,
    icon: "🎮",
    color: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
  },
  {
    id: "auto",
    name: "Auto ja transport",
    description: "Autod, varuosad, rehvid ja tarvikud",
    topics: 7650,
    posts: 34521,
    icon: "🚗",
    color: "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20",
  },
  {
    id: "sport",
    name: "Sport ja vaba aeg",
    description: "Spordivahendid, jalgrattad ja välivarustus",
    topics: 5430,
    posts: 23456,
    icon: "⚽",
    color: "bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20",
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

const forumStats = [
  { label: "Teemasid", value: "60,034" },
  { label: "Postitusi", value: "317,557" },
  { label: "Liikmeid", value: "24,891" },
  { label: "Aktiivne täna", value: "1,234", accent: true },
];

export function ForumHome() {
  const navigate = useNavigate();
  const { searchQuery } = useLayoutContext();

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredThreads = useMemo(() => {
    if (!searchQuery.trim()) return popularThreads;
    const q = searchQuery.toLowerCase();
    return popularThreads.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.author.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleNewTopic = () => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/category/arvutid");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-[0_20px_60px_-20px_rgba(37,99,235,0.55)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_25%)]" />
          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-sm">
              Eesti ostuabi kogukond
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tere tulemast Hinnavaatlus Foorumisse!
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
              Jaga kogemusi, küsi nõu ja aita teisi teha nutikaid ostuotsuseid.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={handleNewTopic}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Alusta uut teemat
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-sm text-blue-100/90">
                Üle <span className="font-semibold text-white">60 000</span> teema
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Kategooriad
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredCategories.length} kategooriat
            </span>
          </div>

          <div className="space-y-4">
            {filteredCategories.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">
                  Kategooriaid ei leitud
                </p>
              </div>
            )}

            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group block"
              >
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-950/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500/40">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${category.color}`}
                    >
                      {category.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                            {category.name}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>

                        <ArrowRight className="mt-1 hidden h-5 w-5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500 sm:block" />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{category.topics.toLocaleString()} teemat</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{category.posts.toLocaleString()} postitust</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
            Foorumi statistika
          </h3>

          <div className="space-y-4">
            {forumStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 dark:border-gray-800"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
                <span
                  className={`text-base font-semibold ${
                    stat.accent
                      ? "text-emerald-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-5 flex items-center gap-2">
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Populaarsed teemad
            </h3>
          </div>

          <div className="space-y-4">
            {filteredThreads.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Teemad puuduvad
              </p>
            )}

            {filteredThreads.map((thread, index) => (
              <Link
                key={thread.id}
                to={`/thread/${thread.id}`}
                className="group block"
              >
                <div className="rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                      {thread.isPinned ? (
                        <Pin className="h-3.5 w-3.5" />
                      ) : (
                        <span className="text-[11px] font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {thread.title}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {thread.category} · {thread.author}
                      </p>

                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {thread.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {thread.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Praegu kohal
          </h3>

          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>1,234 kasutajat online</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["User1", "TechGuru", "Shopper", "Admin", "ModUser", "+1229"].map(
              (user) => (
                <span
                  key={user}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {user}
                </span>
              )
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}