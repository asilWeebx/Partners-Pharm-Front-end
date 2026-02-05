import { useLanguage } from '../context/LanguageContext';

export default function CallModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn" onClick={onClose}></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scaleIn relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <i className="fas fa-times text-gray-600"></i>
          </button>

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-phone text-green-600 text-3xl"></i>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{t.callModal.title}</h2>
          <p className="text-gray-600 text-center mb-6">{t.callModal.description}</p>

          <div className="bg-green-50 rounded-2xl p-6 mb-6 text-center">
            <p className="text-green-600 font-semibold text-sm mb-2">{t.callModal.phoneLabel}</p>
            <a href="tel:+998909513434" className="text-3xl font-bold text-gray-800 hover:text-green-600 transition-colors">
              +998 90 951 34 34
            </a><br />
            <a href="tel:+998941100105" className="text-3xl font-bold text-gray-800 hover:text-green-600 transition-colors">
              +998 94 110 01 05
            </a>
            
          </div>

          <a href="tel:+998909513434" className="w-full btn-green px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center">
            <i className="fas fa-phone mr-2"></i>
            {t.callModal.callButton}
          </a>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-green-600"></i>
                <span>partnerspharm1@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}