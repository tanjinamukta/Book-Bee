import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzMdtHvbuJC0WhEXaMmrqJeWoXxCSG7tk",
  authDomain: "bookstore-webengg.firebaseapp.com",
  projectId: "bookstore-webengg",
  storageBucket: "bookstore-webengg.firebasestorage.app",
  messagingSenderId: "1024848088535",
  appId: "1:1024848088535:web:1ab01c2959fe5531c04f92",
  measurementId: "G-15KVMXTFX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample books data
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    category: "Classic",
    rating: 4.5,
    description: "A classic novel of the Jazz Age.",
    image: "https://www.thebookdesigner.com/wp-content/uploads/2023/06/Screen-Shot-2023-06-14-at-3.22.45-PM.png",
    stock: 10,
    isbn: "9780743273565",
    publisher: "Scribner",
    publishDate: "1925-04-10",
    pages: 180,
    language: "English"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    category: "Classic",
    rating: 4.8,
    description: "A gripping tale of racial injustice.",
    image: "https://via.placeholder.com/300x450?text=To+Kill+a+Mockingbird",
    stock: 15,
    isbn: "9780061120084",
    publisher: "J.B. Lippincott & Co.",
    publishDate: "1960-07-11",
    pages: 324,
    language: "English"
  },
  // Add more books as needed
];

// Sample categories
const categories = [
  {
    name: "Classic",
    description: "Timeless literary works",
    image: "https://via.placeholder.com/300x200?text=Classic"
  },
  {
    name: "Fantasy",
    description: "Magical worlds and adventures",
    image: "https://via.placeholder.com/300x200?text=Fantasy"
  },
  {
    name: "Romance",
    description: "Love stories and relationships",
    image: "https://via.placeholder.com/300x200?text=Romance"
  },
  {
    name: "Dystopian",
    description: "Futuristic societies and struggles",
    image: "https://via.placeholder.com/300x200?text=Dystopian"
  }
];

// Create admin user
const adminUser = {
  uid: "5TinoFnsxCU93eVRo9IjCmhHvQp1", // Replace with actual admin UID
  name: "Numan",
  email: "numancu8@gmail.com",
  role: 'customer',
  createdAt: new Date(),
  lastLogin: new Date(),
  phone: "123456",
  address: {
          street: "Street 1",
          city: "City 2",
          state: "State 1",
          zip: "Zip 1",
          country: "Country 1"
        },
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Add admin user
    await addDoc(collection(db, 'users'), adminUser);

    // Add categories
    const categoriesCollection = collection(db, 'categories');
    for (const category of categories) {
      await addDoc(categoriesCollection, {
        ...category,
        createdAt: new Date()
      });
    }
    
    // Add books
    const booksCollection = collection(db, 'books');
    for (const book of books) {
      await addDoc(booksCollection, {
        ...book,
        createdAt: new Date()
      });
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};


seedDatabase();