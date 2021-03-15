import styled from "styled-components";

interface NodeStyleProps {
  root?: boolean;
}

export const Container = styled.div<NodeStyleProps>`
  margin-left: 15px;
  position: relative;
  padding: 10px 0;
`;

export const ChildrenContainer = styled.div<NodeStyleProps>`
  position: relative;
  padding-left: 20px;
`;

export const Toggle = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #005790;
  border: none;
  color: #fff;
  margin-right: 10px;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h3<NodeStyleProps>`
  color: #005790;
  font-weight: bold;
  margin: 0;
  position: relative;
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
