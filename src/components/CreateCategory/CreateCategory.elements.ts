import styled from "styled-components";

export const Label = styled.label`
  display: block;
`;

export const Container = styled.div`
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 0.625rem;
  border: 1px solid #eaeaea;
  background-color: #fff;
  padding-left: 1.5rem;
  outline-color: #333333;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const Button = styled.button`
  background-color: #333333;
  height: 30px;
  color: #fff;
  border-radius: 6px;
  border: none;

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
