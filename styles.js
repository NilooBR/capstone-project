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
  }

  :root {
    --accents: #010080;
    --buttons:#010080;
    --tags: #24309e;
    --text: #0f172b;
    --mainbackground: #ffffff;
    --cardbackground: #f2f0ef;
    --contrasttext: #f2f0ef;
    --highlightedcard: #fafafa;
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
        --mainbackground: #121212;
        --cardbackground: #18181b;
        --contrasttext: #121212;
        --highlightedcard: #1e2939;
        --cardborder: #1e2939;
      }
    `}
`;
