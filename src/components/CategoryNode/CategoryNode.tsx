import { memo, ReactElement } from "react";
import useCategory from "../../hooks/useCategory";
import {
  Container,
  Title,
  TopContainer,
  Input,
  ActionButton,
} from "./CategoryNode.elements";

type Props = {
  nodeRef: ICategoryNode;
  parentRef: ICategoryNode | null;
};

function CategoryNode({ nodeRef, parentRef }: Props): ReactElement | null {
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
    <Container root={currentNode.root}>
      <TopContainer>
        <Title onClick={toggleChildren}>
          {currentNode.root ? "" : "-"}
          {currentNode.categoryName}
        </Title>
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
        currentNode.children.map((node: ICategoryNode) => {
          return (
            <MemoCategoryNode
              key={node.id}
              nodeRef={node}
              parentRef={nodeRef}
            />
          );
        })}
    </Container>
  );
}

const MemoCategoryNode = memo(CategoryNode, (prevProps, nextProps) => {
  return prevProps.nodeRef.v === nextProps.nodeRef.v;
});

export default CategoryNode;
