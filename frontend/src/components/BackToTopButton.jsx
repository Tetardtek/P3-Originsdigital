import React, { useState, useEffect } from "react";
import "../styles/BackToTopButton.scss";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const triggerScroll = 100;

      setIsVisible(scrollTop > triggerScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top-button ${isVisible ? "visible" : "hidden"}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}

export default BackToTopButton;
