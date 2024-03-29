import styled from "@emotion/styled";

export const Main = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar nav"
    "sidebar dashboardUrls";
`;
