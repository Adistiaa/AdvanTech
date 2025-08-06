import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  User,
  Clock,
  Tag,
  Search,
  Filter,
  Eye,
  Sparkles,
} from 'lucide-react';

// URL Google Spreadsheet kamu:
const SHEET_URL =
  'https://opensheet.elk.sh/13eeM4b6n5qSS4F_PtCDhNX3cEhzkxEbZEwPFILNYFAk/1';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch dari Google Sheets
  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item, index) => ({
          id: index + 1,
          title: item['Judul Artikel'],
          excerpt: item['Materi Artikel Bagian 1']?.slice(0, 150) + '...',
          content: item['Materi Artikel Bagian 1'] + '\n\n' + item['Materi Artikel Bagian 2'],
          author: 'AdvanTech Team',
          date: new Date().toISOString().split('T')[0],
          category: item['Kategori'] || 'Umum',
          readTime: `${Math.ceil(
            ((item['Materi Artikel Bagian 1']?.length || 0) +
              (item['Materi Artikel Bagian 2']?.length || 0)) /
              650
          )} min read`,
          tags: ['Artikel', 'Tim'],
          image: item['Link Gambar 1 (Header)'],
          conclusion: item['Kesimpulan'],
        }));

        setArticles(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal fetch dari spreadsheet:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...articles];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) =>
          article.category &&
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const categories = [
    'all',
    ...new Set(articles.map((article) => article.category || 'Umum')),
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading articles...</p>
        </div>
      </div>
    );
  }

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

      {/* SEARCH + FILTER */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-12 bg-white dark:bg-gray-900">
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

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Tidak ada artikel yang ditemukan.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 dark:border-gray-700/50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={16} className="mr-1" />
                      <span className="mr-4">{new Date(article.date).toLocaleDateString('id-ID')}</span>
                      <Clock size={16} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {article.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-100/70 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          >
                            <Tag size={10} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {article.author}
                        </span>
                      </div>

                      <Link to={`/articles/${article.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                        >
                          Baca Selengkapnya
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
