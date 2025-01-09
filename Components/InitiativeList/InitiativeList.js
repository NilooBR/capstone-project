import { useState } from "react";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { initialData } from "@/lib/initialData";
import styled from "styled-components";
import Link from "next/link";

const ListContainer = styled.ul`
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  list-style: none;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

`

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <ListContainer>
      {initiatives.map((initiative) => (
        <li key={initiative.id}>
          <StyledLink href={`/initiatives/${initiative.id}`}>
            <InitiativeCard
              title={initiative.title}
              tags={initiative.tags}
              deadline={initiative.deadline}
            />
          </StyledLink>
        </li>
      ))}
    </ListContainer>
  );
}
