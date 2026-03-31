import { Outlet, Link, useOutletContext } from "react-router";
import { Search, Menu, User, Bell, MessageSquare, Moon, Sun, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { getCurrentUser, logout as doLogout } from "../storage";

type LayoutContext = {
  searchQuery: string;
};

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}

export function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  // Re-check on every navigation (simple approach)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUser(getCurrentUser());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    doLogout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-500" />
              <div>
                <h1 className="font-semibold text-xl text-gray-900 dark:text-white">Hinnavaatlus</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Foorum</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Otsi teemasid, postitusi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">{currentUser}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logi välja</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline">Logi sisse</span>
                  </Link>
                  <Link
                    to="/auth"
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors hidden sm:block"
                  >
                    Registreeru
                  </Link>
                </>
              )}

              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ searchQuery } satisfies LayoutContext} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Foorum</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/page/reeglid" className="hover:text-blue-600 dark:hover:text-blue-400">Reeglid</Link></li>
                <li><Link to="/page/kkk" className="hover:text-blue-600 dark:hover:text-blue-400">KKK</Link></li>
                <li><Link to="/page/kontakt" className="hover:text-blue-600 dark:hover:text-blue-400">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Hinnavaatlus</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/page/pealeht" className="hover:text-blue-600 dark:hover:text-blue-400">Pealeht</Link></li>
                <li><Link to="/page/poed" className="hover:text-blue-600 dark:hover:text-blue-400">Poed</Link></li>
                <li><Link to="/page/hinnavordlus" className="hover:text-blue-600 dark:hover:text-blue-400">Hinnavõrdlus</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Abi</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/page/kasutustingimused" className="hover:text-blue-600 dark:hover:text-blue-400">Kasutustingimused</Link></li>
                <li><Link to="/page/privaatsus" className="hover:text-blue-600 dark:hover:text-blue-400">Privaatsus</Link></li>
                <li><Link to="/page/kupsised" className="hover:text-blue-600 dark:hover:text-blue-400">Küpsised</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Järgi meid</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026 Hinnavaatlus Foorum. Kõik õigused kaitstud.
          </div>
        </div>
      </footer>
    </div>
  );
}
