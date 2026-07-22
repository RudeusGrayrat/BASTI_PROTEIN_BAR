export const products = [
  {
    name: "Waffle Clasico Proteico",
    description: "Waffle dorado con platano, cacao nibs y miel ligera.",
    protein: "24g",
    price: "S/ 24.90",
    image: "waffle",
  },
  {
    name: "Matcha Latte Proteico",
    description: "Matcha ceremonial, leche vegetal y proteina limpia.",
    protein: "18g",
    price: "S/ 18.90",
    image: "matcha",
  },
  {
    name: "Bowl de Acai",
    description: "Acai, frutos rojos, granola artesanal y crema natural.",
    protein: "12g",
    price: "S/ 26.90",
    image: "bowl",
  },
  {
    name: "Protein Shake Chocolate",
    description: "Cacao intenso, hielo, proteina y textura cremosa.",
    protein: "20g",
    price: "S/ 21.90",
    image: "shake",
  },
] as const;

export const benefits = [
  "Alta proteina",
  "Sin azucar anadida",
  "Ingredientes reales",
  "Energia sostenida",
  "Delicioso y saludable",
] as const;

export const tiers = [
  { name: "Bronce", range: "0 - 999 pts", color: "from-[#9b6d3d] to-[#d5b077]" },
  { name: "Plata", range: "1,000 - 1,999 pts", color: "from-[#8e9391] to-[#e4e6e1]" },
  { name: "Gold", range: "2,000 - 4,999 pts", color: "from-[#b98025] to-[#f5d36b]" },
  { name: "Black", range: "5,000+ pts", color: "from-[#11140e] to-[#3a3d34]" },
] as const;

export const featurePillars = [
  {
    title: "Sin azucar anadida",
    description: "Endulzado naturalmente y sin remordimientos.",
    icon: "leaf",
  },
  {
    title: "Alta proteina",
    description: "Hasta 25g por porcion para tu rendimiento.",
    icon: "barbell",
  },
  {
    title: "Energetico",
    description: "Perfecto para tu dia a dia, antes o despues de entrenar.",
    icon: "bolt",
  },
  {
    title: "Ingredientes reales",
    description: "Naturales, de calidad y cuidadosamente seleccionados.",
    icon: "sprout",
  },
] as const;

export const experienceHighlights = [
  {
    title: "Ambiente acogedor",
    description: "Espacios disenados para que te sientas como en casa.",
  },
  {
    title: "Hecho al momento",
    description: "Fresco y preparado especialmente para ti.",
  },
  {
    title: "Para todos",
    description: "Opciones para cada estilo de vida y objetivo.",
  },
] as const;

export const rewardPreview = [
  "Acumula puntos por cada compra.",
  "Canjea productos gratis y descuentos.",
  "Beneficios pensados solo para ti.",
] as const;

export const dashboardMenu = [
  "Dashboard",
  "Menu",
  "Pedidos",
  "Rewards",
  "Beneficios",
  "Perfil",
  "Configuracion",
] as const;

export const nutritionPreview = [
  { label: "Proteina", value: "82g", target: "120g", progress: 68, tone: "olive" },
  { label: "Calorias", value: "1240", target: "2200", progress: 45, tone: "amber" },
  { label: "Azucares", value: "28g", target: "60g", progress: 47, tone: "sage" },
] as const;

export const recentOrders = [
  {
    name: "Waffle Protein Clasico + Matcha Latte",
    date: "02 Jul 2026",
    time: "9:12 AM",
    status: "Completado",
    art: "waffle",
  },
  {
    name: "Protein Shake Chocolate",
    date: "31 May 2026",
    time: "5:45 PM",
    status: "Completado",
    art: "shake",
  },
  {
    name: "Bowl de Acai + Cafe Americano",
    date: "30 May 2026",
    time: "8:03 AM",
    status: "Entregado",
    art: "bowl",
  },
] as const;
