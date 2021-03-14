import styled from "styled-components";

export const Container = styled.div`
  margin-left: 15px;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  color: #005790;
  font-weight: bold;
  border-left: 1px solid;
  margin: 0;
  padding-top: 10px;

  ::before {
    content: "";
    width: 20px;
    height: 1px;
    background-color: red;
  }
`;

export const Input = styled.input``;

export const ActionButton = styled.button`
  background-color: Yellow;
  color: black;
`;
