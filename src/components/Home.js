import React, { useEffect, useState } from 'react';
import tornadoIcon from '../assets/tornado.png';

function TypewriterName() {
  const firstText = "Ben";
  const secondText = "H.Furkan Tahtalı";
  const [display, setDisplay] = useState("");
  const [showFirst, setShowFirst] = useState(true);
  const [typing, setTyping] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (showFirst) {
        if (i < firstText.length) {
          timeout = setTimeout(() => setI(i + 1), 90);
          setDisplay(firstText.slice(0, i + 1));
        } else {
          timeout = setTimeout(() => setTyping(false), 1100);
        }
      } else {
        if (i < secondText.length) {
          timeout = setTimeout(() => setI(i + 1), 90);
          setDisplay(secondText.slice(0, i + 1));
        } else {
          timeout = setTimeout(() => setTyping(false), 1200);
        }
      }
    } else {
      if (i > 0) {
        timeout = setTimeout(() => setI(i - 1), 55);
        setDisplay((showFirst ? firstText : secondText).slice(0, i - 1));
      } else {
        setTyping(true);
        setShowFirst(!showFirst);
      }
    }
    return () => clearTimeout(timeout);
  }, [i, typing, showFirst]);

  return (
    <h2 style={{minHeight: "2.2em", fontFamily: "monospace"}}>
      {display}
      <span style={{ color: "#2186eb" }}>|</span>
    </h2>
  );
}

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section id="home" className="home-section">
        <div className="container fade-right">
          <div className="baslik">
            <h1>Merhaba</h1>
            <TypewriterName />
          </div>
          <div className="aciklama">
            <p>
              Bilgisayar Mühendisliği 2. sınıf öğrencisiyim. Yazılıma olan ilgimle, bu alanda kendimi geliştirmeye devam ediyorum.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        /* Animasyon tanımları */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        
        .home-section {
          background-image: url(${tornadoIcon});
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center 20px;
          padding: 10px 0;
          height: 65vh;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeUp 1s ease-out forwards;
          margin-top: 0px; /* navbar yüksekliği kadar */
          position: relative;
          overflow: hidden;
        }
          .home-section::before {
          content: "";
          position: absolute;
          top: -90px; left: -140px;
          width: 480px; height: 400px;
          background: radial-gradient(circle at 60% 40%, #aeefff 0%, #fff4 100%);
          opacity: 0.25;
          z-index: 0;
          border-radius: 42% 58% 56% 44%/54% 41% 59% 46%;
          filter: blur(12px);
        }

        @media (max-width: 800px) {
          .home-section {
            background-position-y: 15%;
          }
          .container {
            margin-top: -5%; /* navbar yüksekliği kadar */
          }
        }
          @media (max-width: 480px){
          .home-section {
          }
          .container {
            margin-top: 15%; /* navbar yüksekliği kadar */
            position: relative; z-index: 1;
            }
          }


        
        .fade-right {
          animation: fadeRight 1s ease-out forwards;
          animation-delay: 1s;
          opacity: 0;
          will-change: transform, opacity;
          overflow: hidden;
        }

        .container {
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 12px;
          padding: 24px;
          color: black;
          text-shadow: 0 0 5px #fff, 0 0 10px #fff;
          
        }

        .baslik {
          text-align: center;
          margin-bottom: 20px;
        }

        .aciklama {
          font-size: 1.1rem;
          line-height: 1.6;
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default Home;

