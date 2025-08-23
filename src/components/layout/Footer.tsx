// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <span className="text-sm">
          Copyright © {currentYear}{' '}
          <a href="#" className="text-blue-300 hover:text-blue-400">Bima</a>.
          Designed with ❤️ by{' '}
          <a href="#" className="text-blue-300 hover:text-blue-400">
             αzυre project ♪
          </a>{' '}
          All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;