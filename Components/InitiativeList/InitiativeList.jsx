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

const CreateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 10px;
  height: 150px;
  width: 100%;
  cursor: pointer;
`;

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <>
      <ListContainer>
        <CreateCard>➕Create Initiative</CreateCard>
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
