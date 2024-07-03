import React from "react";
import styled from "styled-components";
import { FaUser, FaUpload, FaTrash } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: #fff;
  background-color: #1c1c1c;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  /* margin-left: 5rem; */
`;

const Input = styled.input`
  width: 50%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: #444;
  border: 1px solid #575757;
  color: #fff;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  border-radius: 5px;
  ::placeholder {
    color: #ccc;
  }
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
  margin-right: 0.5rem;
  background: #575757;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 8rem;
  transition: background 0.2s;

  &:hover {
    background: #666;
  }
`;

const DangerButton = styled(Button)`
  background: #d9534f;
  width: max-content;

  &:hover {
    background: #c9302c;
  }
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
  & > span {
    margin: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    padding-right: 0.5rem;
    border-radius: 5px;
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.color};
  }
`;

const NameInputs = styled.div`
  display: flex;
  gap: 1rem;
  /* justify-content: space-between; */

  input {
    width: 30%;
  }
`;

function Profile() {
  return (
    <Container>
      <Section>
        <Title>
          {/* <FaUser /> */}
          Picture
        </Title>
        <ProfilePicture>
          <span>
            <FaUser />
          </span>
          <div>
            <Button>Upload</Button>
            <Button>Remove</Button>
          </div>
        </ProfilePicture>
        <InfoText>
          We support your best PNGs, JPEGs and GIFs portraits under 10MB
        </InfoText>
      </Section>

      <Section>
        <Title>Name</Title>
        <InfoText>Your name as it will be displayed</InfoText>
        <NameInputs>
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
        </NameInputs>
      </Section>

      <Section>
        <Title>Email</Title>
        <InfoText>The email associated to your account</InfoText>
        <Input type="email" placeholder="Email" />
      </Section>

      <Section>
        <Title>Change Password</Title>
        <InfoText>Receive an email containing password update link</InfoText>
        <Button style={{ width: "max-content" }}>Change Password</Button>
      </Section>

      <Section>
        <Title>Danger Zone</Title>
        <InfoText>Delete account and all the associated data</InfoText>
        <DangerButton>Delete Account</DangerButton>
      </Section>
    </Container>
  );
}

export default Profile;
