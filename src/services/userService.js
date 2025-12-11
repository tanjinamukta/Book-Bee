import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Get user profile data
export const getUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  }
  return null;
};

// Update user profile (create if doesn't exist)
export const updateUserProfile = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    // Document exists, update it
    return updateDoc(userRef, {
      ...userData,
      updatedAt: new Date()
    });
  } else {
    // Document doesn't exist, create it
    return setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const usersQuery = query(collection(db, 'users'));
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Update user role (admin only)
export const updateUserRole = async (userId, role) => {
  return updateDoc(doc(db, 'users', userId), {
    role,
    updatedAt: new Date()
  });
};