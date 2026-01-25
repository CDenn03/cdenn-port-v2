"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Download,
  MapPin,
  Clock,
  Mail,
  Calendar,
  Terminal,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUp
} from "lucide-react";

// --- Theme Context & Hook ---
const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
};

// --- Scroll Progress Hook ---
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(Math.max(scrolled, 0), 100)); // Clamp between 0 and 100
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
};

// --- Animations Component ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Data ---
const experiences = [
  {
    company: "E&M Technologies",
    role: "Frontend Developer",
    period: "Mar 2025 - Present",
    desc: [
      "Led frontend development for core product, improving load time by 40%",
      "Implemented design system used across 3 product teams"
    ],
    tech: "React, Next.js, TailwindCSS"
  },
  {
    company: "Self-Employed",
    role: "Freelance Developer",
    period: "Aug 2022 - Feb 2025",
    desc: [
      "Delivered 10+ custom web solutions for international clients",
      "Managed full project lifecycle from concept to deployment"
    ],
    tech: "React, Node.js, AWS"
  }
];

const solutions = [
  {
    title: "E-Commerce Platform",
    description: "Scalable online storefront with real-time inventory and secure checkout.",
    challenge: "Client needed to handle 10k concurrent users during flash sales without crashing.",
    results: [
      { label: "Uptime", value: "99.9%" },
      { label: "Load Time", value: "2.5s" },
      { label: "SKUs", value: "150+" }
    ],
    tags: ["Next.js", "Stripe", "Supabase"],
    image: "https://picsum.photos/seed/ecommerce/800/600",
    layout: "left"
  },
  {
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform with ML-powered insights for enterprise teams.",
    challenge: "Manual reporting was taking 20+ hours per week for data analysts.",
    solution: "Integrated OpenAI API to summarize complex datasets into actionable insights.",
    results: [
      { label: "Faster Decisions", value: "60%" },
      { label: "Data Points", value: "10k+" },
      { label: "Manual Work", value: "-45%" }
    ],
    tags: ["React", "Python", "FastAPI"],
    image: "https://picsum.photos/seed/analytics/800/600",
    layout: "right"
  }
];

const testimonials = [
  {
    text: "Chris delivered our MVP in half the expected time. His communication was excellent throughout, and the code quality was top-notch.",
    author: "John Smith",
    role: "CEO at StartupX",
    initials: "JS"
  },
  {
    text: "Working with Chris transformed our user experience. Bounce rate dropped 35% after the redesign. Highly recommend him for any frontend project.",
    author: "Jane Doe",
    role: "Product Manager at CompanyY",
    initials: "JD"
  }
];

