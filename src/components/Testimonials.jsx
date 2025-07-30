import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO, TechCorp Solutions",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "AdvantechJournals telah mengubah cara kami menjalankan bisnis. Platform yang mereka kembangkan sangat user-friendly dan robust. Tim mereka sangat profesional dan responsif terhadap setiap kebutuhan kami."
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateHub",
      company: "InnovateHub",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Kualitas code dan arsitektur yang dibuat oleh tim AdvantechJournals luar biasa. Mereka tidak hanya memahami requirements teknis, tapi juga business logic yang kompleks. Highly recommended!"
    },
    {
      name: "Rina Kartika",
      role: "Founder, StartupBaru",
      company: "StartupBaru",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Sebagai startup, kami membutuhkan partner teknologi yang bisa grow bersama kami. AdvantechJournals tidak hanya deliver on time, tapi juga memberikan insights berharga untuk product development."
    },
    {
      name: "David Williams",
      role: "VP Engineering, GlobalTech",
      company: "GlobalTech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Partnership dengan AdvantechJournals sangat strategic bagi perusahaan kami. Mereka membantu kami modernisasi legacy system dengan minimal downtime. Exceptional work!"
    },
    {
      name: "Lisa Wang",
      role: "Product Manager, FinanceApp",
      company: "FinanceApp",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Tim AdvantechJournals sangat detail dalam memahami user needs. UI/UX yang mereka buat meningkatkan user engagement kami hingga 150%. Amazing results!"
    },
    {
      name: "Roberto Silva",
      role: "Director of IT, RetailMax",
      company: "RetailMax",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "E-commerce platform yang dikembangkan AdvantechJournals telah meningkatkan sales kami secara signifikan. Performance dan security yang mereka provide sangat reliable."
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

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
            Testimoni Klien
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Apa kata klien tentang pengalaman mereka bersama kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Kepuasan Klien adalah Prioritas Kami
            </h3>
            <p className="text-lg opacity-90">
              Data kepuasan klien berdasarkan survey dan feedback
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">98%</h4>
              <p className="text-lg opacity-90">Client Satisfaction</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">500+</h4>
              <p className="text-lg opacity-90">Happy Clients</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">95%</h4>
              <p className="text-lg opacity-90">Project Success Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">24/7</h4>
              <p className="text-lg opacity-90">Support Available</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bergabunglah dengan Klien yang Puas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Ratusan perusahaan telah mempercayai kami untuk mengembangkan solusi teknologi mereka. 
              Saatnya giliran Anda merasakan pengalaman yang luar biasa!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Mulai Proyek Anda
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
