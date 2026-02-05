import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function CatalogSection({ setShowCallModal }) {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data.results || data);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (product) => {
    if (language === 'RU') return product.name_ru || product.name;
    if (language === 'EN') return product.name_en || product.name;
    return product.name;
  };

  const getProductDescription = (product) => {
    if (language === 'RU') return product.description_ru || product.description;
    if (language === 'EN') return product.description_en || product.description;
    return product.description;
  };

  const getCodeLetter = (code) => {
    const match = code.match(/[A-Z]\d+/);
    return match ? match[0] : code.substring(0, 2).toUpperCase();
  };

  const filteredProducts = products.filter(product => {
    const name = getProductName(product);
    const code = product.code;
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return getProductName(a).localeCompare(getProductName(b));
    } else if (sortBy === 'code') {
      return a.code.localeCompare(b.code);
    }
    return 0;
  });

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.catalog.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder={t.catalog.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white transition-colors"
          >
            <option value="default">{t.catalog.sortDefault}</option>
            <option value="name">{t.catalog.sortName}</option>
            <option value="code">{t.catalog.sortCode}</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
              <p className="text-gray-600">
                {language === 'RU' ? 'Загрузка...' : language === 'EN' ? 'Loading...' : 'Yuklanmoqda...'}
              </p>
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">
              {language === 'RU' ? 'Продукты не найдены' : language === 'EN' ? 'No products found' : 'Mahsulotlar topilmadi'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp relative cursor-pointer group"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {/* Stock Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.coming_soon 
                      ? 'bg-blue-100 text-blue-800' 
                      : product.in_stock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.coming_soon 
                      ? (language === 'RU' ? 'Скоро' : language === 'EN' ? 'Soon' : 'Tez orada')
                      : product.in_stock
                      ? (language === 'RU' ? 'В наличии' : language === 'EN' ? 'In Stock' : 'Mavjud')
                      : (language === 'RU' ? 'Нет' : language === 'EN' ? 'Out' : 'Mavjud emas')
                    }
                  </span>
                </div>

                {/* Product Image */}
                <div className="flex justify-center mb-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={getProductName(product)}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-green-100 group-hover:ring-green-200 transition-all"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <span className="text-white font-bold text-2xl">
                        {getCodeLetter(product.code)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {getProductName(product)}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 text-center line-clamp-2">
                  {getProductDescription(product)}
                </p>

                <div className="text-center mb-4">
                  <span className="text-xs text-gray-500">Code: </span>
                  <span className="text-sm font-mono font-semibold text-green-600">
                    {product.code}
                  </span>
                </div>

                {/* Call Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCallModal(true);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-phone mr-2"></i>
                  {language === 'RU' ? 'Позвонить' : language === 'EN' ? 'Call for details' : 'Batafsil uchun qo\'ng\'iroq qiling'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            setShowCallModal={setShowCallModal}
            language={language}
            getProductName={getProductName}
            getProductDescription={getProductDescription}
            getCodeLetter={getCodeLetter}
          />
        )}
      </div>
    </section>
  );
}

// Product Modal Component
function ProductModal({ product, onClose, setShowCallModal, language, getProductName, getProductDescription, getCodeLetter }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fadeIn" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <i className="fas fa-times text-xl text-gray-600"></i>
            </button>
            
            <div className="flex flex-col items-center space-y-4">
              {product.image ? (
                <img 
                  src={product.image}
                  alt={getProductName(product)}
                  className="w-48 h-48 rounded-2xl object-cover ring-4 ring-green-100 shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-6xl">
                    {getCodeLetter(product.code)}
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {getProductName(product)}
                </h2>
                <div className="flex items-center justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    product.coming_soon 
                      ? 'bg-blue-100 text-blue-800' 
                      : product.in_stock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.coming_soon 
                      ? (language === 'RU' ? 'Скоро в продаже' : language === 'EN' ? 'Coming Soon' : 'Tez orada')
                      : product.in_stock
                      ? (language === 'RU' ? 'В наличии' : language === 'EN' ? 'In Stock' : 'Mavjud')
                      : (language === 'RU' ? 'Нет в наличии' : language === 'EN' ? 'Out of Stock' : 'Mavjud emas')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
                {language === 'RU' ? 'Описание' : language === 'EN' ? 'Description' : 'Tavsif'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getProductDescription(product)}
              </p>
            </div>

            {/* Code */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                {language === 'RU' ? 'Код продукта' : language === 'EN' ? 'Product Code' : 'Mahsulot kodi'}
              </h3>
              <p className="text-green-600 font-mono font-bold text-lg">
                {product.code}
              </p>
            </div>

            {/* Price Note */}
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-green-700 mb-1">
                {language === 'RU' ? 'Информация о ценах' : language === 'EN' ? 'Price Information' : 'Ma\'lumot'}
              </h3>
              <p className="text-green-800 text-sm">
                {language === 'RU' 
                  ? 'Точная цена и наличие уточняется при звонке' 
                  : language === 'EN'
                  ? 'Exact price and availability confirmed by call'
                  : 'Aniq narx va mavjudlik uchun qo\'ng\'iroq qiling'
                }
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setShowCallModal(true);
                onClose();
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <i className="fas fa-phone mr-2"></i>
              {language === 'RU' ? 'Позвонить' : language === 'EN' ? 'Call Now' : 'Qo\'ng\'iroq qilish'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-100 transition-colors"
            >
              {language === 'RU' ? 'Закрыть' : language === 'EN' ? 'Close' : 'Yopish'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}