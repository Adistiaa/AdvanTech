import { AlertCircle } from 'lucide-react'
import React from 'react'

function JanganBuka() {
  return (
    <>
    {/* Hero Section */}
      <section
        className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            
            className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
          >
            <span className="flex items-center text-sm font-medium">
              <AlertCircle   className="w-4 h-4 mr-2" />
              Pemberitahuan
            </span>
          </motion.div>

          <motion.h1
            
            className="text-3xl font-bold mb-4"
          >
            Halaman Ini Dalam Tahap{" "}
            <span className="bg-gradient-to-r from-[#c5e013] to-[#57eb1d] bg-clip-text text-transparent">
              Pengembangan
            </span>
          </motion.h1>

          <motion.p
            
            className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
          >
            Website AdvanTech masih dalam tahap Pengembangan lebih lanjut untuk memaksimalkan dan memudahkan user untuk berinteraksi jauh lebih baik lagi kedepannya. Kamu bisa kasih saran apa saja yang perlu di tambah untuk kebaikan website ini ke depan nya.
          </motion.p>
          <img src="https://media.tenor.com/9Te1NRPN8ysAAAAM/sad-sorry.gif" alt="Sorry" className="mx-auto my-4" />
          <motion.p
            
            className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
          >
            Maaf jika di Website ini masih banyak kekurangan, karena kami masih dalam tahap belajar dan mengembangkan website ini. Kami sangat menghargai setiap masukan dan kritik yang membangun untuk meningkatkan kualitas Website AdvanTech.
          </motion.p>
        </div>
      </section>
    </>
  )
}

export default JanganBuka