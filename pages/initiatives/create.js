import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 16px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: bold;
  gap: 4px;
`;

export default function CreateInitiative() {
  return (
    <FormContainer>
      <StyledForm>
        <Label htmlFor="title">Initiative Title</Label>
        <input name="title" type="text" required></input>
        <Label htmlFor="description">Description</Label>
        <textarea name="description" required></textarea>
        <Label htmlFor="deadline">Deadline</Label>
        <input name="deadline" type="date" required></input>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <input name="tags" type="text"></input>
      </StyledForm>
    </FormContainer>
  );
}
