import React from "react";
import styled from "styled-components";
import { FaGoogle, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const Container = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.color};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  width: max-content;

  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #171717;
  outline: 1px solid lightgray;

  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Box = styled.div`
  /* flex: 1; */
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
  width: 35%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const BoxContent = styled.div``;

const BoxTitle = styled.h4`
  margin: 0;
  letter-spacing: 1px;
`;

const BoxText = styled.p`
  margin: 0;
  font-size: smaller;
  color: #666;
`;

function Accounts() {
  return (
    <Container>
      <Section>
        <SectionTitle>Connected accounts</SectionTitle>
        <p style={{ color: "#666", marginBottom: "0.5rem" }}>
          Manage your internet accounts.
        </p>
        <ConnectButton>
          <FaGoogle />
          Connect with Google
        </ConnectButton>
      </Section>
      <Section>
        <SectionTitle>Configure your emails and calendar settings</SectionTitle>
        <BoxContainer>
          <Box>
            <FaEnvelope />
            <BoxContent>
              <BoxTitle>Email</BoxTitle>
              <BoxText>Configure your email settings</BoxText>
            </BoxContent>
          </Box>
          <Box>
            <FaCalendarAlt />
            <BoxContent>
              <BoxTitle>Calendar</BoxTitle>
              <BoxText>Configure your calendar settings.</BoxText>
            </BoxContent>
          </Box>
        </BoxContainer>
      </Section>
    </Container>
  );
}

export default Accounts;
