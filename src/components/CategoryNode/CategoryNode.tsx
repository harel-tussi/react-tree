import React, { ReactElement } from "react";
import useCategory from "../../hooks/useCategory";
import {
  Container,
  Title,
  TopContainer,
  Input,
  ActionButton,
} from "./CategoryNode.elements";

type Props = ICategoryNode & {
  addNewNode: (node: ICategoryNode, newNode: ICategoryNode) => void;
  deleteNode: (parentNode: ICategoryNode | null, nodeId: string) => void;
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
  root,
}: Props): ReactElement {
  const {
    categoryNameState,
    setCategoryNameState,
    showChildren,
    toggleChildren,
    handleInputChange,
    setShowChildren,
  } = useCategory();

  const onAddChild = () => {
    try {
      const newNode: ICategoryNode = {
        id: String(new Date().getTime()),
        categoryName: categoryNameState,
        children: null,
        root: false,
        v: 0,
      };
      addNewNode(nodeRef, newNode);
      setCategoryNameState("");
      setShowChildren(true);
    } catch (error) {}
  };

  const onDelete = () => {
    deleteNode(parentRef, id);
  };

  const onUpdate = () => {
    updateNode(nodeRef, categoryNameState);
    setCategoryNameState("");
  };

  const isInputEmpty = !!!categoryNameState.trim();

  console.log(id);

  return (
    <Container>
      <TopContainer>
        <Title onClick={toggleChildren}>{categoryName}</Title>
        <Input onChange={handleInputChange} value={categoryNameState} />
        {!root && <ActionButton onClick={onDelete}>Delete</ActionButton>}
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
            key={node.id}
            nodeRef={node}
            parentRef={nodeRef}
            addNewNode={addNewNode}
            deleteNode={deleteNode}
            updateNode={updateNode}
          />
        ))}
    </Container>
  );
}

export default CategoryNode;
