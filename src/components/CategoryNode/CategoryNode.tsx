import { ReactElement } from "react";
import useCategory from "../../hooks/useCategory";
import {
  Container,
  Title,
  TopContainer,
  Input,
  ActionButton,
} from "./CategoryNode.elements";

type Props = {
  onDelete: (nodeId: string) => void;
  nodeRef: ICategoryNode;
  parentRef: ICategoryNode | null;
};

function CategoryNode({
  nodeRef,
  parentRef,
  onDelete,
}: Props): ReactElement | null {
  const {
    showChildren,
    currentNode,
    inputRef,
    toggleChildren,
    deleteCategory,
    onUpdate,
    onAdd,
  } = useCategory({ nodeRef, parentRef });

  if (!currentNode) return null;

  return (
    <Container>
      <TopContainer>
        <Title onClick={toggleChildren}>{currentNode.categoryName}</Title>
        <Input ref={inputRef} />
        {!currentNode.root && (
          <ActionButton onClick={() => deleteCategory(nodeRef.id)}>
            Delete
          </ActionButton>
        )}
        <ActionButton onClick={onUpdate}>Update</ActionButton>
        <ActionButton onClick={onAdd}>Add</ActionButton>
      </TopContainer>
      {showChildren &&
        (currentNode.children ?? []).map((node: ICategoryNode) => (
          <CategoryNode
            key={node.id}
            nodeRef={node}
            parentRef={nodeRef}
            onDelete={onDelete}
          />
        ))}
    </Container>
  );
}

export default CategoryNode;
