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


export default function CreateTaskForm({
    onSubmitTask,
    defaultDataTask = {},
}) {
    const router = useRouter();
    const { id: initiativeId } = router.query;

  function handleCancelTask() {
    router.push(`/initiatives/${initiativeId}`);
  }

  function handleChangeTask() {

  }

  function handleSubmitTask() {

  }

    return (
     <Form onSubmitTask={handleSubmitTask}>
        <Heading>Create Task</Heading>
        <Label>
            Task Title
        </Label>
        <Input
            id="title"
            name="title"
            type="text"
            value=""
            onChange={handleChangeTask}
        />

        <Label>
            Description
          <Textarea
            id="description"
            name="description"
            rows="4"
            value=""
            onChange={handleChangeTask}
        /> 
        </Label>

        <Label for="status">
            Status
        <select name="status" id="status">
            <option value="pending">Pending</option>
            <option value="progress">In progress</option>
            <option value="completed">Completed</option>
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