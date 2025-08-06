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
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
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
                href="https://github.com/Adistiaa/pilar-sehat.id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lihat repositori GitHub"
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={20} />
              </a>
              {/* <motion.button
                onClick={handleToggleDarkMode}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mode gelap/terang"
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button> */}
            </div>
          </div>

          {/* Tombol Menu Mobile & Ikon untuk Mobile */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Ikon GitHub untuk Mobile */}
            <a
              href="https://github.com/Adistiaa/pilar-sehat.id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat repositori GitHub"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github size={20} />
            </a>
            {/* Tombol Dark Mode untuk Mobile */}
            <motion.button
              onClick={handleToggleDarkMode}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mode gelap/terang"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            {/* Tombol Buka/Tutup Menu Mobile */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Buka/tutup menu mobile"
              className="p-2 text-gray-900 dark:text-gray-50"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Overlay untuk Menu Mobile (saat terbuka) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => {
              setMenuOpen(false);
              setMobileSubmenuOpen(null); // Tutup submenu saat overlay diklik
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} // Mulai dari luar layar kanan
            animate={{ x: 0 }} // Geser ke posisi awal (0)
            exit={{ x: "100%" }} // Geser kembali ke luar layar kanan saat keluar
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden flex flex-col bg-white dark:bg-slate-900 shadow-xl border-l border-gray-200 dark:border-slate-700"
          >
            {/* Header Menu Mobile */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700 h-16">
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-50">Menu</span>
              <motion.button
                onClick={() => {
                  setMenuOpen(false);
                  setMobileSubmenuOpen(null); // Tutup submenu saat tombol X diklik
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Tutup menu mobile"
                className="p-2 text-gray-900 dark:text-gray-50"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Link Navigasi Mobile */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <ul className="py-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    // Animasi untuk setiap item menu saat masuk
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.05 + 0.1, // Delay berurutan untuk efek staggered
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    className="relative"
                  >
                    <div className="flex flex-col">
                      {/* Item menu utama mobile */}
                      <div
                        className={`flex items-center justify-between px-4 py-2.5 group cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors ${
                          mobileSubmenuOpen === index ? "bg-gray-100 dark:bg-slate-800" : ""
                        }`}
                        onClick={() => {
                          // Jika ada submenu, toggle submenu. Jika tidak, tutup menu utama.
                          if (link.submenu) {
                            toggleMobileSubmenu(index);
                          } else {
                            setMenuOpen(false);
                            setMobileSubmenuOpen(null);
                          }
                        }}
                      >
                        <Link
                          to={link.path || "#"}
                          className={`flex-1 font-medium ${
                            location.pathname === link.path
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          } transition-colors`}
                          // Mencegah navigasi langsung jika ada submenu
                          onClick={(e) => link.submenu && e.preventDefault()}
                        >
                          {link.name}
                        </Link>

                        {/* Ikon panah untuk submenu mobile */}
                        {link.submenu && (
                          <motion.div
                            className="flex items-center justify-center w-6 h-6"
                            animate={{
                              rotate: mobileSubmenuOpen === index ? 180 : 0, // Rotasi panah saat submenu terbuka
                              transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              },
                            }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          </motion.div>
                        )}
                      </div>

                      {/* Submenu Mobile - Muncul/hilang dengan animasi */}
                      {link.submenu && (
                        <AnimatePresence>
                          {mobileSubmenuOpen === index && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    duration: 0.3,
                                  },
                                  opacity: { duration: 0.2 },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.25 },
                                  opacity: { duration: 0.15 },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              {link.submenu.map((subItem, subIndex) => (
                                <motion.li
                                  key={subIndex}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      delay: subIndex * 0.03,
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 20,
                                    },
                                  }}
                                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                  <Link
                                    to={subItem.path}
                                    className={`block px-8 py-2.5 text-sm ${
                                      location.pathname === subItem.path
                                        ? "text-blue-600 dark:text-blue-400 font-semibold bg-gray-100 dark:bg-slate-700"
                                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    } transition-colors w-full`}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Mencegah event click menyebar ke parent
                                      setMenuOpen(false); // Tutup seluruh menu mobile setelah klik submenu
                                      setMobileSubmenuOpen(null); // Tutup submenu juga
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer dengan link GitHub di menu mobile */}
            <div className="p-4 border-t border-gray-100/50 dark:border-[#397fb1]/20">
              <a
                href="https://github.com/Adistiaa/pilar-sehat.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-[#397fb1]/10 transition-colors"
              >
                <Github className="w-5 h-5 text-[#060d13] dark:text-[#ecf3f9] hover:text-[#4e94c6] dark:hover:text-[#397fb1] transition-colors" />
                <span className="text-sm font-medium text-[#060d13] dark:text-[#ecf3f9] hover:text-[#4e94c6] dark:hover:text-[#397fb1] transition-colors">
                  View on GitHub
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
