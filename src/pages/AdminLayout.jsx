import { useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin');
  };

  const menuItems = [
    { icon: 'fa-home', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: 'fa-box', label: 'Mahsulotlar', path: '/admin/products' },
    { icon: 'fa-handshake', label: 'Hamkorlar', path: '/admin/partners' },
    { icon: 'fa-virus', label: 'Kasalliklar', path: '/admin/diseases' },  // ← ADD THIS
    { icon: 'fa-envelope', label: 'Xabarlar', path: '/admin/contacts' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-bold text-lg">Partners Pharm</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">G</span>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <i className={`fas ${item.icon} text-xl`}></i>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full"
          >
            <i className="fas fa-sign-out-alt text-xl"></i>
            {sidebarOpen && <span className="font-medium">Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Toggle Sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-bars text-xl text-gray-700"></i>
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user?.username || 'Admin'}</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}