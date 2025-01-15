import InitiativeList from "@/Components/InitiativeList/InitiativeList";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 10px;
  height: 150px;
  width: calc(100% - 32px);
  margin: 16px 16px;
  cursor: pointer;
  background-color: lightgrey;
`;

const NoInitiativesMessage = styled.span`
  font-size: 20px;
  color: black;
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
      <StyledLink href="/initiatives/create">➕Create Initiative</StyledLink>
      {initiatives.length === 0 ? (
        <NoInitiativesMessage>
          No initiatives available. Please create initiatives first.👆
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
