import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // CSS stilleri doğrudan component içinde
  const btnStyle = {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    padding: '12px 18px',
    borderRadius: '50%',
    background: '#222',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    zIndex: 9999,
    transition: 'opacity 0.3s, transform 0.3s',
    transform: visible ? 'scale(1.08)' : 'scale(1)'
  };

  return (
    <button
      style={btnStyle}
      onClick={scrollToTop}
      aria-label="Yukarı Çık"
      title="Yukarı Çık"
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
