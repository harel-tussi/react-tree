import { memo, ReactElement } from "react";
import useCategory from "../../hooks/useCategory";
import {
  Container,
  Title,
  TopContainer,
  Input,
  ActionButton,
  Toggle,
  ChildrenContainer,
} from "./CategoryNode.elements";

type Props = {
  nodeRef: CategoryNode;
  parentRef: CategoryNode | null;
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

  const hasChildren = currentNode.children.length > 0;

  return (
    <Container root={currentNode.root}>
      <TopContainer>
        <Title root={currentNode.root}>
          {hasChildren && (
            <Toggle onClick={toggleChildren}>
              {showChildren ? " -" : "+"}
            </Toggle>
          )}
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
      {showChildren && (
        <ChildrenContainer root={currentNode.root}>
          {currentNode.children.map((node: CategoryNode) => {
            return (
              <MemoCategoryNode
                key={node.id}
                nodeRef={node}
                parentRef={nodeRef}
              />
            );
          })}
        </ChildrenContainer>
      )}
    </Container>
  );
}

const isEqual = (
  prevProps: Readonly<React.PropsWithChildren<Props>>,
  nextProps: Readonly<React.PropsWithChildren<Props>>
) => {
  return prevProps.nodeRef.v === nextProps.nodeRef.v;
};

const MemoCategoryNode = memo(CategoryNode, isEqual);

export default CategoryNode;
