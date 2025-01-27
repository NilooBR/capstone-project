import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";
import Link from "next/link";

export default function InitiativeList({ initiatives, onDelete }) {
  return (
    <>
      <YourInitiatives>Your Initiatives</YourInitiatives>
      <ListContainer>
        <StyledLink href="/initiatives/create">
          ➕<br></br>Create Initiative
        </StyledLink>
        {initiatives.length === 0 ? (
          <NoInitiativesMessage>
            No initiatives available. Please create initiatives first.👆
          </NoInitiativesMessage>
        ) : (
          initiatives.map((initiative) => (
            <li key={initiative._id}>
              <InitiativeCard
                id={initiative._id}
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
  background-color: "var(--mainbackground)";
`;

const YourInitiatives = styled.h1`
  color: var(--title);
  margin: 16px;
`;

const NoInitiativesMessage = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: var(--text);
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
  border-radius: 20px;
  border: 1px var(--cardborder);
  height: 150px;
  text-align: center;
  background-color: var(--highlightedcard);
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;
