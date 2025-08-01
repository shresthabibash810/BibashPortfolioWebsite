// Simple script to add your projects to the portfolio
// Copy and paste this entire script into your browser console

(function() {
  console.log("🚀 Adding your projects to the portfolio...");
  
  const projects = [
    {
      id: "applied-machine-learning-r",
      Title: "Applied Machine Learning with R",
      Description: "Implemented various machine learning algorithms including regression, classification, clustering, and dimensionality reduction using R. Covered hands-on projects with real-world datasets, model evaluation, and visualization techniques.",
      Link: null,
      Github: "https://github.com/shresthabibash810/Applied-Machine-Learning-with-R",
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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
      Img: "/Coding.gif",
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

  try {
    // Get existing projects
    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    console.log("📋 Found", existingProjects.length, "existing projects");
    
    // Add new projects
    const updatedProjects = [...existingProjects, ...projects];
    
    // Save to localStorage
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    
    console.log("✅ Successfully added", projects.length, "projects");
    console.log("📊 Total projects now:", updatedProjects.length);
    
    // Log each project
    projects.forEach(project => {
      console.log(`📁 Added: ${project.Title}`);
    });
    
    console.log("🔄 Refreshing page to show projects...");
    
    // Refresh the page to show the projects
    if (confirm("Projects added successfully! Click OK to refresh the page and see your new projects.")) {
      window.location.reload();
    }
    
  } catch (error) {
    console.error("❌ Error adding projects:", error);
  }
})(); 