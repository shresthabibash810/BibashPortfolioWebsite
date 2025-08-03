// src/components/CardProject.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, id }) => {
  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available.");
    }
  };

  return (
    <div className="group relative w-full max-w-full">
      <div className="relative overflow-hidden rounded-xl 
                      bg-gradient-to-br from-slate-900/90 to-slate-800/90 
                      backdrop-blur-lg border border-white/10 shadow-2xl 
                      transition-all duration-300 hover:shadow-purple-500/20
                      transform hover:-translate-y-1">
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br 
                        from-blue-500/10 via-purple-500/10 to-pink-500/10 
                        opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative p-4 sm:p-5 z-10">
          {/* Responsive Image Container */}
          <div className="relative overflow-hidden rounded-lg aspect-video">
            <img
              src={Img}
              alt={Title}
              loading="lazy"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = '/Coding.gif';
                console.log(`Failed to load image: ${Img}`);
              }}
            />
          </div>

          {/* Content */}
          <div className="mt-4 space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold 
                           bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 
                           bg-clip-text text-transparent break-words line-clamp-2">
              {Title}
            </h3>

            <p className="text-gray-300/80 text-sm sm:text-base leading-relaxed line-clamp-3">
              {Description}
            </p>

            {/* Responsive Button */}
            <div className="pt-3 flex items-center justify-start">
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="group inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg 
                             bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 
                             hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                             text-sm sm:text-base"
                >
                  <span className="font-medium group-hover:underline transition-all duration-150">
                    Details
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Unavailable</span>
              )}
            </div>
          </div>

          {/* Border Highlight on Hover */}
          <div className="absolute inset-0 border-2 border-transparent 
                          group-hover:border-purple-500/50 rounded-xl 
                          transition-colors duration-300 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;