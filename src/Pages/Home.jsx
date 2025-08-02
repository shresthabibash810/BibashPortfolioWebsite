import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text text-[0.65rem] sm:text-sm font-medium flex items-center">
          <Sparkles className="w-2.5 h-2.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div className="space-y-1 sm:space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Bibash Shrestha
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-0.5 sm:mt-1">
        <span className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Full Stack Developer
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = "MainTitle";

const TechStack = memo(({ tech }) => (
  <div className="px-2 py-1 sm:px-3 sm:py-1.5 text-[0.65rem] sm:text-xs md:text-sm rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));
TechStack.displayName = "TechStack";

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a
    href={href}
    className="group relative w-[130px] sm:w-[150px] md:w-[160px] inline-block"
    aria-label={text}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
    <div className="relative h-9 sm:h-10 md:h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
      <span className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 text-[0.8rem] sm:text-sm md:group-hover:gap-3 transition-all duration-300">
        <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
          {text}
        </span>
        <Icon
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-200 ${
            text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"
          } transform transition-all duration-300 z-10`}
        />
      </span>
    </div>
  </a>
));
CTAButton.displayName = "CTAButton";

const SocialLink = memo(({ icon: Icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-2 sm:p-2.5 md:p-3 inline-block"
    aria-label="Social link"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-1.5 sm:p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
    </div>
  </a>
));
SocialLink.displayName = "SocialLink";

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Full Stack Developer",
  "PHP | Oracle Apex | Python | React",
  "Tech Enthusiast",
];

const TECH_STACK = [
  "PHP",
  "Oracle Apex",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Database Systems",
  "Data Science",
  "Web Design",
];

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/shresthabibash810" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/bibash-shrestha-a1a187245/" },
  { icon: Instagram, link: "https://www.instagram.com/bibashshrestha.official/" },
  { icon: Mail, link: "mailto:bibashshrestha810@gmail.com" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLottieError, setIsLottieError] = useState(false);

  // AOS Initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
        duration: 800,
        easing: "ease-out-cubic",
        disable: window.innerWidth < 640,
      });
    };

    initAOS();

    const handleResize = () => {
      AOS.refresh();
      if (window.innerWidth < 640) {
        AOS.init({ disable: true });
      } else {
        AOS.init({ disable: false });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      AOS.refreshHard();
    };
  }, []);

  // Load State
  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Typing Effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      if (!isMounted) return;
      handleTyping();
    }, isTyping ? TYPING_SPEED : ERASING_SPEED);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [handleTyping]);

  // Lottie Config
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: {
      width: "100%",
      height: "100%",
      transform: isHovering && window.innerWidth >= 1024 ? "scale(1.1) rotate(2deg)" : "scale(1.0)",
      transition: "transform 0.5s ease",
    },
    onError: () => setIsLottieError(true),
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 text-left order-1 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <StatusBadge />
              <MainTitle />

              {/* Typing Effect */}
              <div className="h-6 sm:h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[2px] sm:w-[3px] h-5 sm:h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
              </div>

              {/* Description */}
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl leading-relaxed font-light"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                Hi, I&apos;m{" "}
                <span className="font-semibold text-white">Bibash Shrestha</span>, a passionate Full Stack Developer specializing in PHP, Oracle Apex, Python, and modern web technologies. I love building scalable, efficient, and innovative solutions for the digital world.
              </p>

              {/* Tech Stack */}
              <div
                className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                {TECH_STACK.map((tech, index) => (
                  <TechStack key={index} tech={tech} />
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-row gap-2 sm:gap-3 w-full justify-start"
                data-aos="fade-up"
                data-aos-delay="1400"
              >
                <CTAButton href="#Portfolio" text="Projects" icon={ExternalLink} />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </div>

              {/* Social Links */}
              <div
                className="flex gap-2 sm:gap-3 md:gap-4"
                data-aos="fade-up"
                data-aos-delay="1600"
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </div>
            </div>

            {/* Right Column - Lottie */}
            <div
              className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[600px] 2xl:h-[700px] relative flex items-center justify-center order-2 lg:order-2 mt-6 sm:mt-8 lg:mt-0"
              onMouseEnter={() => window.innerWidth >= 1024 && setIsHovering(true)}
              onMouseLeave={() => window.innerWidth >= 1024 && setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none mx-auto aspect-square lg:aspect-auto">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}
                ></div>

                {/* Lottie Container */}
                <div
                  className={`relative z-10 w-full h-full transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  {isLottieError ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-3xl">
                      <p className="text-gray-400 text-sm sm:text-base">
                        Animation failed to load
                      </p>
                    </div>
                  ) : (
                    <DotLottieReact {...lottieOptions} />
                  )}
                </div>

                {/* Outer Pulse Glow */}
                <div className="absolute inset-0 pointer-events-none transition-all duration-700">
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;