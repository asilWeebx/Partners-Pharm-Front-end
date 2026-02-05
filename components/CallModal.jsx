export default function CallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scaleIn relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>

          {/* Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-phone text-green-600 text-3xl"></i>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Qo'ng'iroq qilish
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-6">
            Savollar va ma'lumotlarni aniqlashtiirish uchun qo'ng'iroq qiling.
          </p>

          {/* Phone Number */}
          <div className="bg-green-50 rounded-2xl p-6 mb-6 text-center">
            <p className="text-green-600 font-semibold text-sm mb-2">Telefon raqam</p>
            <a 
              href="tel:+998901234567"
              className="text-3xl font-bold text-gray-900 hover:text-green-600 transition-colors"
            >
              +998 90 123 45 67
            </a>
          </div>

          {/* Call Button */}
          <a
            href="tel:+998901234567"
            className="w-full btn-green px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center"
          >
            <i className="fas fa-phone mr-2"></i>
            Qo'ng'iroq qilish
          </a>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-green-600"></i>
                <span>info@greenline.uz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
