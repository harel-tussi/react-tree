import { ReactElement } from "react";
import useTree from "../../hooks/useTree";
import CategoryNode from "../CategoryNode";

interface Props {
  root: ICategoryNode;
}

function Tree({ root }: Props): ReactElement {
  const {
    addNewNode,
    deleteNode,
    updateNode,
    tree,
    loading,
    error,
    loadTree,
    saveTree,
  } = useTree({
    root,
  });

  return (
    <div>
      {(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        if (tree) {
          return (
            <>
              <CategoryNode
                {...tree}
                nodeRef={tree}
                addNewNode={addNewNode}
                deleteNode={deleteNode}
                updateNode={updateNode}
                parentRef={null}
              />
              <button onClick={loadTree}>Load Tree</button>
              <button onClick={saveTree}>Save Tree</button>
            </>
          );
        }
      })()}
    </div>
  );
}

export default Tree;
