// src/components/LoadingScreen.tsx
import { motion } from "framer-motion";
// import logoSrc from "../logo.png"; // <-- REMOVE THIS LINE

// Use the absolute path from the public directory, consistent with App.tsx
const logoSrc = "/logo.png";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141414]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Animate opacity to 0 when exiting
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      aria-live="polite" // Good for accessibility
      aria-busy="true"
    >
      {/* Pulsating Logo */}
      <motion.img
        src={logoSrc} // Use the constant defined above
        alt="Empower Match Loading..."
        className="w-32 h-auto mb-6 md:w-40"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{
          scale: [1, 1.05, 1], // Subtle pulse effect
          opacity: [1, 0.9, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity, // Keep pulsing
        }}
      />
      {/* Optional: Loading Text */}
      <motion.p
        className="text-xl font-medium text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Loading Empower Match...
      </motion.p>

      {/* Optional: Add a subtle animated graphic or spinner here if desired */}
      {/* Example: Simple spinning dots */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white/50 rounded-full"
            animate={{
              y: [0, -6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
