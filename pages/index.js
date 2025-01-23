import InitiativeList from "@/Components/InitiativeList";

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
