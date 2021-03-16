import { useCallback, useRef, useState } from "react";
import categoriesService from "../services/categories";
interface Props {
  root: null | CategoryNode;
}

function useTree({ root }: Props) {
  const rootId = useRef(root?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tree, setTree] = useState(root);

  const loadTree = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const category: any = await categoriesService.getCategory(rootId.current);
      setTree(category);
    } catch (error) {
      setError("Could not load tree");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, rootId]);

  const saveTree = useCallback(async () => {
    if (tree) {
      try {
        setLoading(true);
        setError("");
        await categoriesService.updateCategory(rootId.current, tree);
      } catch (error) {
        setError("Could not save tree");
      } finally {
        setLoading(false);
      }
    }
  }, [setLoading, setError, tree, rootId]);

  const deleteTree = useCallback(async () => {
    if (tree) {
      try {
        setLoading(true);
        setError("");
        await categoriesService.deleteCategory(rootId.current);
        setLoading(false);
        setTree(null);
      } catch (error) {
        setError("Could not delete tree");
        setLoading(false);
      }
    }
  }, [setLoading, setError, tree, rootId]);

  return {
    loadTree,
    saveTree,
    deleteTree,
    loading,
    error,
    tree,
  };
}

export default useTree;
