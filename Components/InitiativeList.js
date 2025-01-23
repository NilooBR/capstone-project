import styled from "styled-components";
import InitiativeCard from "./InitiativeCard";

const ListContainer = styled.ul`
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  background-color: "var(--mainbackground)";
`;

const YourInitiatives = styled.h1`
  color: var(--accents);
  text-align: left;
  padding-left: 5%;
`;

const Title = styled.h1`
  margin: 16px;
`;

export default function InitiativeList({ initiatives, onDelete }) {
  return (
    <>
      <YourInitiatives>Your Initiatives</YourInitiatives>
      <ListContainer>
        {initiatives.map((initiative) => (
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
        ))}
      </ListContainer>
    </>
  );
}
