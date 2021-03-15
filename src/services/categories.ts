import firestoreService from "./firestore";

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
    root: true,
    v: 0,
  };
  return await firestoreService.createDocument(collection, newCategory);
};

export const deleteCategory = async (docId: string) => {
  await firestoreService.deleteDocument(collection, docId);
};

const categoriesService = {
  getCategoriesCollection,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};

export default categoriesService;
