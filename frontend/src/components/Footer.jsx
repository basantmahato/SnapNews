import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer
      style={{
        textAlign: "center",
        padding: "15px 0",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "14px",
        color: "#555",
        background: "linear-gradient(to right, #f8f9fa, #fff)",
        borderTop: "1px solid #ddd",
        marginTop: "40px"
      }}
    >
      <p style={{ margin: 0 }}>
        Crafted with <span style={{ color: "gray" }}>&#10084;</span> by{" "}
        <span style={{ color: "red", fontWeight: "500" }}>Basant</span>
      </p>
      <small style={{ display: "block", marginTop: "5px", color: "#888" }}>
        © {currentYear} SnapNews. All rights reserved.
      </small>
    </footer>
  );
};

export default Footer;
