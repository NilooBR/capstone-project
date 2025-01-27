import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";
import Link from "next/link";
import { useMemo } from "react";
import { format } from "date-fns";

export default function InitiativeList({ initiatives = [], onDelete }) {
  const parsedDate = (date) => {
    const splitDate = date.split(".");
    const [day, month, year] = splitDate;
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate;
  };

  const openInitiatives = useMemo(() => {
    return initiatives
      .filter((initiative) => !initiative.isCompleted)
      .sort((a, b) => {
        return parsedDate(a.deadline) - parsedDate(b.deadline);
      });
  }, [initiatives]);

  const completedInitiatives = useMemo(() => {
    return initiatives
      .filter((initiative) => initiative.isCompleted)
      .sort((a, b) => {
        return parsedDate(a.deadline) - parsedDate(b.deadline);
      });
  }, [initiatives]);
  return (
    <>
      <YourInitiatives>Your Initiatives</YourInitiatives>
      <ListContainer>
        <StyledLink href="/initiatives/create">
          ➕<br></br>Create Initiative
        </StyledLink>
        {openInitiatives.length === 0 ? (
          <NoInitiativesMessage>
            No open initiatives available. Please create some! 👆
          </NoInitiativesMessage>
        ) : (
          openInitiatives.map((initiative) => (
            <li key={initiative.id}>
              <InitiativeCard
                id={initiative.id}
                title={initiative.title}
                tags={initiative.tags}
                deadline={initiative.deadline}
                isCompleted={initiative.isCompleted}
                onDelete={onDelete}
              />
            </li>
          ))
        )}

        {completedInitiatives.length > 0 &&
          completedInitiatives.map((initiative) => (
            <li key={initiative.id}>
              <InitiativeCard
                id={initiative.id}
                title={initiative.title}
                tags={initiative.tags}
                deadline={initiative.deadline}
                isCompleted={initiative.isCompleted}
                onDelete={onDelete}
              />
            </li>
          ))}
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
