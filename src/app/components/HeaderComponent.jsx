import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaBuilding, FaUsers, FaCog, FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.div`
  margin-right: 0.5rem;
`;

const AddIcon = styled.div`
  cursor: pointer;
`;

// Mapping of paths to titles and icons
const pageDetails = {
  "/people": { title: "People", icon: <FaUsers /> },
  "/companies": { title: "Companies", icon: <FaBuilding /> },
  "/settings": { title: "Settings", icon: <FaCog /> },
  // Add more mappings as needed
};

const HeaderComponent = () => {
  const router = useRouter();
  const [currentDetails, setCurrentDetails] = useState({
    title: "Loading...",
    icon: null,
  });

  useEffect(() => {
    const { pathname } = router;
    const { title, icon } = pageDetails[pathname] || {
      title: "Companies",
      icon: <FaBuilding />,
    };
    setCurrentDetails({ title, icon });
  }, [router, router.pathname]);

  return (
    <Header>
      <HeaderTitle>
        <HeaderIcon>{currentDetails.icon}</HeaderIcon>
        <div>{currentDetails.title}</div>
      </HeaderTitle>
      <AddIcon>
        <FaPlus />
      </AddIcon>
    </Header>
  );
};

export default HeaderComponent;
