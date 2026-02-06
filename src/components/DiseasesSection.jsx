import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { diseasesAPI } from '../services/api';

export default function DiseasesSection({ setShowCallModal }) {
  const { t, language } = useLanguage();
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    loadDiseases();
  }, []);

  const loadDiseases = async () => {
    try {
      const data = await diseasesAPI.getAll();
      setDiseases(data.results || data);
    } catch (error) {
      console.error('Error loading diseases:', error);
      setDiseases([]);
    } finally {
      setLoading(false);
    }
  };

  // Get title based on language
  const getDiseaseTitle = (disease) => {
    if (language === 'RU') return disease.title_ru || disease.title;
    if (language === 'EN') return disease.title_en || disease.title;
    return disease.title;
  };

  // Get products label based on language
  const getProductsLabel = (disease) => {
    if (language === 'RU') return disease.products_label_ru || disease.products_label || 'Рекомендуемые продукты:';
    if (language === 'EN') return disease.products_label_en || disease.products_label || 'Recommended products:';
    return disease.products_label || 'Mos keladigan mahsulotlar:';
  };

  return (
    <section id="diseases" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Banner */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-12">
          <p className="text-gray-700 text-center">{t.diseases.infoBanner}</p>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.diseases.title}
          </h2>
          <p className="text-gray-600">{t.diseases.subtitle}</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
          </div>
        ) : diseases.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-info-circle text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">
              {language === 'RU' ? 'Данные не найдены' : language === 'EN' ? 'No data found' : 'Ma\'lumot topilmadi'}
            </p>
          </div>
        ) : (
          /* Diseases List */
          <div className="space-y-4">
            {diseases.map((disease, index) => (
              <div 
                key={disease.id} 
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden accordion-item animate-fadeInUp" 
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {/* Accordion Header */}
                <button 
                  onClick={() => setOpenAccordion(openAccordion === disease.id ? null : disease.id)} 
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {/* Number Badge */}
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Title - Multilingual */}
                    <h3 className="text-lg font-bold text-gray-900">
                      {getDiseaseTitle(disease)}
                    </h3>
                  </div>
                  
                  {/* Chevron Icon */}
                  <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${
                    openAccordion === disease.id ? 'rotate-180' : ''
                  }`}></i>
                </button>

                {/* Accordion Content */}
                <div className={`accordion-content ${openAccordion === disease.id ? 'active' : ''}`}>
                  <div className="px-6 pb-6 bg-green-50">
                    {/* Products Label - Multilingual */}
                    <p className="text-green-700 font-semibold mb-2">
                      {getProductsLabel(disease)}
                    </p>
                    
                    {/* Recommended Products */}
                    <p className="text-gray-700 mb-4">
                      {disease.recommended_products || (
                        language === 'RU' ? 'Нет данных' : 
                        language === 'EN' ? 'No data' : 
                        'Ma\'lumot yo\'q'
                      )}
                    </p>
                    
                    {/* Call Button */}
                    <button 
                      onClick={() => setShowCallModal(true)} 
                      className="btn-green px-6 py-2.5 rounded-lg font-semibold inline-flex items-center"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      {t.diseases.callButton}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}