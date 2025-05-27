import React from 'react';

const ContentCardPresenter = ({
  title,
  content,
  popupContent,
  isVisible,
  isAnimatingOut,
  onMouseEnter,
  onMouseLeave,
}) => {
  const slideInAnimation = {
    animation: 'slideInFromLeft 0.3s ease forwards',
  };

  const slideOutAnimation = {
    animation: 'slideOutToLeft 0.3s ease forwards',
  };

  return (
    <div
      className="relative bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] rounded-xl shadow-xl p-8 max-w-xl text-left text-teal-900 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h2 className="text-3xl font-bold mb-6 text-[#0077B6] tracking-wide">{title}</h2>
      <div className="text-[#004d40] text-lg">{content}</div>

      {isVisible && (
        <>
          <style>
            {`
              @keyframes slideInFromLeft {
                0% {
                  opacity: 0;
                  transform: translateX(-20px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              @keyframes slideOutToLeft {
                0% {
                  opacity: 1;
                  transform: translateX(0);
                }
                100% {
                  opacity: 0;
                  transform: translateX(-20px);
                }
              }
            `}
          </style>
          <div
            className="absolute top-0 left-full ml-4 w-72 p-6 bg-white rounded-xl shadow-2xl text-teal-900 z-20"
            style={{
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
              ...(isAnimatingOut ? slideOutAnimation : slideInAnimation),
            }}
          >
            {popupContent}
          </div>
        </>
      )}
    </div>
  );
};

export default ContentCardPresenter;
