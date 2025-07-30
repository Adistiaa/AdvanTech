import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavigationDecorator = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="text-yellow-400" size={48} />
            </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Jelajahi Lebih Dalam
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Temukan wawasan teknologi terbaru, artikel mendalam, dan update industri 
            yang akan memperluas perspektif Anda tentang dunia digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Articles Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 h-full">
              <div className="text-blue-400 mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Artikel & Insights
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Baca artikel terbaru tentang teknologi, tutorial mendalam, case studies, 
                dan tren industri yang ditulis oleh para ahli kami.
              </p>
              
              <ul className="text-blue-100 mb-6 space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-blue-400" size={16} />
                  Tutorial & How-to Guides
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-blue-400" size={16} />
                  Industry Insights
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-blue-400" size={16} />
                  Case Studies
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-blue-400" size={16} />
                  Tech News & Updates
                </li>
              </ul>

              <Link to="/articles">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group-hover:bg-blue-500"
                >
                  Baca Artikel
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 h-full">
              <div className="text-purple-400 mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Hubungi Kami
              </h3>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Siap memulai proyek Anda? Tim ahli kami menunggu untuk membantu 
                mewujudkan visi teknologi Anda menjadi kenyataan.
              </p>
              
              <ul className="text-purple-100 mb-6 space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-purple-400" size={16} />
                  Konsultasi Gratis
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-purple-400" size={16} />
                  Estimasi Proyek
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-purple-400" size={16} />
                  Diskusi Kebutuhan
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-purple-400" size={16} />
                  24/7 Support
                </li>
              </ul>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center group-hover:bg-purple-500"
                >
                  Hubungi Kami
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-20 opacity-20">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-blue-400 rounded-lg"
          />
        </div>
        
        <div className="absolute bottom-20 left-20 opacity-20">
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 bg-purple-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default NavigationDecorator;
