import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  Sparkles,
  MessageSquare
} from 'lucide-react';

// This is a re-usable animated grid background component from Home.jsx
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


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    service: 'consultation'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        service: 'consultation'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Alamat Kantor",
      details: [
        "Jl. Dr. KRT Radjiman Widyoningrat No.32, RT.07/RW.7, Rawa Badung, Kec. Cakung,",
        "Jakarta Timur, DKI Jakarta 13930",
        "Indonesia"
      ],
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      details: [
        "+62 896-9344-0807",
        "+62 896-9344-0807"
      ],
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: [
        "advantech12@gmail.com",
        "advantech12@gmail.com"
      ],
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 08:00 - 17:00 WIB",
        "Sabtu: 07:00 - 13:00 WIB",
        "Minggu: Tutup"
      ],
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  const socialMedia = [
    { icon: <Facebook size={24} />, name: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
    { icon: <Twitter size={24} />, name: 'Twitter', url: '#', color: 'hover:bg-blue-400' },
    { icon: <Linkedin size={24} />, name: 'LinkedIn', url: '#', color: 'hover:bg-blue-700' },
    { icon: <Instagram size={24} />, name: 'Instagram', url: '#', color: 'hover:bg-pink-600' },
    { icon: <Github size={24} />, name: 'GitHub', url: '#', color: 'hover:bg-gray-800' }
  ];

  return (
    <div className="min-h-screenbg-slate-50 dark:bg-gray-900 overflow-hidden">
      {/* =================================================================== */}
      {/* SECTION 1: HEADER (MATCHES HOME.JSX HERO SECTION)                   */}
      {/* =================================================================== */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 pt-20 pb-10 overflow-hidden">
        {/* Animated blob backgrounds from Home.jsx */}
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
                Dukungan • Pertanyaan • Kolaborasi
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kami siap membantu mewujudkan visi teknologi Anda. Mari diskusikan proyek dan kebutuhan bisnis Anda bersama tim ahli kami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 2: CONTACT FORM AND INFO (MATCHES HOME.JSX CARD STYLE)      */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20 dark:border-gray-700/50"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Kirim Pesan
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Isi form di bawah dan kami akan menghubungi Anda dalam 24 jam.
              </p>
            </div>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 rounded-lg"
                >
                  <p className="text-green-800 dark:text-green-200">
                    Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Nama perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="+62 812 3456 7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Layanan yang Dibutuhkan
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="consultation">Konsultasi Gratis</option>
                  <option value="ask-project">Pembicaraan Project</option>
                  <option value="enterprise-solution">Solusi Permasalahan</option>
                  <option value="maintenance">Maintenance & Support</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Ceritakan kebutuhan proyek Anda secara detail..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Kirim Pesan
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${info.color} mt-1`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 dark:text-gray-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="text-blue-600 dark:text-blue-400" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Follow Us
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ikuti media sosial kami untuk update terbaru dan insights teknologi
              </p>
              <div className="flex space-x-3">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-gray-100/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 rounded-full ${social.color} hover:text-white transition-all duration-300`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare size={24} />
                <h3 className="text-lg font-semibold">Butuh Respon Cepat?</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Untuk kebutuhan urgent, hubungi langsung tim kami melalui WhatsApp
              </p>
              <motion.a
                href="https://wa.me/6289693440807"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <MessageCircle size={20} />
                Chat WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lokasi Kantor Kami
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kunjungi kantor kami untuk diskusi langsung atau konsultasi mendalam
              </p>
            </div>
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4341885637587!2d106.9256391!3d-6.2063182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bcabb1368d7%3A0xea46dd080cc5e54c!2sSMK%20NEGERI%2069%20JAKARTA!5e0!3m2!1sid!2sid!4v1754530935713!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
