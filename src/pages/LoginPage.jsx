import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple demo authentication
      if (username === 'admin' && password === 'partnerspharm1234') {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ username: 'admin' }));
        navigate('/admin/dashboard');
      } else {
        setError('Login yoki parol noto\'g\'ri');
      }
    } catch (err) {
      setError('Login yoki parol noto\'g\'ri');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-2xl shadow-xl mb-4">
            <span className="text-white font-bold text-3xl">G</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Partners Pharm Admin</h1>
          <p className="text-gray-600">Boshqaruv paneliga kirish</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeInUp delay-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-exclamation-circle text-red-600"></i>
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              </div>
            )}

         

            {/* Username */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Login
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Parol
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-green px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Kirish
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              <i className="fas fa-shield-alt mr-1"></i>
              Xavfsiz boshqaruv paneli
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Asosiy sahifaga qaytish
          </a>
        </div>
      </div>
    </div>
  );
}
