// src/components/ProjectDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

// Tech Icons Mapping
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  R: Code,
  "Machine Learning": Cpu,
  "Data Analysis": Cpu,
  Statistics: Cpu,
  Visualization: Layout,
  PHP: Code,
  "Oracle APEX": Globe,
  GitHub: Package,
  Agile: Package,
  SQL: Code,
  "Database Design": Cpu,
  ERD: Layout,
  Normalization: Cpu,
  "Data Modeling": Cpu,
  Django: Code,
  "Django REST Framework": Code,
  SQLite: Code,
  "CRUD Operations": Cpu,
  "API Integration": Globe,
  Pandas: Code,
  NumPy: Code,
  Matplotlib: Layout,
  Seaborn: Layout,
  "Data Science": Cpu,
  "Adobe Photoshop": Layout,
  "UI/UX Design": Layout,
  "Web Design": Layout,
  "Graphic Design": Layout,
  Prototyping: Layout,
  "Web Development": Globe,
  Frontend: Globe,
  Backend: Cpu,
  "Object-Oriented Programming": Code,
  "File Handling": Cpu,
  "Data Structures": Code,
  default: Package,
};

// Reusable Components
const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      <div className="relative w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
      {feature}
    </span>
  </li>
);

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;
  return (
    <div className="grid grid-cols-2 gap-3 p-3 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
      
      {/* Tech Count */}
      <div className="relative z-10 flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-blue-500/20 transition-all duration-300">
        <div className="bg-blue-500/20 p-1.5 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] text-gray-400">Technologies</div>
        </div>
      </div>

      {/* Features Count */}
      <div className="relative z-10 flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-purple-500/20 transition-all duration-300">
        <div className="bg-purple-500/20 p-1.5 rounded-full">
          <Layers className="text-purple-300 w-4 h-4" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-[10px] text-gray-400">Features</div>
        </div>
      </div>
    </div>
  );
};

// Handle GitHub Click
const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Private Source Code',
      text: 'Sorry, the source code for this project is private.',
      confirmButtonText: 'Understood',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

