import { useState } from "react";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import { initialData } from "@/lib/initialData";

export default function InitiativeList() {
  const [initiatives, setInitiatives] = useState(initialData);

  return (
    <>
      {initiatives.map((initiative) => (
        <InitiativeCard
          key={initiative.id}
          title={initiative.title}
          tags={initiative.tags}
          deadline={initiative.deadline}
        />
      ))}
    </>
  );
}