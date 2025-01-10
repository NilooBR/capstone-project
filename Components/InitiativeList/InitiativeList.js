import { useState } from "react";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { initialData } from "@/lib/initialData";
import styled from "styled-components";

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

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <>
      <Title>Your Initiatives</Title>
      <ListContainer>
        {initiatives.map((initiative) => (
          <li key={initiative.id}>
            <InitiativeCard
              id={initiative.id}
              title={initiative.title}
              tags={initiative.tags}
              deadline={initiative.deadline}
            />
          </li>
        ))}
      </ListContainer>
    </>
  );
}
