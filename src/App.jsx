import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Articles from './pages/Articles';
// import ArticleDetail from './pages/ArticleDetail';
// import Contact from './pages/Contact';
import './App.css'
import JanganBuka from './components/JanganBuka';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          {/* <Navbar /> */}
          <main>
            <Routes>
              <Route path="/" element={<JanganBuka />} />
              {/* <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
