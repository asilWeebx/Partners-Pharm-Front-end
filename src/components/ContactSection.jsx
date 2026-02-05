import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

export default function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://partnerspharm.pythonanywhere.com/api/contacts/', formData);
      setSubmitted(true);
      setFormData({ name: '', surname: '', phone: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Xatolik yuz berdi! Qaytadan urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getText = (key) => {
    const texts = {
      title: { UZ: "Bog'lanish", RU: "Связаться", EN: "Contact" },
      subtitle: { UZ: "Savollar va ma'lumotlarni aniqlashtirishuchun qo'ng'iroq qiling.", RU: "Вопросы и информацию можно уточнить, позвонив нам.", EN: "Questions and information can be clarified by calling us." },
      name: { UZ: "Ism", RU: "Имя", EN: "First Name" },
      surname: { UZ: "Familiya", RU: "Фамилия", EN: "Last Name" },
      phone: { UZ: "Telefon raqam", RU: "Номер телефона", EN: "Phone Number" },
      message: { UZ: "Xabar", RU: "Сообщение", EN: "Message" },
      submit: { UZ: "Yuborish", RU: "Отправить", EN: "Send" },
      sending: { UZ: "Yuborilmoqda...", RU: "Отправка...", EN: "Sending..." },
      success: { UZ: "✅ Xabaringiz yuborildi!", RU: "✅ Ваше сообщение отправлено!", EN: "✅ Message sent successfully!" },
      email: { UZ: "Elektron pochta:", RU: "Электронная почта:", EN: "Email:" },
      call: { UZ: "Qo'ng'iroq qilish", RU: "Позвонить", EN: "Call" }
    };
    return texts[key]?.[language] || texts[key]?.UZ || '';
  };

  return (
    <section id="contact" className="py-20 bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {getText('title')}
          </h2>
          <p className="text-lg text-green-50 max-w-2xl mx-auto">
            {getText('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getText('name')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    placeholder={getText('name')} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getText('surname')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="surname" 
                    value={formData.surname} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    placeholder={getText('surname')} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {getText('phone')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="+998 90 123 45 67" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {getText('message')} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 resize-none transition-colors"
                  placeholder={getText('message')}
                ></textarea>
              </div>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-500 text-green-800 px-4 py-3 rounded-lg animate-fadeIn">
                  {getText('success')}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {getText('sending')}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    {getText('submit')}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Phone Numbers Card */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center mb-6">
              <a href="tel:+998909513434" className="block text-3xl sm:text-4xl font-bold text-white mb-4 hover:text-green-100 transition-colors">
                +998 90 951 34 34
              </a>
              <a href="tel:+998941100105" className="block text-3xl sm:text-4xl font-bold text-white hover:text-green-100 transition-colors">
                +998 94 110 01 05
              </a>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-envelope text-white text-2xl"></i>
                <div className="text-left">
                  <p className="text-sm text-green-100">
                    {getText('email')}
                  </p>
                  <a href="mailto:partnerspharm1@gmail.com" className="text-white font-semibold hover:text-green-100 transition-colors">
                    partnerspharm1@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="tel:+998909513434"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-phone"></i>
            <span>{getText('call')}</span>
          </a>
          
          <a 
            href="https://t.me/partnerspharm" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-2"
          >
            <i className="fab fa-telegram"></i>
            <span>Telegram</span>
          </a>
          
          <a 
            href="https://instagram.com/partnerspharm" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-2"
          >
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}