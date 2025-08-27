import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  User,
  Clock,
  Filter,
  Search,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

const SHEET_URL =
  'https://opensheet.elk.sh/13eeM4b6n5qSS4F_PtCDhNX3cEhzkxEbZEwPFILNYFAk/1';

// Helper format date ke dd/MM/yyyy
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // fallback kalau gagal parse
    }
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

// Skeleton Loading
const ArticleCardSkeleton = () => (
  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50 animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-10 bg-blue-400/50 dark:bg-blue-800/50 rounded-lg w-32"></div>
      </div>
    </div>
  </div>
);

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(SHEET_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      const mapped = data.map((item, index) => {
        const rawTimestamp = item['Timestamp'];
        const finalDate = rawTimestamp
          ? formatDate(rawTimestamp)
          : 'Tanggal tidak tersedia';

        return {
          id: index + 1,
          title: item['Judul Artikel'],
          excerpt: item['Materi Artikel Bagian 1']?.slice(0, 150) + '...',
          content:
            (item['Materi Artikel Bagian 1'] || '') +
            '\n\n' +
            (item['Materi Artikel Bagian 2'] || ''),
          author: 'AdvanTech Team',
          date: finalDate,
          category: item['Kategori'] || 'Umum',
          readTime: item['Durasi Baca'] || '5 min',
          tags: ['Artikel', 'Tim'],
          image: item['Link Gambar 1 (Header)'],
          conclusion: item['Kesimpulan'],
        };
      });

      setArticles(mapped);
    } catch (err) {
      console.error('Failed to fetch from spreadsheet:', err);
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    let filtered = [...articles];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (a) =>
          a.category &&
          a.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const categories = [
    'all',
    ...new Set(articles.map((a) => a.category || 'Umum')),
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-blue-300/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-purple-300/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-full text-sm font-medium text-blue-600 dark:text-blue-300">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Pengetahuan • Wawasan • Inovasi
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Artikel & Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Jelajahi koleksi artikel mendalam yang ditulis langsung melalui Google Spreadsheet
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-grow w-full md:w-auto md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 flex-grow">
                <Filter className="text-gray-500" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'all' ? 'Semua Kategori' : c}
                    </option>
                  ))}
                </select>
              </div>
              <motion.button
                onClick={fetchArticles}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Refresh articles"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-12 bg-slate-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 rounded-lg"
            >
              <p className="text-yellow-800 dark:text-yellow-200">
                Gagal memuat data dari Google Sheets. Silakan coba beberapa saat lagi.
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 dark:border-gray-700/50 flex flex-col group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={16} className="mr-1.5" />
                      <span className="mr-4">{article.date}</span>
                      <Clock size={16} className="mr-1.5" />
                      <span>{article.readTime} Membaca</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {article.author}
                        </span>
                      </div>

                      <Link to={`/articles/${article.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          Baca Selengkapnya
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-12 md:col-span-2 lg:col-span-3">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Tidak ada artikel yang cocok dengan pencarian Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
