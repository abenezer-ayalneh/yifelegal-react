import styled from "styled-components";
import {Grid} from "@mui/material";

type HighlightPropTypes = {
    image?: string,
}

export const HighlightContainer = styled(Grid)`
  height: 180px;
  cursor: pointer;
  background: #FFFFFF;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`

export const HighlightImageContainer = styled(Grid)<HighlightPropTypes>`
  border-radius: 10px 0 0 10px;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
  position: relative;
`

export const HighlightImageOverlay = styled(Grid)`
  height: 180px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px 0 0 10px;
  position: absolute;
  top: 0;
  left: 0;
`