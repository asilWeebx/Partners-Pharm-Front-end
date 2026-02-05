import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await axios.get('https://partnerspharm.pythonanywhere.com/api/contacts/');
      setContacts(response.data.results || response.data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      alert('Ma\'lumotlarni yuklashda xatolik!');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/contacts/${id}/`, { is_read: true });
      loadContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Yangilashda xatolik!');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${id}/`);
      loadContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('O\'chirishda xatolik!');
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Xabarlar</h1>
          <p className="text-gray-600 mt-1">
            Jami: {contacts.length} ta xabar 
            {contacts.filter(c => !c.is_read).length > 0 && (
              <span className="ml-2 text-red-600 font-semibold">
                ({contacts.filter(c => !c.is_read).length} ta o'qilmagan)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Ism, telefon yoki email bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
              <p className="text-gray-600 mt-4">Yuklanmoqda...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600">Xabarlar topilmadi</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (!contact.is_read) {
                      handleMarkAsRead(contact.id);
                    }
                  }}
                  className={`p-6 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-green-50'
                      : 'hover:bg-gray-50'
                  } ${!contact.is_read ? 'border-l-4 border-green-500' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {contact.name} {contact.surname}
                        </h3>
                        {!contact.is_read && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                            Yangi
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <i className="fas fa-phone mr-2"></i>
                        {contact.phone}
                      </p>
                      <p className="text-gray-700 line-clamp-2">{contact.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <i className="fas fa-clock mr-1"></i>
                        {formatDate(contact.created_at)}
                      </p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400 ml-4"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedContact ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Xabar tafsilotlari</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    To'liq ism
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedContact.name} {selectedContact.surname}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Telefon raqam
                  </label>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    {selectedContact.phone}
                  </a>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Xabar
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Yuborilgan vaqt
                  </label>
                  <p className="text-gray-600">
                    <i className="fas fa-clock mr-2"></i>
                    {formatDate(selectedContact.created_at)}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Holat
                  </label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedContact.is_read
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <i className={`fas ${selectedContact.is_read ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                    {selectedContact.is_read ? 'O\'qilgan' : 'O\'qilmagan'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t space-y-3">
                {!selectedContact.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(selectedContact.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-check mr-2"></i>
                    O'qilgan deb belgilash
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  <i className="fas fa-trash mr-2"></i>
                  O'chirish
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-hand-pointer text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">
                Ko'rish uchun xabarni tanlang
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}