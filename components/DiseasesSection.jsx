import { useState } from 'react';

export default function DiseasesSection({ diseases, setShowCallModal }) {
  const [openAccordion, setOpenAccordion] = useState(1);

  return (
    <section id="diseases" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Banner */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-12">
          <p className="text-gray-700 text-center">
            Faqat ma'lumot uchun. Mavjudlik va tafsilotlar o'zgarishi mumkin. Aniqlashtirishuchun biz bilan bog'laning.
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kasalliklar bo'yicha ma'lumotnoma
          </h2>
          <p className="text-gray-600">
            Umumiy kasalliklar va mos keladigan mahsulotlar ro'yxati (faqat ma'lumot uchun)
          </p>
        </div>

        <div className="space-y-4">
          {diseases.map((disease, index) => (
            <div 
              key={disease.id}
              className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden accordion-item animate-fadeInUp"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === disease.id ? null : disease.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">{disease.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{disease.title}</h3>
                </div>
                <i className={`fas fa-chevron-${openAccordion === disease.id ? 'up' : 'down'} text-gray-400 transition-transform`}></i>
              </button>
              <div className={`accordion-content ${openAccordion === disease.id ? 'active' : ''}`}>
                <div className="px-6 pb-6 bg-green-50">
                  <p className="text-green-700 font-semibold mb-2">Mos keladigan mahsulotlar:</p>
                  <p className="text-gray-700 mb-4">{disease.products}</p>
                  <button 
                    onClick={() => setShowCallModal(true)}
                    className="btn-green px-6 py-2.5 rounded-lg font-semibold inline-flex items-center"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Batafsil uchun qo'ng'iroq qiling
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
