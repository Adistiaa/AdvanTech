import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu AdvantechJournals dan layanan apa yang ditawarkan?",
      answer: "AdvantechJournals adalah perusahaan teknologi yang mengkhususkan diri dalam pengembangan solusi digital inovatif. Kami menawarkan layanan pengembangan web, aplikasi mobile, sistem enterprise, konsultasi teknologi, dan solusi AI/ML untuk berbagai industri."
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?",
      answer: "Durasi proyek bervariasi tergantung kompleksitas dan scope. Proyek website sederhana biasanya 2-4 minggu, aplikasi mobile 6-12 minggu, dan sistem enterprise bisa 3-6 bulan. Kami akan memberikan timeline yang detail setelah analisis kebutuhan."
    },
    {
      question: "Apakah ada garansi untuk layanan yang diberikan?",
      answer: "Ya, kami memberikan garansi 6 bulan untuk bug fixing dan 1 tahun untuk maintenance dasar. Selain itu, kami juga menyediakan support 24/7 dan training untuk tim Anda."
    },
    {
      question: "Bagaimana proses pengembangan proyek dilakukan?",
      answer: "Kami menggunakan metodologi Agile dengan tahapan: 1) Konsultasi & analisis kebutuhan, 2) Desain & prototype, 3) Development dengan sprint review berkala, 4) Testing & QA, 5) Deployment & training, 6) Support & maintenance."
    },
    {
      question: "Apakah bisa melakukan maintenance dan update di kemudian hari?",
      answer: "Tentu saja! Kami menyediakan layanan maintenance berkelanjutan, update fitur, security patches, dan scaling sesuai pertumbuhan bisnis Anda. Tim kami akan selalu siap membantu evolusi sistem Anda."
    },
    {
      question: "Bagaimana cara memulai kerjasama dengan AdvantechJournals?",
      answer: "Sangat mudah! Hubungi kami melalui email, phone, atau form contact di website. Kami akan mengatur konsultasi gratis untuk memahami kebutuhan Anda dan memberikan proposal yang sesuai."
    },
    {
      question: "Apakah tim AdvantechJournals berpengalaman dengan teknologi terbaru?",
      answer: "Absolutely! Tim kami terus mengikuti perkembangan teknologi terbaru seperti AI/ML, Cloud Computing, Blockchain, IoT, dan modern frameworks. Kami juga rutin mengikuti training dan sertifikasi untuk memastikan keahlian terdepan."
    },
    {
      question: "Bagaimana dengan keamanan data dan privasi klien?",
      answer: "Keamanan adalah prioritas utama kami. Kami menggunakan enkripsi tingkat enterprise, secure coding practices, regular security audits, dan mematuhi standar internasional seperti ISO 27001 dan GDPR compliance."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Jawaban untuk pertanyaan yang sering diajukan tentang layanan kami
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="text-blue-600 dark:text-blue-400" size={20} />
                  ) : (
                    <Plus className="text-gray-600 dark:text-gray-400" size={20} />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tim kami siap membantu menjawab pertanyaan spesifik Anda
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Hubungi Kami Sekarang
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
