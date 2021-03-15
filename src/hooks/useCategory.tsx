import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  nodeRef: null | ICategoryNode;
  parentRef: null | ICategoryNode;
}

function useCategory({ nodeRef, parentRef }: Props) {
  const [showChildren, setShowChildren] = useState(false);
  const [currentNode, setCurrentNode] = useState<null | ICategoryNode>(nodeRef);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentNode) {
      if (nodeRef) nodeRef.children = currentNode?.children;
    }
  }, [currentNode, nodeRef]);

  const toggleChildren = useCallback(() => {
    setShowChildren((prev) => !prev);
  }, [setShowChildren]);

  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  // delete node
  const onDelete = useCallback(
    (nodeId: string) => {
      if (parentRef) {
        parentRef.children = parentRef.children.filter(
          (node) => node.id !== nodeId
        );
      }
      setCurrentNode(null);
    },
    [parentRef, setCurrentNode]
  );

  // updating node name
  const onUpdate = useCallback(() => {
    const inputValue = inputRef?.current?.value ?? "";
    if (!inputValue) return;
    setCurrentNode((prevNode) => {
      if (prevNode) {
        return {
          ...prevNode,
          categoryName: inputValue,
          v: prevNode.v + 1,
        };
      }
      return prevNode;
    });
    if (nodeRef) nodeRef.categoryName = inputValue;
    clearInput();
  }, [nodeRef, setCurrentNode]);

  // adding child node
  const onAdd = useCallback(() => {
    const inputValue = inputRef?.current?.value ?? "";
    if (!inputValue) return;
    const newNode = {
      id: String(new Date().getTime()),
      categoryName: inputValue,
      children: [],
      root: false,
      v: 1,
    };
    setCurrentNode((prevNode) => {
      if (prevNode) {
        return {
          ...prevNode,
          children: [...prevNode.children, newNode],
          v: prevNode.v + 1,
        };
      }
      return prevNode;
    });
    setShowChildren(true);
    clearInput();
  }, [inputRef, setCurrentNode]);

  return {
    showChildren,
    currentNode,
    setCurrentNode,
    inputRef,
    toggleChildren,
    onDelete,
    onUpdate,
    onAdd,
  };
}

export default useCategory;
