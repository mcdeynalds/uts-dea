export const menu = [
  {
    "id": 1,
    "name": "Iced Bumi Latte",
    "category": "Kopi",
    "price": 25000,
    "stock": 20,
    "image": "/images/bumi-latte.jpg",
    "description": "Kopi autentik Indonesia, karamel, dan butterscotch. Creamy, legit, pas buat jeda harianmu.",
    "rating": 4.9
  },
  {
    "id": 2,
    "name": "Hot Americano",
    "category": "Kopi",
    "price": 23000,
    "stock": 18,
    "image": "/images/hot-americano.jpg",
    "description": "Espresso dan air hangat. Rasa kopi yang bersih dengan aroma yang berani.",
    "rating": 4.7
  },
  {
    "id": 3,
    "name": "Iced Café Latte",
    "category": "Kopi",
    "price": 29000,
    "stock": 15,
    "image": "/images/iced-cafe-latte.jpg",
    "description": "Espresso dan susu segar dengan lapisan foam tipis. Lembut di setiap tegukan.",
    "rating": 4.8
  },
  {
    "id": 4,
    "name": "Iced Buttercream Tiramisu Latte",
    "category": "Kopi",
    "price": 34000,
    "stock": 16,
    "image": "/images/tiramisu-latte.jpg",
    "description": "Kopi susu praline dengan buttercream tiramisu yang lembut. Dessert dalam satu gelas.",
    "rating": 4.9
  },
  {
    "id": 5,
    "name": "Iced Caramel Praline Macchiato",
    "category": "Kopi",
    "price": 34000,
    "stock": 12,
    "image": "/images/caramel-praline.jpg",
    "description": "Espresso berlapis susu dengan praline dan saus karamel. Manisnya bikin balik lagi.",
    "rating": 4.8
  },
  {
    "id": 6,
    "name": "Iced Dirty Matchapresso",
    "category": "Kopi",
    "price": 31000,
    "stock": 15,
    "image": "/images/dirty-matchapresso.jpg",
    "description": "Matcha bertemu espresso dan susu. Dua karakter favorit dalam satu tegukan.",
    "rating": 4.8
  },
  {
    "id": 7,
    "name": "Matcha Ice Blended",
    "category": "Non-Kopi",
    "price": 34000,
    "stock": 14,
    "image": "/images/matcha-ice-blended.jpg",
    "description": "Matcha creamy, susu, dan es yang diblender lembut. Segar dengan rasa earthy yang khas.",
    "rating": 4.9
  },
  {
    "id": 8,
    "name": "Strawberry Ice Blended",
    "category": "Non-Kopi",
    "price": 34000,
    "stock": 12,
    "image": "/images/strawberry-ice-blended.jpg",
    "description": "Es blended stroberi dengan susu pilihan. Pink, fresh, dan manisnya pas.",
    "rating": 4.7
  },
  {
    "id": 9,
    "name": "Chocolate Ice Blended",
    "category": "Non-Kopi",
    "price": 37000,
    "stock": 20,
    "image": "/images/chocolate-ice-blended.jpg",
    "description": "Cokelat kaya rasa berpadu susu dan es lembut. Teman adem untuk hari yang padat.",
    "rating": 4.8
  },
  {
    "id": 10,
    "name": "Mushroom Truffle Sandwich",
    "category": "Makanan",
    "price": 42000,
    "stock": 10,
    "image": "/images/mushroom-truffle-sandwich.jpg",
    "description": "Roti bertabur parsley, jamur, saus truffle, dan cheddar. Gurih dengan aroma yang istimewa.",
    "rating": 4.9
  },
  {
    "id": 11,
    "name": "Chicken Teriyaki Sandwich",
    "category": "Makanan",
    "price": 39000,
    "stock": 10,
    "image": "/images/chicken-teriyaki-sandwich.jpg",
    "description": "Roti wijen putih dengan ayam teriyaki, teriyaki mayo, dan cheddar. Praktis dan mengenyangkan.",
    "rating": 4.8
  },
  {
    "id": 12,
    "name": "Smoked Beef & Cheese Sandwich",
    "category": "Makanan",
    "price": 39000,
    "stock": 8,
    "image": "/images/smoked-beef-sandwich.jpg",
    "description": "Focaccia dengan smoked beef, mozzarella, cheddar, mayo, dan bawang panggang.",
    "rating": 4.7
  },
  {
    "id": 13,
    "name": "Butter Croissant",
    "category": "Snack",
    "price": 24000,
    "stock": 12,
    "image": "/images/butter-croissant.jpg",
    "description": "Pastry berlapis dengan rasa dan aroma butter. Renyah di luar, lembut di dalam.",
    "rating": 4.9
  },
  {
    "id": 14,
    "name": "Roll Cake Cheese Pandan",
    "category": "Snack",
    "price": 27000,
    "stock": 15,
    "image": "/images/pandan-roll-cake.jpg",
    "description": "Bolu gulung pandan lembut, krim vanila, dan keju parut. Manis gurih untuk jeda kecilmu.",
    "rating": 4.8
  },
  {
    "id": 15,
    "name": "Almond Croissant",
    "category": "Snack",
    "price": 36000,
    "stock": 10,
    "image": "/images/almond-croissant.jpg",
    "description": "Croissant renyah bertabur gula halus dan potongan almond. Pas dipasangkan dengan kopi.",
    "rating": 4.8
  }
];
export const fallbackImage = '/images/bumi-latte.jpg';
export const handleImageError = (event) => {
  if (!event.currentTarget.src.endsWith(fallbackImage)) event.currentTarget.src = fallbackImage;
};
