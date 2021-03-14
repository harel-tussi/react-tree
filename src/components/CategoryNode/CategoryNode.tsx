import React, { ReactElement, useState, useCallback } from "react";
import {
  Container,
  Title,
  TopContainer,
  Input,
  ActionButton,
} from "./CategoryNode.elements";

type Props = ICategoryNode & {
  // addNewNode: (parentId: string, newNode: ICategoryNode) => void;
  addNewNode: (node: ICategoryNode, newNode: ICategoryNode) => void;
  // deleteNode: (categoryNodeId: string) => void;
  deleteNode: (parentNode: ICategoryNode | null, nodeId: string) => void;
  // updateNode: (categoryNodeId: string, categoryName: string) => void;
  updateNode: (node: ICategoryNode, categoryName: string) => void;
  nodeRef: ICategoryNode;
  parentRef: ICategoryNode | null;
};

function CategoryNode({
  id,
  categoryName,
  children,
  addNewNode,
  deleteNode,
  updateNode,
  nodeRef,
  parentRef,
}: Props): ReactElement {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [categoryNameState, setCategoryNameState] = useState<string>("");
  const toggleChildren = useCallback(() => {
    setShowChildren((prev) => !prev);
  }, [setShowChildren]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNameState(e.target.value);
  };

  const onAddChild = () => {
    try {
      const newNode: ICategoryNode = {
        id: String(new Date().getTime()),
        categoryName: categoryNameState,
        children: null,
        root: false,
      };
      // addNewNode(id, newNode);
      addNewNode(nodeRef, newNode);
      setCategoryNameState("");
      setShowChildren(true);
    } catch (error) {}
  };

  const onDelete = () => {
    // deleteNode(id);
    deleteNode(parentRef, id);
  };

  const onUpdate = () => {
    // updateNode(id, categoryNameState);
    updateNode(nodeRef, categoryNameState);
    setCategoryNameState("");
  };

  const isInputEmpty = !!!categoryNameState.trim();

  return (
    <Container>
      <TopContainer>
        <Title onClick={toggleChildren}>{categoryName}</Title>
        <Input onChange={handleInputChange} value={categoryNameState} />
        <ActionButton onClick={onDelete}>Delete</ActionButton>
        <ActionButton onClick={onUpdate} disabled={isInputEmpty}>
          Update
        </ActionButton>
        <ActionButton onClick={onAddChild} disabled={isInputEmpty}>
          Add
        </ActionButton>
      </TopContainer>
      {showChildren &&
        (children ?? []).map((node: ICategoryNode) => (
          <CategoryNode
            {...node}
            nodeRef={node}
            key={node.id}
            addNewNode={addNewNode}
            deleteNode={deleteNode}
            updateNode={updateNode}
            parentRef={nodeRef}
          />
        ))}
    </Container>
  );
}

export default React.memo(CategoryNode);
