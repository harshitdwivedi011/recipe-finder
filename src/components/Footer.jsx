import React from 'react';
import "../Style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://github.com/harshitdwivedi011" target="_blank" rel="noopener noreferrer">Github Profile</a>
          <span>For inquiries, please contact us at: 
          <a href="mailto:harshit110900@gmail.com">Email</a></span>
        </div>
        <div className="footer-info">
          <p>© 2025 Recipe Finder. All rights reserved.</p>
          <p>App Version 1.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
