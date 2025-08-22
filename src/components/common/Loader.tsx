import React from 'react';
import Image from 'next/image';

const Loader: React.FC = () => {
  return (
    <div id="loader" className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <Image 
        src="/assets/images/media/loader.svg" 
        alt="Loading..." 
        width={64}
        height={64}
        className="w-16 h-16"
      />
    </div>
  );
};

export default Loader;