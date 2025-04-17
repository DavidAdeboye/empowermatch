"use client";

// src/App.tsx
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./App.css";
import type { BlurCardProps, BlurInputProps, SectionIds } from "./types";
import LoadingScreen from "./components/LoadingScreen.tsx";

// --- Asset Placeholders ---
const logoSrc = "/logo.png";
const logoFooterSrc = "/logo.png";
const appShowcaseContentSrc = "/Homepage2.png";
const bannerBgSrc = "/joinow.png";
const contactBgSrc = "/261.png";
const bgImageUrl = "/bgimage.png"; // Used for product row backgrounds
const ideaLogoSrc = "/idealogo.png";
const handBulbSrc = "/handbulb.png";
const howWeEmpowerSrc = "/howweempower.png";
const wheelSrc = "/wheel.png";
const earSrc = "/ear.png";
const accessSrc = "/acces.png";
const transcribeSrc = "/transcribe.png";
const adeyemiSrc = "/adeyemi.png";
const olamijiSrc = "/olamiji.png";
const olamiji2Src = "/olamiji2.png";
const olamiji3Src = "/olamiji3.png";

// Array of image sources to preload
const imagesToPreload = [
  logoSrc,
  logoFooterSrc,
  appShowcaseContentSrc,
  bannerBgSrc,
  contactBgSrc,
  bgImageUrl,
  ideaLogoSrc,
  handBulbSrc,
  howWeEmpowerSrc,
  wheelSrc,
  earSrc,
  accessSrc,
  transcribeSrc,
  adeyemiSrc,
  olamijiSrc,
  olamiji2Src,
  olamiji3Src,
];


// --- Optimized Styles ---
const blurOverlayStyle = "bg-black/40 backdrop-blur-lg";
const outerCardBaseStyle = "relative overflow-hidden border border-white/10 shadow-glass-inset";

// --- Memoized Icons (Slightly larger base size) ---
const IconCaretRight = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
));

const IconStarFill = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-[#F5CB76]">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
));

const IconStarHalf = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-[#F5CB76]">
    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.154-.746-.592l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226V12.027z" />
  </svg>
));

// Footer Contact Icons
const IconEmail = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6 sm:w-7 sm:h-7 text-[#BFBFBF] flex-shrink-0"> {/* Adjusted size */}
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.558Z" />
  </svg>
));

const IconPhone = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6 sm:w-7 sm:h-7 text-[#BFBFBF] flex-shrink-0"> {/* Adjusted size */}
    <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
  </svg>
));

const IconLocation = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6 sm:w-7 sm:h-7 text-[#BFBFBF] flex-shrink-0"> {/* Adjusted size */}
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
));

// Footer Social Icons
const IconFacebook = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 text-[#FEFEFE]">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>
));

const IconTwitter = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 text-[#FEFEFE]">
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
));

const IconInstagram = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 text-[#FEFEFE]">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231s.008-2.389.046-3.232c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
  </svg>
));

const IconMedium = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 text-[#FEFEFE]">
    <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236S9.463 10.34 9.463 8c0-2.34 1.01-4.236 2.256-4.236S13.975 5.66 13.975 8zM16 8c0 2.096-.71 3.795-1.595 3.795-.885 0-1.594-1.7-1.594-3.795 0-2.096.71-3.795 1.594-3.795C15.29 4.205 16 5.904 16 8z" />
  </svg>
));

// --- Motion Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const mobileMenuVariant: Variants = {
  hidden: { y: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// Variant for sections fading in on scroll
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};


// --- Optimized Components ---
const BlurCard = memo(({ children, className = "", style = {} }: BlurCardProps) => (
  <motion.div
    className={`${outerCardBaseStyle} ${className}`}
    style={style}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} // Subtle hover effect
  >
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
      aria-hidden="true"
    />
    <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`} />
    <div className="relative z-20">{children}</div>
  </motion.div>
));

const BlurInput = memo(
  ({ id, type = "text", placeholder, required = false, className = "", as = "input", rows = 4 }: BlurInputProps) => (
    <div className={`${outerCardBaseStyle} rounded-lg ${className}`}>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 z-10 ${blurOverlayStyle} bg-black/60 rounded-lg`} />

      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="relative z-20 w-full h-full p-3 sm:p-4 bg-transparent rounded-lg font-medium text-base sm:text-lg leading-relaxed text-[#FEFEFE] placeholder:text-[#FEFEFE]/70 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          className="relative z-20 w-full h-full px-3 sm:px-4 bg-transparent rounded-lg font-medium text-base sm:text-lg leading-relaxed text-[#FEFEFE] placeholder:text-[#FEFEFE]/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}
    </div>
  ),
);

