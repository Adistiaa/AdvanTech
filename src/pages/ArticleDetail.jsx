import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, Clock, Tag, Eye, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample articles data (in real app, this would come from your data source)
  const sampleArticles = [
    {
      id: 1,
      title: "Masa Depan Artificial Intelligence dalam Bisnis",
      excerpt: "Bagaimana AI mengubah landscape bisnis modern dan apa yang perlu disiapkan perusahaan untuk mengadopsi teknologi ini secara efektif.",
      content: `
        <h2>Pendahuluan</h2>
        <p>Artificial Intelligence (AI) telah menjadi salah satu teknologi paling transformatif dalam dekade ini. Dari startup hingga perusahaan Fortune 500, semua berlomba-lomba mengintegrasikan AI ke dalam operasional mereka. Namun, apa sebenarnya yang membuat AI begitu revolusioner, dan bagaimana bisnis dapat mempersiapkan diri untuk masa depan yang didominasi teknologi ini?</p>
        
        <h2>Transformasi Industri melalui AI</h2>
        <p>AI tidak hanya mengubah cara kita bekerja, tetapi juga mendefinisi ulang seluruh model bisnis. Beberapa area yang paling terpengaruh meliputi:</p>
        
        <h3>1. Otomatisasi Proses Bisnis</h3>
        <p>AI memungkinkan otomatisasi tugas-tugas repetitif yang sebelumnya memerlukan intervensi manusia. Dari chatbot customer service hingga sistem analisis data, AI dapat menangani volume pekerjaan yang jauh lebih besar dengan akurasi yang konsisten.</p>
        
        <h3>2. Personalisasi Experience</h3>
        <p>Machine learning algorithms dapat menganalisis perilaku pengguna dan memberikan rekomendasi yang highly personalized. Netflix, Amazon, dan Spotify adalah contoh sempurna bagaimana AI dapat meningkatkan user experience secara signifikan.</p>
        
        <h3>3. Predictive Analytics</h3>
        <p>Kemampuan AI dalam menganalisis pattern data historis memungkinkan bisnis untuk membuat prediksi yang akurat tentang tren pasar, perilaku konsumen, dan potensi risiko.</p>
        
        <h2>Strategi Implementasi AI</h2>
        <p>Untuk berhasil mengadopsi AI, perusahaan perlu memiliki strategi yang komprehensif:</p>
        
        <ul>
          <li><strong>Data Strategy:</strong> AI membutuhkan data berkualitas tinggi. Pastikan infrastruktur data Anda solid sebelum mengimplementasikan AI.</li>
          <li><strong>Talent Acquisition:</strong> Investasi dalam talent AI atau partnership dengan expert adalah crucial untuk kesuksesan implementasi.</li>
          <li><strong>Gradual Implementation:</strong> Mulai dengan use case yang sederhana dan proven, kemudian scale up secara bertahap.</li>
          <li><strong>Ethical Considerations:</strong> Pastikan AI implementation Anda transparent dan ethical, terutama dalam hal bias dan privacy.</li>
        </ul>
        
        <h2>Challenges dan Solutions</h2>
        <p>Meskipun potensial AI sangat besar, ada beberapa tantangan yang perlu diatasi:</p>
        
        <h3>Data Quality dan Quantity</h3>
        <p>AI model hanya sebaik data yang digunakan untuk training. Poor data quality akan menghasilkan poor AI performance. Solusinya adalah investasi dalam data cleaning, standardization, dan governance processes.</p>
        
        <h3>Skill Gap</h3>
        <p>Shortage AI talent adalah masalah global. Perusahaan dapat mengatasi ini melalui internal training programs, partnerships dengan universities, atau outsourcing ke AI specialists.</p>
        
        <h3>Integration Complexity</h3>
        <p>Mengintegrasikan AI dengan existing systems bisa complex. Planned migration strategy dan possibly hybrid approaches dapat membantu smooth transition.</p>
        
        <h2>Masa Depan AI dalam Bisnis</h2>
        <p>Looking ahead, beberapa trend AI yang akan mendominasi bisnis:</p>
        
        <h3>Edge AI</h3>
        <p>Processing AI di edge devices akan mengurangi latency dan meningkatkan privacy. Ini akan particularly beneficial untuk IoT applications dan real-time decision making.</p>
        
        <h3>Explainable AI</h3>
        <p>Demand untuk AI transparency akan mendorong development explainable AI yang dapat memberikan reasoning behind decisions mereka.</p>
        
        <h3>AI Democratization</h3>
        <p>No-code/low-code AI platforms akan membuat AI accessible untuk non-technical users, memungkinkan wider adoption across organizations.</p>
        
        <h2>Kesimpulan</h2>
        <p>AI adalah future of business, bukan lagi question of "if" tetapi "when" dan "how". Perusahaan yang memulai AI journey mereka sekarang akan memiliki competitive advantage yang signifikan. Key success factors meliputi strong data foundation, right talent, gradual implementation approach, dan commitment untuk continuous learning dan adaptation.</p>
        
        <p>Masa depan belongs to organizations yang dapat effectively leverage AI untuk enhance human capabilities, bukan replace them. AI terbaik adalah yang augments human intelligence dan creativity, creating synergy yang powerful untuk business growth dan innovation.</p>
      `,
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
      content: `
        <h2>Pendahuluan React 18</h2>
        <p>React 18 adalah major release yang membawa fundamental changes dalam cara React bekerja. Dengan focus pada performance dan user experience, React 18 memperkenalkan Concurrent Features yang memungkinkan React untuk interrupt, pause, resume, dan abandon renders.</p>
        
        <h2>Concurrent Features</h2>
        <p>Concurrent Features adalah star of React 18. Ini memungkinkan React untuk work on multiple tasks simultaneously dan prioritize important updates.</p>
        
        <h3>Automatic Batching</h3>
        <p>React 18 automatically batches multiple state updates into single re-render untuk better performance. Ini bekerja tidak hanya untuk React events, tetapi juga untuk promises, timeouts, dan native event handlers.</p>
        
        <code>
        // Before React 18 - 2 renders
        setTimeout(() => {
          setCount(c => c + 1);
          setFlag(f => !f);
        }, 1000);
        
        // React 18 - 1 render (automatic batching)
        </code>
        
        <h3>Transitions</h3>
        <p>Transitions adalah new concept yang allows you to mark updates as non-urgent. Ini helpful untuk expensive operations yang tidak perlu immediate response.</p>
        
        <code>
        import { startTransition } from 'react';
        
        // Urgent: Show what was typed
        setInputValue(input);
        
        // Mark as non-urgent: Show the results
        startTransition(() => {
          setSearchQuery(input);
        });
        </code>
        
        <h2>Suspense Improvements</h2>
        <p>React 18 membawa significant improvements untuk Suspense, including support untuk server-side rendering dan better error boundaries integration.</p>
        
        <h3>Suspense for Data Fetching</h3>
        <p>While still experimental, React 18 mempersiapkan groundwork untuk Suspense data fetching yang akan revolutionize how we handle async operations in React.</p>
        
        <h2>Server Components</h2>
        <p>React Server Components adalah paradigm baru yang memungkinkan components untuk render di server, reducing bundle size dan improving performance.</p>
        
        <h3>Benefits of Server Components</h3>
        <ul>
          <li>Zero bundle size impact</li>
          <li>Direct access to server-side resources</li>
          <li>Automatic code splitting</li>
          <li>Better SEO dan initial page load</li>
        </ul>
        
        <h2>New Hooks</h2>
        
        <h3>useId</h3>
        <p>useId adalah new hook untuk generating unique IDs yang stable across server dan client.</p>
        
        <code>
        function Checkbox() {
          const id = useId();
          return (
            <>
              <label htmlFor={id}>Do you like React?</label>
              <input id={id} type="checkbox" name="react"/>
            </>
          );
        }
        </code>
        
        <h3>useDeferredValue</h3>
        <p>useDeferredValue allows you to defer updates untuk non-critical parts of UI.</p>
        
        <code>
        function App() {
          const [text, setText] = useState("hello");
          const deferredText = useDeferredValue(text);
          return (
            <div>
              <input value={text} onChange={e => setText(e.target.value)} />
              <SlowList text={deferredText} />
            </div>
          );
        }
        </code>
        
        <h3>useSyncExternalStore</h3>
        <p>Hook ini designed untuk library authors yang need to integrate dengan external stores.</p>
        
        <h2>Strict Mode Changes</h2>
        <p>React 18 Strict Mode sekarang double-invokes effects untuk better detecting side effects dan ensuring your app works correctly dengan future React features.</p>
        
        <h2>Migration Guide</h2>
        
        <h3>Updating to React 18</h3>
        <code>
        npm install react@18 react-dom@18
        </code>
        
        <h3>Root API Changes</h3>
        <p>React 18 memperkenalkan new Root API:</p>
        
        <code>
        // Before
        import { render } from 'react-dom';
        render(<App />, container);
        
        // After
        import { createRoot } from 'react-dom/client';
        const root = createRoot(container);
        root.render(<App />);
        </code>
        
        <h2>Best Practices</h2>
        
        <h3>Using Concurrent Features</h3>
        <ul>
          <li>Use startTransition untuk non-urgent updates</li>
          <li>Implement proper loading states dengan Suspense</li>
          <li>Avoid blocking main thread dengan expensive computations</li>
        </ul>
        
        <h3>Performance Optimization</h3>
        <ul>
          <li>Leverage automatic batching</li>
          <li>Use useMemo dan useCallback strategically</li>
          <li>Implement proper code splitting</li>
        </ul>
        
        <h2>Kesimpulan</h2>
        <p>React 18 adalah major step forward dalam React ecosystem. Dengan Concurrent Features, improved Suspense, dan new hooks, React 18 provides tools untuk building more responsive dan performant applications.</p>
        
        <p>Key takeaway adalah bahwa React 18 backwards compatible, jadi migration bisa gradual. Start dengan updating root API, kemudian gradually adopt new features sesuai kebutuhan aplikasi Anda.</p>
      `,
      author: "Sari Dewi",
      date: "2024-01-12",
      category: "Web Development",
      readTime: "12 min read",
      tags: ["React", "JavaScript", "Frontend", "Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      views: 890
    }
    // Add more articles here...
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundArticle = sampleArticles.find(article => article.id === parseInt(id));
      setArticle(foundArticle);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

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
          <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
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
            <div className="absolute bottom-6 right-6 flex items-center bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              <Eye size={16} className="mr-1" />
              {article.views}
            </div>
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
                <span>{article.readTime}</span>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                >
                  <Tag size={12} className="inline mr-1" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Bagikan:</span>
              <button
                onClick={() => shareArticle('facebook')}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook size={16} />
              </button>
              <button
                onClick={() => shareArticle('twitter')}
                className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={() => shareArticle('linkedin')}
                className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              >
                <Linkedin size={16} />
              </button>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </motion.div>

        {/* Related Articles CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">
              Nikmati Artikel Lainnya
            </h3>
            <p className="text-blue-100 mb-6">
              Jelajahi koleksi artikel menarik lainnya dari tim AdvantechJournals
            </p>
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
