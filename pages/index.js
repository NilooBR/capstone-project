import InitiativeList from "@/Components/InitiativeList/InitiativeList";

export default function HomePage({ initiatives, onDeleteInitiative }) {

  return (
    <div>
      <InitiativeList initiatives={initiatives} onDelete={onDeleteInitiative} />
    </div>
  );
}
