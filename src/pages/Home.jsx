import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Quote, Github, Linkedin, Twitter, Mail,
  Lightbulb, Target, Code, Globe, Star, Shield, Zap, Heart, Users,
  Award, Clock, Plus, Minus, MapPin, Phone, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Komponen Latar Belakang Grid Animasi untuk Hero Section
const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, squareSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};


// Komponen Utama Halaman Home
const Home = () => {

  // --- DATA & LOGIC UNTUK SEMUA SECTION ---

  // Logic untuk scroll
  const scrollToNext = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Data untuk Team Members Section
  const teamMembers = [
    { name: "Muhammad Adistia Pratama", role: "Leader", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1743302996/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_qpobrr.jpg", bio: "I love designing and coding, Passionate about technology, slightly addicted to coffee.", skills: ["Leadership", "Strategy", "Business Development"], social: { linkedin: "#", twitter: "#", github: "#", email: "ahmad@advantechjournals.com" } },
    { name: "Ikhsan Rasyid Rabbani", role: "Co Leader", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1754537593/WhatsApp_Image_2025-08-07_at_10.10.45_5f128489_f2jhzn.jpg", bio: "Suka dengan mempelajari hal baru, berusaha berkembang setiap hari, dan berpikir jangka panjang.", skills: ["System Architecture", "Full-Stack Development", "DevOps"], social: { linkedin: "#", twitter: "#", github: "#", email: "sari@advantechjournals.com" } },
    { name: "Muvida Anggraeni", role: "Admin Sosial Media", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1754537592/WhatsApp_Image_2025-08-07_at_10.17.41_f514c881_o6enf7.jpg", bio: "Menyukai trend perkembangan yang sedang terjadi, kreatif, dan inovatif.", skills: ["React", "Node.js", "Machine Learning"], social: { linkedin: "#", twitter: "#", github: "#", email: "budi@advantechjournals.com" } },
    { name: "Arfa Satrio Anom", role: "Humas", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1754537592/WhatsApp_Image_2025-08-07_at_10.18.44_6dbfa9b6_mwr149.jpg", bio: "Creative designer yang berfokus pada user experience dan interface design yang intuitif.", skills: ["UI Design", "UX Research", "Prototyping"], social: { linkedin: "#", twitter: "#", github: "#", email: "maya@advantechjournals.com" } },
    { name: "Novita Anggraeni", role: "Bendahara", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1754537592/WhatsApp_Image_2025-08-07_at_10.20.55_e6bdaa4b_exfxiy.jpg", bio: "Infrastructure specialist dengan expertise dalam cloud computing dan automation.", skills: ["AWS", "Docker", "Kubernetes"], social: { linkedin: "#", twitter: "#", github: "#", email: "andi@advantechjournals.com" } },
    { name: "Nazwa Khairiyah", role: "Sekretaris", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1754537592/WhatsApp_Image_2025-08-07_at_10.15.40_96665cd3_d3o9lq.jpg", bio: "Strategic thinker yang menghubungkan kebutuhan bisnis dengan solusi teknologi.", skills: ["Product Strategy", "Market Research", "Agile"], social: { linkedin: "#", twitter: "#", github: "#", email: "lisa@advantechjournals.com" } }
  ];

  // Data untuk Testimonials Section
  // const testimonials = [
  //   { name: "Dr. Sarah Johnson", role: "CEO, TechCorp", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face", rating: 5, text: "Platform yang mereka kembangkan sangat user-friendly dan robust. Tim mereka sangat profesional." },
  //   { name: "Michael Chen", role: "CTO, InnovateHub", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", rating: 5, text: "Kualitas code dan arsitektur yang dibuat oleh tim AdvantechJournals luar biasa. Highly recommended!" },
  //   { name: "Rina Kartika", role: "Founder, StartupBaru", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", rating: 5, text: "AdvantechJournals tidak hanya deliver on time, tapi juga memberikan insights berharga untuk product." },
  // ];
  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);

  // Data dan Logic untuk FAQ Section
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqs = [
    { question: "Apa itu AdvanTech?", answer: "AdvanTech adalah tim teknologi yang fokus pada pengembangan solusi digital inovatif, termasuk web, mobile, dan AI." },
    { question: "Berapa lama waktu pengerjaan proyek?", answer: "Tergantung dengan kompleksitas fitur, serta deadline yang di berikan." },
    { question: "Apakah ada jaminan garansi?", answer: "Ya, kami memberikan garansi 6 bulan untuk bug fixing dan support 24/7." },
    { question: "Bagaimana proses kerjanya?", answer: "Kami menggunakan metodologi Agile: Konsultasi -> Desain -> Development -> Testing -> Deployment -> Support." },
  ];
  const toggleFAQ = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  // Data dan Logic untuk Quotes Section (sudah ada dari perubahan sebelumnya)
  const quotes = [
    {
      text: "Inovasi adalah kemampuan untuk melihat perubahan sebagai peluang, bukan ancaman.",
      author: "Steve Jobs",
      role: "Co-founder, Apple"
    },
    {
      text: "Kegagalan terbesar adalah tidak pernah mencoba. Di dunia yang berubah sangat cepat, satu-satunya strategi yang dijamin gagal adalah tidak mengambil risiko.",
      author: "Mark Zuckerberg",
      role: "Founder, Meta"
    },
    {
      text: "Saya pikir sangat mungkin bagi orang biasa untuk memilih menjadi luar biasa.",
      author: "Elon Musk",
      role: "CEO, SpaceX & Tesla"
    },
    {
      text: "Jika Anda tidak mau dikritik, jangan lakukan sesuatu yang baru.",
      author: "Jeff Bezos",
      role: "Founder, Amazon"
    }
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Ganti kutipan setiap 10 detik
    return () => clearTimeout(timer);
  }, [currentQuoteIndex, quotes.length]);


  return (
    <div className="bg-white dark:bg-gray-900">
      <main>
        {/* =================================================================== */}
        {/* SECTION 1: HERO                                                   */}
        {/* =================================================================== */}
        <section id="hero-section" className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 pt-20 pb-10 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-50">
              <Squares borderColor="rgba(156, 163, 175, 0.1)" speed={0.3} direction="diagonal" squareSize={50} />
            </div>
            <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-blue-300/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-purple-300/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
          },
              }}
            >
              <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mb-6"
              >
          <span className="inline-flex items-center px-4 py-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-full text-sm font-medium text-blue-600 dark:text-blue-300">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
            Inovasi • Teknologi • Masa Depan
          </span>
              </motion.div>

              <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
              >
          Membentuk Masa Depan dengan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            Teknologi Inovatif
          </span>
              </motion.h1>

              <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
              >
          AdvanTech: Partner untuk membangun solusi digital yang powerful, scalable, dan aman menuju bisnis ke level berikutnya.
              </motion.p>

              <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
          <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToNext('quotes-section')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full sm:w-auto">
            Mulai Perjalanan Anda
          </motion.button>
          <Link to="/articles" className="w-full sm:w-auto">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full px-8 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              Jelajahi Artikel <ArrowRight size={20} />
            </motion.button>
          </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <button onClick={() => scrollToNext('quotes-section')} className="p-2 group" aria-label="Scroll down">
              <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
          <ChevronDown size={32} />
              </motion.div>
            </button>
          </motion.div>

        </section>
        {/* =================================================================== */}
        {/* SECTION 2: QUOTES                                                 */}
        {/* =================================================================== */}
        <section id="quotes-section" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          <div className="max-w-4xl w-full mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              viewport={{ once: true, amount: 0.2 }} 
              className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50"
            >
              <motion.div 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                transition={{ delay: 0.2, duration: 0.7, type: "spring" }} 
                viewport={{ once: true }} 
                className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Quote className="text-white" size={28} />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="min-h-[280px] sm:min-h-[240px] md:min-h-[200px] flex flex-col justify-center"
                >
                  <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent font-bold">
                      "{quotes[currentQuoteIndex].text}"
                    </span>
                  </blockquote>
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 max-w-sm mx-auto" />
                  <div className="text-center">
                    <cite className="font-bold text-slate-700 dark:text-slate-200 not-italic text-xl block mb-1">— {quotes[currentQuoteIndex].author}</cite>
                    <p className="text-base text-slate-500 dark:text-slate-400">{quotes[currentQuoteIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentQuoteIndex === index ? 'bg-blue-500 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: WHY CHOOSE US                                          */}
        {/* =================================================================== */}
        <section id="why-choose-us-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-900/30 dark:to-gray-900">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Mengapa Memilih Kami?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Kami memberikan yang terbaik dengan komitmen penuh terhadap kepuasan dan kesuksesan klien.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield className="w-8 h-8" />, title: "Keamanan Terjamin", description: "Kami mengutamakan keamanan data dan privasi klien dengan standar enkripsi tingkat enterprise." },
                        { icon: <Zap className="w-8 h-8" />, title: "Inovasi Berkelanjutan", description: "Tim kami selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi terdepan." },
                        { icon: <Heart className="w-8 h-8" />, title: "Pelayanan Prima", description: "Kepuasan klien adalah prioritas utama dengan dukungan 24/7 dari tim profesional kami." },
                        { icon: <Users className="w-8 h-8" />, title: "Tim Berpengalaman", description: "Didukung oleh tim ahli dengan pengalaman bertahun-tahun di industri teknologi." },
                        { icon: <Award className="w-8 h-8" />, title: "Kualitas Terbaik", description: "Komitmen kami adalah menghasilkan produk berkualitas tinggi yang melampaui ekspektasi." },
                        { icon: <Clock className="w-8 h-8" />, title: "Efisiensi Waktu", description: "Proses pengembangan yang efisien memastikan proyek selesai tepat waktu." }
                    ].map((reason, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -5, scale: 1.02 }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50">
                            <div className="text-blue-600 dark:text-blue-400 mb-4">{reason.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{reason.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: TEAM STORY                                             */}
        {/* =================================================================== */}
        <section id="team-story-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Cerita Tim Kami</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Perjalanan dan makna di balik nama AdvanTech</p>
                </motion.div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
                        <Lightbulb className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Arti Nama "AdvanTech"</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong className="text-blue-600 dark:text-blue-400">Advan</strong> - Kepanjangan "Advanced", mencerminkan komitmen kami akan masa depan.</p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2"><strong className="text-blue-600 dark:text-blue-400">Tech</strong> - Melambangkan Teknologi yang akan selalu berkembang dan sangat di butuhkan.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50"><Target className="text-green-600 dark:text-green-400 mb-3" size={32} /><h4 className="text-xl font-bold text-gray-900 dark:text-white">Visi Kami</h4><p className="text-gray-700 dark:text-gray-300">Menjadi perusahaan teknologi terdepan yang mengubah interaksi dunia dengan digital.</p></div>
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50"><Code className="text-purple-600 dark:text-purple-400 mb-3" size={32} /><h4 className="text-xl font-bold text-gray-900 dark:text-white">Misi Kami</h4><p className="text-gray-700 dark:text-gray-300">Mengembangkan solusi inovatif yang memberikan nilai tambah nyata bagi klien.</p></div>
                    </motion.div>
                </div>
            </div>
        </section>
        
        {/* =================================================================== */}
        {/* SECTION 5: TEAM MEMBERS                                           */}
        {/* =================================================================== */}
        <section id="team-members-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="absolute top-10 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-10 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Tim Profesional Kami</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Bertemu dengan para ahli yang berdedikasi menghadirkan solusi teknologi terbaik.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50">
                            <div className="p-6 flex justify-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 object-cover rounded-full pointer-events-none"
                                    draggable="false"
                                    onDragStart={(e) => e.preventDefault()}
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{member.role}</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                                    {member.skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-blue-100/70 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 text-xs rounded-full">{skill}</span>)}
                                </div>
                                <div className="flex space-x-3 justify-center">
                                    <motion.a href={member.social.linkedin} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><Linkedin size={16} /></motion.a>
                                    <motion.a href={member.social.twitter} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"><Twitter size={16} /></motion.a>
                                    <motion.a href={member.social.github} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"><Github size={16} /></motion.a>
                                    <motion.a href={`mailto:${member.social.email}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"><Mail size={16} /></motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 6: TESTIMONIALS                                           */}
        {/* =================================================================== */}
        {/* <section id="testimonials-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Testimoni Klien</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Apa kata mereka tentang kami.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
                            <div className="flex items-center mb-4"><div className="flex">{renderStars(testimonial.rating)}</div></div>
                            <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</blockquote>
                            <div className="flex items-center">
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section> */}

        {/* =================================================================== */}
        {/* SECTION 8: FAQ                                                    */}
        {/* =================================================================== */}
        <section id="faq-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Jawaban untuk pertanyaan yang sering diajukan.</p>
                </motion.div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50">
                            <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-4 text-left flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                                <motion.div animate={{ rotate: openFaqIndex === index ? 45 : 0 }}><Plus className="text-blue-600" /></motion.div>
                            </button>
                            <AnimatePresence>
                                {openFaqIndex === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="px-6 pb-4 pt-2"><p className="text-gray-700 dark:text-gray-300">{faq.answer}</p></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 9: LOCATION                                               */}
        {/* =================================================================== */}
        <section id="location-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-slate-800/20">
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Lokasi Tim Kami</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Temukan kami dan mari berkolaborasi.</p>
                </motion.div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="h-96 lg:h-full min-h-[400px]">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4341885637587!2d106.9256391!3d-6.2063182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bcabb1368d7%3A0xea46dd080cc5e54c!2sSMK%20NEGERI%2069%20JAKARTA!5e0!3m2!1sid!2sid!4v1754530935713!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" className="rounded-xl shadow-lg" title="Office Location"></iframe>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informasi Kontak</h3>
                        <div className="space-y-6 text-gray-800 dark:text-gray-200">
                            <div className="flex items-start space-x-4"><MapPin className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" /><p>Jl. Dr. KRT Radjiman Widyoningrat No.32, RT.07/RW.7, Rawa Badung, Kec. Cakung, Kota Jakarta Timur, DKI Jakarta 13930</p></div>
                            <div className="flex items-start space-x-4"><Phone className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" /><p>+62 896-9344-0807</p></div>
                            <div className="flex items-start space-x-4"><Mail className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" /><p>advantech12@gmail.com</p></div>
                            <div className="flex items-start space-x-4"><Clock className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" /><p>Senin - Jumat: 08:00 - 17:00 WIB</p></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 7: NAVIGATION DECORATOR (CTA)                             */}
        {/* =================================================================== */}
        <section id="navigation-decorator-section" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="flex justify-center mb-6"><Sparkles className="text-yellow-400" size={48} /></div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Jelajahi Lebih Dalam</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">Temukan wawasan teknologi terbaru, artikel mendalam, dan update industri dari kami.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div whileHover={{ y: -10, scale: 1.02 }} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Artikel & Insights</h3>
                        <p className="text-blue-100 mb-6">Baca artikel terbaru tentang teknologi, tutorial, dan tren industri dari para ahli kami.</p>
                        <Link to="/articles"><motion.button whileHover={{ scale: 1.05 }} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Baca Artikel <ArrowRight className="inline ml-2" /></motion.button></Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -10, scale: 1.02 }} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Hubungi Kami</h3>
                        <p className="text-purple-100 mb-6">Siap memulai proyek Anda? Tim ahli kami siap membantu mewujudkan visi teknologi Anda.</p>
                        <Link to="/contact"><motion.button whileHover={{ scale: 1.05 }} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Hubungi Kami <ArrowRight className="inline ml-2" /></motion.button></Link>
                    </motion.div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
