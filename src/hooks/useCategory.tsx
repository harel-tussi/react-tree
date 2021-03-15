import React, { useCallback, useState } from "react";

function useCategory() {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [categoryNameState, setCategoryNameState] = useState<string>("");
  const toggleChildren = useCallback(() => {
    setShowChildren((prev) => !prev);
  }, [setShowChildren]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryNameState(e.target.value);
    },
    [setCategoryNameState]
  );
  return {
    showChildren,
    toggleChildren,
    categoryNameState,
    setCategoryNameState,
    handleInputChange,
    setShowChildren,
  };
}

export default useCategory;
