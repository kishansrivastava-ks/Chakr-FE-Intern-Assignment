"use client";
// "eslint-disabled";
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
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
// import { useRouter } from "next/router";
import SearchSidebarItem from "../app/components/SearchSidebarItem";
// import { useRouter } from "next/router";
// import { FaBuilding, FaUser, FaBriefcase, FaPlus } from "react-icons/fa";
import { ReactNode } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
}
interface HomeProps {
  children: ReactNode;
}

const Container = styled.div<SidebarProps>`
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

const Sidebar = styled.div<SidebarProps>`
  grid-area: sidebar;
  background-color: #333;
  background-color: #1c1c1c;
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
  background-color: #1c1c1c;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.main`
  grid-area: main;
  background-color: #161414;
  background-color: #171717;
  border: 5px solid #333;
  border: 5px solid #171717;
  /* height: 89vh; */
  /* width: 84vw; */
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  /* background-color: red; */
`;

const ToggleButton = styled.div<SidebarProps>`
  cursor: pointer;
  margin-left: ${(props) => (props.isSidebarOpen ? "auto" : "0")};
`;

const Logo = styled.img<SidebarProps>`
  /* font-size: 1.5rem; */
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
`;

const Title = styled.div<SidebarProps>`
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

// const getTitleAndIcon = (pathname) => {
//   switch (pathname) {
//     case "/people":
//       return { title: "People", icon: <FaUser /> };
//     case "/companies":
//       return { title: "Companies", icon: <FaBuilding /> };
//     case "/jobs":
//       return { title: "Jobs", icon: <FaBriefcase /> };
//     default:
//       return { title: "Dashboard", icon: <FaUser /> }; // Default case
//   }
// };

const HomeSample = ({ children }: HomeProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // const { title, icon } = getTitleAndIcon(router.pathname);

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
                {/* <Link href="/search" passHref>
                  <SidebarItem>
                    <FaSearch />
                    Search
                  </SidebarItem>
                </Link> */}
                <SearchSidebarItem />
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
};

function Home2() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // const { title, icon } = getTitleAndIcon(router.pathname);

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
                {/* <Link href="/search" passHref>
                    <SidebarItem>
                      <FaSearch />
                      Search
                    </SidebarItem>
                  </Link> */}
                <SearchSidebarItem />
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
      {/* <Main>{children}</Main> */}
      <Main>main body</Main>
    </Container>
  );
}

const StyledHome = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  letter-spacing: 2px;
  color: #fff;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;
const Caption = styled.div`
  color: #fff;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

export default function Home() {
  return (
    <>
      <StyledHome>
        <span>Welcome to Twenty</span>
        <Caption>click on a nav item to proceed</Caption>
      </StyledHome>
      ;
    </>
  );
}
