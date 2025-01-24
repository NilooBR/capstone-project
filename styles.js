import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: var(--mainbackground);
  }

  :root {
    --banner: #010080;
    --accents: #24309e; // also to hover --buttons
    --buttons:#010080;
    --tags: #010080;
    --text: #0f172b;
    --errortext: #90a1ba; // also for :focus area
    --title: #010080;
    --mainbackground: #ffff;
    --cardbackground: #f2f0ef;
    --contrasttext: #f2f0ef;
    --highlightedcard: #fafafa; // also for dialog boxes
    --cardborder:  #f2f0ef;
  }

  ${({ theme }) =>
    theme === "dark" &&
    css`
      :root {
        --banner: #01004d;
        --accents: #3c82f6;
        --buttons: #3c82f6;
        --tags: #1e2939;
        --text: #fafafa;
        --errortext: red;
        --title:   #f2f0ef
        --mainbackground: #121212;
        --cardbackground: #18181b;
        --contrasttext: #121212;
        --highlightedcard: #1e2939;
        --cardborder: #1e2939;
      }
    `}
`;
