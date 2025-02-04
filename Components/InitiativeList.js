import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";
import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";
import { parse, isValid } from "date-fns";

export default function InitiativeList() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetcher = async (url) => {
    if (!token) throw new Error("No token found");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch initiatives");
    }

    return res.json();
  };

  const { data, error, mutate, isLoading } = useSWR(
    token ? "/api/initiatives" : null,
    fetcher
  );

  const parsedDate = (date) => {
    if (!date || typeof date !== "string") return new Date(0);
    const parsed = parse(date, "dd.MM.yyyy", new Date());
    return isValid(parsed) ? parsed : new Date(0);
  };

  const validInitiatives = useMemo(() => {
    return Array.isArray(data?.data) ? data.data : [];
  }, [data]);

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
  if (error) return <p>❌ Error: {error.message}</p>;

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

        {openInitiatives.length === 0 && completedInitiatives.length === 0 ? (
          <NoInitiativesMessage>
            No initiatives yet! Start by creating one above. 👆
          </NoInitiativesMessage>
        ) : (
          <>
            {openInitiatives.map((initiative) => (
              <li key={initiative._id}>
                <InitiativeCard
                  id={initiative._id}
                  isCompleted={initiative.isCompleted}
                  onDelete={() => handleDelete(initiative._id)}
                />
              </li>
            ))}
            {completedInitiatives.map((initiative) => (
              <li key={initiative._id}>
                <InitiativeCard
                  id={initiative._id}
                  isCompleted={initiative.isCompleted}
                  onDelete={() => handleDelete(initiative._id)}
                />
              </li>
            ))}
          </>
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
  background-color: var(--mainbackground);
`;

const YourInitiatives = styled.h1`
  color: var(--title);
  margin-top: 60px;
  margin-left: 10px;
  font-size: 1.8rem;
  padding: 20px 20px 0 0;
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
