import CreateInitiative from "@/Components/CreateInitiative/CreateInitiative";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 20px;
  text-align: center;
`;

export default function CreateInitiativePage({ initiatives, onCreateInitiative }) {
  return (
    <>
      <Heading>Create Initiative</Heading>
      <CreateInitiative
        onSubmit={onCreateInitiative}
        formName={"create-initiative"}
        defaultData={initiatives}
      />
    </>
  );
}
