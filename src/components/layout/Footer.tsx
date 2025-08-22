export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0f172a] to-[#131b2d] text-gray-300 py-4 border-t border-gray-700 overflow-hidden">
      <div className="container mx-auto px-4 flex justify-center items-center min-h-[80px]">
        {/* Copyright text with subtle animation - centered */}
        <div className="text-center">
          <p className="text-sm md:text-base transition-all duration-500 hover:text-purple-400 transform hover:scale-105 inline-block">
            © 2025 Alfiansyah Bima. Designed with <span className="text-purple-500 animate-pulse">♥</span> by 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-semibold transition-all duration-300 hover:from-pink-500 hover:to-purple-500"> αzυre project ♪</span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}