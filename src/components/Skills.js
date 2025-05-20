import React, { useEffect, useRef, useState } from 'react';
import CSharp from "../assets/CSharp.png"; 
import Python from "../assets/Python.png";
import SQL from "../assets/SQL.png"; 
import PyQt5 from "../assets/PyQt5.png";
import Java from "../assets/Java.png";
import HTML from "../assets/html.png";
import css from "../assets/css.png";
import react from "../assets/react.png"; 
const skillsList = [
  { name: "C#", logo: CSharp },
  { name: "Python", logo: Python },
  { name: "SQL", logo: SQL },
  { name: "PyQt5", logo: PyQt5 },
  { name: "Java", logo: Java },
  { name: "HTML", logo: HTML },
  { name: "CSS", logo: css },
  { name: "React", logo: react },
];

function Skills() {
  const itemsRef = useRef([]);
  const [visible, setVisible] = useState(Array(skillsList.length).fill(false));

  useEffect(() => {
    const observers = [];
    itemsRef.current.forEach((el, idx) => {
      if (!el) return;
      observers[idx] = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible(prev => {
                const copy = [...prev];
                copy[idx] = true;
                return copy;
              });
            }, idx * 150); // Her biri sırayla gelsin diye delay
            observers[idx].disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observers[idx].observe(el);
    });
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section id="skills" className="skills-section">
        {/* DEKORATİF AYIRICI */}
        <div className="decor-separator">
          <span className="line"></span>
          <span className="star">*</span>
          <span className="line"></span>
        </div>
        <h2 className="skills-title">Yetenekler</h2>
        <ul className="skills-list">
          {skillsList.map((skill, idx) => (
            <li
              className={`skill-item${visible[idx] ? ' visible' : ''}`}
              key={skill.name}
              ref={el => (itemsRef.current[idx] = el)}
            >
              <img
                className="skill-logo"
                src={skill.logo}
                alt={skill.name + " logo"}
                loading="lazy"
              />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <style>{`
        .skills-section {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0 60px 0;
        }
        .skills-title {
          font-size: 2rem;
          margin-bottom: 32px;
          letter-spacing: 1px;
          color:rgb(31, 20, 6);
          font-weight: 700;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .skill-item {
          display: flex;
          align-items: center;
          font-size: 1.15rem;
          font-weight: 600;
          color: #222;
          background: rgba(255,255,255,0.18);
          border-radius: 11px;
          box-shadow: 0 3px 12px 0 rgba(31,38,135,0.07);
          padding: 15px 22px;
          opacity: 0;
          transform: translateY(40px);
          transition: 
            opacity 0.5s cubic-bezier(.67,.07,.43,1.01), 
            transform 0.5s cubic-bezier(.67,.07,.43,1.01);
        }
        .skill-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .skill-logo {
          width: 36px;
          height: 36px;
          margin-right: 18px;
          object-fit: contain;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        @media (max-width: 600px) {
          .skills-section {
            padding: 24px 0;
          }
          .skills-list {
            max-width: 99vw;
          }
          .skill-item {
            font-size: 1rem;
            padding: 12px 8px;
          }
          .skill-logo {
            width: 28px;
            height: 28px;
            margin-right: 12px;
          }
        }
          #skills {
          scroll-margin-top: 40px; /* Navbar'ın yüksekliği kadar boşluk bırak */
        }
      `}</style>
    </>
  );
}

export default Skills;
