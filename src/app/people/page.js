"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaSortDown,
  FaFilter,
  FaEllipsisV,
  FaTrashAlt,
  FaFileExport,
} from "react-icons/fa";
import usersData from "../data/users.json";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #171717;
  color: #fff;
  font-size: 0.9rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  /* background-color: #255; */
  /* width: max-content; */
  gap: 0.3rem;
`;
const HeaderIcon = styled.div`
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderItem = styled.div`
  cursor: pointer;
  position: relative;
  /* background-color: red; */
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownContent = styled.div`
  border-radius: 3px;
  display: none;
  position: absolute;
  top: 100%;
  background-color: rgba(51, 51, 51, 0.9);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;

  a {
    color: white;
    padding: 0.3rem;
    text-decoration: none;
    display: block;
  }

  a:hover {
    background-color: #575757;
  }
`;

const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1rem;
  background-color: #161414;
  background-color: #171717;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  th {
    text-align: left;
    border-bottom: 1px solid #333;
    min-width: 7rem;
    width: max-content;
    font-size: smaller;
  }
`;

const TableBody = styled.tbody`
  tr {
    font-size: 0.8rem;
    /* background-color: yellow; */
    height: 3rem;
    overflow: hidden;
    &:hover {
      /* background-color: #2a2a2a; */
      cursor: pointer;
    }
  }

  td {
    /* padding: 0.5rem; */
    border-bottom: 1px solid #333;
    margin-right: 5rem;
  }
`;

const FixedColumn = styled.th`
  position: sticky;
  left: 0;
  background-color: #171717;
  /* z-index: 1; */
`;

const FixedColumnData = styled.td`
  /* position: sticky; */
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
  left: 0;
  background-color: #171717;
  /* z-index: 1; */
`;
const PopupFooter = styled.div`
  position: fixed;
  bottom: 5%;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: rgba(51, 51, 51, 0.9); */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 15%;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
`;

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: #444;
  background-color: rgba(51, 51, 51, 0.9);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background: #575757;
  }
  &:nth-child(1) {
    color: #ff1234;
    font-weight: 600;
  }
`;

export default function Page() {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const handleFilterChange = (field) => {
    setFilterField(field);
    setFilterValue("");
    setFilterDropdownOpen(true);
  };

  const handleFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    const newFilteredUsers = users.filter((user) =>
      user[filterField].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(newFilteredUsers);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredUsers(sortedUsers);
  };

  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.includes(user);
    const newSelectedUsers = isSelected
      ? selectedUsers.filter((u) => u !== user)
      : [...selectedUsers, user];
    setSelectedUsers(newSelectedUsers);
  };

  const handleDelete = () => {
    const newUsers = users.filter((user) => !selectedUsers.includes(user));
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    setSelectedUsers([]);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      selectedUsers.map((user) => Object.values(user).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilterDropdownClose = () => {
    setFilterDropdownOpen(false);
    setFilterField("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-content")) {
        handleFilterDropdownClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <FaUser size={15} />
          <div style={{ marginLeft: "0.5rem" }}>
            <span>All People</span>
          </div>
          <HeaderIcon>
            <FaSortDown />
          </HeaderIcon>
        </HeaderLeft>
        <HeaderRight>
          <HeaderItem onClick={() => setFilterDropdownOpen(true)}>
            <span>Filter</span>
            <FaFilter />
            <DropdownContent
              className="dropdown-content"
              style={{ display: filterDropdownOpen ? "block" : "none" }}
            >
              {[
                "Name",
                "Email",
                "Company",
                "City",
                "Job Title",
                "Mobile",
                "Status",
              ].map((field) => (
                <a
                  key={field}
                  onClick={() => handleFilterChange(field.toLowerCase())}
                  style={{
                    backgroundColor:
                      filterField === field.toLowerCase()
                        ? "#575757"
                        : "transparent",
                  }}
                >
                  {field}
                </a>
              ))}
              {filterField && (
                <input
                  type="text"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  placeholder={`Search by ${filterField}`}
                  style={{
                    width: "calc(100% - 24px)",
                    padding: "0.5rem",
                    background: "#444",
                    border: "1px solid #575757",
                    color: "#fff",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                  }}
                />
              )}
            </DropdownContent>
          </HeaderItem>
          <HeaderItem>
            Sort
            <FaSortDown />
            <DropdownContent className="dropdown-content">
              <a onClick={() => handleSort("name")}>Name</a>
              <a onClick={() => handleSort("email")}>Email</a>
              <a onClick={() => handleSort("company")}>Company</a>
              <a onClick={() => handleSort("creationDate")}>Creation Date</a>
              <a onClick={() => handleSort("city")}>City</a>
              <a onClick={() => handleSort("jobTitle")}>Job Title</a>
              <a onClick={() => handleSort("mobile")}>Mobile</a>
              <a onClick={() => handleSort("status")}>Status</a>
            </DropdownContent>
          </HeaderItem>
          <HeaderItem>
            Options
            <FaEllipsisV />
            <DropdownContent className="dropdown-content">
              <a href="#">Fields</a>
              <a href="#">Import</a>
              <a href="#">Export</a>
            </DropdownContent>
          </HeaderItem>
        </HeaderRight>
      </Header>
      <Body>
        <Table>
          <TableHead>
            <tr>
              <th style={{ minWidth: "2rem" }}></th>
              <FixedColumn>Name</FixedColumn>
              <th>Email</th>
              <th>Company</th>
              <th>Creation Date</th>
              <th>City</th>
              <th>Address</th>
              <th>Job Title</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleCheckboxChange(user)}
                  />
                </td>
                <FixedColumnData>
                  <a
                    href={`/people/${user.id}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {user.name}
                  </a>
                </FixedColumnData>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>{user.creationDate}</td>
                <td>{user.city}</td>
                <td>{user.address}</td>
                <td>{user.jobTitle}</td>
                <td>{user.mobile}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </Body>
      {selectedUsers.length > 0 && (
        <PopupFooter>
          <Button onClick={handleDelete}>
            <FaTrashAlt />
            Delete
          </Button>
          <Button onClick={handleExport}>
            <FaFileExport />
            Export
          </Button>
        </PopupFooter>
      )}
    </Container>
  );
}
