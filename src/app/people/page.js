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
  FaPlusCircle,
  FaUsers,
  FaPlus,
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
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};

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

const PageHeader = styled.div`
  position: absolute;
  top: 20px;
  width: 81.5%;
  margin-left: 1rem;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    background: ${({ theme }) => theme.background};
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background: ${({ theme }) => theme.background};
      background: lightgray;
      transition: all 0.2s ease;
    }
  }
`;

const PeopleIcon = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

// 🔴🔴🔴🔴
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 60rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #888;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

const AddUserButton = styled.button`
  padding: 0.5rem 3rem;
  /* background-color: #007bff; */
  color: #${({ theme }) => theme.color};
  border: none;
  border-radius: 5px;
  width: max-content;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  margin-left: auto;
  border: 1px solid ${({ theme }) => theme.color};
`;
const AddUserForm = styled.div`
  position: fixed;
  /* top: 50%;
  left: 50%; */
  transform: translate(-50%, -50%);
  width: 100rem;
  height: 20rem;
  background-color: red;
`;

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      company,
      creationDate,
      city,
      address,
      jobTitle,
      mobile,
      status,
    };
    onSave(newUser);
  };

  // Reset state and close modal
  const handleClose = () => {
    setName("");
    setEmail("");
    setCompany("");
    setCreationDate("");
    setCity("");
    setAddress("");
    setJobTitle("");
    setMobile("");
    setStatus("");
    onClose();
  };

  // Close modal on Escape key press
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleClose}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            onKeyPress={handleKeyPress}
          >
            <ModalHeader>
              <h2>Add User</h2>
              <CloseButton onClick={handleClose}>&times;</CloseButton>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                {/* <Label>Name</Label> */}
                <Input
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Email</Label> */}
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Company</Label> */}
                <Input
                  placeholder="Company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Creation Date</Label> */}
                <Input
                  placeholder="Creation Date"
                  type="text"
                  value={creationDate}
                  onChange={(e) => setCreationDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>City</Label> */}
                <Input
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Address</Label> */}
                <Input
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Job Title</Label> */}
                <Input
                  placeholder="Job Title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Mobile</Label> */}
                <Input
                  placeholder="Mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Status</Label> */}
                <Input
                  placeholder="Status"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormGroup>
              <AddUserButton type="submit">Add</AddUserButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
// 🔴🔴

export default function Page() {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isNewUserModalOpen, setNewUserModalOpen] = useState(false);

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

  // 🔴🔴
  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setNewUserModalOpen(false);
  };

  return (
    <Container>
      <PageHeader>
        <PeopleIcon>
          <FaUsers />
          People
        </PeopleIcon>
        <span onClick={() => setNewUserModalOpen(true)}>
          <FaPlus />
        </span>
      </PageHeader>
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
                    style={{ textDecoration: "none" }}
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
      {/* Modal for adding new user */}
      <AddUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setNewUserModalOpen(false)}
        onSave={handleAddUser}
      />
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
