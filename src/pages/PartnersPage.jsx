import { useState, useEffect } from 'react';
import { partnersAPI } from '../services/api';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const partnersData = await partnersAPI.getAll();
      setPartners(partnersData.results || partnersData);
    } catch (error) {
     console.error('Partner save error:', error);
  alert('Xatolik yuz berdi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return;

    try {
      await partnersAPI.delete(id);
      loadData();
    } catch (error) {
      alert('O\'chirishda xatolik!');
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPartner(null);
    setShowModal(true);
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hamkorlar</h1>
          <p className="text-gray-600 mt-1">Barcha hamkorlarni boshqarish</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-green px-6 py-3 rounded-lg font-semibold flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Yangi hamkor
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Hamkor qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
            <p className="text-gray-600 mt-4">Yuklanmoqda...</p>
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fas fa-handshake text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">Hamkorlar topilmadi</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Logo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nomi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Website</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Holat</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <i className="fas fa-building text-gray-400"></i>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{partner.name}</td>
                    <td className="px-6 py-4">
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {partner.website}
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        partner.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {partner.is_active ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(partner)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Tahrirlash"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
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
        <PartnerModal
          partner={editingPartner}
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

function PartnerModal({ partner, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    website: partner?.website || '',
    is_active: partner?.is_active ?? true,
  });
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const data = new FormData();
  data.append('name', formData.name);
  data.append('website', formData.website);
  data.append('is_active', formData.is_active ? 'true' : 'false');  // 
      if (logoFile) {
        data.append('logo', logoFile);
      }

      if (partner) {
        await partnersAPI.update(partner.id, data);
      } else {
        await partnersAPI.create(data);
      }

      onSave();
    } catch (error) {
      alert('Xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {partner ? 'Hamkorni tahrirlash' : 'Yangi hamkor'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nomi</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Partner Company"
                required
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="https://example.com"
                required
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
              />
              {partner?.logo && (
                <img src={partner.logo} alt="Current" className="mt-2 w-32 h-32 object-cover rounded-lg" />
              )}
            </div>

            {/* Active */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5"
                id="is_active"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Faol</label>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-green px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
