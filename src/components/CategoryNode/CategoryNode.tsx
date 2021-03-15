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

// nodeRef - reference to our node in the tree
// parentRef - reference to our parent node in the tree
// currentNode - our local node state

function CategoryNode({ nodeRef, parentRef }: Props): ReactElement | null {
  const {
    showChildren,
    currentNode,
    inputRef,
    toggleChildren,
    onDelete,
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
          <ActionButton onClick={() => onDelete(nodeRef.id)}>
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
