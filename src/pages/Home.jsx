import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Quote, Github, Linkedin, Twitter, Mail,
  Lightbulb, Target, Code, Globe, Star, Shield, Zap, Heart, Users,
  Award, Clock, Plus, Minus, MapPin, Phone, Sparkles, FileText
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
    { name: "Muhammad Adistia Pratama", role: "Ketua", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316561/IMG-20250828-WA0014_n5achs.jpg", bio: "I love designing and coding, Passionate about technology, slightly addicted to coffee.", skills: ["Leadership", "Strategy", "Full-Stack"], social: { linkedin: "#", twitter: "#", github: "#", email: "ahmad@advantechjournals.com" } },
    { name: "Ikhsan Rasyid Rabbani", role: "Wakil", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316562/IMG-20250828-WA0013_jrkn5y.jpg", bio: "Suka dengan mempelajari hal baru, berusaha berkembang setiap hari, dan berpikir jangka panjang.", skills: ["Cyber Security", "Back-End", "DevOps"], social: { linkedin: "#", twitter: "#", github: "#", email: "sari@advantechjournals.com" } },
    { name: "Muvida Anggraeni", role: "Admin Sosial Media", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316561/IMG-20250828-WA0004_g1r6gk.jpg", bio: "Menyukai trend perkembangan yang sedang terjadi, kreatif, dan inovatif.", skills: ["Content Creator", "Promotion", "Speaking"], social: { linkedin: "#", twitter: "#", github: "#", email: "budi@advantechjournals.com" } },
    { name: "Arfa Satrio Anom", role: "Humas", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316561/IMG-20250828-WA0012_wswyue.jpg", bio: "Designer yang berfokus pada user experience dan interface design yang dapat di pakai semua kalangan.", skills: ["UI Design", "UX Research", "Prototyping"], social: { linkedin: "#", twitter: "#", github: "#", email: "maya@advantechjournals.com" } },
    { name: "Novita Anggraeni", role: "Bendahara", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316561/IMG-20250828-WA0015_hasxrc.jpg", bio: "Seorang yang berfokus untuk memanagement penghasilan serta modal agar tepat dan baik.", skills: ["Speaking", "Money Management", "Critical Thinking"], social: { linkedin: "#", twitter: "#", github: "#", email: "andi@advantechjournals.com" } },
    { name: "Nazwa Khairiyah", role: "Sekretaris", image: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1756316561/IMG-20250828-WA0016_gykjiw.jpg", bio: "Membantu, serta rajin dalam menulis hal-hal yang berhubungan dengan copyright.", skills: ["Note Taker", "Market Research", "Copywriting"], social: { linkedin: "#", twitter: "#", github: "#", email: "lisa@advantechjournals.com" } }
  ];

  // Data dan Logic untuk FAQ Section
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqs = [
    { question: "Apa itu AdvanTech?", answer: "AdvanTech adalah tim teknologi yang fokus pada pengembangan solusi digital inovatif, termasuk web, mobile, dan AI." },
    { question: "Berapa lama waktu pengerjaan proyek?", answer: "Tergantung dengan kompleksitas fitur, serta deadline yang di berikan." },
    { question: "Apakah ada jaminan garansi?", answer: "Ya, kami memberikan garansi 6 bulan untuk bug fixing dan support 24/7." },
    { question: "Bagaimana proses kerjanya?", answer: "Kami menggunakan metodologi Agile: Konsultasi -> Desain -> Development -> Testing -> Deployment -> Support." },
  ];
  const toggleFAQ = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  // Data dan Logic untuk Quotes Section
  const quotes = [
    {
      text: "Inovasi adalah kemampuan untuk melihat perubahan sebagai peluang, bukan ancaman.",
      author: "Steve Jobs",
      role: "Co-founder, Apple"
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

  // --- STYLING KONSISTEN ---
  const sectionStyle = "py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden";
  const cardStyle = "bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 transition-all duration-300";


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
                className="mt-12 w-full max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tombol 1: Anggota Team */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group"
                  >
                    <button
                      onClick={() => scrollToNext('team-members-section')}
                      className="w-full h-full text-left p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">Anggota Team</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Lihat tim kami.</p>
                        </div>
                      </div>
                    </button>
                  </motion.div>

                  {/* Tombol 2: Artikel/Tugas */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group"
                  >
                    <Link to="/articles" className="block w-full h-full">
                      <div className="w-full h-full text-left p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Artikel/Tugas</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Jelajahi wawasan.</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Tombol 3: Contact */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group"
                  >
                    <button
                      onClick={() => scrollToNext('location-section')}
                      className="w-full h-full text-left p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                          <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">Contact</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Hubungi kami.</p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* Wrapper untuk section dengan background konsisten */}
        <div className="bg-slate-100/70 dark:bg-black/20">

          {/* =================================================================== */}
          {/* SECTION 2: QUOTES                                                 */}
          {/* =================================================================== */}
          <section id="quotes-section" className={`${sectionStyle} flex items-center justify-center`}>
            <div className="max-w-4xl w-full mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/60 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 relative overflow-hidden"
              >
                <Quote className="absolute top-6 left-6 w-16 h-16 text-slate-200/80 dark:text-slate-700/80" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="min-h-[280px] sm:min-h-[240px] flex flex-col justify-center items-center"
                  >
                    <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-100 mb-6 max-w-2xl leading-relaxed sm:leading-loose">
                      “{quotes[currentQuoteIndex].text}”
                    </blockquote>
                    <div className="mt-4 text-center">
                      <cite className="font-bold text-slate-700 dark:text-slate-200 not-italic text-lg block">
                        — {quotes[currentQuoteIndex].author}
                      </cite>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {quotes[currentQuoteIndex].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuoteIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentQuoteIndex === index
                          ? 'bg-blue-500 scale-110 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-800'
                          : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                      }`}
                      aria-label={`Go to quote from ${quotes[index].author}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 4: TEAM STORY                                             */}
          {/* =================================================================== */}
          <section id="team-story-section" className={sectionStyle}>
              <div className="max-w-7xl mx-auto relative z-10">
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Cerita Tim Kami</h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300">Perjalanan dan makna di balik nama AdvanTech</p>
                  </motion.div>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className={cardStyle}>
                          <Lightbulb className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Arti Nama "AdvanTech"</h3>
                          <p className="text-gray-700 dark:text-gray-300"><strong className="text-blue-600 dark:text-blue-400">Advan</strong> - Kepanjangan "Advanced", mencerminkan komitmen kami akan masa depan.</p>
                          <p className="text-gray-700 dark:text-gray-300 mt-2"><strong className="text-blue-600 dark:text-blue-400">Tech</strong> - Melambangkan Teknologi yang akan selalu berkembang dan sangat di butuhkan.</p>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                          <div className={`${cardStyle} p-6`}><Target className="text-green-600 dark:text-green-400 mb-3" size={32} /><h4 className="text-xl font-bold text-gray-900 dark:text-white">Visi Kami</h4><p className="text-gray-700 dark:text-gray-300">Menjadi perusahaan teknologi terdepan yang mengubah interaksi dunia dengan digital.</p></div>
                          <div className={`${cardStyle} p-6`}><Code className="text-purple-600 dark:text-purple-400 mb-3" size={32} /><h4 className="text-xl font-bold text-gray-900 dark:text-white">Misi Kami</h4><p className="text-gray-700 dark:text-gray-300">Mengembangkan solusi inovatif yang memberikan nilai tambah nyata bagi klien.</p></div>
                      </motion.div>
                  </div>
              </div>
          </section>
          
          {/* =================================================================== */}
          {/* SECTION 5: TEAM MEMBERS                                           */}
          {/* =================================================================== */}
          <section id="team-members-section" className={sectionStyle}>
              <div className="max-w-7xl mx-auto relative z-10">
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Anggota Tim Kami</h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Lihat para anggota yang berisikan orang-orang pencari solusi di bidang teknologi yang cemerlang.</p>
                  </motion.div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {teamMembers.map((member, index) => (
                          <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -8, scale: 1.03 }} className={`${cardStyle} overflow-hidden text-center p-0`}>
                              <div className="p-6">
                                  <div className="relative w-32 h-32 mx-auto">
                                    <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full pointer-events-none transition-all duration-300 group-hover:scale-105" draggable="false" onDragStart={(e) => e.preventDefault()} />
                                    <div className="absolute inset-0 rounded-full ring-4 ring-blue-500/50 dark:ring-blue-400/50 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
                                  </div>
                              </div>
                              <div className="p-6 pt-0">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{member.role}</p>
                                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 min-h-[60px]">{member.bio}</p>
                                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                                      {member.skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-blue-100/70 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">{skill}</span>)}
                                  </div>
                                  <div className="flex space-x-3 justify-center mt-5">
                                      <motion.a href={member.social.linkedin} whileHover={{ scale: 1.2, y:-2 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"><Linkedin size={18} /></motion.a>
                                      <motion.a href={member.social.twitter} whileHover={{ scale: 1.2, y:-2 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"><Twitter size={18} /></motion.a>
                                      <motion.a href={member.social.github} whileHover={{ scale: 1.2, y:-2 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><Github size={18} /></motion.a>
                                      <motion.a href={`mailto:${member.social.email}`} whileHover={{ scale: 1.2, y:-2 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"><Mail size={18} /></motion.a>
                                  </div>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 8: FAQ                                                    */}
          {/* =================================================================== */}
          <section id="faq-section" className={sectionStyle}>
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
          <section id="location-section" className={sectionStyle}>
              <div className="max-w-7xl mx-auto relative z-10">
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Lokasi Tim Kami</h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300">Temukan kami dan mari berkolaborasi.</p>
                  </motion.div>
                  <div className="grid lg:grid-cols-2 gap-12">
                      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4341885637587!2d106.9256391!3d-6.2063182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bcabb1368d7%3A0xea46dd080cc5e54c!2sSMK%20NEGERI%2069%20JAKARTA!5e0!3m2!1sid!2sid!4v1754530935713!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Office Location"></iframe>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className={cardStyle}>
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
        </div>

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
