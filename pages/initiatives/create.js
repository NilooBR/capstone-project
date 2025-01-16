import CreateInitiativeForm from "@/Components/CreateInitiativeForm";

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
