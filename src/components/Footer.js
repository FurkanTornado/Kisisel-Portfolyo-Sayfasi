import React from "react";

function Footer() {
  return (
    <footer style={{
      width: "100%",
      background: "rgba(34,32,29,0.92)",
      color: "#e2e2e2",
      textAlign: "center",
      padding: "28px 0 14px 0",
      marginTop: "48px",
      fontSize: "1rem",
      letterSpacing: ".04em"
    }}>
      <div>
        © {new Date().getFullYear()} H. Furkan Tahtalı · Tüm Hakları Saklıdır.
      </div>
      
    </footer>
  );
}
export default Footer;
