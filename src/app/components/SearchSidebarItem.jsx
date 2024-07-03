import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  FaBriefcase,
  FaBuilding,
  FaSearch,
  FaTasks,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import usersData from "../data/users.json";
import { FaGear } from "react-icons/fa6";

const SidebarItem = styled.div`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #1f1f1f;
  padding: 1rem;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  color: #fff;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  /* border: 1px solid #333; */
  background: #1f1f1f;
  color: #fff;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};

  &:focus {
    outline: none;
    /* border-color: #575757; */
  }
`;
const NavTitle = styled.div`
  color: #666;
`;
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const NavLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 3px;
  transition: background 0.1s;
  /* background-color: red; */
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  /* background-color: lightblue; */
  height: 15rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecentSearch = styled.div`
  border-top: 1px solid #333;
  padding-top: 0.5rem;
  text-align: center;
  color: #ccc;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const Modal = ({ isOpen, onClose, users, onSearch, recentSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SearchBar
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={handleSearchChange}
        />
        {query ? (
          <SearchResults>
            {users.map((user) => (
              <NavLinkItem
                href={`/people/${user.id}`}
                key={user.id}
                onClick={onClose}
              >
                <span>
                  <FaUser />
                </span>
                {user.name}
              </NavLinkItem>
            ))}
          </SearchResults>
        ) : (
          <NavLinks>
            <NavTitle>Navigate</NavTitle>
            <NavLinkItem href="/people" onClick={onClose}>
              <span>
                <FaUsers />
              </span>
              Go to People
            </NavLinkItem>
            <NavLinkItem href="/companies" onClick={onClose}>
              <span>
                <FaBuilding />
              </span>
              Go to Companies
            </NavLinkItem>
            <NavLinkItem href="/opportunities" onClick={onClose}>
              <span>
                <FaBriefcase />
              </span>
              Go to Opportunities
            </NavLinkItem>
            <NavLinkItem href="/settings" onClick={onClose}>
              <span>
                <FaGear />
              </span>
              Go to Settings
            </NavLinkItem>
            <NavLinkItem href="/tasks" onClick={onClose}>
              <span>
                <FaTasks />
              </span>
              Go to Tasks
            </NavLinkItem>
          </NavLinks>
        )}
        {recentSearch && (
          <RecentSearch>Most recently searched: {recentSearch}</RecentSearch>
        )}
        <p
          style={{
            color: "#666",
            fontSize: "0.7rem",
            marginLeft: "auto",
            textAlign: "right",
            // backgroundColor: "red",
          }}
        >
          Press Esc to exit
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

const SearchSidebarItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearch, setRecentSearch] = useState("");

  const handleSearch = (query) => {
    if (query) {
      const results = usersData.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      if (results.length > 0) {
        setRecentSearch(results[0].name);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setIsModalOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <SidebarItem onClick={() => setIsModalOpen(true)}>
        <FaSearch />
        Search
      </SidebarItem>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={searchResults}
        onSearch={handleSearch}
        recentSearch={recentSearch}
      />
    </>
  );
};

export default SearchSidebarItem;
