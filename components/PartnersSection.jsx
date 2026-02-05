export default function PartnersSection({ partners }) {
  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hamkorlar</h2>
          <p className="text-gray-600">Ishonchli hamkorlar bilan birgalikda</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center space-y-4 animate-fadeInUp"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              {/* Logo */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-100">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <p className="text-gray-700 font-semibold text-center">{partner.name}</p>
              {/* Link Icon */}
              <i className="fas fa-external-link-alt text-green-600 text-sm"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
