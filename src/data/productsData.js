import rainbow from "../assets/rainbow.jpg"
import oreoice from "../assets/oreoice.jpg"

export const productsData = [
  {
    id: 1,
    title: "Oreo Ice Cream",
    description: "Classic vanilla ice cream mixed with crunchy Oreo chunks for a perfect blend of cream and crunch.",
    price: 150,
    image: oreoice,
    category: "Scoops",
    bestSeller: true
  },
  {
    id: 2,
    title: "Rainbow Cake",
    description: "Multi-layered colorful cake that brings joy to every slice. Soft, fluffy, and delicious.",
    price: 450,
    image: rainbow,
    category: "Cakes",
    bestSeller: true
  },
  {
    id: 3,
    title: "Chocolate Truffle",
    description: "Rich, velvety chocolate truffle ice cream for true chocolate lovers.",
    price: 180,
    image: oreoice, // Placeholder
    category: "Scoops",
    bestSeller: false
  },
  {
    id: 4,
    title: "Strawberry Delight",
    description: "Fresh strawberry puree blended with creamy milk for a refreshing summer treat.",
    price: 140,
    image: rainbow, // Placeholder
    category: "Scoops",
    bestSeller: false
  },
  {
    id: 5,
    title: "Red Velvet Cake",
    description: "Indulgent red velvet layers with cream cheese frosting, perfect for celebrations.",
    price: 550,
    image: oreoice, // Placeholder
    category: "Cakes",
    bestSeller: true
  },
  {
    id: 6,
    title: "Mango Alphonso",
    description: "Made with real Alphonso mango pulp, this seasonal favorite is pure bliss.",
    price: 160,
    image: rainbow, // Placeholder
    category: "Scoops",
    bestSeller: false
  }
];
