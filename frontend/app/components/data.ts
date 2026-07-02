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
