import React, { useEffect } from 'react';
import tornadoIcon from '../assets/tornado.png';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section id="home" className="home-section">
        <div className="container fade-right">
          <div className="baslik">
            <h1>Merhaba,</h1>
            <h2>Ben H.Furkan Tahtali(Tornado)</h2>
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

        /* Arka plan (logo) animasyonu */
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
            height: 25 vh;  
          }
          .container {
            margin-top: 15%; /* navbar yüksekliği kadar */
            }
          }


        /* İçerik kutusu: sağdan gelen animasyon */
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
