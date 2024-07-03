"use client";
import styled from "styled-components";
import { FaBuilding, FaSortDown, FaFilter, FaEllipsisV } from "react-icons/fa";
import companiesData from "../data/companies.json";

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
  background-color: #171717;
  /* overflow-y: scroll; */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* background-color: red; */
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

export default function CompaniesPage() {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <FaBuilding size={15} />
          <div style={{ marginLeft: "0.5rem" }}>
            <span>All Companies</span>
          </div>
          <HeaderIcon>
            <FaSortDown />
          </HeaderIcon>
        </HeaderLeft>
        <HeaderRight>
          <HeaderItem>
            <span>Filter</span>
            <FaFilter />
            <DropdownContent className="dropdown-content">
              <a href="#">Name</a>
              <a href="#">Domain</a>
              <a href="#">Account Owner</a>
              <a href="#">City</a>
              <a href="#">ICP</a>
            </DropdownContent>
          </HeaderItem>
          <HeaderItem>
            Sort
            <FaSortDown />
            <DropdownContent className="dropdown-content">
              <a href="#">Ascending</a>
              <a href="#">Descending</a>
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
              <th
                style={{
                  minWidth: "1.5rem",
                }}
              ></th>
              <FixedColumn>Name</FixedColumn>
              <th>Domain</th>
              <th>Account Owner</th>
              <th>Creation Date</th>
              <th>Employed</th>
              <th>LinkedIn</th>
              <th>Address</th>
              <th>ARR</th>
              <th>X</th>
              <th>Opportunities</th>
              <th>People</th>
              <th>ICP</th>
            </tr>
          </TableHead>
          <TableBody>
            {companiesData.map((company, index) => (
              <tr
                key={index}
                style={{
                  maxHeight: "2rem",
                  overflow: "hidden",
                  // backgroundColor: "pink",
                }}
              >
                <td>
                  <input type="checkbox" />
                </td>
                <FixedColumnData>{company.name}</FixedColumnData>
                <td style={{ width: "6rem" }}>{company.domain}</td>
                <td>{company.accountOwner}</td>
                <td>{company.creationDate}</td>
                <td>{company.employed}</td>
                <td>{company.linkedin}</td>
                <td>{company.address}</td>
                <td>{company.arr}</td>
                <td>{company.x}</td>
                <td>{company.opportunities}</td>
                <td>
                  {company.people.map((person) => person.name).join(", ")}
                </td>

                <td>{company.icp ? "Yes" : "No"}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </Body>
    </Container>
  );
}
