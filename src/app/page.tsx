'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { Menu, X, Download, Mail, Github, Linkedin, User, Code, Briefcase, Phone } from 'lucide-react'

const DURATION = 0.25;
const STAGGER = 0.025;

const AnimatedName = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative overflow-hidden whitespace-nowrap leading-none m-0 p-0"
      style={{ lineHeight: 0.6 }}
    >
      <div className="m-0 p-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block m-0 p-0"
            style={{ lineHeight: 0.6 }}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 m-0 p-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block m-0 p-0"
            style={{ lineHeight: 0.6 }}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'About', 'Experience', 'Education', 'Skills', 'Projects', 'Contact']

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/SHAUN_AVISTON_RODRIGUES_CV.pdf'
    link.download = 'SHAUN_AVISTON_RODRIGUES_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.5 // Main hovered icon
    if (distance === 1) return 1.2 // Adjacent icons
    if (distance === 2) return 1.1 // Next-to-adjacent icons
    return 1 // Other icons
  }

  const dockItems = [
    { icon: Mail, label: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rodriguesshaun5@gmail.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/ShaunRodrix' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/shaun-aviston-rodrigues-037a82263' },
    { icon: Phone, label: 'Contact', href: 'tel:+918970672980' }
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-2xl rounded-full">
        <div className="px-6 py-3">
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-gray-600 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xl font-medium hover:text-gray-600 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section with Diagonal Split */}
      <section id="home" className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            {/* Left side - White background */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Diagonal line and right side - Black background */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute bg-black h-full w-1/2"
                style={{
                  right: '0',
                  clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="overflow-hidden">
                <h1 className="text-5xl md:text-7xl font-medium mb-4 animate-fade-in" style={{ letterSpacing: '0.03em', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  SHAUN AVISTON<br/>RODRIGUES
                </h1>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-2xl md:text-4xl font-light mb-6 text-gray-800 animate-slide-up" style={{ letterSpacing: '0.08em', opacity: 0.9 }}>
                  AI Engineering Intern
                </p>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-lg md:text-xl mb-6 text-gray-700 animate-slide-up animation-delay-200" style={{ letterSpacing: '0.06em', transform: 'rotate(-1deg)' }}>
                  Building intelligent systems at Ardelis Technologies
                </p>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-lg md:text-xl mb-8 text-gray-600 animate-slide-up animation-delay-400" style={{ letterSpacing: '0.07em', transform: 'rotate(0.5deg)' }}>
                  MCA Student at St. Joseph's University, Bangalore
                </p>
              </div>
              
              <div className="overflow-hidden">
                <button
                  onClick={handleDownloadCV}
                  className="cv-download-button animate-slide-up animation-delay-600"
                  data-tooltip="Download Now!"
                >
                  <div className="button-wrapper">
                    <div className="text">Download CV</div>
                    <span className="icon">
                      <Download size={22} />
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/1acbfb6d-1435-440f-9370-ba82beca78d8_SHAUN_RODRIGUES-removebg-preview.png?auth_key=1864603899-fe7143cdef114e25b482663d137b9fa1-0-dc4d54aad4067cfb8e0f28ee9064f1ac"
                    alt="Shaun Rodrigues"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple animation styles */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slide-up {
            from {
              transform: translateY(1rem);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          
          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          
          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          /* CV Download Button */
          .cv-download-button {
            --width: 180px;
            --height: 55px;
            --tooltip-height: 38px;
            --tooltip-width: 130px;
            --gap-between-tooltip-to-button: 18px;
            --button-color: #000000;
            --tooltip-color: #ffffff;
            width: var(--width);
            height: var(--height);
            background: var(--button-color);
            position: relative;
            text-align: center;
            border-radius: 12px;
            font-family: system-ui, -apple-system, sans-serif;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .cv-download-button::before {
            position: absolute;
            content: attr(data-tooltip);
            width: var(--tooltip-width);
            height: var(--tooltip-height);
            background-color: var(--tooltip-color);
            font-size: 0.85rem;
            color: #000;
            border-radius: 8px;
            line-height: var(--tooltip-height);
            bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
            left: calc(50% - var(--tooltip-width) / 2);
            font-weight: 500;
          }

          .cv-download-button::after {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-top-color: var(--tooltip-color);
            left: calc(50% - 8px);
            bottom: calc(100% + var(--gap-between-tooltip-to-button) - 8px);
          }

          .cv-download-button::after, .cv-download-button::before {
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
          }

          .cv-download-button .text {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.05rem;
            font-weight: 500;
            letter-spacing: 0.03em;
          }

          .cv-download-button .button-wrapper,
          .cv-download-button .text,
          .cv-download-button .icon {
            overflow: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            color: #fff;
          }

          .cv-download-button .button-wrapper {
            position: relative;
          }

          .cv-download-button .text {
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.05rem;
            font-weight: 500;
            letter-spacing: 0.03em;
          }

          .cv-download-button .text,
          .cv-download-button .icon {
            transition: top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .cv-download-button .icon {
            color: #fff;
            top: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
          }

          .cv-download-button:hover {
            background: #1a1a1a;
            transform: translateY(-2px);
          }

          .cv-download-button:hover .text {
            top: -100%;
          }

          .cv-download-button:hover .icon {
            top: 0;
          }

          .cv-download-button:hover:before,
          .cv-download-button:hover:after {
            opacity: 1;
            visibility: visible;
          }

          .cv-download-button:hover:after {
            bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 18px);
          }

          .cv-download-button:hover:before {
            bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
          }

          .cv-download-button:active {
            transform: translateY(0);
          }
        `}</style>

      {/* macOS-style Floating Dock */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] px-4 py-3 flex items-center space-x-4">
          {dockItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href || '#'}
              target={item.href?.startsWith('http') ? '_blank' : undefined}
              rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative"
              onClick={(e) => !item.href && e.preventDefault()}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="p-2 rounded-lg transition-all duration-300 ease-out"
                style={{
                  transform: `scale(${getScale(index)}) translateY(-${(getScale(index) - 1) * 8}px)`,
                }}
              >
                <item.icon size={24} className="text-black" />
              </div>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-lg leading-relaxed text-gray-700">
              I'm Shaun Aviston Rodrigues, a motivated MCA student at St. Joseph's University, Bangalore, 
              currently working as an AI Engineering Intern at Ardelis Technologies. I'm passionate about 
              solving real-world problems through technology and contributing to impactful projects while learning continuously.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg"></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {/* AI Engineering Intern Card */}
            <div className="experience-card">
              <div className="experience-card-inner">
                <div className="experience-card-front">
                  <h3 className="text-2xl font-bold mb-2">AI Engineering Intern</h3>
                  <p className="text-lg mb-2">Ardelis Technologies</p>
                  <p className="text-base">Dec 2025 - Present</p>
                </div>
                <div className="experience-card-back">
                  <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
                  <div className="text-sm space-y-2">
                    <p>• Developing AI-powered solutions and machine learning models</p>
                    <p>• Collaborating with cross-functional teams to deliver projects</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* IEEE Treasurer Card */}
            <div className="experience-card">
              <div className="experience-card-inner">
                <div className="experience-card-front">
                  <h3 className="text-2xl font-bold mb-2">Treasurer</h3>
                  <p className="text-lg mb-2">IEEE Student Branch</p>
                  <p className="text-base">July 2025 - Present</p>
                </div>
                <div className="experience-card-back">
                  <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
                  <div className="text-sm space-y-2">
                    <p>• Managing finances and budget planning for technical events</p>
                    <p>• Coordinating financial activities and maintaining records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section Styles */}
      <style jsx>{`
        .experience-card {
          width: 100%;
          max-width: 450px;
          height: 200px;
          perspective: 1000px;
        }

        .experience-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.7s ease;
          cursor: pointer;
        }

        .experience-card:hover .experience-card-inner {
          transform: rotateX(180deg);
        }

        .experience-card-front,
        .experience-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          padding: 24px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .experience-card:hover {
          transform: translateY(-5px);
        }

        .experience-card-front {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 2px solid #404040;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
        }

        .experience-card-back {
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          color: #000000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transform: rotateX(180deg);
          border: 2px solid #e0e0e0;
        }

        .experience-card-front h3 {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 1.5rem;
        }

        .experience-card-back h3 {
          font-weight: bold;
          margin-bottom: 16px;
          font-size: 1.25rem;
        }

        .experience-card:hover .experience-card-front {
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2);
        }

        .experience-card:hover .experience-card-back {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Education Timeline Section */}
      <section id="education" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Education</h2>
          <p className="text-center text-gray-600 mb-12"></p>
          
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-black"></div>
            
            <div className="space-y-12">
              {/* MCA - Right Side */}
              <div className="relative grid grid-cols-2 gap-6 items-center">
                <div></div>
                <div className="bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-5">
                  <h3 className="text-xl font-bold mb-2">Master of Computer Applications (MCA)</h3>
                  <p className="text-base text-gray-200 mb-2">St. Joseph's University, Bangalore</p>
                  <span className="text-sm font-semibold text-gray-300">2024 - 2026</span>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-lg"></div>
              </div>

              {/* BCA - Left Side */}
              <div className="relative grid grid-cols-2 gap-6 items-center">
                <div className="bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-right">
                  <h3 className="text-xl font-bold mb-2">Bachelor of Science (BSc)</h3>
                  <p className="text-base text-gray-200 mb-2">St. Aloysius University, Mangalore</p>
                  <span className="text-sm font-semibold text-gray-300">2020 - 2023</span>
                </div>
                <div></div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-lg"></div>
              </div>

              {/* PUC - Right Side */}
              <div className="relative grid grid-cols-2 gap-6 items-center">
                <div></div>
                <div className="bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-5">
                  <h3 className="text-xl font-bold mb-2">Pre-University Course (PUC)</h3>
                  <p className="text-base text-gray-200 mb-2">St. Philomena College, Puttur</p>
                  <span className="text-sm font-semibold text-gray-300">2018 - 2020</span>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-4 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-center text-gray-400 mb-12"></p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'HTML', logo: '/images.png' },
              { name: 'CSS', logo: '/download.png' },
              { name: 'PYTHON', logo: '/download.jpeg' },
              { name: 'C', logo: '/download (1).png' },
              { name: 'NODE JS', logo: '/download (1).jpeg' },
              { name: 'AWS', logo: '/download (2).png' },
              { name: 'REACT JS', logo: '/download (3).png' },
              { name: 'GITHUB', logo: '/download (4).png' },
              { name: 'ASP.NET', logo: '/images.jpeg' },
              { name: 'VS CODE', logo: '/images (1).png' }
            ].map((skill, index) => (
              <div 
                key={skill.name} 
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/20 hover:scale-110 hover:-rotate-3">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                  
                  <div className="relative h-20 flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl p-2.5 shadow-lg group-hover:shadow-white/40 transition-all duration-500 group-hover:scale-110">
                      <NextImage
                        src={skill.logo}
                        alt={skill.name}
                        width={56}
                        height={56}
                        className="object-contain w-full h-full group-hover:brightness-110 transition-all duration-500"
                      />
                    </div>
                  </div>
                  
                  <p className="relative text-sm font-semibold text-gray-300 group-hover:text-white transition-all duration-300 tracking-wide">
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <NextImage
                  src="/eterna.png"
                  alt="Eterna Marketplace"
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Eterna – Exclusive Product Marketplace</h3>
                <p className="text-gray-600 mb-4">Full-stack platform where users list and explore rare or collectible products with responsive UI using Tailwind CSS and DaisyUI.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">MongoDB</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <NextImage
                  src="/attendancesys.png"
                  alt="Automated Attendance System"
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Automated Attendance System</h3>
                <p className="text-gray-600 mb-4">Face-recognition-based attendance system using OpenCV with efficient data handling through Pandas and CSV files.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">OpenCV</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Tkinter</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <NextImage
                  src="/minipc.jpg"
                  alt="Raspberry Pi Mini PC"
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Portable Mini PC with Raspberry Pi</h3>
                <p className="text-gray-600 mb-4">Built a portable desktop setup using Raspberry Pi 3B+ and 7" display, configured Raspbian OS for Python-based tasks.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Raspberry Pi</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Linux</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <NextImage
                  src="/blindstick.png"
                  alt="Smart Blind Stick"
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Smart Blind Stick (IoT Project)</h3>
                <p className="text-gray-600 mb-4">Assistive stick detecting obstacles using ultrasonic sensors with buzzer and vibration alerts with switch-based control.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Arduino</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">IoT</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Sensors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl mb-8 text-gray-300">
            
            Feel free to reach out  or just have a chat!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rodriguesshaun5@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Mail size={20} />
              Gmail
            </a>
            <a
              href="https://linkedin.com/in/shaun-aviston-rodrigues-037a82263"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-200"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}