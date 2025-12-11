import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

export const createDocument = (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

export const getDocument = (collectionName, id) => {
  return getDoc(doc(db, collectionName, id));
};

export const getDocuments = (collectionName, conditions = []) => {
  let q = collection(db, collectionName);
  
  conditions.forEach(condition => {
    const { field, operator, value } = condition;
    q = query(q, where(field, operator, value));
  });
  
  return getDocs(q);
};

export const updateDocument = (collectionName, id, data) => {
  return updateDoc(doc(db, collectionName, id), data);
};

export const deleteDocument = (collectionName, id) => {
  return deleteDoc(doc(db, collectionName, id));
};