import InitiativeList from "@/Components/InitiativeList";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
  background-color: var(--highlightedcard);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px;
  border-radius: 10px;
  height: 150px;
  width: calc(100% - 32px);
  margin: 16px 16px;
  cursor: pointer;
`;

const NoInitiativesMessage = styled.span`
  font-size: 20px;
  color: var(--text);
  text-align: center;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function HomePage({
  initiatives,
  onDeleteInitiative,
  onToggleCompleted,
}) {
  return (
    <div>
      <StyledLink href="/initiatives/create">
        ➕<br></br>Create Initiative
      </StyledLink>
      {initiatives.length === 0 ? (
        <NoInitiativesMessage>
          No initiatives available. Please create an initiative to get started!
        </NoInitiativesMessage>
      ) : (
        <InitiativeList
          initiatives={initiatives}
          onDelete={onDeleteInitiative}
          onToggleCompleted={onToggleCompleted}
        />
      )}
    </div>
  );
}
