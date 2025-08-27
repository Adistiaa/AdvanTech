import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, User, Clock, Tag,
  Share2, ArrowLeft, Facebook, Twitter, Linkedin,
  ChevronRight, List,
  Home
} from 'lucide-react';

// URL untuk mengambil data dari Google Sheet
const SHEET_URL = 'https://opensheet.elk.sh/13eeM4b6n5qSS4F_PtCDhNX3cEhzkxEbZEwPFILNYFAk/1';

// Helper format date ke dd/MM/yyyy
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // fallback kalau gagal parse
    }
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item, index) => ({
          id: index + 1,
          title: item['Judul Artikel'],
          content: formatToHTML(item),
          author: item['Author'] || 'AdvanTech Team',
          date: item['Timestamp'] || '2025-01-01',
          readTime: item['Durasi Baca'] || '5 min',
          category: item['Kategori'] || 'Umum',
          image: item['Link Gambar 1 (Header)'] || 'https://placehold.co/800x400/3b82f6/ffffff?text=AdvanTech',
          image2: item['Link Gambar 2 (Isi Materi)']
        }));

        const found = formatted.find(a => a.id === parseInt(id));
        setArticle(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil artikel:", err);
        setLoading(false);
      });
      
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [id]);

  // Format HTML dari Google Sheets
  const formatToHTML = (item) => {
    const headingStyle = "text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8 border-l-4 border-blue-600 pl-4";
    return `
      <h2 id="pendahuluan" class="${headingStyle}">Pendahuluan</h2>
      <p>${item['Materi Artikel Bagian 1']}</p>
      ${item['Link Gambar 2 (Isi Materi)'] ? `<img src="${item['Link Gambar 2 (Isi Materi)']}" alt="Gambar Konten" class="my-6 rounded-lg shadow-md border-radius-5" />` : ''}
      <h2 id="isi" class="${headingStyle}">Isi</h2>
      <p>${item['Materi Artikel Bagian 2']}</p>
      <h2 id="kesimpulan" class="${headingStyle}">Kesimpulan</h2>
      <p>${item['Kesimpulan']}</p>
    `;
  };

  // Share Artikel
  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-600 dark:text-gray-300">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Maaf, artikel yang Anda cari tidak tersedia.
          </p>
          <Link to="/articles">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={20} />
              Kembali ke Daftar Artikel
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-6"
        >
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Home size={16} className="mr-1" />
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/articles" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Artikel
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
              {article.title}
            </span>
          </div>
        </motion.nav>

        {/* Tombol Kembali */}
        <Link to="/articles" className="inline-block mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Artikel
          </motion.button>
        </Link>
      </div>

      {/* Konten Artikel */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Gambar Utama */}
          <div className="relative h-64 md:h-80">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x400/3b82f6/ffffff?text=Gambar+Error' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                {article.category}
              </span>
            </div>
          </div>

          {/* Isi Konten */}
          <div className="p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center"><User size={16} className="mr-2" /><span>{article.author}</span></div>
              <div className="flex items-center"><Calendar size={16} className="mr-2" /><span>{formatDate(article.date)}</span></div>
              <div className="flex items-center"><Clock size={16} className="mr-2" /><span>{article.readTime} membaca</span></div>
            </motion.div>

            {/* Daftar Isi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <List size={20} className="mr-2 text-blue-600"/>
                Daftar Isi
              </h3>
              <ul className="space-y-2 list-inside">
                <li><a href="#pendahuluan" className="text-blue-600 dark:text-blue-400 hover:underline">1. Pendahuluan</a></li>
                <li><a href="#isi" className="text-blue-600 dark:text-blue-400 hover:underline">2. Isi</a></li>
                <li><a href="#kesimpulan" className="text-blue-600 dark:text-blue-400 hover:underline">3. Kesimpulan</a></li>
              </ul>
            </motion.div>

            {/* Tombol Bagikan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bagikan artikel ini:</span>
              <button onClick={() => shareArticle('facebook')} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><Facebook size={16} /></button>
              <button onClick={() => shareArticle('twitter')} className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"><Twitter size={16} /></button>
              <button onClick={() => shareArticle('linkedin')} className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"><Linkedin size={16} /></button>
            </motion.div>

            {/* Isi Artikel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none dark:text-white"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Suka dengan artikel ini?</h3>
            <p className="text-blue-100 mb-6">Jelajahi lebih banyak wawasan dan analisis mendalam dari tim AdvanTechJournals.</p>
            <Link to="/articles">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Lihat Semua Artikel
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default ArticleDetail;
