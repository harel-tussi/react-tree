import { useCallback, useState } from "react";
import firestoreService from "../firebase/firestore";

function useTrees() {
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ICategoryNode[]>([]);

  const setTrees = useCallback(async () => {
    setLoading(true);
    try {
      const categoriesFromDB = await firestoreService.getCategories();
      setCategories(categoriesFromDB);
    } catch (error) {
      setError("Failed loading categories");
    } finally {
      setLoading(false);
    }
  }, [setCategories, setError, setLoading]);

  const addNewTree = useCallback(
    async (categoryName: string) => {
      try {
        setLoadingAdd(true);
        setError("");
        const createdCategory = await firestoreService.addCategory(
          categoryName
        );
        setCategories((prev) => [...prev, createdCategory]);
      } catch (error) {
        setError("Failed creating new tree");
      } finally {
        setLoadingAdd(false);
      }
    },
    [setCategories, setError, setLoadingAdd]
  );

  return {
    loadingAdd,
    loading,
    error,
    categories,
    setTrees,
    addNewTree,
  };
}

export default useTrees;