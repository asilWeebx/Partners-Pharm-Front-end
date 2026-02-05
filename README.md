# GreenLine Landing Page

Professional landing page uchun React + Vite + Tailwind CSS bilan yaratilgan.

## 🚀 Features

- ✅ React 18 + Vite
- ✅ Tailwind CSS (Production-ready)
- ✅ Fully Responsive Design
- ✅ Smooth Animations
- ✅ Component-based Architecture
- ✅ Mock Data (Backend integratsiya uchun tayyor)

## 📦 Installation

```bash
# Dependencies ni o'rnatish
npm install

# Development server ni ishga tushirish
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## 📁 Project Structure

```
greenline-project/
├── src/
│   ├── components/          # React komponentlar
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── DiseasesSection.jsx
│   │   ├── CatalogSection.jsx
│   │   ├── FoundersSection.jsx
│   │   ├── PartnersSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── mockData.js      # Mock data (API uchun tayyor)
│   ├── styles/
│   │   └── index.css        # Tailwind CSS
│   ├── App.jsx              # Main component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Sections

1. **Navbar** - Logo, Navigation, Language switcher
2. **Hero Section** - Main title va features
3. **Diseases Section** - Accordion bilan kasalliklar ro'yxati
4. **Catalog Section** - Mahsulotlar grid + search + filter
5. **Founders Section** - Jamoa a'zolari
6. **Partners Section** - Hamkorlar
7. **Contact Section** - Contact information
8. **Footer** - Footer links

## 🔌 Backend Integration

Mock data `src/data/mockData.js` faylida. API integratsiya uchun:

```javascript
// axios yordamida
import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

// Katalog olish
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`);
  return response.data;
};

// Hamkorlar olish
const getPartners = async () => {
  const response = await axios.get(`${API_URL}/partners/`);
  return response.data;
};
```

## 🌐 Production Build

```bash
npm run build
```

Build fayllar `dist/` papkasida bo'ladi.

## 📝 Notes

- Tailwind CSS to'liq configured (no CDN warning!)
- Responsive design (mobile, tablet, desktop)
- Production-ready code
- Easy to integrate with Django REST API

## 🛠️ Tech Stack

- **React** 18.2.0
- **Vite** 5.0.8
- **Tailwind CSS** 3.3.6
- **Axios** 1.6.0 (API calls uchun)

---

Made with ❤️ by Asilbek
