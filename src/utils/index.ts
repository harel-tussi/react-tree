// {
//   name:'1',
//   children: [
//     {
//       name:'2',
//       children: [
//         {}
//       ]
//     },
//     {
//       name:'3',
//       children: [
//         {}
//       ]
//     }
//   ]
// }

export const addNewCategoryNodeToTreeTest = (
  node: ICategoryNode,
  newNode: ICategoryNode
) => {
  if (!node.children) node.children = [];
  node.children.push(newNode);
};

export const addNewCategoryNodeToTree = (
  node: ICategoryNode | null,
  categoryNodeId: string,
  newCategoryNode: ICategoryNode
) => {
  if (node?.id === categoryNodeId && newCategoryNode) {
    if (!node.children) node.children = [];
    node.children.push(newCategoryNode);
  } else if (node !== null && node?.children !== null) {
    for (let i = 0; i < node.children.length; i++) {
      addNewCategoryNodeToTree(
        node.children[i],
        categoryNodeId,
        newCategoryNode
      );
    }
  }
};

export const deleteCategoryNodeFromTree = (
  node: ICategoryNode | null,
  categoryNodeId: string
) => {
  if (node && node.children !== null) {
    for (let i = 0; i < node.children.length; i++) {
      const filteredNodes = node.children.filter(
        (categoryNode) => categoryNode.id === categoryNodeId
      );
      if (filteredNodes && filteredNodes.length > 0) {
        node.children = node.children.filter(
          (categoryNode) => categoryNode.id !== categoryNodeId
        );
        return;
      }
      deleteCategoryNodeFromTree(node.children[i], categoryNodeId);
    }
  }
};

export const deleteCategoryNodeFromTreeTest = (
  parentNode: ICategoryNode | null,
  nodeId: string
) => {
  if (parentNode?.children) {
    console.log("hello");

    parentNode.children = parentNode.children.filter(
      (categoryNode) => categoryNode.id !== nodeId
    );
  }
};

export const updateCategoryNameTest = (
  node: ICategoryNode,
  newCategoryName: string
) => {
  node.categoryName = newCategoryName;
};

export const updateCategoryName = (
  node: ICategoryNode | null,
  categoryNodeId: string,
  categoryName: string
) => {
  if (node?.id === categoryNodeId) {
    node.categoryName = categoryName;
  } else if (node && node?.children !== null) {
    for (let i = 0; i < node?.children.length; i++) {
      updateCategoryName(node.children[i], categoryNodeId, categoryName);
    }
  }
};
