export const addNewCategoryNodeToTree = (
  node: ICategoryNode,
  newNode: ICategoryNode
) => {
  if (!node.children) node.children = [];
  node.children.push(newNode);
  node.v = node.v + 1;
};

export const deleteCategoryNodeFromTree = (
  parentNode: ICategoryNode | null,
  nodeId: string
) => {
  if (parentNode?.children) {
    parentNode.children = parentNode.children.filter(
      (categoryNode) => categoryNode.id !== nodeId
    );
    parentNode.v = parentNode.v + 1;
  }
};

export const updateCategoryName = (
  node: ICategoryNode,
  newCategoryName: string
) => {
  node.categoryName = newCategoryName;
  node.v = node.v + 1;
};
