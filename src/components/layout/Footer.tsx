import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-white text-center">
      <div className="container">
        <span>
          Copyright © <span id="year">{currentYear}</span>{' '}
          <a href="javascript:void(0);" className="text-primary">Bima</a>.
          Designed with <span className="bi bi-heart-fill text-danger"></span> by{' '}
          <a href="javascript:void(0);">
            <span className="fw-semibold text-decoration-underline"></span>
          </a>{' '}
          All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;