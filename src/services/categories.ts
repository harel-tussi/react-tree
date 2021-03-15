import firestoreService from "../firebase/firestore";

const collection = "categories";

export const getCategoriesCollection = async () =>
  await firestoreService.getCollection(collection);

export const getCategory = async (docId: string) =>
  await firestoreService.getDocument(collection, docId);

export const updateCategory = async (docId: string, data: ICategoryNode) => {
  await firestoreService.updateDocument(collection, docId, data);
};

export const createCategory = async (categoryName: string) => {
  const newCategory = {
    categoryName,
    children: [],
  };
  return await firestoreService.createDocument(collection, newCategory);
};

const categoriesService = {
  getCategoriesCollection,
  getCategory,
  updateCategory,
  createCategory,
};

export default categoriesService;
