import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const TeamMembers = () => {
  const members = [
    {
      name: "Ahmad Rizki",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Visioner teknologi dengan pengalaman 10+ tahun dalam industri startup dan teknologi.",
      skills: ["Leadership", "Strategy", "Business Development"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "ahmad@advantechjournals.com"
      }
    },
    {
      name: "Sari Dewi",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Expert dalam arsitektur sistem dan pengembangan aplikasi skala enterprise.",
      skills: ["System Architecture", "Full-Stack Development", "DevOps"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "sari@advantechjournals.com"
      }
    },
    {
      name: "Budi Santoso",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate developer dengan keahlian dalam modern web technologies dan AI.",
      skills: ["React", "Node.js", "Machine Learning"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "budi@advantechjournals.com"
      }
    },
    {
      name: "Maya Putri",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer yang berfokus pada user experience dan interface design yang intuitif.",
      skills: ["UI Design", "UX Research", "Prototyping"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "maya@advantechjournals.com"
      }
    },
    {
      name: "Andi Wijaya",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Infrastructure specialist dengan expertise dalam cloud computing dan automation.",
      skills: ["AWS", "Docker", "Kubernetes"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "andi@advantechjournals.com"
      }
    },
    {
      name: "Lisa Maharani",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "Strategic thinker yang menghubungkan kebutuhan bisnis dengan solusi teknologi.",
      skills: ["Product Strategy", "Market Research", "Agile"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "lisa@advantechjournals.com"
      }
    }
  ];

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
            Tim Profesional Kami
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bertemu dengan para ahli yang berdedikasi menghadirkan solusi teknologi terbaik untuk Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.social.linkedin}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin size={16} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.social.twitter}
                    className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <Twitter size={16} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.social.github}
                    className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                  >
                    <Github size={16} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    <Mail size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-lg opacity-90">Proyek Selesai</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-lg opacity-90">Tahun Pengalaman</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-lg opacity-90">Klien Puas</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-lg opacity-90">Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamMembers;
