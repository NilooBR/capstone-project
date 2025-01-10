import InitiativeList from "@/Components/InitiativeList/InitiativeList";
import { initialData } from "@/lib/initialData";
import { useState } from "react";


export default function HomePage() {
    const [initiatives, setInitiatives] = useState(initialData);

      function handleDeleteInitiative( id ) {
        const updateInitiatives = initiatives.filter(
          (initiative) => initiative.id !== parseInt(id)
        );
    
        console.log("updateInitiatives ", updateInitiatives);
        setInitiatives(updateInitiatives);

      }


  return (
    <div>
      <InitiativeList 
      initiatives={initiatives}
      onDelete={handleDeleteInitiative}
      />
    </div>
  );
}
