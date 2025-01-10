import InitiativeList from "@/Components/InitiativeList/InitiativeList";

export default function HomePage({ initiatives, onDeleteInitiative }) {
  console.log("Initiatives in HomePage:", initiatives);

  return (
    <div>
      <InitiativeList initiatives={initiatives} onDelete={onDeleteInitiative} />
    </div>
  );
}
