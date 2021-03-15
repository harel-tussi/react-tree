import { ReactElement } from "react";
import useTree from "../../hooks/useTree";
import CategoryNode from "../CategoryNode";

interface Props {
  root: ICategoryNode;
}

function Tree({ root }: Props): ReactElement {
  const { tree, loading, error, loadTree, saveTree, deleteTree } = useTree({
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
              <button onClick={loadTree}>Load Tree</button>
              <button onClick={saveTree}>Save Tree</button>
              <button onClick={deleteTree}>Delete Tree</button>
              <CategoryNode
                {...tree}
                nodeRef={tree}
                parentRef={null}
                onDelete={() => {}}
              />
            </>
          );
        }
      })()}
    </div>
  );
}

export default Tree;
