import { useCallback, useState } from "react";
import categoriesService from "../services/categories";

function useTrees() {
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ICategoryNode[]>([]);

  const setTrees = useCallback(async () => {
    try {
      setLoading(true);
      const categoriesFromDB = await categoriesService.getCategoriesCollection();
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
        const createdCategory = await categoriesService.createCategory(
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
