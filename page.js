"use client";
import { useState } from "react";
import styled from "styled-components";
import {
  FaBars,
  FaBriefcase,
  FaBuilding,
  FaCog,
  FaPlus,
  FaQuestionCircle,
  FaSearch,
  FaTasks,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: ${(props) => (props.isSidebarOpen ? "250px" : "60px")} 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  background-color: #f5f5f5;
  transition: grid-template-columns 0.3s ease-in-out;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) => (props.isSidebarOpen ? "flex-start" : "center")};
  transition: all 0.3s ease-in-out;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #333;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.main`
  grid-area: main;
  padding: 20px;
  background-color: #e0e0e0;
  background-color: #161414;
  /* margin: 5px; */
  /* border-radius: 3px; */
  border: 5px solid #333;
`;

const ToggleButton = styled.div`
  cursor: pointer;
  margin-left: ${(props) => (props.isSidebarOpen ? "auto" : "0")};
`;

const Logo = styled.img`
  /* font-size: 1.5rem; */
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
`;

const Title = styled.div`
  font-size: 1rem;
  display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;

const AddIcon = styled.div`
  cursor: pointer;
  font-size: 1rem;
`;
const SideSupport = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// SIDEBAR BODY
const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: background 0.1s;
  border-radius: 3px;
  font-size: smaller;
  margin-bottom: 0.3rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 10px;
  }
`;

// Sidebar component section
const SidebarContent = styled.div`
  /* margin-top: 3rem; */
  margin-bottom: auto;
  width: 100%;
  /* background-color: red; */
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;
`;

const SidebarSectionHeading = styled.h4`
  margin-bottom: 1rem;
`;
export default function Page({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <Header>
        <HeaderTitle>
          <HeaderIcon>
            <FaBuilding />
          </HeaderIcon>
          <div>Companies</div>
        </HeaderTitle>
        <AddIcon>
          <FaPlus />
        </AddIcon>
      </Header>
      <Sidebar isSidebarOpen={isSidebarOpen}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Logo
            isSidebarOpen={isSidebarOpen}
            src="https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF"
          />
          <Title isSidebarOpen={isSidebarOpen}>Twenty</Title>
          <ToggleButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
            <FaBars />
          </ToggleButton>
        </div>
        {isSidebarOpen && (
          <div
            style={{ marginTop: "1rem", marginBottom: "auto", width: "100%" }}
          >
            <SidebarContent>
              <SidebarSection>
                <Link href="/settings" passHref>
                  <SidebarItem>
                    <FaCog />
                    Settings
                  </SidebarItem>
                </Link>
                <Link href="/search" passHref>
                  <SidebarItem>
                    <FaSearch />
                    Search
                  </SidebarItem>
                </Link>
                <Link href="/tasks" passHref>
                  <SidebarItem>
                    <FaTasks />
                    Tasks
                  </SidebarItem>
                </Link>
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionHeading>Workspaces</SidebarSectionHeading>
                <Link href="/people" passHref>
                  <SidebarItem>
                    <FaUsers />
                    People
                  </SidebarItem>
                </Link>
                <Link href="/companies" passHref>
                  <SidebarItem>
                    <FaBuilding />
                    Companies
                  </SidebarItem>
                </Link>
                <Link href="/opportunities" passHref>
                  <SidebarItem>
                    <FaBriefcase />
                    Opportunities
                  </SidebarItem>
                </Link>
                <Link href="/leads" passHref>
                  <SidebarItem>
                    <FaUserTie />
                    Leads
                  </SidebarItem>
                </Link>
              </SidebarSection>
            </SidebarContent>
          </div>
        )}
        {isSidebarOpen && (
          <SideSupport>
            Support <FaQuestionCircle />
          </SideSupport>
        )}
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
}

// export default Page;
