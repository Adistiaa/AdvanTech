import { motion } from 'motion/react';
import { Lightbulb, Target, Code, Globe } from 'lucide-react';

const TeamStory = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cerita Tim Kami
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Perjalanan dan makna di balik nama AdvantechJournals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
              <Lightbulb className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Arti Nama "AdvantechJournals"
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong className="text-blue-600 dark:text-blue-400">Advantech</strong> - 
                  Gabungan dari "Advanced" dan "Technology", mencerminkan komitmen kami 
                  untuk selalu berada di garis depan teknologi.
                </p>
                <p>
                  <strong className="text-blue-600 dark:text-blue-400">Journals</strong> - 
                  Melambangkan perjalanan dokumentasi, penelitian, dan berbagi pengetahuan 
                  yang menjadi fondasi setiap inovasi.
                </p>
                <p className="italic">
                  "Mencatat setiap langkah inovasi untuk masa depan yang lebih baik"
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Target className="text-green-600 dark:text-green-400 mb-3" size={32} />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Visi Kami
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Menjadi perusahaan teknologi terdepan yang mengubah cara dunia 
                berinteraksi dengan teknologi digital.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Code className="text-purple-600 dark:text-purple-400 mb-3" size={32} />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Misi Kami
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Mengembangkan solusi teknologi inovatif yang memberikan nilai 
                tambah nyata bagi klien dan masyarakat.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Globe className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Dampak Global
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Berkontribusi dalam ekosistem teknologi global dengan menciptakan 
                solusi yang dapat diakses dan bermanfaat untuk semua.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Perjalanan Kami
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-bold mb-2">Ide & Konsep</h4>
              <p className="text-sm opacity-90">
                Lahirnya ide untuk menciptakan solusi teknologi yang berdampak
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-bold mb-2">Tim & Riset</h4>
              <p className="text-sm opacity-90">
                Pembentukan tim ahli dan riset mendalam tentang kebutuhan pasar
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-bold mb-2">Pengembangan</h4>
              <p className="text-sm opacity-90">
                Proses pengembangan produk dengan metodologi agile dan modern
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h4 className="font-bold mb-2">Ekspansi</h4>
              <p className="text-sm opacity-90">
                Melayani klien global dengan solusi yang terus berkembang
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamStory;
