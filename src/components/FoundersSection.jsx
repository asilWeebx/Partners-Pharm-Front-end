import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function FoundersSection({ founders }) {
  const { language, t } = useLanguage();
  const [selectedFounder, setSelectedFounder] = useState(null);
  
  const getFounderName = (founder) => {
    if (language === 'RU') return founder.name_ru || founder.name;
    if (language === 'EN') return founder.name_en || founder.name;
    return founder.name;
  };

  const getFounderPosition = (founder) => {
    if (language === 'RU') return founder.position_ru || founder.position;
    if (language === 'EN') return founder.position_en || founder.position;
    return founder.position;
  };

  const getFounderRole = (founder) => {
    if (language === 'RU') return founder.role_ru || founder.role;
    if (language === 'EN') return founder.role_en || founder.role;
    return founder.role;
  };

  const getFounderDescription = (founder) => {
    if (language === 'RU') return founder.description_ru || founder.description;
    if (language === 'EN') return founder.description_en || founder.description;
    return founder.description;
  };

  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section id="founders" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.founders.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.founders.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div 
              key={founder.id}
              className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp overflow-hidden"
              style={{
                animationDelay: `${index * 0.2}s`,
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: '#22c55e'
              }}
            >
              <div className="relative flex flex-col items-center text-center">
                {/* LARGE Image - Screenshot'dagi kabi */}
                <div className="mb-8 overflow-hidden">
                  {founder.image ? (
                    <div className="rounded-15 overflow-hidden ">
                      <img 
                        src={founder.image}
                        alt={getFounderName(founder)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-6xl">
                        {founder.initials || getInitials(getFounderName(founder))}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {getFounderName(founder)}
                </h3>
                
                {/* Position - Green */}
                <p className="text-green-600 font-semibold text-lg mb-2">
                  {getFounderPosition(founder)}
                </p>

                {/* Role - Gray */}
                <p className="text-gray-600 text-base mb-8 font-medium">
                  {getFounderRole(founder)}
                </p>

                {/* Batafsil button */}
                <button 
                  onClick={() => setSelectedFounder(founder)}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-base"
                >
                  {language === 'RU' ? 'Подробнее' : language === 'EN' ? 'Details' : 'Batafsil'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Modal */}
        {selectedFounder && (
          <FounderModal 
            founder={selectedFounder}
            onClose={() => setSelectedFounder(null)}
            language={language}
            getFounderName={getFounderName}
            getFounderPosition={getFounderPosition}
            getFounderRole={getFounderRole}
            getFounderDescription={getFounderDescription}
            getInitials={getInitials}
          />
        )}
      </div>
    </section>
  );
}

// Founder Modal Component
function FounderModal({ founder, onClose, language, getFounderName, getFounderPosition, getFounderRole, getFounderDescription, getInitials }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fadeIn" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-8 border-b">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <i className="fas fa-times text-xl text-gray-600"></i>
            </button>
            
            <div className="flex flex-col items-center space-y-6">
              {/* Large Image */}
              <div className="overflow-hidden">
                {founder.image ? (
                  <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={founder.image}
                      alt={getFounderName(founder)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-7xl">
                      {founder.initials || getInitials(getFounderName(founder))}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {getFounderName(founder)}
                </h2>
                <p className="text-green-600 font-semibold text-xl mb-2">
                  {getFounderPosition(founder)}
                </p>
                <p className="text-gray-600 text-base font-medium">
                  {getFounderRole(founder)}
                </p>
              </div>
            </div>
          </div>

          {/* Body - BIO HERE */}
          <div className="p-8 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                {language === 'RU' ? 'О специалисте' : language === 'EN' ? 'About' : 'Mutaxassis haqida'}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {getFounderDescription(founder)}
              </p>
            </div>

            {/* Experience if available */}
            {founder.experience && (
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  {language === 'RU' ? 'Опыт работы' : language === 'EN' ? 'Experience' : 'Tajriba'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {founder.experience}
                </p>
              </div>
            )}

            {/* Contact Info if available */}
            {(founder.email || founder.phone) && (
              <div className="bg-green-50 border-2 border-green-200 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-green-700 mb-3 uppercase tracking-wide">
                  {language === 'RU' ? 'Контакты' : language === 'EN' ? 'Contact' : 'Aloqa'}
                </h3>
                <div className="space-y-2">
                  {founder.email && (
                    <p className="text-green-800 text-base flex items-center">
                      <i className="fas fa-envelope mr-3"></i>
                      {founder.email}
                    </p>
                  )}
                  {founder.phone && (
                    <p className="text-green-800 text-base flex items-center">
                      <i className="fas fa-phone mr-3"></i>
                      {founder.phone}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-100 transition-colors text-base"
            >
              {language === 'RU' ? 'Закрыть' : language === 'EN' ? 'Close' : 'Yopish'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}