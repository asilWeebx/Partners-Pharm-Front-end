export default function FoundersSection({ founders }) {
  return (
    <section id="founders" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Asoschilar</h2>
          <p className="text-gray-600">Bizning kompaniyamizni boshqaradigan professional jamoa</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <div 
              key={founder.id}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center card-hover animate-fadeInUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">{founder.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{founder.name}</h3>
              <p className="text-green-600 font-semibold mb-2">{founder.position}</p>
              <p className="text-gray-600 text-sm">{founder.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
