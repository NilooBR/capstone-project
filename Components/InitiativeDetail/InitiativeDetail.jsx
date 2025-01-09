import styled from "styled-components";
import Link from "next/link";

export default function InitiativeDetail({
  title,
  description,
  tags,
  deadline,
}) {
  
  return (
    <PageContainer>
      <Content>
      <StyledH1>{title}</StyledH1>
      <StyledArticle>{description}</StyledArticle>
      <StyledP>{deadline}</StyledP>
      <StyledDiv>
      {tags.map((tag,index) => (
         <StyledSpan key={index}>{tag}</StyledSpan>))}
      </StyledDiv>
      </Content>  
      <NavFooter>
      <Link href="/"> 
        <Button>Back</Button>
      </Link>  
      <Button>Edit</Button>
      <Button>Delete</Button>
      </NavFooter>
    </PageContainer>
  );
}

const StyledH1 = styled.h1`
  padding-left: 20px;
  margin: 20px 0;
`;
const StyledArticle = styled.article`
  margin: 10px;
  padding: 20px 10px;
  border: solid 1px grey;
  border-radius: 20px;
`;
const StyledP = styled.p`
  margin: 20px 10px;
  padding: 0 10px;
  border: solid 1px grey;
  border-radius: 3px;
`;
const StyledDiv = styled.div`
  padding: 20px 10px;
  display: flex;
  gap: 10px;
`
const StyledSpan = styled.span`
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;
const NavFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
  gap: 10px;
`;
const Button = styled.button`
  flex: 1;
  margin: 0 10px;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Content = styled.div`
  flex: 1;
`

