import styled from "styled-components";

const Badge = styled.span`
padding-left:  10px;

`

export default function CompletedInitiative({ isCompleted }) {
    if (!isCompleted) return null;
    return <Badge>✓</Badge>
}
