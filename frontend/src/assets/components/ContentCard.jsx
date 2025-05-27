import React, { useState, useEffect } from "react";
import ContentCardPresenter from "./ContentCard-Presenter";

const ContentCard = ({ title, content, popupContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (isVisible) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 300); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [isHovered, isVisible]);

  return (
    <ContentCardPresenter
      title={title}
      content={content}
      popupContent={popupContent}
      isVisible={isVisible}
      isAnimatingOut={isAnimatingOut}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default ContentCard;
