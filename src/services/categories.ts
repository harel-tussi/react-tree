import firestoreService from "./firestore";

const COLLECTION = "categories";

export const getCategoriesCollection = async () =>
  await firestoreService.getCollection(COLLECTION);

export const getCategory = async (docId: string) =>
  await firestoreService.getDocument(COLLECTION, docId);

export const updateCategory = async (docId: string, data: CategoryNode) => {
  await firestoreService.updateDocument(COLLECTION, docId, data);
};

export const createCategory = async (categoryName: string) => {
  const newCategory = {
    categoryName,
    children: [],
    root: true,
    v: 0,
  };
  return await firestoreService.createDocument(COLLECTION, newCategory);
};

export const deleteCategory = async (docId: string) => {
  await firestoreService.deleteDocument(COLLECTION, docId);
};

const categoriesService = {
  getCategoriesCollection,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};

export default categoriesService;
