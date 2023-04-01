import styled from "styled-components"
import ScrollBar from "react-perfect-scrollbar";
import Paper from "@mui/material/Paper";

export const ModalContainer = styled(Paper)`
  min-width: 300px;
  max-height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 4px;
`;

export const ModalBody = styled(ScrollBar)`
  overflow-y: scroll;
  max-height: 600px;
  min-width: 300px;
  padding: 0;
`;