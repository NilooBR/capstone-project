import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";
import Link from "next/link";

export default function InitiativeList({ initiatives, onDelete }) {
  return (
    <>
      <Title>Your Initiatives</Title>
      <ListContainer>
        <StyledLink href="/initiatives/create">➕ Create Initiative</StyledLink>
        {initiatives.length === 0 ? (
          <NoInitiativesMessage>
            No initiatives available. Please create initiatives first.👆
          </NoInitiativesMessage>
        ) : (
          initiatives.map((initiative) => (
            <li key={initiative.id}>
              <InitiativeCard
                id={initiative.id}
                title={initiative.title}
                tags={initiative.tags}
                deadline={initiative.deadline}
                isCompleted={initiative?.isCompleted || false}
                onDelete={onDelete}
              />
            </li>
          ))
        )}
      </ListContainer>
    </>
  );
}

// Styled Components

const ListContainer = styled.ul`
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  list-style: none;
`;

const Title = styled.h1`
  margin: 16px;
`;

const NoInitiativesMessage = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 150px;
  text-align: center;
  background-color: lightgrey;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;
