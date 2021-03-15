import { useEffect } from "react";
import CreateCategory from "./components/CreateCategory";
import Header from "./components/Header";
import Tree from "./components/Tree";
import GlobalStyles from "./globalStyles";
import useTrees from "./hooks/useTrees";
function App() {
  const {
    loading,
    loadingAdd,
    error,
    categories,
    addNewTree,
    setTrees,
  } = useTrees();
  useEffect(() => {
    setTrees();
  }, [setTrees]);

  return (
    <div className="App">
      <GlobalStyles />
      <Header>Unlimited Hierarchical Category Tree View</Header>
      {loadingAdd && <p>Creating new tree...</p>}
      {!loading && !loadingAdd && !error && (
        <CreateCategory handleSubmit={addNewTree} />
      )}
      {(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error...</p>;
        if (categories)
          return categories.map((category, index) => (
            <Tree root={category} key={index} />
          ));
      })()}
    </div>
  );
}

export default App;
