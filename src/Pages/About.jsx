// src/components/About.jsx
import { useEffect, memo, useMemo, useState, useCallback } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";

// Header Component
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));
Header.displayName = "Header";

// Profile Image
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <img src="/portfolio.png" alt="Profile" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
));
ProfileImage.displayName = "ProfileImage";

// Stat Card
const StatCard = memo(({ icon: Icon, color, value, label, description, animation, onClick }) => (
  <div data-aos={animation} data-aos-duration="1300" className="relative group cursor-pointer" onClick={onClick}>
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20`}></div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>
      <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{description}</p>
        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white" />
      </div>
    </div>
  </div>
));
StatCard.displayName = "StatCard";
StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  animation: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Main About Component
const AboutPage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCertificates: 0,
    YearExperience: 0,
  });

  const calculateStats = useCallback(() => {
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const experience = new Date().getFullYear() - 2021;

    setStats({
      totalProjects: Math.max(storedProjects.length, 9),
      totalCertificates: storedCertificates.length || 8,
      YearExperience: experience,
    });
  }, []);

  useEffect(() => {
    calculateStats();
    const handleUpdate = () => calculateStats();
    window.addEventListener('projectsUpdated', handleUpdate);
    return () => window.removeEventListener('projectsUpdated', handleUpdate);
  }, [calculateStats]);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const { totalProjects, totalCertificates, YearExperience } = stats;

  // 🔥 Click handlers
  const handleProjectClick = () => {
    const event = new CustomEvent("navigateToTab", { detail: { tabIndex: 0 } });
    window.dispatchEvent(event);
  };

  const handleCertificateClick = () => {
    const event = new CustomEvent("navigateToTab", { detail: { tabIndex: 1 } });
    window.dispatchEvent(event);
  };

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
      onClick: handleProjectClick,
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
      onClick: handleCertificateClick,
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Hello, I'm</span>
              <span className="block mt-2 text-gray-200">Bibash Shrestha</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify">
              I am a passionate Full Stack Developer with a strong foundation in PHP, Oracle Apex, Python, and modern web technologies.
            </p>
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                  <FileText className="w-4 h-4" /> Download CV
                </button>
              </a>
              <a
                href="#Portofolio"
                onClick={(e) => {
                  e.preventDefault();
                  const event = new CustomEvent("navigateToTab", { detail: { tabIndex: 0 } });
                  window.dispatchEvent(event);
                }}
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto px-6 py-2 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium hover:scale-105 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10">
                  <Code className="w-4 h-4" /> View Projects
                </button>
              </a>
            </div>
          </div>
          <ProfileImage />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map(stat => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Professional Details */}
      <section className="mt-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Professional Profile</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#a855f7]">TECHNICAL SKILLS</h3>
            <ul className="space-y-3 text-gray-300">
              <li><strong>Languages:</strong> Python, JavaScript, C++, C, Java, SQL, HTML, CSS, R</li>
              <li><strong>Frameworks:</strong> Django, Django REST Framework, React, Node.js, FastAPI</li>
              <li><strong>Databases:</strong> Oracle APEX, MongoDB, SQLite, MySQL, PostgreSQL</li>
              <li><strong>Tools:</strong> Git, GitHub, Tableau, Excel, Postman, Agile/Scrum, Microsoft BI</li>
              <li><strong>Concepts:</strong> API Development, SQL Joins, CTEs, ETL, Data Analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#a855f7]">PROFESSIONAL EXPERIENCE</h3>
            <div className="space-y-4">
              <div>
                <strong>College Representative, Code for Change – The British College, Kathmandu</strong>
                <div className="text-sm text-gray-400">Jan 2025 – Present</div>
                <ul className="list-disc list-inside mt-2 text-gray-300 text-sm">
                  <li>Promoted tech initiatives and events like Tech Carnival 2025 to enhance student engagement.</li>
                  <li>Organized workshops and created outreach content to build a stronger tech community.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#a855f7]">EDUCATION</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <strong>BSc (Hons) in Computing, The British College, Kathmandu</strong>
                <div className="text-sm text-gray-400">Sep 2022 – Present (Exp. 2026)</div>
                <div className="text-sm mt-1">Coursework: Database Systems, Web Development, Data Science, Software Engineering</div>
              </div>
              <div>
                <strong>Higher Secondary Education (Science), DAV College, Kathmandu</strong>
                <div className="text-sm text-gray-400">2019 – 2021 | GPA: 3.46</div>
              </div>
              <div>
                <strong>Secondary Education (SEE), Valley Public HSS, Kathmandu</strong>
                <div className="text-sm text-gray-400">2017 – 2019 | GPA: 3.65</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#a855f7]">ACHIEVEMENTS</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong>Student Exchange Programme 3.0 – IoT Collaboration, Leeds Beckett University</strong>
                <div className="text-sm text-gray-400">2025</div>
              </li>
              <li>
                <strong>Hack4SafeFood Hackathon Participant, DFTQC, Nepal</strong>
                <div className="text-sm text-gray-400">2025</div>
              </li>
              <li>
                <strong>Volunteer, TBC Career Fest, The British College</strong>
                <div className="text-sm text-gray-400">2023</div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(AboutPage);