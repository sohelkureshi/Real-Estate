import React from 'react';
import '../style/footer.css';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">EstateEase</span>
          <span className="footer-tagline">Your trusted real estate partner</span>
          <span className="footer-allrights">© {new Date().getFullYear()} EstateEase. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
