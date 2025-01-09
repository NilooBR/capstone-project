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

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <>
      <ListContainer>
        {initiatives.map((initiative) => (
          <li key={initiative.id}>
            <InitiativeCard
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
