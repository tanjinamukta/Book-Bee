import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy, doc } from 'firebase/firestore';

export const createOrder = async (orderData) => {
  return addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: new Date(),
    status: 'pending',
    paymentStatus: 'pending'
  });
};

export const getUserOrders = async (userId) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getOrderById = async (orderId) => {
  const orderDoc = await doc(db, 'orders', orderId).get();
  if (orderDoc.exists()) {
    return {
      id: orderDoc.id,
      ...orderDoc.data()
    };
  }
  return null;
};