import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <ScrollToTop />
          <BackToTop />
          <Navbar />
          <main>
            <Routes>
              {/* <Route path="/" element={<JanganBuka />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  )
}

export default App
