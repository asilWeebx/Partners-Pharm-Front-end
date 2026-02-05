import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ isScrolled, setShowCallModal }) {
  const { language, setLanguage: changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'UZ', label: 'O\'zbekcha' },
    { code: 'RU', label: 'Русский' },
    { code: 'EN', label: 'English' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking nav links
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'navbar-shadow' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img className="w-100% h-10 rounded-full" src="images/logo/logo.jpg" alt="" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.home}</a>
            <a href="#diseases" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.diseases}</a>
            <a href="#catalog" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.catalog}</a>
            <a href="#founders" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.founders}</a>
            <a href="#partners" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.partners}</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.about}</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t.nav.contact}</a>
          </div>

          {/* Desktop: Language Dropdown & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-green-500 transition-all bg-white"
                aria-label="Select language"
              >
                <span className="font-semibold text-gray-700 text-sm">{language}</span>
                <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {langDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[160px] py-1 animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-green-50 transition-colors text-sm ${
                        language === lang.code ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Call Button */}
            <button 
              onClick={() => setShowCallModal(true)}
              className="btn-green px-5 py-2.5 rounded-lg font-semibold flex items-center text-sm whitespace-nowrap"
            >
              <i className="fas fa-phone mr-2"></i>
              {t.nav.call}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl text-gray-700`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            <a 
              href="#home" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.home}
            </a>
            <a 
              href="#diseases" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.diseases}
            </a>
            <a 
              href="#catalog" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.catalog}
            </a>
            <a 
              href="#founders" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.founders}
            </a>
            <a 
              href="#partners" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.partners}
            </a>
            <a 
              href="#about" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.about}
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick}
              className="block text-gray-700 hover:text-green-600 hover:bg-green-50 py-3 px-3 rounded-lg font-medium transition-colors"
            >
              {t.nav.contact}
            </a>

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 px-3">TIL / ЯЗЫК / LANGUAGE</p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Call Button */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  setShowCallModal(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-green px-6 py-3 rounded-lg font-semibold flex items-center justify-center w-full"
              >
                <i className="fas fa-phone mr-2"></i>
                {t.nav.call}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
