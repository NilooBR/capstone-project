import { useState } from "react";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { initialData } from "@/lib/initialData";
import styled from "styled-components";

const ListContainer = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
`;

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <>
      <ListContainer>
        {initiatives.map((initiative) => (
          <InitiativeCard
            key={initiative.id}
            title={initiative.title}
            tags={initiative.tags}
            deadline={initiative.deadline}
          />
        ))}
      </ListContainer>
    </>
  );
}
