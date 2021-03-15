import firebase from "firebase";

let CURRENT_CONNECTION: null | firebase.firestore.Firestore = null;

const firebaseConfig = {
  apiKey: "AIzaSyCjEffA4a4ogKl3bGzu1QjiypzVKg2Sb_Q",
  authDomain: "wix-task.firebaseapp.com",
  projectId: "wix-task",
  storageBucket: "wix-task.appspot.com",
  messagingSenderId: "907081647474",
  appId: "1:907081647474:web:97d69bc76d1974ca33c9eb",
};

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const getConnection = () => {
  if (!CURRENT_CONNECTION) {
    CURRENT_CONNECTION = firebase.firestore();
  }
  return CURRENT_CONNECTION;
};

const getCollectionRef = (collection: string) =>
  firebase.firestore().collection(collection);

const getCollection = async (collection: string) => {
  const snapshot = await getCollectionRef(collection).get();
  const result: any[] = [];
  snapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return result;
};

const getDocument = async (collection: string, docId: string) => {
  if (!docId || !collection) return null;
  const snapshot = await getCollectionRef(collection).doc(docId).get();
  return snapshot.data();
};

const updateDocument = async (
  collection: string,
  docId: string,
  data: ICategoryNode
) => await getCollectionRef(collection).doc(docId).update(data);

const createDocument = async (collection: string, data: any) => {
  const snapshot = await getCollectionRef(collection).add(data);
  const newDoc: any = await snapshot.get();
  return {
    id: newDoc.id,
    ...newDoc.data(),
  };
};

const deleteDocument = async (collection: string, docId: any) => {
  return await getCollectionRef(collection).doc(docId).delete();
};

const firestoreService = {
  getCollectionRef,
  getCollection,
  getDocument,
  updateDocument,
  createDocument,
  deleteDocument,
};

export default firestoreService;
