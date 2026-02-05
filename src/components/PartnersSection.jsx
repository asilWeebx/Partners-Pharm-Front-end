import { useState, useEffect } from 'react';
import { partnersAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function PartnersSection() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await partnersAPI.getAll();
      setPartners(data.results || data);
    } catch (error) {
      console.error('Error loading partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.partners.title}</h2>
          <p className="text-gray-600">{t.partners.subtitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
              <p className="text-gray-600">Yuklanmoqda...</p>
            </div>
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-handshake text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">Hamkorlar topilmadi</p>
            <p className="text-gray-500 text-sm mt-2">Backend ishga tushirilganiga ishonch hosil qiling</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center space-y-4 animate-fadeInUp"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {/* Logo */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-100">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-building text-gray-400 text-2xl"></i>
                    </div>
                  )}
                </div>
                {/* Name */}
                <p className="text-gray-700 font-semibold text-center">{partner.name}</p>
                {/* Link Icon */}
                <i className="fas fa-external-link-alt text-green-600 text-sm"></i>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}