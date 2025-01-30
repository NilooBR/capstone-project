import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";
import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";
import { parse, isValid } from "date-fns";

export default function InitiativeList() {
  const {
    data: initiatives,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/initiatives");

  const parsedDate = (date) => {
    if (!date || typeof date !== "string") return new Date(0);

    const parsed = parse(date, "dd.MM.yyyy", new Date());

    return isValid(parsed) ? parsed : new Date(0);
  };

  const validInitiatives = useMemo(() => {
    return Array.isArray(initiatives) ? initiatives : [];
  }, [initiatives]);

  const openInitiatives = useMemo(() => {
    return validInitiatives
      .filter((initiative) => !initiative.isCompleted)
      .sort((a, b) => parsedDate(a.deadline) - parsedDate(b.deadline));
  }, [validInitiatives]);

  const completedInitiatives = useMemo(() => {
    return validInitiatives
      .filter((initiative) => initiative.isCompleted)
      .sort((a, b) => parsedDate(a.deadline) - parsedDate(b.deadline));
  }, [validInitiatives]);

  if (isLoading) return <p>⏳ Fetching...</p>;
  if (error) return <p>❌ Error loading: {error.message}</p>;
  if (!initiatives) return <p>⏳ Loading...</p>;

  async function handleDelete(initiativeId) {
    await fetch(`/api/initiatives/${initiativeId}`, { method: "DELETE" });
    mutate();
  }

  return (
    <>
      <YourInitiatives>Your Initiatives</YourInitiatives>
      <ListContainer>
        <StyledLink href="/initiatives/create">
          ➕<br />
          Create Initiative
        </StyledLink>
        {openInitiatives.length === 0 ? (
          <NoInitiativesMessage>
            No open initiatives available. Please create some! 👆
          </NoInitiativesMessage>
        ) : (
          openInitiatives.map((initiative) => (
            <li key={initiative._id}>
              <InitiativeCard
                id={initiative._id}
                isCompleted={initiative.isCompleted}
                onDelete={() => handleDelete(initiative._id)}
              />
            </li>
          ))
        )}

        {completedInitiatives.length > 0 &&
          completedInitiatives.map((initiative) => (
            <li key={initiative._id}>
              <InitiativeCard
                id={initiative._id}
                isCompleted={initiative.isCompleted}
                onDelete={() => handleDelete(initiative._id)}
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
