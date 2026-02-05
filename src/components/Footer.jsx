export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-bold text-xl">GreenLine</span>
            </div>
            <p className="text-gray-400">Ishonchli hamkoringiz</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-green-400 transition-colors">Bosh sahifa</a></li>
              <li><a href="#catalog" className="text-gray-400 hover:text-green-400 transition-colors">Katalog</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-green-400 transition-colors">Biz haqimizda</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">Aloqa</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Aloqa</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-green-400"></i>
                +998 90 123 45 67
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-green-400"></i>
                info@greenline.uz
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2026 GreenLine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
