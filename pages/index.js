import InitiativeList from "@/Components/InitiativeList/InitiativeList";

export default function HomePage({ initiatives, onDeleteInitiative, onMarkAsCompleted }) {

  return (
    <div>
      <InitiativeList 
        initiatives={initiatives} 
        onDelete={onDeleteInitiative}
        onMarkAsCompleted={onMarkAsCompleted}
         />
    </div>
  );
}
