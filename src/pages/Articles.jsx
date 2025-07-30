import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, Search, Filter, Eye } from 'lucide-react';
import { useExcelData } from '../hooks/useExcelData';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);

  // URL untuk Google Sheets (format CSV export)
  // Ganti dengan URL Google Sheets Anda yang sudah di-publish sebagai CSV
  const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv';
  
  // Contoh data articles jika tidak menggunakan Google Sheets
  const sampleArticles = [
    {
      id: 1,
      title: "Masa Depan Artificial Intelligence dalam Bisnis",
      excerpt: "Bagaimana AI mengubah landscape bisnis modern dan apa yang perlu disiapkan perusahaan untuk mengadopsi teknologi ini secara efektif.",
      content: "Artificial Intelligence (AI) telah menjadi salah satu teknologi paling transformatif dalam dekade ini...",
      author: "Dr. Ahmad Rizki",
      date: "2024-01-15",
      category: "AI & Machine Learning",
      readTime: "8 min read",
      tags: ["AI", "Business", "Technology", "Innovation"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
      views: 1250
    },
    {
      id: 2,
      title: "Panduan Lengkap React 18 dan Fitur Terbaru",
      excerpt: "Eksplorasi mendalam tentang fitur-fitur baru React 18 termasuk Concurrent Features, Suspense, dan Server Components.",
      content: "React 18 membawa berbagai peningkatan signifikan yang mengubah cara kita membangun aplikasi web...",
      author: "Sari Dewi",
      date: "2024-01-12",
      category: "Web Development",
      readTime: "12 min read",
      tags: ["React", "JavaScript", "Frontend", "Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      views: 890
    },
    {
      id: 3,
      title: "Cloud Computing: AWS vs Azure vs Google Cloud",
      excerpt: "Perbandingan komprehensif antara tiga provider cloud terbesar dan panduan memilih yang tepat untuk bisnis Anda.",
      content: "Dalam era digital ini, cloud computing telah menjadi backbone infrastruktur IT modern...",
      author: "Budi Santoso",
      date: "2024-01-10",
      category: "Cloud Computing",
      readTime: "15 min read",
      tags: ["AWS", "Azure", "Google Cloud", "Infrastructure"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      views: 2100
    },
    {
      id: 4,
      title: "Cybersecurity Best Practices untuk Developer",
      excerpt: "Panduan essential untuk mengembangkan aplikasi yang aman dan melindungi data pengguna dari berbagai ancaman cyber.",
      content: "Keamanan siber bukan lagi pilihan, tetapi keharusan dalam pengembangan aplikasi modern...",
      author: "Maya Putri",
      date: "2024-01-08",
      category: "Security",
      readTime: "10 min read",
      tags: ["Security", "Best Practices", "Development", "Privacy"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      views: 756
    },
    {
      id: 5,
      title: "DevOps Culture: Transformasi Digital yang Efektif",
      excerpt: "Bagaimana implementasi budaya DevOps dapat meningkatkan efisiensi tim development dan operational excellence.",
      content: "DevOps bukan hanya tentang tools dan teknologi, tetapi fundamental tentang budaya dan mindset...",
      author: "Andi Wijaya",
      date: "2024-01-05",
      category: "DevOps",
      readTime: "11 min read",
      tags: ["DevOps", "Culture", "Automation", "CI/CD"],
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
      views: 1340
    },
    {
      id: 6,
      title: "UI/UX Design Trends 2024",
      excerpt: "Tren desain terbaru yang akan mendominasi industri digital dan bagaimana mengimplementasikannya dalam proyek Anda.",
      content: "Industri UI/UX design terus berkembang dengan tren dan teknologi baru yang emerging...",
      author: "Lisa Maharani",
      date: "2024-01-03",
      category: "Design",
      readTime: "9 min read",
      tags: ["UI/UX", "Design", "Trends", "User Experience"],
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
      views: 980
    }
  ];

  const { data: excelData, loading, error } = useExcelData(GOOGLE_SHEETS_URL);
  
  // Gunakan data dari Excel/Google Sheets jika tersedia, jika tidak gunakan sample data
  const articles = excelData.length > 0 ? excelData : sampleArticles;

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Artikel & Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Jelajahi koleksi artikel mendalam tentang teknologi, tutorial, dan insights industri 
              yang ditulis oleh para ahli kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
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

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200">
                Gagal memuat data dari Google Sheets. Menampilkan artikel contoh.
              </p>
            </div>
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
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
                    {article.views && (
                      <div className="absolute top-4 right-4 flex items-center bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        <Eye size={12} className="mr-1" />
                        {article.views}
                      </div>
                    )}
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

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {article.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
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
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
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

      {/* Data Integration Info */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Konten yang Selalu Update
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Artikel kami dikelola melalui Google Sheets yang memungkinkan tim untuk menambah 
              dan mengupdate konten secara real-time tanpa perlu mengubah kode website.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Google Sheets Integration
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Kelola artikel langsung dari spreadsheet online
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  Real-time Updates
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Konten ter-update otomatis saat spreadsheet diubah
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  Team Collaboration
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Tim dapat berkolaborasi mengelola konten dengan mudah
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
