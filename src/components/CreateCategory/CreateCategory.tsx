import React, { ReactElement, useState } from "react";
import { Label, Container, Input, Button } from "./CreateCategory.elements";
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
    <Container>
      <Label htmlFor="newCategoryInput">Create New Category Tree</Label>
      <Input
        id="newCategoryInput"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Category tree title..."
      />
      <Button onClick={onSubmit} disabled={!input.trim()}>
        Create
      </Button>
    </Container>
  );
}

export default CreateCategory;
