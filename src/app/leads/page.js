"use client";

import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Page() {
  return <Container>Leads page will be made soon...</Container>;
}