// Main Component
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Your project data
  const userProjects = [
    {
      id: "applied-machine-learning-r",
      Title: "Applied Machine Learning with R",
      Description: "Implemented various machine learning algorithms including regression, classification, clustering, and dimensionality reduction using R. Covered hands-on projects with real-world datasets, model evaluation, and visualization techniques.",
      Github: "https://github.com/shresthabibash810/Applied-Machine-Learning-with-R",
      Img: "/AppliedMLwithR.png",
      TechStack: ["R", "Machine Learning", "Data Analysis", "Statistics", "Visualization"],
      Features: [
        "Regression Analysis",
        "Classification Algorithms",
        "Clustering Techniques",
        "Dimensionality Reduction",
        "Model Evaluation",
        "Data Visualization",
        "Real-world Dataset Analysis"
      ]
    },
    {
      id: "php-oracle-apex-fullstack",
      Title: "Full-Stack Web Application – PHP & Oracle APEX",
      Description: "Worked on a full-stack web application using PHP, Oracle APEX, HTML/CSS, and JavaScript as part of a team project at The British College. Contributed to both frontend and backend development while following Agile practices and using GitHub for collaboration.",
      Github: "https://github.com/shresthabibash810/PHP_OracleApex_FullStack",
      Img: "/FullStackPHPwithOracle.png",
      TechStack: ["PHP", "Oracle APEX", "HTML", "CSS", "JavaScript", "GitHub", "Agile"],
      Features: [
        "Full-stack Development",
        "Team Collaboration",
        "Agile Methodology",
        "Frontend Development",
        "Backend Development",
        "Database Integration",
        "Version Control"
      ]
    },
    {
      id: "database-systems",
      Title: "Database Systems",
      Description: "This project was given to me by The British College in my 3rd year Sem 1. Comprehensive database design and implementation project covering various database concepts and practical applications.",
      Github: "https://github.com/shresthabibash810/Database-Systems",
      Img: "/Database.png",
      TechStack: ["SQL", "Database Design", "ERD", "Normalization", "Data Modeling"],
      Features: [
        "Database Design",
        "Entity Relationship Diagrams",
        "SQL Queries",
        "Data Normalization",
        "Schema Design",
        "Data Integrity",
        "Performance Optimization"
      ]
    },
    {
      id: "school-management-system-django",
      Title: "School Management System Using Django and REST Framework",
      Description: "Developed a School Management System using Django and Django REST Framework, implementing CRUD operations for efficient data management and backend functionality.",
      Github: "https://github.com/shresthabibash810/School-Management-System.git",
      Img: "/Django1.png",
      TechStack: ["Django", "Django REST Framework", "Python", "SQLite", "CRUD Operations"],
      Features: [
        "Student Management",
        "Teacher Management",
        "Course Management",
        "Attendance Tracking",
        "Grade Management",
        "RESTful API",
        "Admin Dashboard"
      ]
    },
    {
      id: "inventory-management-system-django",
      Title: "Inventory Management System using Django and REST Framework",
      Description: "Developed an Inventory Management System using Django and Django REST Framework, enabling efficient product tracking, supplier management, and API integration.",
      Github: "https://github.com/shresthabibash810/Mindriser-IMS-Project.git",
      Img: "/Django2.jpg",
      TechStack: ["Django", "Django REST Framework", "Python", "SQLite", "API Integration"],
      Features: [
        "Product Management",
        "Supplier Management",
        "Stock Tracking",
        "Order Management",
        "Inventory Reports",
        "RESTful API",
        "Data Analytics"
      ]
    },
    {
      id: "data-analysis-python",
      Title: "Data Analysis in Python",
      Description: "This project was given to us in our second semester of BSc.(Hons) Computing degree. Comprehensive data analysis project using Python for data science tasks.",
      Github: "https://github.com/shresthabibash810/Python-Data-Science-Task.git",
      Img: "/PythonDataScience.jpeg",
      TechStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Science"],
      Features: [
        "Data Cleaning",
        "Data Visualization",
        "Statistical Analysis",
        "Data Manipulation",
        "Exploratory Data Analysis",
        "Report Generation",
        "Insight Discovery"
      ]
    },
    {
      id: "webpage-design-photoshop",
      Title: "WebPage Design in Photoshop",
      Description: "This project was given to us in our second semester of BSc.(Hons) Computing degree. Creative web design project using Adobe Photoshop for UI/UX design.",
      Github: "https://github.com/shresthabibash810/Webpage-Design-Photoshop.git",
      Img: "/WebPageDesign.png",
      TechStack: ["Adobe Photoshop", "UI/UX Design", "Web Design", "Graphic Design", "Prototyping"],
      Features: [
        "UI/UX Design",
        "Web Layout Design",
        "Graphic Design",
        "Color Theory",
        "Typography",
        "Responsive Design",
        "Design Prototyping"
      ]
    },
    {
      id: "website-development",
      Title: "Website Development",
      Description: "This project was given to us in our second semester of BSc.(Hons) Computing degree. Complete website development project covering frontend and backend aspects.",
      Github: "https://github.com/shresthabibash810/Final-Assignment-Project.git",
      Img: "/WebsiteDev.png",
      TechStack: ["HTML", "CSS", "JavaScript", "Web Development", "Frontend", "Backend"],
      Features: [
        "Frontend Development",
        "Backend Integration",
        "Responsive Design",
        "User Interface",
        "Web Standards",
        "Cross-browser Compatibility",
        "Performance Optimization"
      ]
    },
    {
      id: "bank-management-system-cpp",
      Title: "Bank Management System with C++",
      Description: "This project was given as assignment in our first semester of BSc.(Hons) Computing degree. Object-oriented programming project implementing a comprehensive bank management system.",
      Github: "https://github.com/shresthabibash810/Bank-Management-System.git",
      Img: "/Bank.png",
      TechStack: ["C++", "Object-Oriented Programming", "File Handling", "Data Structures"],
      Features: [
        "Account Management",
        "Transaction Processing",
        "Customer Records",
        "Balance Tracking",
        "Data Persistence",
        "User Authentication",
        "Report Generation"
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    let selectedProject = storedProjects.find((p) => String(p.id) === id);

    if (!selectedProject) {
      selectedProject = userProjects.find((p) => String(p.id) === id);
    }

    if (selectedProject) {
      setProject({
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || 'https://github.com/shresthabibash810',
      });
      setTimeout(() => setIsLoading(false), 300);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 md:w-96 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative max-w-6xl mx-auto py-8 md:py-16">
        {/* Back Button */}
        <div className="flex items-center space-x-2 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center space-x-1.5 px-3 py-2 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-1 text-xs text-white/50 truncate">
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 truncate">{project.Title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              {project.Title}
            </h1>

            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

            <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
              {project.Description}
            </p>

            <ProjectStats project={project} />

            {/* GitHub Button */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 backdrop-blur-xl text-sm"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
              >
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">View on GitHub</span>
              </a>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.TechStack.map((tech, index) => (
                  <TechBadge key={index} tech={tech} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image & Features */}
          <div className="space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="aspect-video w-full overflow-hidden rounded-2xl">
                <img
                  src={project.Img}
                  alt={project.Title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/Coding.gif'; }}
                />
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-6">
              <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                Key Features
              </h3>
              <ul className="list-none space-y-2">
                {project.Features.map((feature, index) => (
                  <FeatureItem key={index} feature={feature} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default ProjectDetails;