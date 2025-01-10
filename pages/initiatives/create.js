import CreateInitiative from "@/Components/CreateInitiative/CreateInitiative";
import styled from "styled-components";

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
