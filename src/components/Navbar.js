import React, { useState, useEffect } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
        
        <a
          href="#home"
          className="navbar-brand mb-0"
          onClick={() => isMobile && setMenuOpen(false)}
        >
          Portfolyo
        </a>


        {isMobile && (
          <div id="nav-icon3" className={menuOpen ? 'open' : ''} onClick={toggleMenu}>
            <span></span><span></span><span></span><span></span>
          </div>
        )}

        <div className={`custom-collapse ${menuOpen ? 'open' : ''} ${isMobile ? '' : 'd-lg-flex ms-auto'}`} id="navbarNav">
          <ul className={`navbar-nav ${isMobile ? 'flex-column align-items-center' : 'd-flex flex-row ms-lg-auto'}`}>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={() => isMobile && setMenuOpen(false)}>Ben Kimim?</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={() => isMobile && setMenuOpen(false)}>Yetenekler</a>
            </li>
            <li className="nav-item">
              <a href="#portfolio" className="nav-link" onClick={() => isMobile && setMenuOpen(false)}>Portfolyo</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={() => isMobile && setMenuOpen(false)}>İletişim</a>
            </li>          
          </ul>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        #nav-icon3 {
          width: 30px;
          height: 25px;
          position: relative;
          margin-left: auto;
          cursor: pointer;
          z-index: 1001;
        }
        #nav-icon3 span {
          display: block;
          position: absolute;
          height: 4px;
          width: 100%;
          background: white;
          border-radius: 2px;
          opacity: 1;
          left: 0;
          transition: all 0.25s ease-in-out;
        }
        #nav-icon3 span:nth-child(1) { top: 0px; }
        #nav-icon3 span:nth-child(2),
        #nav-icon3 span:nth-child(3) { top: 10px; }
        #nav-icon3 span:nth-child(4) { top: 20px; }
        #nav-icon3.open span:nth-child(1),
        #nav-icon3.open span:nth-child(4) {
          top: 10px;
          width: 0%;
          left: 50%;
        }
        #nav-icon3.open span:nth-child(2) {
          transform: rotate(45deg);
        }
        #nav-icon3.open span:nth-child(3) {
          transform: rotate(-45deg);
        }
        .custom-collapse {
          width: 100%;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }
        .custom-collapse.open {
          max-height: 500px;
        }
        @media (min-width: 992px) {
          .custom-collapse {
            max-height: none !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
