"use client";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaPaintBrush,
  FaEnvelope,
  FaCalendar,
  FaCogs,
  FaUsers,
  FaDatabase,
  FaCode,
  FaPlug,
  FaGift,
  FaSignOutAlt,
} from "react-icons/fa";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
import Profile from "../components/settings/Profile";
import Accounts from "../components/settings/Accounts";
import Calendars from "../components/settings/Calendars";
import Appearance from "../components/settings/Appearance";
import Emails from "../components/settings/Emails";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #333;
  color: #fff;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const LeftColumn = styled.div`
  width: 25%;
  padding: 1rem;
  background: #444;
  background: #171717;
  overflow-y: auto;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const RightColumn = styled.div`
  width: 75%;
  padding: 1rem;
  overflow-y: auto;
  background: #1c1c1c;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  /* height: 100%; */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  /* margin-bottom: 1rem; */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  margin: 0.3rem;
  width: 80%;
  background: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border-radius: 3px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const items = {
  user: [
    { name: "Profile", icon: <FaUser /> },
    { name: "Appearance", icon: <FaPaintBrush /> },
    { name: "Accounts", icon: <FaUser /> },
    { name: "Emails", icon: <FaEnvelope /> },
    { name: "Calendars", icon: <FaCalendar /> },
  ],
  workspace: [
    { name: "General", icon: <FaCogs /> },
    { name: "Members", icon: <FaUsers /> },
    { name: "Data Model", icon: <FaDatabase /> },
    { name: "Developers", icon: <FaCode /> },
    { name: "Integration", icon: <FaPlug /> },
  ],
  other: [
    { name: "Releases", icon: <FaGift /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ],
};

const userComponents = {
  Profile: <Profile />,
  Appearance: <Appearance />,
  Accounts: <Accounts />,
  Emails: <Emails />,
  Calendars: <Calendars />,
};

export default function Page() {
  //   const history = useHistory();
  const [activeItem, setActiveItem] = useState("Profile");

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    <Container>
      <LeftColumn>
        {/* <Heading onClick={() => history.goBack()}> */}
        <Heading>
          <Link href="/" style={{ fontSize: "1rem", marginRight: "1rem" }}>
            <FaArrowLeft />
          </Link>
          <span>Settings</span>
        </Heading>

        <Section>
          <SectionTitle>User</SectionTitle>
          {items.user.map((item) => (
            <Item
              key={item.name}
              active={activeItem === item.name}
              onClick={() => handleItemClick(item.name)}
            >
              {item.icon}
              {item.name}
            </Item>
          ))}
        </Section>

        <Section>
          <SectionTitle>Workspace</SectionTitle>
          {items.workspace.map((item) => (
            <Item
              key={item.name}
              active={activeItem === item.name}
              onClick={() => handleItemClick(item.name)}
            >
              {item.icon}
              {item.name}
            </Item>
          ))}
        </Section>

        <Section>
          <SectionTitle>Others</SectionTitle>
          {items.other.map((item) => (
            <Item
              key={item.name}
              active={activeItem === item.name}
              onClick={() => handleItemClick(item.name)}
            >
              {item.icon}
              {item.name}
            </Item>
          ))}
        </Section>
      </LeftColumn>

      <RightColumn>
        <h2 style={{ color: "#888", letterSpacing: "1px", fontSize: "1.2rem" }}>
          {activeItem}
        </h2>
        {userComponents[activeItem]}
      </RightColumn>
    </Container>
  );
}
