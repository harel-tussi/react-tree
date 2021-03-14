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

const getCategoriesRef = () => firebase.firestore().collection("categories");

const getCategories = async () => {
  const categoriesSnapshot = await getCategoriesRef().get();
  const categories: ICategoryNode[] = [];
  categoriesSnapshot.forEach((doc) => {
    categories.push({
      id: doc.id,
      categoryName: doc.data().categoryName,
      children: doc.data().children ?? null,
      root: doc.data().root ?? false,
    });
  });
  return categories;
};

const loadCategory = async (docId: string) => {
  if (!docId) return null;
  const categorySnapshot = await getCategoriesRef().doc(docId).get();
  return categorySnapshot.data();
};

const updateCategory = async (docId: string, data: ICategoryNode) => {
  return await getCategoriesRef().doc(docId).update(data);
};

const addCategory = async (categoryName: string): Promise<ICategoryNode> => {
  const newCategorySnapshot = await getCategoriesRef().add({
    categoryName,
    children: [],
  });
  const newCategory = await newCategorySnapshot.get();
  return {
    id: newCategory.id,
    categoryName,
    children: [],
    root: true,
  };
};

const firestoreService = {
  getCategories,
  loadCategory,
  updateCategory,
  addCategory,
};

export default firestoreService;
