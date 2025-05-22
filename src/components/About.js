import React, { useEffect } from 'react';

function About() {

  return (
    <>
      <section id="about" className="about-section">

        {/* DEKOR */}
        <div className="decor-separator">
          <span className="line"></span>
          <span className="star">*</span>
          <span className="line"></span>
        </div>

        <div className="about-container">
          <h2>Ben Kimim?</h2>
          <p>
            Merhaba, ben H.Furkan Tahtali. Bilgisayar mühendisliği öğrencisiyim. C#, Python, SQL, PyQt5, Java, HTML, CSS ve React gibi teknolojilerle projeler geliştiriyor, kendimi sürekli yeni alanlarda geliştirmeye çalışıyorum. Henüz hangi alanda uzmanlaşacağıma karar veremedim; şimdilik keşfetmeye devam!
          </p>
          <div className="egitim-bolumu">
            <h3>Eğitim</h3>
            <ul>
              <li><strong>Lise:</strong> Bursa Erkek Lisesi</li>
              <li><strong>Üniversite:</strong> Balıkesir Üniversitesi Bilgisayar Mühendisliği</li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
      
        .about-section {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0px 20px 40px 20px;
          background: none;
        }
          @media (max-width: 768px) {
        .about-section {
        min-height: 50vh;
      }
      }
        .decor-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 700px;
          margin: 0 0 32px 0;
          gap: 18px;
          opacity: 0.93;
        }
        .decor-separator .line {
          flex: 1;
          border-bottom: 1.8px solid rgba(0, 0, 0, 0.8);
          height: 0;
          opacity: 0.8;
        }
        .decor-separator .star {
          font-size: 1.5rem;
          color:rgb(20, 13, 4);
          padding: 0 8px;
          letter-spacing: 2px;
          font-weight: bold;
          user-select: none;
        }
        .about-container {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(14px);
          border-radius: 24px;
          border: 1.5px solid rgba(255,255,255,0.22);
          padding: 48px 32px;
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.17);
          color: #222;
          max-width: 700px;
          width: 100%;
          text-align: center;
        }
        .about-container h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .about-container p {
          font-size: 1.15rem;
          line-height: 1.7;
        }
        .egitim-bolumu {
          margin-top: 2rem;
        }
        .egitim-bolumu h3 {
          font-size: 1.3rem;
          margin-bottom: 0.7rem;
        }
        .egitim-bolumu ul {
          list-style-type: none;
          padding: 0;
        }
        .egitim-bolumu li {
          margin-bottom: 0.5rem;
          font-size: 1.07rem;
        }
        .egitim-bolumu strong {
          color:rgb(36, 33, 30);
        }
          #skills {
          scroll-margin-top: 40px; /* Navbar'ın yüksekliği kadar boşluk bırak */
        }
      `}</style>
    </>
  );
}

export default About;
