import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  height: 80px;
  background-color: #005790;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
`;

function Header({ children }: Props): ReactElement {
  return <StyledHeader>{children}</StyledHeader>;
}

Header.Styled = StyledHeader;

export default Header;
