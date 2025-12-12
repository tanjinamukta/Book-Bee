import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export const addReview = async (reviewData) => {
  return addDoc(collection(db, 'reviews'), {
    ...reviewData,
    createdAt: new Date()
  });
};

export const getBookReviews = async (bookId) => {
  const q = query(
    collection(db, 'reviews'),
    where('bookId', '==', bookId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};