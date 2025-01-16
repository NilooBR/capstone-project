import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  font-size: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #bcc1c5;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const DEFAULT_VALUES = {
  title: "",
  description: "",
  status: "Pending",
}

export default function CreateTaskForm({

    defaultDataTask = {},
}) {
    const router = useRouter();
    const { id: initiativeId } = router.query;

    const [formData, setFormData] = useState({
      ...DEFAULT_VALUES,
      ...defaultDataTask,
    })

  function handleCancelTask() {
    router.push(`/initiatives/${initiativeId}`);
  }

  function handleChangeTask(event) {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value};
    setFormData(updatedFormData);
    console.log("formData: ", updatedFormData );
  }

  function handleSubmitTask(event) {
    event.preventDefault();

    const { title, description, status } = formData;

    const updatedTask = {
      id: crypto.randomUUID(),
      ...formData,
    }
    console.log("Submitted formData: ", updatedTask);



  //  onSubmitTask(updatedFormData); // Pass the form data to the parent
  }

    return (
     <Form onSubmit={handleSubmitTask}>
        <Heading>Create Task</Heading>
        <Label>
            Task Title
        </Label>
        <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChangeTask}
        />

        <Label>
            Description
          <Textarea
            id="description"
            name="description"
            type="text"
            rows="4"
            value={formData.description}
            onChange={handleChangeTask}
        /> 
        </Label>

        <Label for="status">
            Status
        <select 
          name="status" 
          id="status"
          value={formData.status}
          onChange={handleChangeTask}
          >
            <option value="Pending">Pending</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
        </select>
        </Label>

        <ButtonGroup>
        <Button type="button" onClick={handleCancelTask}>
          Cancel
        </Button>
        <Button
          type="submit"
        >
          Create
        </Button>
      </ButtonGroup>
     </Form>

    )
}