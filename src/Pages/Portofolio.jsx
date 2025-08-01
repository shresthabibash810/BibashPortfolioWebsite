// src/components/Portofolio.jsx
import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Show More/Show Less Button
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Tab ARIA Props
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Tech Stack List
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "c.svg", language: "C" },
  { icon: "c++.svg", language: "C++" },
  { icon: "python.svg", language: "Python" },
  { icon: "r.svg", language: "R" },
  { icon: "java.svg", language: "Java" },
  { icon: "php.svg", language: "PHP" },
  { icon: "django.svg", language: "Django" },
  { icon: "fastapi.svg", language: "FastAPI" },
  { icon: "oracle.svg", language: "Oracle" },
  { icon: "psql.svg", language: "PostgreSQL" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "github.svg", language: "GitHub" },
];

// Your Projects
const userProjects = [
  {
    id: "applied-machine-learning-r",
    Title: "Applied Machine Learning with R",
    Description: "Implemented various machine learning algorithms including regression, classification, clustering, and dimensionality reduction using R. Covered hands-on projects with real-world datasets, model evaluation, and visualization techniques.",
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
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
    Link: null,
    Github: "https://github.com/shresthabibash810/Bank-Management-System.git",
    Img: "/Coding.gif",
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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  // 🔥 Listen for event from About.jsx to switch to Certificates tab
  useEffect(() => {
    const handleNavigateToTab = (e) => {
      setValue(e.detail.tabIndex);
      const portfolioSection = document.getElementById("Portfolio");
      if (portfolioSection) {
        setTimeout(() => {
          portfolioSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    window.addEventListener("navigateToTab", handleNavigateToTab);
    return () => window.removeEventListener("navigateToTab", handleNavigateToTab);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const storedCertificates = JSON.parse(localStorage.getItem("certificates")) || [];

      if (storedProjects.length > 0) setProjects(storedProjects);
      else setProjects(userProjects);

      if (storedCertificates.length > 0) setCertificates(storedCertificates);

      try {
        const projectCollection = collection(db, "projects");
        const certificateCollection = collection(db, "certificates");
        const [projectSnapshot, certificateSnapshot] = await Promise.all([
          getDocs(projectCollection),
          getDocs(certificateCollection),
        ]);

        const firebaseProjects = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          TechStack: doc.data().TechStack || [],
        }));

        const firebaseCertificates = certificateSnapshot.docs.map((doc) => doc.data());

        const combinedProjects = [...firebaseProjects, ...userProjects.filter(p => !firebaseProjects.some(fp => fp.id === p.id))];

        setProjects(combinedProjects);
        setCertificates(firebaseCertificates);

        localStorage.setItem("projects", JSON.stringify(combinedProjects));
        localStorage.setItem("certificates", JSON.stringify(firebaseCertificates));
      } catch (firebaseError) {
        console.error("Firebase fetch error:", firebaseError);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setProjects(userProjects);
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
    fetchData();

    const handleUpdate = () => fetchData();
    window.addEventListener("projectsUpdated", handleUpdate);
    return () => window.removeEventListener("projectsUpdated", handleUpdate);
  }, [fetchData]);

  const handleChange = (event, newValue) => setValue(newValue);
  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') setShowAllProjects(prev => !prev);
    else setShowAllCertificates(prev => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Fallback certificates if Firebase is empty
  const localCertificates = [
    { Img: "Bibash Shrestha.jpg" },
    { Img: "Coursera.jpg" },
    { Img: "Coursera2.jpg" },
    { Img: "Deloitte.jpg" },
    { Img: "Digital Marketing.jpg" },
    { Img: "MERN.jpg" },
    { Img: "Mindrisers.jpg" },
    { Img: "TATA.jpg" }
  ];

  const finalCertificates = certificates.length > 0 ? certificates : localCertificates;

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portfolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 0,
          },
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s",
                padding: "20px 0",
                margin: "8px",
                borderRadius: "12px",
                "&:hover": { color: "#fff", backgroundColor: "rgba(139, 92, 246, 0.1)" },
                "&.Mui-selected": { color: "#fff", background: "rgba(139, 92, 246, 0.2)" },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <div>
          {/* Projects Tab */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div key={project.id || index} data-aos="fade-up" data-aos-duration="1000">
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          {/* Certificates Tab */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {finalCertificates.map((cert, index) => (
                  <div key={index} data-aos="fade-up" data-aos-duration="1000">
                    <Certificate ImgSertif={encodeURI(`/${cert.Img}`)} />
                  </div>
                ))}
              </div>
            </div>
            {finalCertificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore('certificates')} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack Tab */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div key={index} data-aos="fade-up" data-aos-duration="1000">
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
