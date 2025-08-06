import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, User, Clock, Tag, Eye,
  Share2, ArrowLeft, Facebook, Twitter, Linkedin
} from 'lucide-react';

const SHEET_URL = 'https://opensheet.elk.sh/13eeM4b6n5qSS4F_PtCDhNX3cEhzkxEbZEwPFILNYFAk/1';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          // tags: (item['Tags'] || '').split(',').map(tag => tag.trim()),
          // views: parseInt(item['Views']) || 0,
          image: item['Link Gambar 1 (Header)'] || 'https://via.placeholder.com/600x400',
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
  }, [id]);

  const formatToHTML = (item) => {
    return `
      <h2>Pendahuluan</h2><p>${item['Materi Artikel Bagian 1']}</p>
      ${item['Link Gambar 2 (Isi Materi)'] ? `<img src="${item['Link Gambar 2 (Isi Materi)']}" alt="Gambar 2" />` : ''}
      <h2>Isi</h2><p>${item['Materi Artikel Bagian 2']}</p>
      <h2>Kesimpulan</h2><p>${item['Kesimpulan']}</p>
    `;
  };

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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading artikel...</p>
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
            Artikel yang Anda cari tidak tersedia.
          </p>
          <Link to="/articles">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={20} />
              Kembali ke Artikel
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/articles">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Artikel
          </motion.button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {article.category}
              </span>
            </div>
            {/* <div className="absolute bottom-6 right-6 flex items-center bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              <Eye size={16} className="mr-1" />
              {article.views}
            </div> */}
          </div>

          {/* Article Content */}
          <div className="p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {article.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(article.date).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{article.readTime} Membaca</span>
              </div>
            </motion.div>

            {/* Tags
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {article.category.map((cat, item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                >
                  <Tag size={12} className="inline mr-1" />
                  {cat}
                </span>
              ))}
            </motion.div> */}

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Bagikan:</span>
              <button onClick={() => shareArticle('facebook')} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={16} />
              </button>
              <button onClick={() => shareArticle('twitter')} className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                <Twitter size={16} />
              </button>
              <button onClick={() => shareArticle('linkedin')} className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin size={16} />
              </button>
            </motion.div>

            {/* Render HTML from spreadsheet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none"
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Nikmati Artikel Lainnya</h3>
            <p className="text-blue-100 mb-6">Jelajahi koleksi artikel menarik lainnya dari tim AdvantechJournals</p>
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
