export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-green-500 to-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8">+998 90 123 45 67</h2>
        <a href="tel:+998901234567" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center hover:bg-gray-100 transition-colors mb-12">
          <i className="fas fa-phone mr-2"></i>
          Qo'ng'iroq qilish
        </a>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
            <i className="fas fa-envelope text-3xl mb-4"></i>
            <h3 className="font-bold text-lg mb-2">Elektron pochta:</h3>
            <p>info@greenline.uz</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
            <i className="fas fa-map-marker-alt text-3xl mb-4"></i>
            <h3 className="font-bold text-lg mb-2">Manzil:</h3>
            <p>Toshkent, O'zbekiston</p>
          </div>
        </div>
      </div>
    </section>
  );
}
