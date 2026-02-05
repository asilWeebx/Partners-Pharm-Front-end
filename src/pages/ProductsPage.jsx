import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await productsAPI.getAll();
      setProducts(productsData.results || productsData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Ma\'lumotlarni yuklashda xatolik!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return;
    try {
      await productsAPI.delete(id);
      loadData();
    } catch (error) {
      alert('O\'chirishda xatolik!');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mahsulotlar</h1>
          <p className="text-gray-600 mt-1">Barcha mahsulotlarni boshqarish</p>
        </div>
        <button onClick={handleAdd} className="btn-green px-6 py-3 rounded-lg font-semibold flex items-center">
          <i className="fas fa-plus mr-2"></i>Yangi mahsulot
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Mahsulot qidirish..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
            <p className="text-gray-600 mt-4">Yuklanmoqda...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">Mahsulotlar topilmadi</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rasm</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kod</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nomi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tavsif</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ombor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Holat</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <i className="fas fa-image text-gray-400"></i>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">{product.code}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{product.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.coming_soon ? 'bg-blue-100 text-blue-800' :
                        product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.coming_soon ? 'Tez orada' : product.in_stock ? 'Mavjud' : 'Tugagan'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.is_active ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Tahrirlash">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="O'chirish">
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

      {showModal && (
        <ProductModal product={editingProduct} onClose={() => setShowModal(false)} onSave={() => { setShowModal(false); loadData(); }} />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    code: product?.code || '',
    name: product?.name || '',
    name_ru: product?.name_ru || '',
    name_en: product?.name_en || '',
    description: product?.description || '',
    description_ru: product?.description_ru || '',
    description_en: product?.description_en || '',
    in_stock: product?.in_stock ?? true,
    coming_soon: product?.coming_soon ?? false,
    is_active: product?.is_active ?? true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('code', formData.code);
      data.append('name', formData.name);
      data.append('name_ru', formData.name_ru);
      data.append('name_en', formData.name_en);
      data.append('description', formData.description);
      data.append('description_ru', formData.description_ru);
      data.append('description_en', formData.description_en);
      data.append('in_stock', formData.in_stock);
      data.append('coming_soon', formData.coming_soon);
      data.append('is_active', formData.is_active);
      if (imageFile) data.append('image', imageFile);
      
      if (product) {
        await productsAPI.update(product.id, data);
      } else {
        await productsAPI.create(data);
      }
      onSave();
    } catch (error) {
      console.error('Error:', error);
      alert('Xatolik yuz berdi! ' + (error.response?.data?.detail || error.message));
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
            <h2 className="text-2xl font-bold text-gray-900">{product ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><i className="fas fa-times text-xl"></i></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kod <span className="text-red-500">*</span></label>
              <input type="text" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" placeholder="SKU-A1-001" required />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-gray-900">Nomi (3 tilda)</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/uz.png" alt="UZ" className="w-5" />O'zbekcha</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" placeholder="Mahsulot nomi" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/ru.png" alt="RU" className="w-5" />Русский</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text" value={formData.name_ru} onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" placeholder="Название продукта" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5" />English</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" placeholder="Product name" required />
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-gray-900">Tavsif (3 tilda)</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/uz.png" alt="UZ" className="w-5" />O'zbekcha</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" rows="3" placeholder="Mahsulot haqida ma'lumot" required></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/ru.png" alt="RU" className="w-5" />Русский</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea value={formData.description_ru} onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" rows="3" placeholder="Информация о продукте" required></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5" />English</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" rows="3" placeholder="Product description" required></textarea>
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rasm {!product && <span className="text-gray-500">(ixtiyoriy)</span>}
              </label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg" />
              {product?.image && !imageFile && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Joriy rasm:</p>
                  <img src={product.image} alt="Current" className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200" />
                </div>
              )}
            </div>

            <div className="border-t pt-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Mahsulot holati</h3>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.in_stock} onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })} className="w-5 h-5 text-green-600" id="in_stock" />
                <label htmlFor="in_stock" className="text-sm font-medium text-gray-700">✅ Mavjud (omborda bor)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.coming_soon} onChange={(e) => setFormData({ ...formData, coming_soon: e.target.checked })} className="w-5 h-5 text-blue-600" id="coming_soon" />
                <label htmlFor="coming_soon" className="text-sm font-medium text-gray-700">🔵 Tez orada (kutilmoqda)</label>
              </div>
              <p className="text-xs text-gray-500 mt-2">💡 Agar ikkalasi ham belgilanmasa - "Tugagan" ko'rsatiladi</p>
            </div>

            <div className="flex items-center space-x-2 border-t pt-4">
              <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 text-green-600" id="is_active" />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Faol (saytda ko'rinadi)</label>
            </div>

            <div className="flex space-x-4 pt-4 border-t">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">Bekor qilish</button>
              <button type="submit" disabled={loading} className="flex-1 btn-green px-6 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center">
                {loading ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Saqlanmoqda...</>) : (<><i className="fas fa-save mr-2"></i>Saqlash</>)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}