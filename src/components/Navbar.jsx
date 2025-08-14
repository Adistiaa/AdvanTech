import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Github,
  Moon,
  Sun,
} from "lucide-react";

// Asumsi Anda memiliki ThemeContext.js di '../context/ThemeContext'
// Jika tidak, Anda perlu membuatnya atau menghapus penggunaan useTheme
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // State untuk melacak submenu mobile yang sedang terbuka. Null berarti tidak ada yang terbuka.
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Efek untuk mendeteksi posisi scroll dan menerapkan efek blur/shadow pada navbar
  useEffect(() => {
    const handleScroll = () => {
      // Navbar akan memiliki efek blur/shadow jika user telah scroll lebih dari 50px
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener saat komponen di-unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Definisi link navigasi, termasuk submenu. Contoh submenu dikomentari.
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    // Contoh link dengan submenu (bisa diaktifkan jika diperlukan)
    // {
    //   name: "Services",
    //   submenu: [
    //     { name: "Web Dev", path: "/services/web" },
    //     { name: "Mobile App", path: "/services/mobile" },
    //   ],
    // },
    { name: "Contact", path: "/contact" },
  ];

  // Efek untuk menutup menu mobile secara otomatis saat navigasi berubah
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      // Pastikan submenu juga tertutup saat menu utama ditutup
      setMobileSubmenuOpen(null);
    }
  }, [location.pathname]); // Bergantung pada perubahan path URL

  // Fungsi untuk mengaktifkan/menonaktifkan mode gelap
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  // Fungsi untuk toggle submenu di mobile
  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  const lightLogo = "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1755143899/Picsart_25-08-14_10-50-45-230_i4dwxo.png";
  const darkLogo = "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1755144575/Picsart_25-08-14_11-06-01-063_qolfj8.png";

  return (
    <>
      {/* Navbar Utama - Desktop & Mobile */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-md shadow-lg" // Efek saat di-scroll
            : "bg-transparent dark:bg-transparent" // Efek saat di atas
        }`}
        // Animasi masuk navbar dari atas
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo/Nama Brand */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 z-60 relative flex items-center space-x-2">
          <img src={isDarkMode ? darkLogo : lightLogo}
            alt="Logo" 
            draggable="false" 
            onContextMenu={(e) => e.preventDefault()} 
            className="h-10" />
            AdvanTech
          </Link>

          {/* Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
                  <div className="flex items-center px-3 py-2">
                    <Link
                      to={link.path || "#"} // Menggunakan Link dari react-router-dom
                      className={`text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? "text-blue-600 dark:text-blue-400 font-semibold" // Warna untuk link aktif
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" // Warna default dan hover
                      }`}
                      // Mencegah navigasi langsung jika ada submenu
                      onClick={(e) => link.submenu && e.preventDefault()}
                    >
                      {link.name}
                    </Link>
                    {/* Ikon panah ke bawah jika ada submenu */}
                    {link.submenu && (
                      <ChevronDown className="w-4 h-4 ml-1 text-gray-700 dark:text-gray-300 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </div>
                  {/* Submenu Desktop - Muncul saat hover */}
                  {link.submenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      // Animasi ini akan dipicu oleh CSS group-hover
                      // AnimatePresence tidak diperlukan di sini karena visibilitas dikontrol oleh CSS
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 border border-gray-200 dark:border-slate-700"
                    >
                      <ul className="py-2">
                        {link.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                location.pathname === subItem.path
                                  ? "text-blue-600 dark:text-blue-400 font-semibold bg-gray-100 dark:bg-slate-700"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
            {/* Ikon Dark Mode & GitHub untuk Desktop */}
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Adistiaa/AdvanTech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lihat repositori GitHub"
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <motion.button
                onClick={handleToggleDarkMode}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mode gelap/terang"
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Tombol Menu Mobile & Ikon untuk Mobile */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Ikon GitHub untuk Mobile */}
            <a
              href="https://github.com/Adistiaa/AdvanTech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat repositori GitHub"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-60 relative"
            >
              <Github size={20} />
            </a>
            {/* Tombol Dark Mode untuk Mobile */}
            <motion.button
              onClick={handleToggleDarkMode}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mode gelap/terang"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-60 relative"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            {/* Tombol Buka/Tutup Menu Mobile */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Buka/tutup menu mobile"
              className="p-2 text-gray-900 dark:text-gray-50 z-60 relative"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Overlay untuk Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Mobile - Slide dari kanan */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 md:hidden border-l border-gray-200 dark:border-slate-700"
          >
            {/* Header Mobile Menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Menu</h2>
              <motion.button
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Navigation Links Mobile */}
            <div className="flex flex-col p-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path || "#"}
                      className={`flex-1 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                        location.pathname === link.path
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }`}
                      onClick={(e) => {
                        if (link.submenu) {
                          e.preventDefault();
                          toggleMobileSubmenu(index);
                        } else {
                          setMenuOpen(false);
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                    {/* Tombol untuk submenu */}
                    {link.submenu && (
                      <motion.button
                        onClick={() => toggleMobileSubmenu(index)}
                        className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: mobileSubmenuOpen === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </motion.button>
                    )}
                  </div>

                  {/* Submenu Mobile */}
                  <AnimatePresence>
                    {link.submenu && mobileSubmenuOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden ml-4 mt-2"
                      >
                        <div className="space-y-1 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                          {link.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`block px-3 py-2 rounded-md text-base transition-colors ${
                                location.pathname === subItem.path
                                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium"
                                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Footer dengan Informasi Tambahan */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-slate-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  © 2025 AdvanTech. Semua hak dilindungi.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/Adistiaa/AdvanTech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <motion.button
                    onClick={handleToggleDarkMode}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
