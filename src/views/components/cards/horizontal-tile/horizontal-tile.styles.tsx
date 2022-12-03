import styled from "styled-components";
import {Grid} from "@mui/material";
import exp from "constants";

interface HorizontalTilePropTypes {
    image?: string,
}
export const HorizontalTileContainer = styled(Grid)<HorizontalTilePropTypes>`
  height: 360px;
  border-radius: 15px;
  position: relative;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
`

export const HorizontalTileOverlay = styled(Grid)`
  height: 360px;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
`

export const HorizontalTileTextContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 10px 20px 20px;
`;