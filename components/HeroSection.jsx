import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative pt-24 pb-20 bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 animate-fadeInUp">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-100">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-200">
            <a href="#catalog" className="btn-green px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
              {t.hero.viewCatalog}
            </a>
            <a href="#contact" className="btn-green-outline px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
              {t.hero.contact}
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover animate-fadeInUp delay-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-file-alt text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature1Title}</h3>
            <p className="text-gray-600">{t.features.feature1Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover animate-fadeInUp delay-400">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check-circle text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature2Title}</h3>
            <p className="text-gray-600">{t.features.feature2Desc}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover animate-fadeInUp delay-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.features.feature3Title}</h3>
            <p className="text-gray-600">{t.features.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
