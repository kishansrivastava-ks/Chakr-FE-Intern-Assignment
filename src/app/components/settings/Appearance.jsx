import React from "react";
import styled from "styled-components";
// import { useTheme } from "./ThemeContext";
import { useTheme } from "../../../contexts/ThemeContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  background: #1c1c1c;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: #666;
`;

const ThemeOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const ThemePreview = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

const themes = [
  { name: "Light", color: "#fff", themeKey: "light" },
  { name: "Dark", color: "#333", themeKey: "dark" },
  { name: "Purple Light", color: "#f3e5f5", themeKey: "purpleLight" },
  { name: "Purple Dark", color: "#4a148c", themeKey: "purpleDark" },
];

function Appearance() {
  const { changeTheme } = useTheme();

  return (
    <Container>
      <Title>Choose Theme</Title>
      <Section>
        {themes.map((theme) => (
          <ThemeOption
            key={theme.name}
            onClick={() => changeTheme(theme.themeKey)}
          >
            <ThemePreview color={theme.color} />
            {theme.name}
          </ThemeOption>
        ))}
      </Section>
    </Container>
  );
}

export default Appearance;
