import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy, limit, doc } from 'firebase/firestore';

export const getBooks = async (filters = {}) => {
  let q = collection(db, 'books');
  
  // Apply filters
  if (filters.category) {
    q = query(q, where('category', '==', filters.category));
  }
  
  if (filters.search) {
    // Note: Firestore doesn't support full-text search natively
    // This is a simplified approach that searches in title and author
    q = query(q, where('title', '>=', filters.search));
    q = query(q, where('title', '<=', filters.search + '\uf8ff'));
  }
  
  // Apply sorting
  if (filters.sortBy) {
    q = query(q, orderBy(filters.sortBy, filters.sortOrder || 'asc'));
  }
  
  // Apply limit
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getBookById = async (id) => {
  const bookDoc = await doc(db, 'books', id).get();
  if (bookDoc.exists()) {
    return {
      id: bookDoc.id,
      ...bookDoc.data()
    };
  }
  return null;
};

export const getFeaturedBooks = async () => {
  return getBooks({ limit: 6, sortBy: 'rating', sortOrder: 'desc' });
};

export const getBooksByCategory = async (category) => {
  return getBooks({ category });
};