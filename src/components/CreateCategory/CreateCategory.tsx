import React, { ReactElement, useState } from "react";

interface Props {
  handleSubmit: (input: string) => void;
}

function CreateCategory({ handleSubmit }: Props): ReactElement {
  const [input, setInput] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    handleSubmit(input);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={onSubmit}>Add</button>
    </div>
  );
}

export default CreateCategory;
