import { motion } from 'motion/react';
import { Shield, Zap, Heart, Users, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keamanan Terjamin",
      description: "Kami mengutamakan keamanan data dan privasi klien dengan standar enkripsi tingkat enterprise."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Inovasi Berkelanjutan",
      description: "Tim kami selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi terdepan."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Pelayanan Prima",
      description: "Kepuasan klien adalah prioritas utama dengan dukungan 24/7 dari tim profesional kami."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tim Berpengalaman",
      description: "Didukung oleh tim ahli dengan pengalaman bertahun-tahun di industri teknologi."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Kualitas Terbaik",
      description: "Komitmen kami adalah menghasilkan produk berkualitas tinggi yang melampaui ekspektasi."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Efisiensi Waktu",
      description: "Proses pengembangan yang efisien memastikan proyek selesai tepat waktu."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Kami memberikan yang terbaik dengan komitmen penuh terhadap kepuasan dan kesuksesan klien
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">
              Siap Bergabung dengan Ribuan Klien yang Puas?
            </h3>
            <p className="text-lg mb-6">
              Bergabunglah dengan lebih dari 500+ klien yang telah mempercayai layanan kami
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Mulai Konsultasi Gratis
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
