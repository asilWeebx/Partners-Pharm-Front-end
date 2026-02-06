import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DiseasesSection from './components/DiseasesSection';
import CatalogSection from './components/CatalogSection';
import FoundersSection from './components/FoundersSection';
import PartnersSection from './components/PartnersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CallModal from './components/CallModal';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import PartnersPage from './pages/PartnersPage';
import DiseasesPage from './pages/DiseasesPage';  // ← ADD THIS
import ContactsPage from './pages/ContactsPage';
import { mockFounders } from './data/mockData';  // ← REMOVED mockDiseases

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin" replace />;
}

// Public Landing Page
function LandingPage({ showCallModal, setShowCallModal }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isScrolled={isScrolled} setShowCallModal={setShowCallModal} />
      <main className="flex-1">
        <HeroSection />
        {/* REMOVED diseases={mockDiseases} prop */}
        <DiseasesSection setShowCallModal={setShowCallModal} />
        <CatalogSection setShowCallModal={setShowCallModal} />
        <FoundersSection founders={mockFounders} />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
      <CallModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />
    </div>
  );
}

function App() {
  const [showCallModal, setShowCallModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCallModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showCallModal]);

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage showCallModal={showCallModal} setShowCallModal={setShowCallModal} />} />
        
        {/* Admin Login - at /admin */}
        <Route path="/admin" element={<LoginPage />} />
        
        {/* Admin Dashboard Routes - at /admin/* */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
        </Route>

        <Route path="/admin/products" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProductsPage />} />
        </Route>

        <Route path="/admin/partners" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<PartnersPage />} />
        </Route>

        {/* ← ADD DISEASES ROUTE */}
        <Route path="/admin/diseases" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DiseasesPage />} />
        </Route>

        <Route path="/admin/contacts" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ContactsPage />} />
        </Route>

        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;