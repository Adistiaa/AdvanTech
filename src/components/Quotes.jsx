import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Quotes = () => {
  // Kutipan Steve Jobs yang diminta
  const quote = {
    text: "Inovasi adalah kemampuan untuk melihat perubahan sebagai peluang, bukan ancaman.",
    author: "Steve Jobs",
    role: "Co-founder Apple"
  };

  return (
    <section
      id="quotes-section"
      className="min-h-screen flex items-center justify-center
                 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900
                 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Floating background elements for dynamic visual interest */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: 360 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-xl"
      />

      {/* Animated radial gradient for subtle background movement */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 bg-radial-gradient-animated z-0"
      />

      {/* Main quote container */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            scale: 1.02,
            rotateY: 2,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-2xl shadow-2xl
                     border border-white/20 dark:border-slate-700/50
                     transform transition-all duration-500 ease-out
                     flex flex-col items-center justify-center
                     before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 before:opacity-50"
        >
          {/* Decorative quote marks with icons */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <Quote className="text-white" size={20} />
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg rotate-180"
          >
            <Quote className="text-white" size={20} />
          </motion.div>

          {/* Quote content */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-relaxed relative z-10 max-w-3xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
              "{quote.text}"
            </span>
          </motion.blockquote>

          {/* Divider line with animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 max-w-md mx-auto"
          />

          {/* Author information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 text-center"
          >
            <cite className="font-bold text-slate-700 dark:text-slate-200 not-italic text-xl md:text-2xl block mb-2 tracking-wide">
              — {quote.author}
            </cite>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium">
              {quote.role}
            </p>
          </motion.div>

          {/* Subtle glow effect on hover for the card */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>

        {/* Additional floating elements for depth (behind the main quote card) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          viewport={{ once: true }}
          className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 dark:from-blue-800/20 dark:via-purple-800/20 dark:to-pink-800/20 rounded-3xl blur-3xl transform scale-110"
        />
      </div>

      {/* CSS for the animated radial gradient background */}
      <style jsx>{`
        .bg-radial-gradient-animated {
          background: radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
        }
        @media (prefers-color-scheme: dark) {
          .bg-radial-gradient-animated {
            background: radial-gradient(circle at 30% 70%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(196, 181, 253, 0.1) 0%, transparent 50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Quotes;
