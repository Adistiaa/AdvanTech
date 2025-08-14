import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  Heart,
  Loader2, // Icon untuk loading
  CheckCircle2, // Icon untuk sukses
  AlertCircle // Icon untuk error
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle, loading, success, error
  

  // Fungsi untuk menangani submit form newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000); // Reset setelah 3 detik
      return;
    }

    setSubscribeStatus('loading');
    // Simulasi API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail(''); // Kosongkan input setelah sukses
      setTimeout(() => setSubscribeStatus('idle'), 5000); // Reset setelah 5 detik
    }, 2000);
  };

  // Fungsi validasi email sederhana
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Objek yang berisi link-link di footer
  const footerLinks = {
    company: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Tim Kami', href: '/team' },
      { name: 'Karir', href: '/careers' },
      { name: 'Press Release', href: '/press' },
    ],
    resources: [
      { name: 'Artikel', href: '/articles' },
      { name: 'Dokumentasi', href: '/docs' },
      { name: 'Studi Kasus', href: '/case-studies' },
      { name: 'FAQ', href: '/faq' },
    ],
    support: [
      { name: 'Hubungi Kami', href: '/contact' },
      { name: 'Pusat Bantuan', href: '/support' },
      { name: 'Kebijakan Privasi', href: '/privacy' },
      { name: 'Ketentuan Layanan', href: '/terms' },
    ]
  };

  // Array yang berisi link-link sosial media
  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://facebook.com/#', name: 'Facebook' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/#', name: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/#', name: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com/#', name: 'Instagram' },
    { icon: <Github size={20} />, href: 'https://github.com/#', name: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Konten Utama Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Info Perusahaan */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="text-2xl font-bold text-blue-400 mb-4 block">
              <img src="https://res.cloudinary.com/dxbkwpm3i/image/upload/v1755144575/Picsart_25-08-14_11-06-01-063_qolfj8.png"
              alt="Logo" 
              draggable="false" 
              onContextMenu={(e) => e.preventDefault()} 
              className="h-15" />
                AdvanTech
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Kami adalah tim yang berdedikasi untuk menghadirkan solusi teknologi terdepan 
                dan inovasi yang mengubah dunia digital.
              </p>
              
              {/* Info Kontak Fungsional */}
              <div className="space-y-3">
                <a href="mailto:advantech12@gmail.com" className="flex items-center space-x-3 group">
                  <Mail size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">advantech12@gmail.com</span>
                </a>
                <a href="tel:+622112345678" className="flex items-center space-x-3 group">
                  <Phone size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">+62 896-9344-0807</span>
                </a>
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Jl. Dr. KRT Radjiman Widyoningrat No.32, RT.07/RW.7, Rawa Badung, Kec. Cakung,
                    Jakarta Timur, DKI Jakarta 13930
                    Indonesia
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Kolom Link */}
          {Object.keys(footerLinks).map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 capitalize">{key}</h3>
              <ul className="space-y-2">
                {footerLinks[key].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Form Berlangganan Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-800 p-6 rounded-xl mb-12"
        >
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-1">Tetap Terhubung</h3>
              <p className="text-gray-300 text-sm">
                Dapatkan update terbaru tentang teknologi dan insights industri.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <div className="relative w-64">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda"
                  className="px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors flex items-center justify-center w-32"
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              >
                {subscribeStatus === 'loading' && <Loader2 size={20} className="animate-spin" />}
                {subscribeStatus === 'idle' && 'Subscribe'}
                {subscribeStatus === 'success' && <CheckCircle2 size={20} />}
                {subscribeStatus === 'error' && 'Coba Lagi'}
              </motion.button>
            </form>
          </div>
          {/* Pesan status berlangganan */}
          {subscribeStatus === 'success' && <p className="text-green-400 text-sm mt-2">Terima kasih telah berlangganan!</p>}
          {subscribeStatus === 'error' && <p className="text-red-400 text-sm mt-2">Format email tidak valid. Silakan periksa kembali.</p>}
        </motion.div>

        {/* Bagian Bawah Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400 mb-4 md:mb-0"
            >
              <p className="flex items-center justify-center md:justify-start">
                © {new Date().getFullYear()} AdvanTech. Dibuat dengan{' '}
                <Heart size={16} className="text-red-500 mx-1.5" fill="currentColor" />
                di Indonesia.
              </p>
            </motion.div>

            {/* Tautan Sosial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex space-x-4 justify-center md:justify-start"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-full transition-all duration-300"
                  aria-label={`Kunjungi halaman ${social.name} kami`}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dekorasi Latar Belakang */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
