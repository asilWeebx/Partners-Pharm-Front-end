import { useState } from 'react';

export default function CatalogSection({ products, setShowCallModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Katalog</h2>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="product b2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Saralash:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
            >
              <option value="default">Tanlangan</option>
              <option value="name">Nomi bo'yicha</option>
              <option value="code">Kodi bo'yicha</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl p-6 shadow-lg card-hover animate-fadeInUp"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-2xl">{product.category}{product.id}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{product.name}</h3>
              <p className="text-gray-600 mb-2 text-center">{product.description}</p>
              <p className="text-gray-500 text-sm mb-4 text-center">Code: {product.code}</p>
              <button 
                onClick={() => setShowCallModal(true)}
                className="w-full btn-green px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
              >
                <i className="fas fa-info-circle mr-2"></i>
                Batafsil uchun qo'ng'iroq qiling
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
