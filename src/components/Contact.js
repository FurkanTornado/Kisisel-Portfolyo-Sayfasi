import React, { useState, useEffect } from "react";
import XLogo from "../assets/X.png";
import GitHubLogo from "../assets/GitHub.png";
import FacebookLogo from "../assets/Facebook.png";
import InstagramLogo from "../assets/Instagram.png";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 2000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setError("");

    const endpoint = "https://formspree.io/f/mwpozale"; // Formspree endpoint

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err?.message || "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>İletişim</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Mesajınız"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={isSending}>
          {isSending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>

      {submitted && (
        <div className="success-message">Mesajınız başarıyla gönderildi!</div>
      )}

      {error && <div className="error-message">{error}</div>}

      {/* SOSYAL MEDYA */}
      <div className="social-links">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src={XLogo} alt="X" className="social-logo" />
        </a>

        <a
          href="https://github.com/FurkanTornado"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitHubLogo} alt="GitHub" className="social-logo" />
        </a>

        <a
          href="https://facebook.com/furkan.ft.2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={FacebookLogo} alt="Facebook" className="social-logo" />
        </a>

        <a
          href="https://www.instagram.com/furkantornado?igsh=NDRnbGh3dGljaXVq&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={InstagramLogo} alt="Instagram" className="social-logo" />
        </a>
      </div>

      <style>{`
      .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 36px;
        }
        .social-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 50%;
          transition: box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 1px 4px rgba(50,50,50,0.08);
          background: #f4f4f4;
        }
        .social-logo:hover {
          filter: brightness(0.9) drop-shadow(0 0 4px #2186eb88);
        }
        @media (max-width: 600px) {
          .social-links { gap: 12px; }
          .social-logo { width: 32px; height: 32px; }
        }

        .contact-section {
          max-width: 500px;
          margin: 40px auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.09);
          padding: 32px 24px;
        }
        .contact-section h2 {
          text-align: center;
          margin-bottom: 28px;
          font-size: 2rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-form input,
        .contact-form textarea {
          border: 1px solid #aaa;
          border-radius: 8px;
          padding: 12px;
          font-size: 1.07rem;
          outline: none;
          transition: border 0.2s;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #2186eb;
        }
        .contact-form button {
          padding: 11px 0;
          background: #2186eb;
          color: #fff;
          font-size: 1.09rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .contact-form button:hover {
          background: #1256b1;
        }
        .success-message {
          text-align: center;
          margin-top: 24px;
          color: #228b22;
          font-weight: 500;
          font-size: 1.1rem;
          animation: fadeIn .5s;
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        @media (max-width: 600px) {
          .contact-section {
            padding: 18px 5vw;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;

