import styled from "styled-components";
import {Grid} from "@mui/material";

export const VerticalTileContainer = styled(Grid)`
  height: 360px;
  background-color: rebeccapurple;
  border-radius: 15px;
  position: relative;
`

export const VerticalTileOverlay = styled(Grid)`
  height: 360px;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
`