import { useCallback, useRef, useState } from "react";
import categoriesService from "../services/categories";
import {
  addNewCategoryNodeToTree,
  deleteCategoryNodeFromTree,
  updateCategoryName,
} from "../utils";

interface Props {
  root: null | ICategoryNode;
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

  const addNewNode = useCallback(
    (node: ICategoryNode, newNode: ICategoryNode) => {
      setTree((prevTree) => {
        addNewCategoryNodeToTree(node, newNode);
        return prevTree ? { ...prevTree } : null;
      });
    },
    [setTree]
  );

  const deleteNode = useCallback(
    (parentNode: ICategoryNode | null, nodeId: string) => {
      setTree((prevTree) => {
        deleteCategoryNodeFromTree(parentNode, nodeId);
        return prevTree ? { ...prevTree } : null;
      });
    },
    [setTree]
  );

  const updateNode = useCallback(
    (node: ICategoryNode, categoryName: string) => {
      setTree((prevTree) => {
        updateCategoryName(node, categoryName);
        return prevTree ? { ...prevTree } : null;
      });
    },
    [setTree]
  );

  return {
    addNewNode,
    deleteNode,
    updateNode,
    loadTree,
    saveTree,
    loading,
    error,
    tree,
  };
}

export default useTree;
