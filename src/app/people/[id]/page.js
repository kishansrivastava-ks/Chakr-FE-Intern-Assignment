"use client";
import styled from "styled-components";
import { useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendar,
  FaTasks,
  FaStickyNote,
  FaEnvelopeOpenText,
  FaClock,
  FaSortDown,
} from "react-icons/fa";
import usersData from "../../data/users.json";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: #fff;
  background-color: #171717;
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #333;
`;

const UserAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 3rem;
  width: 100%;
  border-bottom: 1px solid #333;

  & > h1 {
    letter-spacing: 2px;
  }
`;

const Avatar = styled.div`
  background-color: #575757;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const UserDetails = styled.div`
  width: 90%;
  /* text-align: center; */
  margin-bottom: 2rem;
  /* background-color: green; */

  p {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    letter-spacing: 2px;

    span {
      margin-right: 1rem;
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Company = styled.div`
  width: 100%;
  text-align: center;
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #333;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const TabsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #171717;
  /* padding: 0.5rem 0; */
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};

  &.active {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    border-bottom: 2px solid ${({ theme }) => theme.color};
  }
`;

const TabBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #575757;
  font-size: 1.2rem;

  & > div {
    display: flex;
    align-items: center;
    /* background-color: red; */
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default function Page({ params }) {
  const [activeTab, setActiveTab] = useState("Timeline");
  const userId = params.id;
  const user = usersData.find((user) => user.id === userId);

  if (!user) {
    return <div className="max-w-6xl mx-auto mt-8">User not found</div>;
  }

  return (
    <Container>
      <LeftColumn>
        <UserAvatar>
          <Avatar>{user.name.charAt(0)}</Avatar>
          <h1>{user.name}</h1>
        </UserAvatar>
        <UserDetails>
          <p>
            <span>
              <FaEnvelope />
            </span>{" "}
            Email: {user.email}
          </p>
          <p>
            <span>
              <FaPhone />
            </span>{" "}
            Mobile: {user.mobile}
          </p>
          <p>
            <span>
              {" "}
              <FaBriefcase />
            </span>{" "}
            Job Title: {user.jobTitle}
          </p>
          <p>
            <span>
              <FaMapMarkerAlt />
            </span>{" "}
            City: {user.city}
          </p>
          <p>
            <span>
              <FaCalendar />
            </span>{" "}
            Creation Date: {user.creationDate}
          </p>
          <p>
            <span>
              <FaMapMarkerAlt />
            </span>{" "}
            Address: {user.address}
          </p>
        </UserDetails>
        <Company>
          <p>
            <span>
              {" "}
              <FaBuilding />
            </span>{" "}
            {user.company ? user.company : "No Company"}
          </p>
        </Company>
      </LeftColumn>
      <RightColumn>
        <TabsHeader>
          {[
            { name: "Timeline", icon: <FaClock /> },
            { name: "Tasks", icon: <FaTasks /> },
            { name: "Notes", icon: <FaStickyNote /> },
            { name: "Emails", icon: <FaEnvelopeOpenText /> },
            { name: "Calendar", icon: <FaCalendar /> },
          ].map((tab) => (
            <Tab
              key={tab.name}
              className={activeTab === tab.name ? "active" : ""}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon} {tab.name}
            </Tab>
          ))}
        </TabsHeader>
        <TabBody>
          {activeTab === "Timeline" && (
            <div>
              <FaClock /> <span>No Timeline</span>
            </div>
          )}
          {activeTab === "Tasks" && (
            <div>
              <FaTasks /> <span>No Tasks</span>
            </div>
          )}
          {activeTab === "Notes" && (
            <div>
              <FaStickyNote /> <span>No Notes</span>
            </div>
          )}
          {activeTab === "Emails" && (
            <div>
              <FaEnvelopeOpenText /> <span>No Emails</span>
            </div>
          )}
          {activeTab === "Calendar" && (
            <div>
              <FaCalendar /> <span>No Calendar</span>
            </div>
          )}
        </TabBody>
      </RightColumn>
    </Container>
  );
}
