import { useParams, Link } from "react-router";
import { ArrowLeft, ThumbsUp, Share2, Flag, MessageSquare, Award } from "lucide-react";
import { useState } from "react";

const posts = [
  {
    id: 1,
    author: "TechFan",
    authorAvatar: "TF",
    role: "Liige",
    postCount: 1234,
    joinDate: "Jan 2024",
    content: `Tere! Otsin head sülearvutit kuni 1000€ eelarves. Peamiselt vajan seda programmeerimiseks ja kergemaks videotöötluseks.
    
Olen vaadanud järgmisi mudeleid:
- Lenovo ThinkPad E15
- HP ProBook 450 G9
- Dell Latitude 3520

Kas kellelgi on kogemusi nende mudelitega? Mida soovitaksite?`,
    timestamp: "2 tundi tagasi",
    likes: 12,
    isOriginalPoster: true,
  },
  {
    id: 2,
    author: "LaptopExpert",
    authorAvatar: "LE",
    role: "Ekspert",
    postCount: 5678,
    joinDate: "Mar 2023",
    content: `ThinkPad E15 on väga hea valik! Olen ise kasutanud ja võin soovitada. Klaviatuur on suurepärane pikaks tööks ja ehitus on väga tugev.
    
Dell Latitude on ka hea, aga veidi kallim kui teised. HP ProBook ei ole nii vastupidav kui teised kaks.`,
    timestamp: "1 tund tagasi",
    likes: 8,
    isOriginalPoster: false,
    isBestAnswer: true,
  },
  {
    id: 3,
    author: "BudgetShopper",
    authorAvatar: "BS",
    role: "Liige",
    postCount: 234,
    joinDate: "Nov 2025",
    content: `Ma ostin hiljuti Lenovo ThinkPad E15 ja olen väga rahul! Hind oli umbes 850€ ja jõudlus on suurepärane. Sain ka SSD upgrade tehtud.`,
    timestamp: "45 minutit tagasi",
    likes: 5,
    isOriginalPoster: false,
  },
  {
    id: 4,
    author: "TechFan",
    authorAvatar: "TF",
    role: "Liige",
    postCount: 1234,
    joinDate: "Jan 2024",
    content: `Tänan soovituste eest! Arvan, et lähen Lenovo ThinkPad E15-ga. Kust saaks parima hinna?`,
    timestamp: "20 minutit tagasi",
    likes: 2,
    isOriginalPoster: true,
  },
];

export function ThreadView() {
  const { threadId } = useParams<{ threadId: string }>();
  const [replyText, setReplyText] = useState("");

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Foorum
          </Link>
          <span>/</span>
          <Link to="/category/arvutid" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Arvutid ja IT
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Parim sülearvuti kuni 1000€?</span>
        </div>
      </div>

      {/* Thread Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Parim sülearvuti kuni 1000€?
          </h1>
          <Link
            to="/category/arvutid"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tagasi</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {posts.length} vastust
          </span>
          <span>1,230 vaatamist</span>
          <span>Viimati uuendatud 20 minutit tagasi</span>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4 mb-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`bg-white dark:bg-gray-800 rounded-lg border ${
              post.isBestAnswer ? "border-green-300 dark:border-green-700 shadow-sm" : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {post.isBestAnswer && (
              <div className="bg-green-50 dark:bg-green-900/30 border-b border-green-200 dark:border-green-800 px-6 py-2 flex items-center gap-2 rounded-t-lg">
                <Award className="w-4 h-4 text-green-600 dark:text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Parim vastus</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex gap-6">
                {/* Author Info Sidebar */}
                <div className="w-40 flex-shrink-0 hidden md:block">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl mx-auto mb-3">
                      {post.authorAvatar}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{post.author}</h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full mb-2">
                      {post.role}
                    </span>
                    {post.isOriginalPoster && (
                      <span className="block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full mb-2">
                        Autor
                      </span>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <div>Postitusi: {post.postCount.toLocaleString()}</div>
                      <div>Liitunud: {post.joinDate}</div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  {/* Mobile Author Info */}
                  <div className="flex items-center gap-3 mb-4 md:hidden">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                        {post.isOriginalPoster && (
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                            Autor
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                    </div>
                  </div>

                  {/* Desktop Timestamp */}
                  <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {post.timestamp}
                  </div>

                  {/* Post Text */}
                  <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-4">
                    {post.content}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Jaga</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <Flag className="w-4 h-4" />
                      <span className="text-sm">Teata</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Kirjuta vastus</h3>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Kirjuta oma vastus siia..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Palun ole viisakas ja järgi foorumi reegleid
          </div>
          <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Postita vastus
          </button>
        </div>
      </div>
    </div>
  );
}