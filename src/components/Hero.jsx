import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect } from "react";

// Squares Component (provided by the user, integrated here)
const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) ===
            hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // This gradient seems to be intended for a dark overlay, adjusting for general use.
      // If a specific dark overlay is desired, consider adding a separate div for it.
      // For now, making it less opaque to blend with the background.
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)"); // Fully transparent in center
      gradient.addColorStop(1, "rgba(6, 0, 16, 0.5)"); // Semi-transparent dark at edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
    ></canvas>
  );
};


const Hero = () => {
  const scrollToNext = () => {
    document.getElementById('quotes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToArticles = () => {
    console.log("Navigating to articles page...");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16 overflow-hidden">
      {/* Background Squares Component */}
      <div className="absolute inset-0 z-0">
        <Squares
          borderColor="rgba(156, 163, 175, 0.1)" // Light border for subtle effect
          speed={0.5}
          direction="diagonal"
          squareSize={40}
        />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-0">
        <style jsx>{`
          .bg-radial-gradient-overlay {
            background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
          }
          @media (prefers-color-scheme: dark) {
            .bg-radial-gradient-overlay {
              background: radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 70%);
            }
          }
        `}</style>
        <div className="absolute inset-0 bg-radial-gradient-overlay"></div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AdvanTech
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            Kami adalah tim yang berdedikasi untuk menghadirkan solusi teknologi terdepan
            dan inovasi yang mengubah dunia digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNext}
              className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg
                         hover:bg-blue-700 transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                         shadow-lg hover:shadow-xl"
            >
              Kenali Kami Lebih Dalam
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToArticles}
              className="px-10 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-lg
                         hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out
                         flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                         shadow-lg hover:shadow-xl"
            >
              Baca Artikel <ArrowRight size={22} className="ml-1" />
            </motion.button>
          </div>
        </motion.div>

      </div>
        {/* Chevron Down button position adjusted to be slightly lower */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          // Adjusted from bottom-12 to bottom-8 for a slightly lower position
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            onClick={scrollToNext}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400
                       p-3 rounded-full bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm
                       transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Scroll down"
          >
            <ChevronDown size={36} />
          </motion.button>
        </motion.div>
    </section>
  );
};

export default Hero;
