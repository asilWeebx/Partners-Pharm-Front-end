import { useState, useEffect } from 'react';
import { diseasesAPI } from '../services/api';

export default function DiseasesPage() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDisease, setEditingDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const diseasesData = await diseasesAPI.getAll();
      setDiseases(diseasesData.results || diseasesData);
    } catch (error) {
      console.error('Error loading diseases:', error);
      alert('Ma\'lumotlarni yuklashda xatolik!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return;

    try {
      await diseasesAPI.delete(id);
      loadData();
    } catch (error) {
      alert('O\'chirishda xatolik!');
    }
  };

  const handleEdit = (disease) => {
    setEditingDisease(disease);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingDisease(null);
    setShowModal(true);
  };

  const filteredDiseases = diseases.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.title_ru?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.title_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kasalliklar</h1>
          <p className="text-gray-600 mt-1">Kasalliklar va tavsiya etiladigan mahsulotlarni boshqarish</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Yangi kasallik
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Kasallik nomi bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
          </div>
        ) : filteredDiseases.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">Ma'lumot topilmadi</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">№</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nomi (UZ)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nomi (RU)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nomi (EN)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mahsulotlar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tartib</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDiseases.map((disease, index) => (
                  <tr key={disease.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{disease.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{disease.title_ru || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{disease.title_en || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {disease.recommended_products || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                        {disease.order || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(disease)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Tahrirlash"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(disease.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="O'chirish"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <DiseaseModal
          disease={editingDisease}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}

// Disease Modal Component
function DiseaseModal({ disease, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: disease?.title || '',
    title_ru: disease?.title_ru || '',
    title_en: disease?.title_en || '',
    products_label: disease?.products_label || 'Mos keladigan mahsulotlar:',
    products_label_ru: disease?.products_label_ru || 'Рекомендуемые продукты:',
    products_label_en: disease?.products_label_en || 'Recommended products:',
    recommended_products: disease?.recommended_products || '',
    order: disease?.order || 0,
    is_active: disease?.is_active ?? true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (disease) {
        await diseasesAPI.update(disease.id, formData);
      } else {
        await diseasesAPI.create(formData);
      }

      alert('✅ Muvaffaqiyatli saqlandi!');
      onSave();
    } catch (error) {
      console.error('Save error:', error);
      alert('❌ Xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {disease ? 'Kasallikni tahrirlash' : 'Yangi kasallik'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title (UZ/RU/EN) */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomi (UZ) *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Mastopatiya"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomi (RU)</label>
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Мастопатия"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomi (EN)</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Mastopathy"
                />
              </div>
            </div>

            {/* Products Label (UZ/RU/EN) */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mahsulot label (UZ)</label>
                <input
                  type="text"
                  value={formData.products_label}
                  onChange={(e) => setFormData({ ...formData, products_label: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mahsulot label (RU)</label>
                <input
                  type="text"
                  value={formData.products_label_ru}
                  onChange={(e) => setFormData({ ...formData, products_label_ru: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mahsulot label (EN)</label>
                <input
                  type="text"
                  value={formData.products_label_en}
                  onChange={(e) => setFormData({ ...formData, products_label_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tavsiya etiladigan mahsulotlar</label>
              <textarea
                value={formData.recommended_products}
                onChange={(e) => setFormData({ ...formData, recommended_products: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                rows="3"
                placeholder="Betahelp, Product B, Product C..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Vergul bilan ajratilgan</p>
            </div>

            {/* Order & Active */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tartib raqami</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Faol</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}