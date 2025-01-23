import InitiativeList from "@/Components/InitiativeList";
import styled from "styled-components";

export default function HomePage({
  initiatives,
  onDeleteInitiative,
  onToggleCompleted,
}) {
  return (
    <InitiativeList
      initiatives={initiatives}
      onDelete={onDeleteInitiative}
      onToggleCompleted={onToggleCompleted}
    />
  );
}
