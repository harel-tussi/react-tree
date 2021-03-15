import styled from "styled-components";

interface ContainerProps {
  root: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-left: 15px;
  position: relative;
  padding: 10px 0;
  ::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 18px;
    background-color: ${(props) => (props.root ? "transparent" : "#005790")};
    top: 5px;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  color: #005790;
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input``;

export const ActionButton = styled.button`
  color: black;
  padding: 0.2rem 0.6rem;
  border-radius: 0.3125rem;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 9%);
  background-color: #333333;
  color: #fff;
  margin-left: 0.75rem;
  border: none;
`;
