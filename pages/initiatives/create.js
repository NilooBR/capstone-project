import { useRouter } from "next/router";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;
const Button = styled.div`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function CreateInitiative() {
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddEntry(data);
    event.target.reset();
  }

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Label htmlFor="title">Initiative Title</Label>
        <input name="title" type="text" required></input>
        <Label htmlFor="description">Description</Label>
        <textarea name="description" required></textarea>
        <Label htmlFor="deadline">Deadline</Label>
        <input name="deadline" type="date" required></input>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <input name="tags" type="text"></input>
      </StyledForm>
      <ButtonGroup>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="submit">Create</Button>
      </ButtonGroup>
    </FormContainer>
  );
}
