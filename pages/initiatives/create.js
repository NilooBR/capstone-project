import CreateInitiative from "@/Components/CreateInitiative/CreateInitiative";

export default function CreateInitiativePage({
  initiatives,
  onCreateInitiative,
}) {
  return (
    <CreateInitiative
      onSubmit={onCreateInitiative}
      formName={"create-initiative"}
      defaultData={initiatives}
    />
  );
}