// --- Main App Component ---
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // --- Loading Effect (Image Preloading) ---
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;

    const handleLoad = () => {
      if (!cancelled) {
        console.log("All specified images loaded (or timed out), hiding loading screen.");
        setIsPageLoaded(true);
      }
    };

    const totalImages = imagesToPreload.length;
    if (totalImages === 0) {
        handleLoad();
        return;
    }

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          handleLoad();
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to load image: ${src}`);
        if (loadedCount === totalImages) {
          handleLoad();
        }
      };
      img.src = src;
    });

    const timeoutId = setTimeout(() => {
        if (loadedCount < totalImages) {
            console.warn(`Loading timeout (${loadedCount}/${totalImages} loaded), forcing loading screen hide.`);
            handleLoad();
        }
    }, 15000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);


  // --- Intersection Observer Effect ---
  useEffect(() => {
    if (!isPageLoaded) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isPageLoaded]);

  // --- Menu Items & IDs ---
  const menuItems = ["Home", "About Us", "Products", "Contact Us"];
  const sectionIds: SectionIds = {
    Home: "home",
    "About Us": "about",
    Products: "products",
    "Contact Us": "contact",
  };

  // --- Mobile Link Click Handler ---
  const handleMobileLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // --- Body Scroll Lock Effect ---
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Helper for section animation props
  const sectionAnimationProps = {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.15 },
    variants: fadeInUp,
  };

  return (
    <AnimatePresence mode="wait">
      {!isPageLoaded ? (
        <LoadingScreen key="loading-screen" />
      ) : (
        <motion.div
          key="app-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#141414] text-white font-onest leading-normal min-h-screen overflow-x-hidden"
        >
          {/* --- HEADER --- */}
          <motion.header
            className="fixed left-0 right-0 z-50 bg-[#1e1e1e]/80 backdrop-blur-lg shadow-sm w-full md:w-[calc(100%-3rem)] max-w-6xl md:left-1/2 md:-translate-x-1/2 md:top-4 rounded-none md:rounded-xl border border-white/10"
          >
            <div className="mx-auto px-4 md:px-4 py-3 flex items-center justify-between">
              <motion.img
                src={logoSrc}
                alt="Empower Match Logo"
                className="w-24 md:w-28 cursor-pointer" // Slightly larger logo
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />

              {/* Desktop Navigation */}
              <motion.nav
                className="hidden md:flex items-center gap-7" // Slightly larger gap
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${sectionIds[item]}`}
                    className={`relative text-base text-gray-100 hover:text-[#a3e635] transition-colors duration-200 font-medium pb-1
                           after:content-[''] after:absolute after:left-0 after:bottom-0
                           after:h-[2px] after:w-full after:bg-[#a3e635]
                           after:origin-center after:scale-x-0 hover:after:scale-x-100
                           after:transition-transform after:duration-300 after:ease-out
                           ${activeSection === sectionIds[item] ? "text-[#a3e635] after:scale-x-100" : ""}`} // Increased font size
                    variants={staggerItem}
                    whileHover={{ y: -2, color: "#a3e635" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.nav>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 hover:bg-gray-700 rounded-md transition-colors text-white" // Slightly larger padding
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" /> {/* Slightly larger icon */}
              </motion.button>

              <motion.button
                className="hidden md:block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-2 text-white text-base font-semibold transition-colors" // Increased padding/font size
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </motion.header>

          {/* --- MOBILE MENU OVERLAY --- */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 z-[51] bg-[#141414]/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariant}
              >
                <motion.button
                  className="absolute top-6 right-6 p-2 text-gray-300 hover:text-white" // Adjusted position
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-7 h-7" />
                </motion.button>

                <ul className="flex flex-col items-center gap-8"> {/* Increased gap */}
                  {menuItems.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${sectionIds[item]}`}
                        onClick={() => handleMobileLinkClick(sectionIds[item])}
                        className={`font-medium text-2xl text-gray-100 hover:text-[#a3e635] transition-colors
                              ${activeSection === sectionIds[item] ? "text-[#a3e635]" : ""}`} // Increased font size
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      className="mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-lg px-10 py-3 flex items-center justify-center transition-colors text-white font-semibold text-lg" // Increased size & padding
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        // Add sign up logic here if needed
                      }}
                    >
                      Sign Up Now
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- MAIN CONTENT --- */}
          <main className="pt-24 md:pt-28"> {/* Increased top padding */}
            {/* Hero Section */}
            <motion.section
              id="home"
              className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto flex flex-col items-center gap-10 md:gap-12"> {/* Increased gap */}
                <div className="flex flex-col items-center gap-6 md:gap-8 max-w-6xl"> {/* Increased gap & max-width */}
                  <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-tight tracking-tight text-[#FBFBFB]"> {/* Increased font size */}
                    Bridging Accessibility Gaps, One Innovation at a Time.
                  </h1>
                  <p className="max-w-5xl font-normal text-lg sm:text-xl md:text-2xl leading-relaxed md:leading-relaxed tracking-normal text-[#DCDCDC]"> {/* Increased font size */}
                    Welcome to Empower Match, where innovation meets inclusivity. Join us in shaping a world where
                    technology empowers everyone!!!
                  </p>
                </div>
                <motion.button
                  className="inline-flex justify-center items-center px-8 py-4 sm:px-10 sm:py-4 bg-[#FEFEFE] rounded-xl h-auto min-w-[200px] md:min-w-[280px] hover:bg-gray-200 transition-colors shadow-lg" // Increased padding, width, shadow
                  aria-label="Get Started"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-semibold text-lg sm:text-xl leading-snug text-[#141414]">Get Started</span> {/* Increased font size */}
                </motion.button>
              </div>
            </motion.section>

            {/* App Showcase (UI Frame) */}
            <motion.section
              className="py-12 sm:py-16 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto max-w-7xl relative overflow-hidden border border-white/10 shadow-glass-inset rounded-3xl"> {/* Increased max-width & rounding */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${bgImageUrl})` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 z-10 backdrop-blur-[70px] bg-gradient-radial from-[white/15] to-white/30 shadow-sm" // Increased blur
                  style={{ willChange: "backdrop-filter" }}
                />
                <div className="relative z-20 p-4 sm:p-8 md:p-10"> {/* Increased padding */}
                  <div
                    className="w-full h-auto aspect-[1488/962] bg-cover bg-center rounded-2xl shadow-xl" // Increased rounding & shadow
                    style={{ backgroundImage: `url(${appShowcaseContentSrc})` }}
                    aria-label="App Showcase Frame Content"
                  ></div>
                </div>
              </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
              className="my-16 sm:my-20 md:my-24 mx-auto max-w-7xl relative overflow-hidden border border-white/10 shadow-glass-inset rounded-3xl" // Increased rounding, margin, max-width
              {...sectionAnimationProps}
            >
              <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImageUrl})` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 z-10 backdrop-blur-[70px] shadow-[-1px_0px_20px_10px_rgba(255,255,255,0.05)_inset]" // Increased blur & shadow
                style={{ willChange: "backdrop-filter" }}
              />
              <div className="relative z-20 flex flex-col md:flex-row md:h-auto">
                {/* Stat Item 1 */}
                <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-10 md:p-12 gap-4 text-center border-b md:border-b-0 md:border-r border-white/15"> {/* Increased padding/gap */}
                  <p className="font-normal text-base sm:text-lg md:text-xl leading-snug tracking-normal text-[#EAEAEA]"> {/* Increased font size */}
                    Number of users on Empower Match
                  </p>
                  <span className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#EAEAEA]"> {/* Increased font size */}
                    20K+
                  </span>
                </div>
                {/* Stat Item 2 */}
                <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-10 md:p-12 gap-4 text-center border-b md:border-b-0 md:border-r md:border-r-white/15"> {/* Increased padding/gap */}
                  <p className="font-normal text-base sm:text-lg md:text-xl leading-snug tracking-normal text-[#EAEAEA]"> {/* Increased font size */}
                    Number of Apps on Empower Match
                  </p>
                  <span className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#EAEAEA]"> {/* Increased font size */}
                    200+
                  </span>
                </div>
                {/* Stat Item 3 */}
                <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-10 md:p-12 gap-4 text-center"> {/* Increased padding/gap */}
                  <p className="font-normal text-base sm:text-lg md:text-xl leading-snug tracking-normal text-[#EAEAEA]"> {/* Increased font size */}
                    General rating
                  </p>
                  <span className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#EAEAEA]"> {/* Increased font size */}
                    4.8 ★
                  </span>
                </div>
              </div>
            </motion.section>

            {/* About Us Section */}
            <motion.section
              id="about"
              className="py-16 sm:py-20 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto flex flex-col items-center gap-12 sm:gap-20"> {/* Increased gap */}
                {/* Headings */}
                <div className="flex flex-col items-center gap-4 text-center"> {/* Increased gap */}
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-[#FEFEFE]"> {/* Increased font size */}
                    About Us
                  </h2>
                  <p className="font-normal text-xl sm:text-2xl md:text-3xl leading-snug tracking-normal text-[#FBFBFB]"> {/* Increased font size */}
                    Who are we and what do we do?
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-10 sm:gap-14 max-w-7xl"> {/* Increased gap & max-width */}
                  <p className="max-w-6xl text-center font-normal text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal text-[#F2F2F2]"> {/* Increased font size */}
                  Empower Match is more than just a platform; it's a movement dedicated to building a world where everyone has the power to access information, connect with others, and achieve their full potential. We believe that technology should be inclusive and empowering, not a source of frustration or exclusion.
                  </p>

                  {/* Two Cards: Challenge & Vision */}
                  <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10 w-full"> {/* Increased gap */}
                    {/* Card 1: Our Challenge */}
                    <BlurCard className="w-full md:flex-1 rounded-3xl flex flex-col"> {/* Increased rounding */}
                      <div className="p-8 sm:p-10 flex flex-col h-full gap-5 sm:gap-7"> {/* Increased padding & gap */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3"> {/* Increased size/rounding */}
                          <img src={ideaLogoSrc} alt="Idea Logo" className="w-3/4 h-3/4 object-contain" />
                        </div>
                        <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-[#FEFEFE]"> {/* Increased font size */}
                          Our Challenge
                        </h3>
                        <p className="font-medium text-base sm:text-lg md:text-xl leading-relaxed text-[#FEFEFE]"> {/* Increased font size */}
                        Millions worldwide face limitations due to disabilities like visual impairments, mobility issues, and hearing loss, which hinder navigation, accessing information, and communication, leading to isolation. Empower Match aims to dismantle these barriers for an inclusive world.
                        </p>
                      </div>
                    </BlurCard>

                    {/* Card 2: Our Vision */}
                    <BlurCard className="w-full md:flex-1 rounded-3xl flex flex-col"> {/* Increased rounding */}
                      <div className="p-8 sm:p-10 flex flex-col h-full gap-5 sm:gap-7"> {/* Increased padding & gap */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3"> {/* Increased size/rounding */}
                          <img src={handBulbSrc} alt="Hand with Light Bulb" className="w-3/4 h-3/4 object-contain" />
                        </div>
                        <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-[#FEFEFE]"> {/* Increased font size */}
                          Our Vision
                        </h3>
                        <p className="font-medium text-base sm:text-lg md:text-xl leading-relaxed text-[#FEFEFE]"> {/* Increased font size */}
                        Imagine a world where individuals with disabilities navigate confidently with tailored assistive technologies. Education and workplaces are inclusive, offering accessible tools. Social interaction bridges communication gaps.
                        </p>
                      </div>
                    </BlurCard>
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="inline-flex justify-center items-center px-8 sm:px-10 py-4 sm:py-4 gap-3 bg-[#FEFEFE] rounded-xl h-auto hover:bg-gray-200 transition-colors shadow-lg" // Increased padding/gap/shadow
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-semibold text-lg sm:text-xl leading-snug text-[#2B2B2B]"> {/* Increased font size */}
                      Learn more about us here
                    </span>
                    <span className="text-[#2B2B2B]">
                      <IconCaretRight />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* How We Empower Section */}
            <motion.section
              className="py-16 sm:py-20 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl"> {/* Increased gap & max-width */}
                {/* Left: Text */}
                <div className="flex flex-col gap-6 sm:gap-8 max-w-2xl"> {/* Increased gap */}
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                    How We Empower
                  </h2>
                  <div className="font-onest font-normal text-lg sm:text-xl leading-relaxed tracking-normal text-gray-300 space-y-5"> {/* Increased font size, added space-y */}
                    <p>
                      Empower Match fosters innovation and inclusivity through collaboration across our ecosystem:
                    </p>
                    <ul className="list-disc list-inside space-y-3"> {/* Increased space */}
                      <li>
                        <span className="font-semibold">Platform for Change:</span> Developers showcase assistive tech solutions, prioritizing underserved communities.
                      </li>
                      <li><span className="font-semibold">Open-Source Initiatives:</span> We champion collaborative, affordable accessibility projects.</li>
                      <li>
                        <span className="font-semibold">User-Centric Design:</span> People with disabilities shape our inclusive technologies through active feedback.
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Right: App Mockup */}
                <motion.div
                  className="relative w-full max-w-xl lg:max-w-2xl mx-auto h-auto flex justify-center items-center" // Adjusted max-width
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={howWeEmpowerSrc}
                    alt="Empower Match Explore Page"
                    className="w-full h-auto rounded-3xl object-contain shadow-2xl" // Increased rounding & shadow
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.section>

            {/* Products & Services Section */}
            <motion.section
              id="products"
              className="py-16 sm:py-20 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto flex flex-col items-center gap-12 sm:gap-20 max-w-7xl"> {/* Increased gap & max-width */}
                {/* Headings */}
                <div className="flex flex-col items-center gap-4 text-center"> {/* Increased gap */}
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                    Products and Services
                  </h2>
                  <p className="font-normal text-xl sm:text-2xl md:text-3xl leading-snug tracking-normal text-[#DCDCDC]"> {/* Increased font size */}
                    Discover our solutions to your problems
                  </p>
                </div>

                {/* Products Grid */}
                <div className="flex flex-col gap-16 sm:gap-24 w-full"> {/* Increased gap */}

                  {/* Product Row 1 (Wheelmap) */}
                  {/* UPDATED: Removed border on md+ */}
                  <div className="relative overflow-hidden rounded-2xl border md:border-0 border-white/10">
                    {/* Background Image (Always present) */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-20 md:opacity-0" /* Hide on md+ */
                      style={{ backgroundImage: `url(${bgImageUrl})` }}
                      aria-hidden="true"
                    />
                    {/* Blur Overlay (Conditional) */}
                    <div className="absolute inset-0 z-10 rounded-2xl bg-black/60 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none" />

                    {/* Content Container (With Padding) */}
                    <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full p-8 sm:p-10 lg:p-12"> {/* Increased padding/gap */}
                      {/* Image Left Container */}
                      <motion.div
                        className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0 flex items-center justify-center p-4"
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={wheelSrc}
                          alt="Wheelmap Icon"
                          className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain" // Increased max-width
                          loading="lazy"
                        />
                      </motion.div>
                      {/* Text Right */}
                      <div className="flex flex-col gap-5 sm:gap-7 md:w-1/2 lg:w-7/12"> {/* Increased gap */}
                        <h3 className="font-semibold text-2xl sm:text-3xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                          Wheelmap
                        </h3>
                        <p className="font-medium text-base sm:text-lg leading-relaxed text-[#DCDCDC]"> {/* Increased font size */}
                        Promoting inclusivity, this app crowd-sources information about wheelchair-accessible places, allowing users to navigate urban environments confidently.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5"> {/* Increased gap */}
                          <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#212121] border border-[#3A3A3A] rounded-lg h-auto hover:bg-gray-700 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Download Now</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                          <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#595959] rounded-lg h-auto hover:bg-gray-500 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Learn More</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Row 2 (SoundAlert - Order reversed on md) */}
                  {/* UPDATED: Removed border on md+ */}
                  <div className="relative overflow-hidden rounded-2xl border md:border-0 border-white/10">
                     {/* Background Image (Always present) */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-20 md:opacity-0" /* Hide on md+ */
                      style={{ backgroundImage: `url(${bgImageUrl})` }}
                      aria-hidden="true"
                    />
                    {/* Blur Overlay (Conditional) */}
                    <div className="absolute inset-0 z-10 rounded-2xl bg-black/60 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none" />

                    {/* Content Container (With Padding) */}
                    <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full p-8 sm:p-10 lg:p-12"> {/* Increased padding/gap */}
                       {/* Text Left */}
                      <div className="flex flex-col gap-5 sm:gap-7 md:w-1/2 lg:w-7/12 md:order-1"> {/* Increased gap */}
                        <h3 className="font-semibold text-2xl sm:text-3xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                          SoundAlert
                        </h3>
                        <p className="font-medium text-base sm:text-lg leading-relaxed text-[#DCDCDC]"> {/* Increased font size */}
                        Enhancing safety for users with hearing impairments, this app alerts them to important sounds in their environment, providing awareness and security.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5"> {/* Increased gap */}
                           <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#212121] border border-[#3A3A3A] rounded-lg h-auto hover:bg-gray-700 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Download Now</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                          <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#595959] rounded-lg h-auto hover:bg-gray-500 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Learn More</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                        </div>
                      </div>
                      {/* Image Right Container */}
                      <motion.div
                        className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0 flex items-center justify-center p-4 md:order-2"
                        whileHover={{ scale: 1.03 }}
                      >
                         <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto aspect-square bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl flex items-center justify-center overflow-hidden border border-white/10 p-6"> {/* Increased max-width, rounding, padding, shadow */}
                            <img
                              src={earSrc}
                              alt="Sound Alert Icon"
                              className="w-full h-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Product Row 3 (Accessibility Scanner) */}
                  {/* UPDATED: Removed border on md+ */}
                  <div className="relative overflow-hidden rounded-2xl border md:border-0 border-white/10">
                     {/* Background Image (Always present) */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-20 md:opacity-0" /* Hide on md+ */
                      style={{ backgroundImage: `url(${bgImageUrl})` }}
                      aria-hidden="true"
                    />
                    {/* Blur Overlay (Conditional) */}
                    <div className="absolute inset-0 z-10 rounded-2xl bg-black/60 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none" />

                    {/* Content Container (With Padding) */}
                    <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full p-8 sm:p-10 lg:p-12"> {/* Increased padding/gap */}
                      {/* Image Left Container */}
                       <motion.div
                        className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0 flex items-center justify-center p-4"
                        whileHover={{ scale: 1.03 }}
                      >
                          <img
                            src={accessSrc}
                            alt="Accessibility Scanner Icon"
                            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto rounded-2xl border-[0.5px] border-white/30 shadow-xl" // Increased max-width, rounding, shadow
                            loading="lazy"
                          />
                      </motion.div>
                      {/* Text Right */}
                      <div className="flex flex-col gap-5 sm:gap-7 md:w-1/2 lg:w-7/12"> {/* Increased gap */}
                        <h3 className="font-semibold text-2xl sm:text-3xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                          Accessibility Scanner - Best for Reading
                        </h3>
                        <p className="font-medium text-base sm:text-lg leading-relaxed text-[#DCDCDC]"> {/* Increased font size */}
                        One of the most helpful apps for everyone, the Accessibility Scanner provides practical improvements, making content on-screen easier to read and navigate. The main focus of this accessibility app is to make things easier to read. It offers several features, including background contrast, brightness, text size, color, etc.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5"> {/* Increased gap */}
                           <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#212121] border border-[#3A3A3A] rounded-lg h-auto hover:bg-gray-700 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Download Now</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                          <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#595959] rounded-lg h-auto hover:bg-gray-500 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Learn More</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Row 4 (Live Transcribe - Order reversed on md) */}
                  {/* UPDATED: Removed border on md+ */}
                  <div className="relative overflow-hidden rounded-2xl border md:border-0 border-white/10">
                     {/* Background Image (Always present) */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-20 md:opacity-0" /* Hide on md+ */
                      style={{ backgroundImage: `url(${bgImageUrl})` }}
                      aria-hidden="true"
                    />
                    {/* Blur Overlay (Conditional) */}
                    <div className="absolute inset-0 z-10 rounded-2xl bg-black/60 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none" />

                    {/* Content Container (With Padding) */}
                    <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full p-8 sm:p-10 lg:p-12"> {/* Increased padding/gap */}
                      {/* Text Left */}
                      <div className="flex flex-col gap-5 sm:gap-7 md:w-1/2 lg:w-7/12 md:order-1"> {/* Increased gap */}
                        <h3 className="font-semibold text-2xl sm:text-3xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                          Live Transcribe
                        </h3>
                        <p className="font-medium text-base sm:text-lg leading-relaxed text-[#DCDCDC]"> {/* Increased font size */}
                        Designed on speech recognition technology by Google, Live Transcribe offers convenient accessibility solutions to those who are hard of hearing, deaf, or have a speech impediment. With the option to choose from 70+ languages and dialects, this app offers accurate real-time transcription and caption.
                        Placing your mobile phone close to the speaking person will transcribe the speaker’s audio. So, you can talk or reply even by typing on the app.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5"> {/* Increased gap */}
                           <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#212121] border border-[#3A3A3A] rounded-lg h-auto hover:bg-gray-700 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Download Now</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                          <motion.button
                            className="inline-flex justify-center items-center px-6 py-3 gap-2 bg-[#595959] rounded-lg h-auto hover:bg-gray-500 transition-colors" // Increased padding
                            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-semibold text-base sm:text-lg leading-snug text-[#FEFEFE]">Learn More</span> {/* Increased font size */}
                            <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                          </motion.button>
                        </div>
                      </div>
                      {/* Image Right Container */}
                       <motion.div
                        className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0 flex items-center justify-center p-4 md:order-2"
                        whileHover={{ scale: 1.03 }}
                      >
                          <img
                            src={transcribeSrc}
                            alt="Live Transcribe Icon"
                            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto rounded-2xl border-[0.5px] border-white/30 shadow-xl" // Increased max-width, rounding, shadow
                            loading="lazy"
                          />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* See All Products Button */}
                <motion.button
                  className="inline-flex justify-center items-center px-8 sm:px-10 py-4 sm:py-4 gap-3 bg-[#FEFEFE] rounded-xl h-auto hover:bg-gray-200 transition-colors shadow-lg" // Increased padding/gap/shadow
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-semibold text-lg sm:text-xl leading-snug text-[#2F2F2F]"> {/* Increased font size */}
                    See All Our Products
                  </span>
                  <span className="text-[#2F2F2F]">
                    <IconCaretRight />
                  </span>
                </motion.button>
              </div>
            </motion.section>

            {/* Join Empower Match CTA Banner */}
            <motion.section
              className="relative my-16 sm:my-20 md:my-24 mx-auto max-w-7xl h-auto rounded-3xl bg-cover bg-center flex items-center overflow-hidden" // Increased margin/rounding/max-width
              {...sectionAnimationProps}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bannerBgSrc})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
              <div className="relative z-10 container mx-auto px-8 sm:px-12 py-12 sm:py-20 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12"> {/* Increased padding/gap */}
                <div className="flex flex-col gap-4 sm:gap-5 max-w-2xl text-center md:text-left"> {/* Increased gap */}
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-white"> {/* Increased font size */}
                    Join Empower Match Today
                  </h2>
                  <p className="font-medium text-lg sm:text-xl leading-relaxed text-white"> {/* Increased font size */}
                  Together, we can build a world where technology empowers everyone!!! Become part of the solution and make a change.
                  </p>
                </div>
                <motion.button
                  className="inline-flex justify-center items-center px-8 sm:px-10 py-4 sm:py-4 gap-3 bg-white rounded-xl h-auto w-full max-w-sm md:max-w-none md:w-auto md:min-w-[280px] lg:min-w-[320px] hover:bg-gray-200 transition-colors flex-shrink-0 shadow-lg" // Increased padding/width/gap/shadow
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-bold text-lg sm:text-xl leading-snug text-[#1A1A1A]"> {/* Increased font size */}
                    Join Empower Match Now
                  </span>
                  <span className="text-[#1A1A1A]">
                    <IconCaretRight />
                  </span>
                </motion.button>
              </div>
            </motion.section>

            {/* Customer Reviews (Testimonials) */}
            <motion.section
              className="py-16 sm:py-20 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <div className="container mx-auto max-w-7xl flex flex-col gap-10 sm:gap-14"> {/* Increased gap & max-width */}
                <div className="flex flex-col gap-4"> {/* Increased gap */}
                  <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                    Customer Reviews
                  </h2>
                  <p className="font-normal text-xl sm:text-2xl md:text-3xl leading-snug tracking-normal text-[#DCDCDC]"> {/* Increased font size */}
                    What do people say about us?
                  </p>
                </div>
                <div className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"> {/* Increased gap */}
                    {/* Review Card 1 */}
                    <BlurCard className="rounded-2xl flex flex-col"> {/* Increased rounding */}
                      <div className="p-6 sm:p-8 flex flex-col gap-5"> {/* Increased padding/gap */}
                        {/* User Info + Stars Row */}
                        <div className="flex items-start justify-between gap-4">
                          {/* Left: Image + Text */}
                          <div className="flex items-center gap-5 flex-grow"> {/* Increased gap */}
                            <img
                              src={adeyemiSrc}
                              alt="Adeyemi Adekojo"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
                              loading="lazy"
                            />
                            <div className="flex flex-col gap-1.5"> {/* Increased gap */}
                              <h4 className="font-semibold text-lg sm:text-xl leading-snug text-[#FEFEFE]"> {/* Increased font size */}
                                Adeyemi Adekojo
                              </h4>
                              <p className="font-normal text-base sm:text-lg leading-snug text-[#DCDCDC]"> {/* Increased font size */}
                                Founder at NodePair
                              </p>
                            </div>
                          </div>
                          {/* Right: Stars */}
                          <div className="flex gap-1 flex-shrink-0 mt-1">
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarHalf />
                          </div>
                        </div>
                        {/* Review Text */}
                        <p className="font-medium text-base sm:text-lg leading-relaxed tracking-normal text-[#F6F6F6]"> {/* Increased font size */}
                        As the founder of a platform that solve problem. I can really see myself in the vision and goal of this project which is to focus on underserved community and low-income family while solving a problem. I am really impress with your mindset and your passion on focusing on people that are impaired in an underserved community
                        </p>
                      </div>
                    </BlurCard>

                    {/* Review Card 2 */}
                    <BlurCard className="rounded-2xl flex flex-col">
                       <div className="p-6 sm:p-8 flex flex-col gap-5">
                         {/* User Info + Stars Row */}
                        <div className="flex items-start justify-between gap-4">
                          {/* Left: Image + Text */}
                          <div className="flex items-center gap-5 flex-grow">
                            <img
                              src={olamijiSrc}
                              alt="Olamiji Ogunbowale"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
                              loading="lazy"
                            />
                            <div className="flex flex-col gap-1.5">
                              <h4 className="font-semibold text-lg sm:text-xl leading-snug text-[#FEFEFE]">
                              Oluwalonimi bankole
                              </h4>
                              <p className="font-normal text-base sm:text-lg leading-snug text-[#DCDCDC]">Student</p>
                            </div>
                          </div>
                           {/* Right: Stars */}
                          <div className="flex gap-1 flex-shrink-0 mt-1">
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarHalf />
                          </div>
                        </div>
                         {/* Review Text */}
                        <p className="font-medium text-base sm:text-lg leading-relaxed tracking-normal text-[#F6F6F6]">
                        The Virtual Mouse has been a game-changer for me. Its intuitive control through eye and head movements has given me a newfound sense of independence. A heartfelt thank you to Daniel Falodun my classmate for this empowering tool that goes beyond technology—it's a lifeline to inclusion.
                        </p>
                      </div>
                    </BlurCard>

                    {/* Review Card 3 */}
                     <BlurCard className="rounded-2xl flex flex-col">
                       <div className="p-6 sm:p-8 flex flex-col gap-5">
                         {/* User Info + Stars Row */}
                        <div className="flex items-start justify-between gap-4">
                           {/* Left: Image + Text */}
                          <div className="flex items-center gap-5 flex-grow">
                            <img
                              src={olamiji2Src}
                              alt="Olamiji Ogunbowale"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
                              loading="lazy"
                            />
                            <div className="flex flex-col gap-1.5">
                              <h4 className="font-semibold text-lg sm:text-xl leading-snug text-[#FEFEFE]">
                                Olamiji Ogunbowale
                              </h4>
                              <p className="font-normal text-base sm:text-lg leading-snug text-[#DCDCDC]">Student</p>
                            </div>
                          </div>
                           {/* Right: Stars */}
                          <div className="flex gap-1 flex-shrink-0 mt-1">
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarHalf />
                          </div>
                        </div>
                         {/* Review Text */}
                        <p className="font-medium text-base sm:text-lg leading-relaxed tracking-normal text-[#F6F6F6]">
                        The Virtual Mouse has genuinely changed my life. The smooth control of eye and head movements has not only given me freedom but also opened me to a world of possibilities. A heartfelt thank you to the amazing brain Daniel who created this wonderful instrument, which has been my lifeline to inclusion and a source of renewed freedom.
                        </p>
                      </div>
                    </BlurCard>

                    {/* Review Card 4 */}
                    <BlurCard className="rounded-2xl flex flex-col">
                       <div className="p-6 sm:p-8 flex flex-col gap-5">
                         {/* User Info + Stars Row */}
                        <div className="flex items-start justify-between gap-4">
                           {/* Left: Image + Text */}
                          <div className="flex items-center gap-5 flex-grow">
                            <img
                              src={olamiji3Src}
                              alt="Olamiji Ogunbowale"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
                              loading="lazy"
                            />
                            <div className="flex flex-col gap-1.5">
                              <h4 className="font-semibold text-lg sm:text-xl leading-snug text-[#FEFEFE]">
                              Dabira mayowa
                              </h4>
                              <p className="font-normal text-base sm:text-lg leading-snug text-[#DCDCDC]">Student</p>
                            </div>
                          </div>
                           {/* Right: Stars */}
                          <div className="flex gap-1 flex-shrink-0 mt-1">
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarFill />
                            <IconStarHalf />
                          </div>
                        </div>
                         {/* Review Text */}
                        <p className="font-medium text-base sm:text-lg leading-relaxed tracking-normal text-[#F6F6F6]">
                        Daniel I don’t know where to start thanking you from this app is wonderful and i hope you win the rise global scholarship in other to keep on providing for people like me i have not been able to access my computer for years now as I only rely on my friends to assist me with it today I could move my mouse and click on items am so proud of my self thank you Daniel for what you do !
                        </p>
                      </div>
                    </BlurCard>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Contact Us Section */}
            <motion.section
              id="contact"
              className="py-16 sm:py-20 px-4 sm:px-6 relative bg-cover bg-center min-h-[700px] sm:min-h-[900px] flex flex-col items-center" // Increased padding & min-height
              style={{ backgroundImage: `url(${contactBgSrc})` }}
              {...sectionAnimationProps}
            >
              {/* Headings */}
              <div className="relative z-10 flex flex-col items-center gap-4 text-center mb-10 sm:mb-14"> {/* Increased gap/margin */}
                <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                  Contact Us
                </h2>
                <p className="font-normal text-xl sm:text-2xl md:text-3xl leading-snug tracking-normal text-[#DCDCDC]"> {/* Increased font size */}
                  We'd love to hear from you!!!
                </p>
              </div>

              {/* Form Container */}
              <BlurCard className="w-full max-w-3xl mx-auto h-auto rounded-2xl"> {/* Increased max-width/rounding */}
                <form className="space-y-6 p-8 md:p-10"> {/* Increased space/padding */}
                  {/* Name Field Container */}
                  <div className="flex flex-col gap-2.5"> {/* Increased gap */}
                    <label
                      htmlFor="contact-name"
                      className="font-medium text-lg sm:text-xl leading-snug text-white" // Increased font size
                    >
                      Name
                    </label>
                    <BlurInput
                      id="contact-name"
                      placeholder="Enter your name"
                      required={true}
                      className="w-full h-11 sm:h-14" // Increased height
                    />
                  </div>

                  {/* Email Field Container */}
                  <div className="flex flex-col gap-2.5">
                    <label
                      htmlFor="contact-email"
                      className="font-medium text-lg sm:text-xl leading-snug text-white"
                    >
                      Email Address
                    </label>
                    <BlurInput
                      id="contact-email"
                      type="email"
                      placeholder="Enter your email"
                      required={true}
                      className="w-full h-11 sm:h-14"
                    />
                  </div>

                  {/* Message Field Container */}
                  <div className="flex flex-col gap-2.5">
                    <label
                      htmlFor="contact-message"
                      className="font-medium text-lg sm:text-xl leading-snug text-white"
                    >
                      Send Us a Message
                    </label>
                    <BlurInput
                      id="contact-message"
                      placeholder="Type here..."
                      required={true}
                      className="w-full h-28 sm:h-36" // Increased height
                      as="textarea"
                      rows={6} // Adjusted rows
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    aria-label="Send message"
                    className="w-full h-12 sm:h-14 bg-[#212121] rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center border border-white/10" // Increased height
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(55, 65, 81, 1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-lg sm:text-xl leading-snug text-[#FEFEFE]"> {/* Increased font size */}
                      Send Message
                    </span>
                  </motion.button>
                </form>
              </BlurCard>
            </motion.section>

            {/* Newsletter Signup Section */}
            <motion.section
              className="py-16 sm:py-20 px-4 sm:px-6" // Increased padding
              {...sectionAnimationProps}
            >
              <BlurCard className="container mx-auto max-w-5xl rounded-2xl"> {/* Increased max-width/rounding */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center gap-8 sm:gap-10"> {/* Increased padding/gap */}
                  {/* Headings */}
                  <div className="flex flex-col items-center gap-4 text-center max-w-3xl"> {/* Increased gap/max-width */}
                    <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-[#F2F2F2]"> {/* Increased font size */}
                      Subscribe to our newsletter
                    </h3>
                    <p className="font-normal text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal text-[#DCDCDC]"> {/* Increased font size */}
                      Join Our Mailing List To Receive The News & Latest Trends
                    </p>
                  </div>

                  {/* Form */}
                  <form className="flex flex-col sm:flex-row w-full max-w-2xl h-auto"> {/* Increased max-width */}
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email Address
                    </label>
                    <div className="flex-grow h-12 sm:h-14 relative overflow-hidden border border-white/10 shadow-glass-inset rounded-t-lg sm:rounded-l-lg sm:rounded-r-none"> {/* Increased height */}
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 z-10 backdrop-blur-lg bg-black/60 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none" />
                      <input
                        type="email"
                        id="newsletter-email"
                        placeholder="Enter your email"
                        required
                        className="relative z-20 w-full h-full px-5 bg-transparent rounded-t-lg sm:rounded-l-lg sm:rounded-r-none font-semibold text-lg sm:text-xl leading-snug text-[#FBFBFB] placeholder:text-[#FBFBFB]/70 focus:outline-none focus:ring-2 focus:ring-blue-500" // Increased padding/font size
                      />
                    </div>
                    <motion.button
                      type="submit"
                      aria-label="Subscribe to newsletter"
                      className="w-full sm:w-auto sm:px-10 h-12 sm:h-14 bg-[#212121] rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-gray-700 transition-colors flex items-center justify-center flex-shrink-0 border border-l-0 border-white/10" // Increased height/padding
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(55, 65, 81, 1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium text-lg sm:text-xl leading-snug text-white">Subscribe</span> {/* Increased font size */}
                    </motion.button>
                  </form>
                </div>
              </BlurCard>
            </motion.section>
          </main>

          {/* --- FOOTER --- */}
          <footer className="relative font-onest border-t border-white/10">
            {/* Top Part */}
            <div className="bg-[#252525] px-4 py-12 sm:px-8 sm:py-16">
              <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12 max-w-7xl"> {/* Increased max-width */}

                {/* Column 1: Logo & Brief */}
                <div className="flex flex-col gap-4 items-start col-span-1 sm:col-span-2 lg:col-span-1">
                   <div className="flex items-center gap-3 mb-3"> {/* Increased gap/margin */}
                      <img
                        src={logoFooterSrc}
                        alt="Empower Match Footer Logo"
                        className="h-9 w-auto" // Increased size
                      />
                      <span className="font-semibold text-xl text-white"> {/* Increased size */}
                        Empower Match
                      </span>
                    </div>
                    <p className="text-base text-gray-400 leading-relaxed"> {/* Increased size */}
                        Bridging accessibility gaps through innovative technology for an inclusive digital world.
                    </p>
                </div>

                {/* Column 2: Company Links */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-3">
                    <li><a href="#about" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#careers" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Join our team</a></li>
                    <li><a href="#press" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Press & Media</a></li>
                    <li><a href="#contact" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>

                {/* Column 3: Resources Links */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-3">
                    <li><a href="#products" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Products</a></li>
                    <li><a href="#docs" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#security" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Security</a></li>
                    <li><a href="#blog" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#privacy" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#terms" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Terms and Conditions</a></li>
                    <li><a href="#sla" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors">Service Level Agreement</a></li>
                  </ul>
                </div>

                {/* Column 4: Contact Snippet */}
                <div className="flex flex-col gap-3">
                   <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                   <ul className="space-y-4"> {/* Increased space */}
                     <li className="flex items-center gap-4">
                      <IconEmail />
                      <a href="mailto:empowermatch@gmail.com" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors break-all leading-relaxed">empowermatch@gmail.com</a>
                    </li>
                     <li className="flex items-center gap-4">
                      <IconPhone />
                      <a href="tel:+2348169892424" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors whitespace-nowrap">+2348169892424</a>
                    </li>
                    <li className="flex items-start gap-4"> {/* Use items-start for multi-line address */}
                      <span className="mt-1"><IconLocation /></span> {/* Add margin-top for alignment */}
                        <a href="https://www.google.com/maps/search/?api=1&query=11+Odetayo+Street+Ikola+Ilumo+Ipaja+Lagos" target="_blank" rel="noopener noreferrer" className="font-normal text-base text-[#BFBFBF] hover:text-white transition-colors leading-relaxed"> {/* Added leading-relaxed */}
                        11, Odetayo Street Ikola Ilumo Ipaja Lagos
                        </a>
                    </li>
                   </ul>
                </div>

              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1A1A1A] px-4 py-6 sm:px-8 sm:py-5 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"> {/* Adjusted padding */}
               <p className="text-sm text-gray-400 mb-4 sm:mb-0"> {/* Increased font size */}
                 © {new Date().getFullYear()} Empower Match. All rights reserved.
               </p>
              <div className="flex gap-5 sm:gap-4">
                <motion.a href="#facebook" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconFacebook />
                </motion.a>
                <motion.a href="#twitter" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconTwitter />
                </motion.a>
                <motion.a href="#instagram" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconInstagram />
                </motion.a>
                <motion.a href="#medium" aria-label="Medium" className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconMedium />
                </motion.a>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
