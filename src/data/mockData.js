// Mock data for diseases/categories - Multilingual
export const mockDiseases = {
  UZ: [
    { id: 1, title: "Shamollash va gripp", products: "Paracetamol, Ibuprofen, Vitamin C, Throat lozenges, Nasal spray (saline)" },
    { id: 2, title: "Allergiya", products: "Antihistaminlar, Nazal spreylar, Ko'z tomchilari" },
    { id: 3, title: "Bosh og'rig'i", products: "Paracetamol, Ibuprofen, Aspirin" },
    { id: 4, title: "Oshqozon muammolari", products: "Antatsidlar, Probiotiklar, Laksativlar" },
    { id: 5, title: "Teri muammolari", products: "Antiseptiklar, Kremlar, Malhamlar" },
    { id: 6, title: "Yara davolash", products: "Antiseptiklar, Markazlar, Plastirlar" },
    { id: 7, title: "Yurak-qon tomir", products: "Bosim dorilar, Aspirinlar" },
    { id: 8, title: "Diabet", products: "Glyukometrlar, Insulin, Test striplari" },
    { id: 9, title: "Tish og'rig'i", products: "Og'riq qoldiruvchilar, Antiseptik gargara" },
    { id: 10, title: "Vitaminlar va minerallar", products: "Multivitaminlar, Vitamin D, Omega-3, Kaltsiy" }
  ],
  RU: [
    { id: 1, title: "Простуда и грипп", products: "Парацетамол, Ибупрофен, Витамин С, Леденцы от горла, Назальный спрей (солевой)" },
    { id: 2, title: "Аллергия", products: "Антигистаминные, Назальные спреи, Глазные капли" },
    { id: 3, title: "Головная боль", products: "Парацетамол, Ибупрофен, Аспирин" },
    { id: 4, title: "Проблемы с желудком", products: "Антациды, Пробиотики, Слабительные" },
    { id: 5, title: "Проблемы с кожей", products: "Антисептики, Кремы, Мази" },
    { id: 6, title: "Лечение ран", products: "Антисептики, Бинты, Пластыри" },
    { id: 7, title: "Сердечно-сосудистые", products: "Препараты от давления, Аспирины" },
    { id: 8, title: "Диабет", products: "Глюкометры, Инсулин, Тест-полоски" },
    { id: 9, title: "Зубная боль", products: "Обезболивающие, Антисептический ополаскиватель" },
    { id: 10, title: "Витамины и минералы", products: "Мультивитамины, Витамин D, Омега-3, Кальций" }
  ],
  EN: [
    { id: 1, title: "Cold and Flu", products: "Paracetamol, Ibuprofen, Vitamin C, Throat lozenges, Nasal spray (saline)" },
    { id: 2, title: "Allergies", products: "Antihistamines, Nasal sprays, Eye drops" },
    { id: 3, title: "Headache", products: "Paracetamol, Ibuprofen, Aspirin" },
    { id: 4, title: "Digestive Issues", products: "Antacids, Probiotics, Laxatives" },
    { id: 5, title: "Skin Problems", products: "Antiseptics, Creams, Ointments" },
    { id: 6, title: "Wound Care", products: "Antiseptics, Bandages, Plasters" },
    { id: 7, title: "Cardiovascular", products: "Blood pressure medications, Aspirins" },
    { id: 8, title: "Diabetes", products: "Glucometers, Insulin, Test strips" },
    { id: 9, title: "Toothache", products: "Pain relievers, Antiseptic mouthwash" },
    { id: 10, title: "Vitamins and Minerals", products: "Multivitamins, Vitamin D, Omega-3, Calcium" }
  ]
};

// Mock data for catalog products
export const mockProducts = [
  { id: 1, code: "SKU-A1-001", name: "Mahsulot A1", description: "Professional sifatli mahsulot", category: "A" },
  { id: 2, code: "SKU-B2-002", name: "Mahsulot B2", description: "Yuqori samaradorlik uchun", category: "B" },
  { id: 3, code: "SKU-C3-003", name: "Mahsulot C3", description: "Sanoat standartlari bo'yicha", category: "C" },
  { id: 4, code: "SKU-D4-004", name: "Mahsulot D4", description: "Eng yangi texnologiya", category: "D" },
  { id: 5, code: "SKU-E5-005", name: "Mahsulot E5", description: "Ekologik toza mahsulot", category: "E" },
  { id: 6, code: "SKU-F6-006", name: "Mahsulot F6", description: "Sertifikatlangan mahsulot", category: "F" },
  { id: 7, code: "SKU-G7-007", name: "Mahsulot G7", description: "Premium sifat kafolati", category: "G" },
  { id: 8, code: "SKU-H8-008", name: "Mahsulot H8", description: "Universal qo'llanilish", category: "H" },
  { id: 9, code: "SKU-I9-009", name: "Mahsulot I9", description: "Innovatsion dizayn", category: "I" }
];

// Mock data for founders/team
// FAQAT mockFounders qismini almashtiring (around line 55-74):

export const mockFounders = [
  {
    id: 1,
    name: "Safarov Doniyor Oybeko'g'li",
    position: "Asoschi",
    role: "CEO & Co-Founder",
    description: "Onkolog shifokor | HomeMed platformasi asoschisi. Safarov Doniyor Oybeko'g'li — onkolog shifokor va PARTNERS PHARM kompaniyasi hamda HomeMed platformasi asoschisi. 2008-yilda Toshkent Pediatriya tibbiyot institutini tamomlagan. 2012–2014-yillarda onkologiya yo'nalishida klinik ordinaturada tahsil olgan. 2012–2014-yillarda 'Yuriya Pharm' va 'Actavis' farmatsevtik kompaniyalarida faoliyat yuritgan. 2014-yildan Yunosobod tumani markaziy poliklinikasida onkolog shifokor lavozimida ishlagan. 2022-yilda PARTNERS PHARM kompaniyasiga asos solgan. Kompaniyada jamoani rivojlantirish, ishlab chiqarilayotgan mahsulotlar sifatini nazorat qilish va takomillashtirishga yo'nalishlariga faoliyat yuritadi.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    initials: "SD"
  },
  {
    id: 2,
    name: "Adizov Sherali Alievich",
    position: "Asoschi",
    role: "CTO & Co-Founder",
    description: "Radiolog | Strategiya va xalqaro hamkorlik. Adizov Sherali Alievich — PARTNERS PHARM kompaniyasi asoschisi. 2008-yilda Toshkent Pediatriya tibbiyot institutini tamomlagan. 2011-yilda radiologiya yo'nalishi bo'yicha magistraturani yakunlagan. 2022-yilda PARTNERS PHARM kompaniyasiga asos solgan. Kompaniyaning strategik yo'nalishlarini belgilash, xalqaro hamkorlik masalalari hamda ishlab chiqarish jarayonlaridagi sifat nazoratini takomillashtirishga yo'nalishlariga faoliyat yuritadi.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    initials: "AS"
  }
];

// Mock data for partners
export const mockPartners = [
  { 
    id: 1, 
    name: "Partner A",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 2, 
    name: "Partner B",
    logo: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 3, 
    name: "Partner C",
    logo: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 4, 
    name: "Partner D",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 5, 
    name: "Partner E",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 6, 
    name: "Partner F",
    logo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 7, 
    name: "Partner G",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    website: "https://example.com"
  },
  { 
    id: 8, 
    name: "Partner H",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
    website: "https://example.com"
  }
];