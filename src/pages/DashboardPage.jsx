import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    partners: 0,
    diseases: 0,  // ← NEW
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, partnersRes, diseasesRes, contactsRes] = await Promise.all([
        axios.get('https://partnerspharm.pythonanywhere.com/api/products/'),
        axios.get('https://partnerspharm.pythonanywhere.com/api/partners/'),
        axios.get('https://partnerspharm.pythonanywhere.com/api/diseases/').catch(() => ({ data: [] })),  // ← NEW (with fallback)
        axios.get('https://partnerspharm.pythonanywhere.com/api/contacts/'),
      ]);

      setStats({
        products: productsRes.data.results?.length || productsRes.data.length || 0,
        partners: partnersRes.data.results?.length || partnersRes.data.length || 0,
        diseases: diseasesRes.data.results?.length || diseasesRes.data.length || 0,  // ← NEW
        contacts: contactsRes.data.results?.length || contactsRes.data.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Mahsulotlar', value: stats.products, icon: 'fa-box', color: 'bg-blue-500', link: '/admin/products' },
    { title: 'Hamkorlar', value: stats.partners, icon: 'fa-handshake', color: 'bg-green-500', link: '/admin/partners' },
    { title: 'Kasalliklar', value: stats.diseases, icon: 'fa-virus', color: 'bg-orange-500', link: '/admin/diseases' },  // ← NEW
    { title: 'Xabarlar', value: stats.contacts, icon: 'fa-envelope', color: 'bg-purple-500', link: '/admin/contacts' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Boshqaruv paneli umumiy ko'rinishi</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-green px-6 py-3 rounded-lg font-semibold flex items-center">
          <i className="fas fa-external-link-alt mr-2"></i>Saytni ko'rish
        </a>
      </div>

      {/* Stats Cards - 4 columns now */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <a key={index} href={card.link} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-2">{card.title}</p>
                <p className="text-4xl font-bold text-gray-900">{loading ? <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i> : card.value}</p>
              </div>
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <i className={`fas ${card.icon} text-white text-2xl`}></i>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions - 4 columns now */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tez harakatlar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/products" className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all">
            <i className="fas fa-plus-circle text-green-600 text-2xl"></i>
            <span className="font-semibold text-gray-900">Mahsulot qo'shish</span>
          </a>
          <a href="/admin/partners" className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all">
            <i className="fas fa-plus-circle text-green-600 text-2xl"></i>
            <span className="font-semibold text-gray-900">Hamkor qo'shish</span>
          </a>
          <a href="/admin/diseases" className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all">
            <i className="fas fa-plus-circle text-orange-600 text-2xl"></i>
            <span className="font-semibold text-gray-900">Kasallik qo'shish</span>
          </a>
          <a href="/" target="_blank" className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all">
            <i className="fas fa-eye text-blue-600 text-2xl"></i>
            <span className="font-semibold text-gray-900">Saytni ko'rish</span>
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <button onClick={() => setShowGuideModal(true)} className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all text-left">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <i className="fas fa-info-circle text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Qo'llanma</h3>
              <p className="text-green-100">Admin panel ishlatish bo'yicha qo'llanma</p>
            </div>
          </div>
        </button>

        <a href="mailto:asilweb9999@icloud.com" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <i className="fas fa-headset text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Yordam</h3>
              <p className="text-blue-100">Texnik yordam va qo'llab-quvvatlash</p>
            </div>
          </div>
        </a>
      </div>

      {/* Guide Modal */}
      {showGuideModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowGuideModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">📚 Admin Panel Qo'llanma</h2>
                <button onClick={() => setShowGuideModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <i className="fas fa-times text-xl text-gray-500"></i>
                </button>
              </div>

              <div className="space-y-8">
                {/* Mahsulotlar */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-box text-white text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mahsulotlar</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Yangi mahsulot:</strong> "Yangi mahsulot" tugmasini bosing</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>3 tilda:</strong> O'zbekcha, Ruscha, Inglizcha - HAMMA maydonlarni to'ldiring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Ombor holati:</strong> "Mavjud" yoki "Tez orada" belgilang</span>
                    </li>
                  </ul>
                </div>

                {/* Hamkorlar */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-handshake text-white text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Hamkorlar</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Yangi hamkor:</strong> Hamkor nomini kiriting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Website:</strong> Hamkor veb-saytini kiriting</span>
                    </li>
                  </ul>
                </div>

                {/* Kasalliklar - NEW */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-virus text-white text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Kasalliklar</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Yangi kasallik:</strong> Kasallik nomini 3 tilda kiriting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Mahsulotlar:</strong> Tavsiya etiladigan mahsulotlarni kiriting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Tartib:</strong> Ko'rsatish tartibini belgilang</span>
                    </li>
                  </ul>
                </div>

                {/* Xabarlar */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Xabarlar</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Yangi xabarlar:</strong> "Yangi" badge bilan ko'rsatiladi</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-green-600 mt-1"></i>
                      <span><strong>Ko'rish:</strong> Xabarga click qiling</span>
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <i className="fas fa-lightbulb text-yellow-600 text-2xl"></i>
                    <h3 className="text-xl font-bold text-gray-900">Foydali maslahatlar</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-star text-yellow-500 mt-1"></i>
                      <span>Barcha ma'lumotlarni <strong>3 tilda</strong> to'ldiring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-star text-yellow-500 mt-1"></i>
                      <span>Xabarlarni <strong>muntazam</strong> tekshiring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <i className="fas fa-star text-yellow-500 mt-1"></i>
                      <span>Tartib raqamlaridan foydalanib <strong>ko'rinishni</strong> nazorat qiling</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={() => setShowGuideModal(false)} className="btn-green px-8 py-3 rounded-lg font-semibold">
                  <i className="fas fa-check mr-2"></i>Tushunarli
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}