const writings = [
  { title: "5 React Performance Patterns I Use in Every Project", date: "Jan 2025", tag: "React", readTime: "5 min" },
  { title: "When to Use SSR vs SSG in Next.js", date: "Feb 2025", tag: "Next.js", readTime: "4 min" },
  { title: "My Code Review Checklist for React Components", date: "Mar 2025", tag: "Workflow", readTime: "6 min" }
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#solutions", label: "Solutions" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" }
];

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen overflow-x-hidden relative transition-colors duration-300 ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-slate-900"}`}>
      
      {/* --- SCROLL PROGRESS INDICATOR --- */}
      {/* Fixed to top, high z-index, small height */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
        />
      </div>

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-emerald-900/20" : "bg-emerald-100/40"}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-emerald-950/30" : "bg-emerald-50/50"}`} />
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${isDark ? "border-zinc-800 bg-zinc-950/80" : "border-zinc-200 bg-zinc-50/80"} backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`text-xl font-bold tracking-tighter ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
            CHRIS DENNISON<span className="text-emerald-500">.</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-emerald-500 transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {link.label}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${isDark ? "bg-zinc-100 text-zinc-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
              <Download size={14} /> Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-600"}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t overflow-hidden ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}
            >
              <div className="px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 text-lg font-medium hover:text-emerald-500 transition-colors ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-bold transition-colors ${isDark ? "bg-zinc-100 text-zinc-900" : "bg-slate-900 text-white"}`}
                >
                  <Download size={16} /> Download Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex items-center px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <div>
            <Reveal>
              <div className={`inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full text-xs font-semibold tracking-wide uppercase ${isDark ? "border-emerald-500/30 bg-emerald-950/50 text-emerald-400" : "border-emerald-500/30 bg-emerald-50 text-emerald-700"}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for Freelance · Remote Worldwide
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className={`text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                I craft high-performance <br />
                React applications.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className={`text-lg md:text-xl max-w-xl leading-relaxed mb-10 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                I help startups and businesses launch fast, scalable web applications that users love. Specializing in Next.js and Design Systems.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-full text-lg font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  Start a Project <ArrowRight size={20} />
                </motion.a>
                <a href="#solutions" className={`px-8 py-4 border rounded-full text-lg font-bold transition-all ${isDark ? "border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-100" : "border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 text-slate-900"}`}>
                  View Case Studies
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Photo Section */}
          <Reveal delay={0.4}>
            <div className="relative group">
              <div className={`absolute -inset-4 rounded-2xl blur-xl transition duration-500 ${isDark ? "bg-gradient-to-tr from-emerald-900/30 to-zinc-900 opacity-50 group-hover:opacity-75" : "bg-gradient-to-tr from-emerald-100 to-white opacity-50 group-hover:opacity-75"}`}></div>
              
              <div className={`relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-3/4 shadow-2xl ${isDark ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
                <img 
                  src="/assets/images/port-photo.png" 
                  alt="Chris Dennison - Frontend Developer" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-md p-4 rounded-xl ${isDark ? "bg-zinc-900/90 border border-zinc-800" : "bg-white/95 border border-zinc-100"}`}>
                  <p className={`text-xs font-mono mb-1 text-zinc-500`}>Current Focus</p>
                  <p className={`text-base font-semibold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>React Server Components & Performance</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <div className={`py-12 border-y transition-colors duration-300 ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white/50"}`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Delivered", value: "15+" },
            { label: "Client Satisfaction", value: "100%" },
            { label: "Response Time", value: "< 24hrs" }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col">
                <span className={`text-3xl font-bold mb-2 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{stat.value}</span>
                <span className={`text-xs font-semibold uppercase tracking-widest text-zinc-500`}>{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>About Me</h2>
            </Reveal>

            <Reveal>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                I&apos;m a Frontend Developer with 5+ years of experience helping startups and businesses build web applications that perform. I specialize in React and Next.js, with a focus on clean architecture and exceptional user experience.
              </p>
            </Reveal>

            <Reveal>
              <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                <strong className={isDark ? "text-zinc-100" : "text-slate-900"}>My Approach:</strong> I believe in close collaboration, transparent communication, and shipping fast without sacrificing quality. Every project starts with understanding your business goals—not just your feature list.
              </p>
            </Reveal>

            <Reveal>
              <blockquote className={`border-l-4 border-emerald-500 pl-6 py-3 my-8 rounded-r-xl ${isDark ? "bg-emerald-950/30" : "bg-emerald-50/50"}`}>
                <p className={`text-xl italic ${isDark ? "text-zinc-200" : "text-slate-800"}`}>&quot;Great interfaces are invisible—users just accomplish their goals.&quot;</p>
              </blockquote>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-emerald-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className={`font-bold text-base ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Location</h4>
                    <p className={`text-sm text-zinc-500`}>Remote / Worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-emerald-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className={`font-bold text-base ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Availability</h4>
                    <p className={`text-sm text-zinc-500`}>Open to Projects</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Tech Stack Card */}
          <div className={`rounded-3xl p-8 h-fit transition-colors duration-300 ${isDark ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200 shadow-sm"}`}>
            <Reveal>
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                <Terminal className="text-emerald-500" size={20} /> Tech Stack
              </h3>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.1}>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500`}>Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Next.js", "TypeScript", "TailwindCSS", "Redux"].map(tag => (
                      <span key={tag} className={`px-3 py-1.5 rounded text-sm font-medium ${isDark ? "bg-zinc-800 text-zinc-300 border border-zinc-700" : "bg-zinc-100 text-slate-700 border border-zinc-200"}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500`}>Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "REST APIs", "PostgreSQL", "Supabase"].map(tag => (
                      <span key={tag} className={`px-3 py-1.5 rounded text-sm font-medium ${isDark ? "bg-zinc-800 text-zinc-300 border border-zinc-700" : "bg-zinc-100 text-slate-700 border border-zinc-200"}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500`}>Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Figma", "Vite", "Docker", "Jest"].map(tag => (
                      <span key={tag} className={`px-3 py-1.5 rounded text-sm font-medium ${isDark ? "bg-zinc-800 text-zinc-300 border border-zinc-700" : "bg-zinc-100 text-slate-700 border border-zinc-200"}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className={`py-20 px-6 transition-colors duration-300 ${isDark ? "bg-zinc-900/60" : "bg-white/60"}`}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Experience</h2>
          </Reveal>

          <div className={`relative border-l ml-3 space-y-12 ${isDark ? "border-zinc-700" : "border-zinc-200"}`}>
            {experiences.map((job, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="relative pl-8">
                  <div className={`absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full ring-4 ${i === 0 ? "bg-emerald-500" : isDark ? "bg-zinc-600" : "bg-zinc-400"} ${isDark ? "ring-zinc-950" : "ring-zinc-50"}`} />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className={`text-xl font-bold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{job.role}</h3>
                    <span className={`text-sm font-mono font-bold ${i === 0 ? "text-emerald-500" : isDark ? "text-zinc-500" : "text-zinc-500"}`}>{job.period}</span>
                  </div>
                  <h4 className={`text-base mb-4 font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{job.company}</h4>
                  <ul className={`space-y-2 text-sm mb-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {job.desc.map((item, idx) => (
                      <li key={idx} className="flex gap-2">• {item}</li>
                    ))}
                  </ul>
                  <div className={`text-xs font-mono ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{job.tech}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION (Case Studies) --- */}
      <section id="solutions" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Featured Solutions</h2>
            <div className="w-20 h-1 bg-emerald-500 mb-16 rounded-full" />
          </Reveal>

          <div className="space-y-24">
            {solutions.map((project, i) => (
              <Reveal key={i}>
                <div className={`grid md:grid-cols-12 gap-12 items-center ${project.layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className={`md:col-span-7 group relative ${project.layout === 'right' ? 'md:order-last' : ''}`}>
                    <div className={`aspect-video rounded-2xl overflow-hidden relative shadow-md ${isDark ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-emerald-900/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`md:col-span-5 ${project.layout === 'right' ? 'md:order-first' : ''}`}>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{project.title}</h3>
                    <p className={`text-base mb-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{project.description}</p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h5 className={`text-xs font-bold uppercase mb-2 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>The Challenge</h5>
                        <p className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{project.challenge}</p>
                      </div>
                      {project.solution && (
                        <div>
                          <h5 className={`text-xs font-bold uppercase mb-2 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>The Solution</h5>
                          <p className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{project.solution}</p>
                        </div>
                      )}
                      <div>
                        <h5 className={`text-xs font-bold uppercase mb-3 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>The Results</h5>
                        <div className="flex flex-wrap gap-3">
                          {project.results.map((res, idx) => (
                            <div key={idx} className={`px-3 py-2 rounded shadow-sm min-w-[80px] ${isDark ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-zinc-200"}`}>
                              <span className="text-emerald-500 font-bold text-lg block">{res.value}</span>
                              <span className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{res.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 text-xs font-medium mb-8 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 rounded-full font-medium ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-slate-700"}`}>{tag}</span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a href="#" className={`text-sm font-bold hover:text-emerald-500 underline decoration-emerald-500/30 underline-offset-4 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>View Case Study</a>
                      <a href="#" className={`text-sm font-bold flex items-center gap-1 hover:text-emerald-500 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                        <Github size={14} /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className={`py-32 px-6 transition-colors duration-300 ${isDark ? "bg-zinc-900/60" : "bg-white/60"}`}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center ${isDark ? "text-zinc-100" : "text-slate-900"}`}>What Clients Say</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`p-8 rounded-3xl h-full flex flex-col justify-between transition-shadow hover:shadow-lg ${isDark ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-zinc-200 shadow-sm"}`}>
                  <div>
                    <p className={`text-lg mb-6 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>"{item.text}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? "bg-zinc-700 text-zinc-300 border border-zinc-600" : "bg-zinc-100 text-zinc-500 border border-zinc-200"}`}>
                      {item.initials}
                    </div>
                    <div>
                      <h4 className={`text-base font-bold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{item.author}</h4>
                      <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{item.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- WRITING SECTION --- */}
      <section id="writing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Writing</h2>
              <a href="#" className="text-emerald-500 font-bold text-sm hover:text-emerald-400">View all articles →</a>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {writings.map((article, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.a
                  href="#"
                  className={`block h-full p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all group ${isDark ? "bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30" : "bg-white border border-zinc-200 hover:border-emerald-500/30"}`}
                >
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4 block">{article.tag}</span>
                  <h3 className={`text-lg font-bold mb-4 group-hover:text-emerald-500 transition-colors ${isDark ? "text-zinc-100" : "text-slate-900"}`}>{article.title}</h3>
                  <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{article.date} • {article.readTime} read</p>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className={`py-32 px-6 transition-colors duration-300 ${isDark ? "bg-zinc-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Let's Build Something Great.</h2>
              <p className={`text-lg md:text-xl mb-10 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Have a project in mind? I'd love to hear about it. Fill out form or book a call directly.
              </p>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                <a href="mailto:hello@chrisdennison.dev" className={`flex items-center gap-4 transition-colors group ${isDark ? "text-zinc-300 hover:text-emerald-400" : "text-zinc-700 hover:text-emerald-600"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? "bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500/30" : "bg-zinc-50 border border-zinc-200 group-hover:border-emerald-500/30"}`}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>Email</p>
                    <p className={`font-mono text-base ${isDark ? "text-zinc-100" : "text-slate-900"}`}>hello@chrisdennison.dev</p>
                  </div>
                </a>

                <a href="#" className={`flex items-center gap-4 transition-colors group ${isDark ? "text-zinc-300 hover:text-emerald-400" : "text-zinc-700 hover:text-emerald-600"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? "bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500/30" : "bg-zinc-50 border border-zinc-200 group-hover:border-emerald-500/30"}`}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>Schedule</p>
                    <p className={`font-mono text-base ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Book a 15-min intro call</p>
                  </div>
                </a>
              </div>

              <div className={`mt-12 p-6 rounded-xl ${isDark ? "bg-emerald-950/50 border border-emerald-900/50" : "bg-emerald-50 border border-emerald-100"}`}>
                <p className={`text-sm flex items-center gap-2 ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                  <Clock size={16} className="text-emerald-500" />
                  I typically respond within 24 hours.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <form className={`rounded-3xl p-8 space-y-6 shadow-sm ${isDark ? "bg-zinc-800 border border-zinc-700" : "bg-zinc-50 border border-zinc-200"}`} onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Name</label>
                <input type="text" className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-600" : "bg-white border-zinc-300 text-slate-900"}`} placeholder="John Doe" />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Email</label>
                <input type="email" className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-600" : "bg-white border-zinc-300 text-slate-900"}`} placeholder="john@company.com" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Project Type</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors appearance-none ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-white border-zinc-300 text-slate-900"}`}>
                    <option>New Website</option>
                    <option>Redesign</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Budget Range</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors appearance-none ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-white border-zinc-300 text-slate-900"}`}>
                    <option>&lt; $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Project Description</label>
                <textarea rows={4} className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-600" : "bg-white border-zinc-300 text-slate-900"}`} placeholder="Tell me about your project..."></textarea>
              </div>

              <button className="w-full bg-emerald-600 text-white text-base font-bold py-4 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20">
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`border-t pt-20 pb-10 px-6 transition-colors duration-300 ${isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-1">
              <div className={`text-xl font-bold tracking-tighter mb-6 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                CHRIS DENNISON<span className="text-emerald-500">.</span>
              </div>
              <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                Frontend Developer & React Specialist helping businesses build scalable web products.
              </p>
            </div>

            <div>
              <h4 className={`font-bold text-base mb-4 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Navigation</h4>
              <ul className={`space-y-3 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                <li><a href="#" className="hover:text-emerald-500">Home</a></li>
                <li><a href="#about" className="hover:text-emerald-500">About</a></li>
                <li><a href="#solutions" className="hover:text-emerald-500">Solutions</a></li>
                <li><a href="#contact" className="hover:text-emerald-500">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold text-base mb-4 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Connect</h4>
              <ul className={`space-y-3 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                <li><a href="#" className="hover:text-emerald-500">GitHub</a></li>
                <li><a href="#" className="hover:text-emerald-500">LinkedIn</a></li>
                <li><a href="#" className="hover:text-emerald-500">Twitter/X</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold text-base mb-4 ${isDark ? "text-zinc-100" : "text-slate-900"}`}>Legal</h4>
              <ul className={`space-y-3 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                <li><a href="#" className="hover:text-emerald-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-500">Terms of Use</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${isDark ? "border-zinc-800 text-zinc-500" : "border-zinc-100 text-zinc-400"}`}>
            <p>© 2025 Chris Dennison. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- BACK TO TOP BUTTON --- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50 transition-colors ${isDark ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700" : "bg-white text-slate-900 hover:bg-zinc-50 border border-zinc-200"}`}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}