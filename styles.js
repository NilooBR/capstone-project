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
    color: var(--text);
  }

  :root {
    --accents: #24309e; // also to hover --buttons
    --buttons: #010080;
    --tags: #010080;
    --text: #0f172b;
    --header: #010080;
    --headerIcon: #f2f0ef;
    --errortext: #90a1ba; // also for :focus area
    --title: #010080;
    --mainbackground: white;
    --cardbackground: #f2f0ef;
    --contrasttext: #f2f0ef;
    --highlightedcard: #fafafa; // also for dialog boxes
    --cardborder: #d1d5db;
    --toggle-icon-color: #f2f0ef ; 
    --toggle-hover-color: #f2f0ef;
    --focus-outline-color: #d1d5db;
    --actionButtons: #010080;
    --actionButtonText: #f2f0ef;  

}

  ${({ theme }) =>
    theme === "dark" &&
    css`
      :root {
        --accents: #3c82f6; // also to hover --buttons
        --buttons: #3168c9;
        --tags: #3168c9;
        --text: #d1d5db;
        --header: #01004d;
        --headerIcon: #f2f0ef;
        --errortext: #ff6b6b; // also for :focus area
        --title: #e0f0ff;
        --mainbackground: #121212;
        --cardbackground: #27272b;
        --contrasttext: #121212;
        --highlightedcard: #3a5e92; // also for dialog boxes
        --cardborder: #1e2939;
        --toggle-icon-color: #d1d5db;
        --toggle-hover-color: #60a5fa;
        --focus-outline-color: #2563eb;
        --actionButtons: #01004d;
        --actionButtonText: #d1d5db;
      }
    `}
`;
