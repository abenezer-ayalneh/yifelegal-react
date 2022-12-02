import styled from "styled-components";
import {Grid} from "@mui/material";

interface VerticalTilePropTypes{
    image?: string,
}
export const VerticalTileContainer = styled(Grid)<VerticalTilePropTypes>`
  height: 360px;
  border-radius: 15px;
  position: relative;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
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

export const VerticalTileTextContainer = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;