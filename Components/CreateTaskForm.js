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
    onSubmitTask,
    defaultData = {}
}) {
    const router = useRouter();
    const { id: initiativeId, taskId } = router.query;


    const selectedInitiative =  defaultData.find(
      (initiative) => initiative.id === initiativeId
    );

    const selectedTasksArray = selectedInitiative 
    ? selectedInitiative.tasks  ?? []
    : [];

    const [formData, setFormData] = useState({
      ...DEFAULT_VALUES,
    })

   const [errors, setErrors] = useState({});

  function handleCancelTask() {
    router.push(`/initiatives/${initiativeId}`);
  }

  function handleChangeTask(event) {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value};


    setFormData(updatedFormData);
  }

  function handleSubmitTask(event) {
    event.preventDefault();

    const { title, description } = formData;

    const newErrors = {
      title: title.trim() ? null : "Title is required.",
      description: description.trim() ? null : "Description is required.",
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }


    const newTask = {
      id: crypto.randomUUID(),
      ...formData,
    }

    const updatedTaskArray =  [newTask, ...selectedTasksArray];
    console.log("updatedTaskArray: ", updatedTaskArray);

    const updatedInitiative = {
      ...selectedInitiative,
      tasks: updatedTaskArray,
    }
    console.log("updatedInitiative: ", updatedInitiative);
    console.log("initiativeId: ", initiativeId);
    console.log("newTask.id: ", newTask.id);

    onSubmitTask(updatedInitiative); // Pass the updatedInititave data to the parent
    
    setTimeout(() => {
      router.push(`/initiatives/${initiativeId}`);
    }, 500);
    
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
          {errors.title && <Error>{errors.title}</Error>}
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
          {errors.description && <Error>{errors.description}</Error> }
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