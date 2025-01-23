import CreateInitiativeForm from "@/Components/InitiativeForm";

export default function CreateInitiativePage({
  initiatives,
  onCreateInitiative,
}) {
  return (
    <CreateInitiativeForm
      onSubmit={onCreateInitiative}
      defaultData={initiatives}
    />
  );
}
