// src/App.tsx
import React, { useState } from 'react'; // Import necessary React hooks
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu
import "./App.css"

// --- Asset Placeholders ---

const logoSrc = './logo.png';
const logoFooterSrc = '/assets/placeholder-null-background-resized.png';
const appShowcaseContentSrc = './assets/Homepage2.png';
const bannerBgSrc = '/joinow.png';
const contactBgSrc = '/261.png';
const bgImageUrl = '/bgimage.png'; // Define the background image URL once
const contactFormBgSrc = '/Vector4.png'; // Added background for the contact form container

// Style for the layer that provides the blur and semi-transparent color
// Similar to the navbar's effect layer
const blurOverlayStyle = "bg-black/40 backdrop-blur-lg"; // Adjust bg-black/40 opacity as needed (e.g., /30, /50)

// Base style for the outer container (border, shadow, positioning)
const outerCardBaseStyle = "relative overflow-hidden border border-white/10 shadow-glass-inset";



const IconCaretRight = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>;
const IconStarFill = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 text-[#F5CB76]"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>;
const IconStarHalf = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 text-[#F5CB76]"><path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.154-.746-.592l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226V12.027z"/></svg>;
const IconEmail = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-gray-400"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.558Z"/></svg>;
const IconPhone = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-gray-400"><path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>;
const IconLocation = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-gray-400"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>;
const IconFacebook = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-[#FEFEFE]"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>;
const IconTwitter = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-[#FEFEFE]"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>;
const IconInstagram = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-[#FEFEFE]"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231s.008-2.389.046-3.232c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>;
const IconMedium = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-9 h-9 text-[#FEFEFE]"><path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236S9.463 10.34 9.463 8c0-2.34 1.01-4.236 2.256-4.236S13.975 5.66 13.975 8zM16 8c0 2.096-.71 3.795-1.595 3.795-.885 0-1.594-1.7-1.594-3.795 0-2.096.71-3.795 1.594-3.795C15.29 4.205 16 5.904 16 8z"/></svg>;

// --- Motion Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
      delayChildren: 0.4, // Delay before starting children animation (after header fades in)
    },
  },
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const mobileMenuVariant = {
    hidden: { y: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};


// --- Main App Component ---
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define menu items based on your sections
  const menuItems = ['Home', 'About Us', 'Products', 'Contact Us'];
  // Map menu item names to section IDs
  const sectionIds: { [key: string]: string } = {
    'Home': 'home',
    'About Us': 'about',
    'Products': 'products',
    'Contact Us': 'contact',
  };

  const handleMobileLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    // Optional: Smooth scroll to section after menu closes
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300); // Match transition duration
  };


  return (
    // GENERAL PAGE STYLING
    <div className="bg-[#141414] text-white font-onest leading-relaxed min-h-screen">

      {/* --- NEW HEADER --- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        // This uses backdrop-blur correctly
        className="fixed left-0 right-0 z-50 bg-[#1e1e1e]/80 backdrop-blur-lg shadow-sm w-full md:w-[calc(100%-4rem)] max-w-6xl md:left-1/2 md:-translate-x-1/2 md:top-4 rounded-2xl border border-white/10"
      >
        <div className="mx-auto px-6 md:px-4 py-4 flex items-center justify-between">
          <motion.img
            src={logoSrc} // Use your logo source
            alt="Empower Match Logo" // Updated alt text
            className="w-24 md:w-28 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${sectionIds[item]}`} // Use mapped section ID
                className="relative text-gray-100 hover:text-[#a3e635] transition-colors duration-200 font-medium pb-1
                           after:content-[''] after:absolute after:left-0 after:bottom-0
                           after:h-[2px] after:w-full after:bg-[#a3e635]
                           after:origin-center after:scale-x-0 hover:after:scale-x-100
                           after:transition-transform after:duration-300 after:ease-out"
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
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>

           <motion.button
              className={`hidden md:block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-[14px] px-8 py-2 text-white font-semibold transition-colors`}
              whileHover={{ scale: 1.05 }}
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
            className="fixed inset-0 z-50 bg-[#141414]/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariant}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <ul className="flex flex-col items-center gap-8">
              {menuItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${sectionIds[item]}`}
                    onClick={() => handleMobileLinkClick(sectionIds[item])} // Close menu and scroll
                    className="font-medium text-2xl text-gray-100 hover:text-[#a3e635] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className={`mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-[14px] px-10 py-3 flex items-center justify-center transition-colors text-white font-semibold text-lg`}
                   onClick={() => {
                       setIsMobileMenuOpen(false); // Close menu on click
                   }}
                >
                  Sign Up Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- END OF MOBILE MENU --- */}

      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center text-center px-6 pt-10 pb-20 md:pt-16 md:pb-32">
          <div className="container mx-auto flex flex-col items-center gap-[52px]">
            <div className="flex flex-col items-center gap-[40px] max-w-[1454px]">
              <h1 className="font-semibold text-[56px] md:text-[72px] leading-[1.5] md:leading-[108px] tracking-[0.036em] text-[#FBFBFB]">
                Bridging Accessibility Gaps, One Innovation at a Time.
              </h1>
              <p className="max-w-[1398px] font-normal text-[20px] md:text-[24px] leading-[1.8] md:leading-[44px] tracking-[0.036em] text-[#DCDCDC]">
                Welcome to Empower Match, where innovation meets inclusivity. Join us in shaping a world where technology empowers everyone!!!
              </p>
            </div>
            <button className="inline-flex justify-center items-center px-5 py-6 bg-[#FEFEFE] rounded-[16px] h-[74px] w-auto min-w-[200px] md:w-[420px] hover:bg-gray-200 transition-colors">
              <span className="font-semibold text-[24px] leading-[31px] text-[#141414]">
                Get Started
              </span>
            </button>
          </div>
        </section>

        {/* App Showcase (UI Frame) - Applying backdrop-blur structure */}
        <section className="py-16 px-6">
           {/* 1. Outermost container: Has border, shadow, rounding, relative, overflow */}
           <div
              className={`container mx-auto max-w-[1584px] ${outerCardBaseStyle} rounded-[32px]`}
           >
                {/* 2. Background Image Div */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImageUrl})` }}
                    aria-hidden="true" // Hide decorative background from screen readers
                ></div>

                {/* 3. Blur/Overlay Div: Applies backdrop-blur to the image behind it */}

<div className={`absolute inset-0 z-10  backdrop-blur-[476.339599609375px]   bg-gradient-radial from-[white/24] to-white/40
  shadow-sm `}></div>


                {/* 4. Content Div: Sits on top */}
                <div className="relative z-20 p-[48px]"> {/* Padding moved here */}
                    {/* Inner content frame */}
                    <div
                        className="w-full h-auto aspect-[1488/962] bg-cover bg-center  rounded-[24px] " // Adjusted border opacity
                        style={{ backgroundImage: `url(${appShowcaseContentSrc})` }}
                        aria-label="App Showcase Frame Content"
                    >
                        <img src="Homepage2.png" alt="" />
                    </div>
                </div>
           </div>
        </section>

        {/* Stats Section - Applying backdrop-blur structure */}
        <section
          className={`my-16 md:my-24 mx-auto max-w-[1731px] h-[300px]  flex ${outerCardBaseStyle} rounded-none`} // Use base style, remove rounding if full width
        >
          {/* 2. Background Image Div */}
          <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImageUrl})` }}
              aria-hidden="true"
          ></div>

          {/* 3. Blur/Overlay Div */}
          <div className={`absolute inset-0 z-10 backdrop-blur-[476.339599609375px] shadow-[-1.18px_0px_19.22px_11.34px_rgba(255,255,255,0.05)_inset]`}></div>

          {/* 4. Content Div (Original Flex Content) */}
          <div className="relative z-20 flex flex-1"> {/* Wrapper for flex items */}
            {/* Stat Item 1 */}
            <div className="flex-1 flex flex-col justify-center items-center p-[74px_58px] gap-6 text-center border-r border-white/20">
              <p className="font-normal text-[28px] leading-[36px] tracking-[0.036em] text-[#EAEAEA]">Number of users on Empower Match</p>
              <span className="font-semibold text-[72px] leading-[92px] tracking-[0.036em] text-[#EAEAEA]">20K+</span>
            </div>
            {/* Stat Item 2 */}
            <div className="flex-1 flex flex-col justify-center items-center p-[74px_58px] gap-6 text-center">
              <p className="font-normal text-[28px] leading-[36px] tracking-[0.036em] text-[#EAEAEA]">Number of Apps on Empower Match</p>
              <span className="font-semibold text-[72px] leading-[92px] tracking-[0.036em] text-[#EAEAEA]">200+</span>
            </div>
            {/* Stat Item 3 */}
            <div className="flex-1 flex flex-col justify-center items-center p-[74px_58px] gap-6 text-center border-l border-white/20">
              <p className="font-normal text-[28px] leading-[36px] tracking-[0.036em] text-[#EAEAEA]">General rating</p>
              <span className="font-semibold text-[72px] leading-[92px] tracking-[0.036em] text-[#EAEAEA]">4.8 ★</span>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 px-[60px]">
          <div className="container mx-auto flex flex-col items-center gap-[100px]">
            {/* Headings */}
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="font-semibold text-[52px] leading-[66px] tracking-[0.036em] text-[#FEFEFE]">About Us</h2>
              <p className="font-normal text-[36px] leading-[46px] tracking-[0.036em] text-[#FBFBFB]">Who are we and what do we do?</p>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-[68px] max-w-[1612px]">
              <p className="max-w-[1604px] text-center font-normal text-[26px] leading-[46px] tracking-[0.036em] text-[#F2F2F2]">
              Welcome to Empower Match, where accessibility meets innovation to transform lives. At Empower Match, we believe that technology should be a tool for empowerment, not a barrier. Our mission is simple yet profound: to bridge the accessibility gap and empower individuals with disabilities to navigate the digital world with confidence and independence. Through our innovative platform, we connect users with cutting-edge assistive technologies tailored to their unique needs, ensuring that no one is left behind. {/* Truncated for brevity */}
              </p>

              {/* Two Cards: Challenge & Vision - Applying backdrop-blur structure */}
              <div className="flex flex-col md:flex-row justify-between gap-[72px] w-full">
                {/* Card 1: Our Challenge */}
                <div
                  className={`w-full md:w-[770px] h-auto md:h-[707px] ${outerCardBaseStyle} rounded-[32px] flex flex-col`}
                >
                  {/* 2. Background Image Div */}
                  <div
                      className="absolute inset-0 z-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${bgImageUrl})` }}
                      aria-hidden="true"
                  ></div>
                  {/* 3. Blur/Overlay Div */}
                  <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                  {/* 4. Content Div */}
                  <div className="relative z-20 p-[60px] flex flex-col flex-grow"> {/* Padding moved here */}
                    <div className="w-[128px] h-[128px] bg-white/20 backdrop-blur-sm rounded-[22px] flex items-center justify-center mb-[46px]"> {/* Adjusted icon bg */}
                     <img src="idealogo.png" alt="" />
                    </div>
                    <h3 className="font-semibold text-[48px] leading-[61px] tracking-[0.036em] text-[#FEFEFE] mb-[46px]">Our Challenge</h3>
                    <p className="font-medium text-[26px] leading-[51px] text-[#FEFEFE] flex-grow">
                    Millions worldwide face limitations due to disabilities like visual impairments, mobility issues, and hearing loss, which hinder navigation, accessing information, and communication, leading to isolation. Empower Match aims to dismantle these barriers for an inclusive world.{/* Truncated */}
                    </p>
                  </div>
                </div>

                {/* Card 2: Our Vision */}
                <div
                  className={`w-full md:w-[770px] h-auto md:h-[707px] ${outerCardBaseStyle} rounded-[32px] flex flex-col`}
                >
                   {/* 2. Background Image Div */}
                   <div
                       className="absolute inset-0 z-0 bg-cover bg-center"
                       style={{ backgroundImage: `url(${bgImageUrl})` }}
                       aria-hidden="true"
                   ></div>
                   {/* 3. Blur/Overlay Div */}
                   <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                   {/* 4. Content Div */}
                   <div className="relative z-20 p-[60px] flex flex-col flex-grow"> {/* Padding moved here */}
                     <div className="w-[128px] h-[128px] bg-white/20 backdrop-blur-sm rounded-[22px] flex items-center justify-center mb-[46px]"> {/* Adjusted icon bg */}
                      <img src="handbulb.png" alt="" />
                    </div>
                    <h3 className="font-semibold text-[48px] leading-[61px] tracking-[0.036em] text-[#FEFEFE] mb-[46px]">Our Vision</h3>
                    <p className="font-medium text-[26px] leading-[51px] text-[#FEFEFE] flex-grow">
                    Imagine a world where individuals with disabilities navigate confidently with tailored assistive technologies. Education and workplaces are inclusive, offering accessible tools. Social interaction bridges communication gaps. {/* Truncated */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More Button */}
              <button className="inline-flex justify-center items-center px-[48px] py-[28px] gap-4 bg-[#FEFEFE] rounded-[16px] h-[87px] hover:bg-gray-200 transition-colors">
                <span className="font-semibold text-[24px] leading-[31px] text-[#2B2B2B]">
                  Learn more about us here
                </span>
                <span className="text-[#2B2B2B]"><IconCaretRight /></span>
              </button>
            </div>
          </div>
        </section>

        {/* How We Empower Section */}
        <section className="py-20 px-[60px]">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-[96px] items-center max-w-[1608px]">
            {/* Left: Text */}
            <div className="flex flex-col gap-[40px] max-w-[720px]">
              <h2 className="font-semibold text-[56px] leading-[1.6] tracking-[0.036em] text-[#F2F2F2]">How We Empower</h2>
              <p className=" font-onest font-small text-[26px] leading-[51px] tracking-normal w-[720px] h-[459px]">
              Empower Match fosters innovation and inclusivity through collaboration across our ecosystem:
              <ul className='list-disc list-inside mt-10'>
                <li>Platform for Change: Developers showcase assistive tech solutions, prioritizing underserved communities.</li>
                <li>Open-Source Initiatives: We champion collaborative, affordable accessibility projects.</li>
                <li>User-Centric Design: People with disabilities shape our inclusive technologies through active feedback.</li>
             </ul>
 {/* Truncated */}
              </p>
            </div>
            {/* Right: App Mockup */}
            <div className="relative w-full max-w-[812px] h-auto aspect-[812/846] flex justify-center items-start pt-[66px]">
              <img
                src='howweempower.png'
                alt="Empower Match Explore Page"
                className="w-full max-w-[752px] h-auto  rounded-[32px] object-contain object-top"
              />
            </div>
          </div>
        </section>

        {/* Products & Services Section */}
        <section id="products" className="py-20 px-[60px]">
          <div className="container mx-auto flex flex-col items-center gap-[120px] max-w-[1473px]">
            {/* Headings */}
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="font-semibold text-[52px] leading-[66px] tracking-[0.036em] text-[#F2F2F2]">Products and Services</h2>
              <p className="font-normal text-[36px] leading-[46px] tracking-[0.036em] text-[#DCDCDC]">Discover our solutions to your problems</p>
            </div>

            {/* Products Grid */}
            <div className="flex flex-col gap-[140px] w-full">
              {/* Product Row 1 - Applying backdrop-blur structure to image container */}
              <div className="flex flex-col md:flex-row items-center gap-[133px]">
                {/* Image Left Container */}
                <div
                  className={`w-full md:w-[560px] h-[560px]  rounded-[32px] flex-shrink-0 flex items-center justify-center`}
                >
                  {/* 4. Content Div (Inner image container) */}
                  <div className="relative z-20 p-[48px] flex items-center justify-center"> {/* Padding moved here */}
                    <div className=""> {/* Adjusted inner container */}
                       <img src='wheel.png' alt="Wheelmap Icon" className="w-[512px] h-[512px] object-contain" />
                    </div>
                  </div>
                </div>
                {/* Text Right */}
                <div className="flex flex-col gap-[48px] max-w-[780px]">
                  <h3 className="font-semibold text-[32px] leading-[41px] tracking-[0.036em] text-[#F2F2F2]">Wheelmap</h3>
                  <p className="font-medium text-[20px] leading-[45px] text-[#DCDCDC]">Promoting inclusivity, this app crowd-sources information about wheelchair-accessible places, allowing users to navigate urban environments confidently.</p>
                  <div className="flex flex-col sm:flex-row gap-[48px]">
                    <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#212121] border border-[#3A3A3A] rounded-[16px] h-[79px] hover:bg-gray-700 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Download Now</span>
                      <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                    <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#595959] rounded-[16px] h-[79px] hover:bg-gray-500 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Learn More</span>
                       <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Row 2 - Applying backdrop-blur structure to image container */}
              <div className="flex flex-col md:flex-row items-center gap-[133px]">
                 {/* Text Left */}
                <div className="flex flex-col gap-[48px] max-w-[780px] md:order-first">
                  <h3 className="font-semibold text-[32px] leading-[41px] tracking-[0.036em] text-[#F2F2F2]">SoundAlert</h3>
                  <p className="font-medium text-[20px] leading-[45px] text-[#DCDCDC]">Enhancing safety for users with hearing impairments, this app alerts them to important sounds in their environment, providing awareness and security.</p>
                  <div className="flex flex-col sm:flex-row gap-[48px]">
                     <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#212121] border border-[#3A3A3A] rounded-[16px] h-[79px] hover:bg-gray-700 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Download Now</span>
                      <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                    <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#595959] rounded-[16px] h-[79px] hover:bg-gray-500 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Learn More</span>
                       <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                  </div>
                </div>
                 {/* Image Right Container */}
                <div
                  className={`w-full md:w-[560px] h-[560px]  rounded-[32px] flex-shrink-0 flex items-center justify-center md:order-last`}
                >

                  {/* 4. Content Div (Inner image container) */}
                  <div className="relative z-20 p-[48px] flex items-center justify-center">
                    <div className="w-[464px] h-[464px] bg-white/10 backdrop-blur-sm rounded-[32px] shadow-[4px_4px_12px_4px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden border border-white/10">
                       <img src="ear.png" alt="Sound Alert Icon" className="w-[512px] h-[512px] object-contain" />
                    </div>
                  </div>
                </div>
              </div>

               {/* Product Row 3 - Applying backdrop-blur structure to image container */}
              <div className="flex flex-col md:flex-row items-center gap-[85px]">
                 {/* Image Left Container */}
                <div
                  className={`w-full md:w-[608px] h-auto md:h-[502px]  rounded-[32px] flex-shrink-0 flex items-center justify-center`}
                >
                  {/* 4. Content Div (Inner image) */}
                  <div className="relative z-20 p-[48px] flex items-center justify-center">
                    <img src="acces.png" alt="Accessibility Scanner Icon" className="w-full max-w-[512px] h-auto rounded-[16px] border-[0.5px] border-white/30 shadow-[-4px_4px_12px_4px_rgba(0,0,0,0.15)]" />
                  </div>
                </div>
                 {/* Text Right */}
                <div className="flex flex-col gap-[48px] max-w-[780px]">
                  <h3 className="font-semibold text-[32px] leading-[41px] tracking-[0.036em] text-[#F2F2F2]">Accessibility Scanner - Best for Reading</h3>
                  <p className="font-medium text-[20px] leading-[45px] text-[#DCDCDC]">One of the most helpful apps for everyone, the Accessibility Scanner provides practical improvements, making content on-screen easier to read and navigate. The main focus of this accessibility app is to make things easier to read. It offers several features, including background contrast, brightness, text size, color, etc.</p>
                  <div className="flex flex-col sm:flex-row gap-[48px]">
                     <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#212121] border border-[#3A3A3A] rounded-[16px] h-[79px] hover:bg-gray-700 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Download Now</span>
                      <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                    <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#595959] rounded-[16px] h-[79px] hover:bg-gray-500 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Learn More</span>
                       <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                  </div>
                </div>
              </div>

               {/* Product Row 4 - Applying backdrop-blur structure to image container */}
              <div className="flex flex-col md:flex-row items-center gap-[80px]">
                 {/* Text Left */}
                <div className="flex flex-col gap-[48px] max-w-[627px] md:order-first">
                  <h3 className="font-semibold text-[32px] leading-[41px] tracking-[0.036em] text-[#F2F2F2]">Live Transcribe</h3>
                  <p className="font-medium text-[20px] leading-[45px] text-[#DCDCDC]">Designed on speech recognition technology by Google, Live Transcribe offers convenient accessibility solutions to those who are hard of hearing, deaf, or have a speech impediment. With the option to choose from 70+ languages and dialects, this app offers accurate real-time transcription and caption.
                  Placing your mobile phone close to the speaking person will transcribe the speaker’s audio. So, you can talk or reply even by typing on the app.</p>
                  <div className="flex flex-col sm:flex-row gap-[48px]">
                     <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#212121] border border-[#3A3A3A] rounded-[16px] h-[79px] hover:bg-gray-700 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Download Now</span>
                      <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                    <button className="inline-flex justify-center items-center px-[48px] py-[24px] gap-4 bg-[#595959] rounded-[16px] h-[79px] hover:bg-gray-500 transition-colors">
                      <span className="font-semibold text-[24px] leading-[31px] text-[#FEFEFE]">Learn More</span>
                       <span className="text-[#FEFEFE]"><IconCaretRight /></span>
                    </button>
                  </div>
                </div>
                 {/* Image Right Container */}
                <div
                  className={`w-full md:w-[764px] h-auto md:h-[422px] rounded-[32px] flex-shrink-0 flex items-center justify-center md:order-last`}
                >

                   {/* 4. Content Div (Inner image) */}
                   <div className="relative z-20 p-[48px] flex items-center justify-center">
                     <img src="transcribe.png" alt="Live Transcribe Icon" className="w-full max-w-[668px] h-auto rounded-[32px] border-[0.5px] border-white/30 shadow-[4px_4px_20px_4px_rgba(0,0,0,0.15)]" />
                   </div>
                </div>
              </div>
            </div>

             {/* See All Products Button */}
             <button className="inline-flex justify-center items-center px-[48px] py-[28px] gap-4 bg-[#FEFEFE] rounded-[16px] h-[87px] hover:bg-gray-200 transition-colors">
                <span className="font-semibold text-[24px] leading-[31px] text-[#2F2F2F]">
                  See All Our Products
                </span>
                <span className="text-[#2F2F2F]"><IconCaretRight /></span>
              </button>
          </div>
        </section>

        {/* Join Empower Match CTA Banner */}
        <section
          className="relative my-16 md:my-24 mx-auto max-w-[1608px] h-[430px] rounded-[32px] bg-cover bg-center flex items-center overflow-hidden"
          style={{ backgroundImage: `url(${bannerBgSrc})` }} // Uses specific banner image
        >
          <div className="absolute inset-0 bg-black/60 rounded-[32px]"></div> {/* Simple overlay */}
          <div className="relative container mx-auto px-[60px] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-[28px] max-w-[833px] text-center md:text-left">
              <h2 className="font-semibold text-[40px] md:text-[52px] leading-[1.3] tracking-[0.036em] text-white">
                Join Empower Match Today
              </h2>
              <p className="font-medium text-[22px] md:text-[26px] leading-[1.7] text-white">
              Together, we can build a world where technology empowers everyone!!! Become part of the solution and make a change. {/* Truncated */}
              </p>
            </div>
            <button className="inline-flex justify-center items-center px-[48px] py-[28px] gap-4 bg-white rounded-[16px] h-[87px] w-full max-w-[400px] md:max-w-none md:w-auto md:min-w-[400px] lg:min-w-[500px] hover:bg-gray-200 transition-colors flex-shrink-0">
              <span className="font-bold text-[24px] leading-[31px] text-[#1A1A1A]">
                Join Empower Match Now
              </span>
              <span className="text-[#1A1A1A]"><IconCaretRight /></span>
            </button>
          </div>
        </section>

        {/* Customer Reviews (Testimonials) - Applying backdrop-blur structure */}
        <section className="py-20 px-[60px]">
          <div className="container mx-auto max-w-[1608px] flex flex-col gap-[100px]">
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[52px] leading-[66px] tracking-[0.036em] text-[#F2F2F2]">Customer Reviews</h2>
              <p className="font-normal text-[36px] leading-[46px] tracking-[0.036em] text-[#DCDCDC]">What do people say about us?</p>
            </div>
            <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[72px] gap-y-[69px]">
                {/* Review Card 1 */}
                <div
                  className={`${outerCardBaseStyle} rounded-[16px] flex flex-col`}
                >
                    {/* 2. Background Image Div */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3. Blur/Overlay Div */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                    {/* 4. Content Div */}
                    <div className="relative z-20 p-[24px_24px_44px] flex flex-col gap-[36px]"> {/* Padding moved here */}
                        <div className="flex items-center gap-[16px]">
                        <img src="adeyemi.png" alt="Adeyemi Adekojo" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0 border-2 border-white/20" />
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="font-semibold text-[20px] leading-[26px] text-[#FEFEFE]">Adeyemi Adekojo</h4>
                            <p className="font-normal text-[18px] leading-[23px] text-[#DCDCDC]">Founder at NodePair</p>
                        </div>
                        </div>
                        <p className="font-medium text-[20px] leading-[38px] tracking-[-0.006em] text-[#F6F6F6]">
                        As the founder of a platform that solve problem. I can really see myself in the vision and goal of this project which is to focus on underserved community and low-income family while solving a problem. I am really impress with your mindset and your passion on focusing on people that are impaired in an underserved community{/* Truncated */}
                        </p>
                        {/* Stars need higher z-index than content text */}
                        <div className="absolute top-[24px] right-[24px] z-30 flex gap-[8px]">
                        <IconStarFill /><IconStarFill /><IconStarFill /><IconStarFill /><IconStarHalf />
                        </div>
                    </div>
                </div>
                {/* Review Card 2 */}
                 <div
                  className={`${outerCardBaseStyle} rounded-[16px] flex flex-col`}
                >
                    {/* 2. Background Image Div */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3. Blur/Overlay Div */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                    {/* 4. Content Div */}
                    <div className="relative z-20 p-[24px_24px_44px] flex flex-col gap-[36px]">
                        <div className="flex items-center gap-[16px]">
                        <img src="olamiji.png" alt="Olamiji Ogunbowale" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0 border-2 border-white/20" />
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="font-semibold text-[20px] leading-[26px] text-[#FEFEFE]">Olamiji Ogunbowale</h4>
                            <p className="font-normal text-[18px] leading-[23px] text-[#DCDCDC]">Student</p>
                        </div>
                        </div>
                        <p className="font-medium text-[20px] leading-[38px] tracking-[-0.006em] text-[#F6F6F6]">
                        The Virtual Mouse has been a game-changer for me. Its intuitive control through eye and head movements has given me a newfound sense of independence. A heartfelt thank you to Daniel Falodun my classmate for this empowering tool that goes beyond technology—it's a lifeline to inclusion. {/* Truncated */}
                        </p>
                        <div className="absolute top-[24px] right-[24px] z-30 flex gap-[8px]">
                        <IconStarFill /><IconStarFill /><IconStarFill /><IconStarFill /><IconStarHalf />
                        </div>
                    </div>
                </div>
                {/* Review Card 3 */}
                 <div
                  className={`${outerCardBaseStyle} rounded-[16px] flex flex-col`}
                >
                    {/* 2. Background Image Div */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3. Blur/Overlay Div */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                    {/* 4. Content Div */}
                    <div className="relative z-20 p-[24px_24px_44px] flex flex-col gap-[36px]">
                        <div className="flex items-center gap-[16px]">
                        <img src="olamiji2.png" alt="Olamiji Ogunbowale" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0 border-2 border-white/20" />
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="font-semibold text-[20px] leading-[26px] text-[#FEFEFE]">Olamiji Ogunbowale</h4>
                            <p className="font-normal text-[18px] leading-[23px] text-[#DCDCDC]">Student</p>
                        </div>
                        </div>
                        <p className="font-medium text-[20px] leading-[38px] tracking-[-0.006em] text-[#F6F6F6]">
                        The Virtual Mouse has genuinely changed my life. The smooth control of eye and head movements has not only given me freedom but also opened me to a world of possibilities. A heartfelt thank you to the amazing brain Daniel who created this wonderful instrument, which has been my lifeline to inclusion and a source of renewed freedom.{/* Truncated */}
                        </p>
                        <div className="absolute top-[24px] right-[24px] z-30 flex gap-[8px]">
                        <IconStarFill /><IconStarFill /><IconStarFill /><IconStarFill /><IconStarHalf />
                        </div>
                    </div>
                </div>
                {/* Review Card 4 */}
                 <div
                  className={`${outerCardBaseStyle} rounded-[16px] flex flex-col`}
                >
                    {/* 2. Background Image Div */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3. Blur/Overlay Div */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

                    {/* 4. Content Div */}
                    <div className="relative z-20 p-[24px_24px_44px] flex flex-col gap-[36px]">
                        <div className="flex items-center gap-[16px]">
                        <img src="olamiji3.png"alt="Olamiji Ogunbowale" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0 border-2 border-white/20" />
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="font-semibold text-[20px] leading-[26px] text-[#FEFEFE]">Olamiji Ogunbowale</h4>
                            <p className="font-normal text-[18px] leading-[23px] text-[#DCDCDC]">Student</p>
                        </div>
                        </div>
                        <p className="font-medium text-[20px] leading-[38px] tracking-[-0.006em] text-[#F6F6F6]">
                        Daniel I don’t know where to start thanking you from this app is wonderful and i hope you win the rise global scholarship in other to keep on providing for people like me i have not been able to access my computer for years now as I only rely on my friends to assist me with it today I could move my mouse and click on items am so proud of my self thank you Daniel for what you do ! {/* Truncated */}
                        </p>
                        <div className="absolute top-[24px] right-[24px] z-30 flex gap-[8px]">
                        <IconStarFill /><IconStarFill /><IconStarFill /><IconStarFill /><IconStarHalf />
                        </div>
                    </div>
                </div>
                </div>
                <button className="absolute top-0 right-0 inline-flex justify-center items-center px-4 py-2 gap-2 bg-[#EAEAEA] rounded-[12px] h-[40px] hover:bg-gray-300 transition-colors">
                    <span className="font-semibold text-[20px] leading-[26px] text-[#141414]">See More</span>
                </button>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
            id="contact"
            className="py-20 px-6 relative bg-cover bg-center min-h-[1148px] flex flex-col items-center"
            style={{ backgroundImage: `url(${contactBgSrc})` }} // Uses specific contact background for the whole section
        >
            {/* Optional: Overlay for the main section background if needed */}
            {/* <div className="absolute inset-0 bg-black/30 z-0"></div> */}

            {/* Headings */}
            <div className="relative z-10 flex flex-col items-center gap-[16px] text-center mb-[120px]">
              <h2 className="font-semibold text-[52px] leading-[66px] tracking-[0.036em] text-[#F2F2F2]">Contact Us</h2>
              <p className="font-normal text-[36px] leading-[46px] tracking-[0.036em] text-[#DCDCDC]">We’d love to hear from you!!!</p>
            </div>

            {/* Form Container - Applying backdrop-blur structure */}
            <div
              // Apply outer styles here, center it, and set max-width matching the form
              className={`w-full max-w-[906px] mx-auto h-auto ${outerCardBaseStyle} rounded-[24px]`} // Use base style, adjust max-width, add mx-auto, adjust rounding
            >
              {/* 2. Background Image Div for the form container */}
              <div
                  className="absolute inset-0 z-0 bg-cover bg-center rounded-[24px]" // Match rounding
                  style={{ backgroundImage: `url(${contactFormBgSrc})` }} // Use the new form background image
                  aria-hidden="true"
              ></div>

          
              {/* 4. Content Div (Form) */}
              {/* Add relative, z-index, and padding here */}
              <form className="relative z-20 space-y-8 p-8 md:p-12">
                {/* Name Field Container */}
                <div className="flex flex-col gap-[16px]">
                  <label htmlFor="contact-name" className="font-medium text-[24px] leading-[31px] text-white">Name</label>
                  {/* Input Wrapper - Applying backdrop-blur structure */}
                  <div
                    className={`w-full h-[72px] ${outerCardBaseStyle} rounded-[12px]`} // Base style for input container
                  >
                    {/* 2b. Background Image for Input */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }} // Keep using the general bg for inputs
                        aria-hidden="true"
                    ></div>
                    {/* 3b. Blur/Overlay for Input */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle} bg-black/60 rounded-[12px]`}></div> {/* Match rounding */}
                    {/* 4b. Input Element */}
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="relative z-20 w-full h-full px-6 bg-transparent rounded-[12px] font-medium text-[20px] leading-[26px] text-[#FEFEFE] placeholder:text-[#FEFEFE]/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                 {/* Email Field Container */}
                <div className="flex flex-col gap-[16px]">
                  <label htmlFor="contact-email" className="font-medium text-[24px] leading-[31px] text-white">Email Address</label>
                   {/* Input Wrapper - Applying backdrop-blur structure */}
                  <div
                    className={`w-full h-[72px] ${outerCardBaseStyle} rounded-[12px]`}
                  >
                    {/* 2b. Background Image for Input */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3b. Blur/Overlay for Input */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle} bg-black/60 rounded-[12px]`}></div>
                    {/* 4b. Input Element */}
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="relative z-20 w-full h-full px-6 bg-transparent rounded-[12px] font-medium text-[20px] leading-[26px] text-[#FEFEFE] placeholder:text-[#FEFEFE]/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                 {/* Message Field Container */}
                <div className="flex flex-col gap-[16px]">
                  <label htmlFor="contact-message" className="font-medium text-[24px] leading-[31px] text-white">Send Us a Message</label>
                   {/* Textarea Wrapper - Applying backdrop-blur structure */}
                  <div
                    className={`w-full h-[212px] ${outerCardBaseStyle} rounded-[12px]`}
                  >
                     {/* 2b. Background Image for Textarea */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3b. Blur/Overlay for Textarea */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle} bg-black/60 rounded-[12px]`}></div>
                    {/* 4b. Textarea Element */}
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Type here..."
                      className="relative z-20 w-full h-full p-6 bg-transparent rounded-[12px] font-medium text-[20px] leading-[26px] text-[#FEFEFE] placeholder:text-[#FEFEFE]/70 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    ></textarea>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[79px] bg-[#212121] rounded-[12px] hover:bg-gray-700 transition-colors flex items-center justify-center border border-white/10"
                >
                  <span className="font-medium text-[24px] leading-[31px] text-[#FEFEFE]">Send Message</span>
                </button>
              </form>
            </div>
        </section>

        {/* Newsletter Signup Section - Applying backdrop-blur structure */}
        <section className="py-20 px-6">
          {/* Outer Container */}
          <div
            className={`container mx-auto max-w-[1608px] ${outerCardBaseStyle} rounded-[32px]`}
          >
             {/* 2. Background Image Div */}
             <div
                 className="absolute inset-0 z-0 bg-cover bg-center"
                 style={{ backgroundImage: `url(${bgImageUrl})` }}
                 aria-hidden="true"
             ></div>
             {/* 3. Blur/Overlay Div */}
             <div className={`absolute inset-0 z-10 ${blurOverlayStyle}`}></div>

             {/* 4. Content Div */}
             <div className="relative z-20 p-12 md:p-20 flex flex-col items-center gap-[80px]"> {/* Padding moved here */}
                {/* Headings */}
                <div className="flex flex-col items-center gap-[16px] text-center max-w-[1060px]">
                  <h3 className="font-semibold text-[40px] md:text-[52px] leading-[1.3] tracking-[0.036em] text-[#F2F2F2]">Subscribe to our newsletter</h3>
                  <p className="font-normal text-[28px] md:text-[36px] leading-[1.3] tracking-[0.036em] text-[#DCDCDC]">Join Our Mailing List To Receive The News & Latest Trends</p>
                </div>
                {/* Form */}
                <form className="flex flex-col sm:flex-row w-full max-w-[880px] h-auto sm:h-[79px]">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  {/* Input Container Wrapper - Applying backdrop-blur structure */}
                  <div
                    className={`flex-grow h-[79px] ${outerCardBaseStyle} rounded-t-[16px] sm:rounded-l-[16px] sm:rounded-r-none`} // Base style for input container
                  >
                    {/* 2b. Background Image for Input */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImageUrl})` }}
                        aria-hidden="true"
                    ></div>
                    {/* 3b. Blur/Overlay for Input */}
                    <div className={`absolute inset-0 z-10 ${blurOverlayStyle} bg-black/60 rounded-t-[16px] sm:rounded-l-[16px] sm:rounded-r-none`}></div> {/* Match rounding */}
                    {/* 4b. Input Element */}
                    <input
                      type="email"
                      id="newsletter-email"
                      placeholder="Enter your email"
                      required
                      className="relative z-20 w-full h-full px-8 bg-transparent rounded-t-[16px] sm:rounded-l-[16px] sm:rounded-r-none font-semibold text-[24px] leading-[31px] text-[#FBFBFB] placeholder:text-[#FBFBFB]/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-[280px] h-[79px] bg-[#212121] rounded-b-[16px] sm:rounded-r-[16px] sm:rounded-bl-none hover:bg-gray-700 transition-colors flex items-center justify-center flex-shrink-0 border border-l-0 border-white/10"
                  >
                    <span className="font-medium text-[24px] leading-[31px] text-white">Subscribe</span>
                  </button>
                </form>
             </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="relative font-onest">
        {/* Top Part */}
        <div className="bg-[#2F2F2F] px-[59px] py-[80px]">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-32 xl:gap-[150px] 2xl:gap-[324px] max-w-[1609px]">
                {/* Company Info */}
                <div className="flex flex-col gap-[44px]">
                <h4 className="font-semibold text-[24px] leading-[20px] tracking-[0.25px] text-white">Company</h4>
                <ul className="space-y-[56px]">
                    <li><a href="#about" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">About Us</a></li>
                    <li><a href="#careers" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Join our team</a></li>
                    <li><a href="#press" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Press & Media</a></li>
                    <li><a href="#contact" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Contact Us</a></li>
                </ul>
                </div>
                {/* Resources */}
                <div className="flex flex-col gap-[44px]">
                <h4 className="font-semibold text-[24px] leading-[20px] tracking-[0.25px] text-white">Resources</h4>
                <ul className="space-y-[56px]">
                    <li><a href="#privacy" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Privacy Policy</a></li>
                    <li><a href="#terms" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Terms and Conditions</a></li>
                    <li><a href="#sla" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Service Level Agreement</a></li>
                    <li><a href="#catalogue" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Service Catalogue</a></li>
                    <li><a href="#docs" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Documentation</a></li>
                    <li><a href="#security" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white">Security</a></li>
                </ul>
                </div>
                {/* Contact */}
                <div className="flex flex-col gap-[44px]">
                <h4 className="font-semibold text-[24px] leading-[20px] tracking-[0.25px] text-white">Contact Address</h4>
                <ul className="space-y-[36px]">
                    <li className="flex items-center gap-[16px]">
                    <IconEmail /> <a href="mailto:empowermatch@gmail.com" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white break-all">empowermatch@gmail.com</a>
                    </li>
                    <li className="flex items-center gap-[16px]">
                    <IconPhone /> <a href="tel:+2348169892424" className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF] hover:text-white whitespace-nowrap">+2348169892424</a>
                    </li>
                    <li className="flex items-center gap-[16px]">
                    <IconLocation /> <span className="font-normal text-[24px] leading-[20px] tracking-[0.25px] text-[#BFBFBF]">11, Odetayo Street Ikola Ilumo Ipaja Lagos</span>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        {/* Bottom Bar */}
        <div className="bg-[#1A1A1A] h-[125px] px-[60px] flex justify-between items-center">
            <div className="flex items-center gap-[12px]">
                <img src={logoFooterSrc} alt="Empower Match Footer Logo" className="h-[66px] w-auto" />
                <span className="font-semibold text-[36px] leading-[46px] tracking-[-0.005em] text-white">Empower Match</span>
            </div>
            <div className="flex gap-[28px]">
                <a href="#facebook" aria-label="Facebook" className="w-[72px] h-[72px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"><IconFacebook /></a>
                <a href="#twitter" aria-label="Twitter" className="w-[72px] h-[72px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"><IconTwitter /></a>
                <a href="#instagram" aria-label="Instagram" className="w-[72px] h-[72px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"><IconInstagram /></a>
                <a href="#medium" aria-label="Medium" className="w-[72px] h-[72px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"><IconMedium /></a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
