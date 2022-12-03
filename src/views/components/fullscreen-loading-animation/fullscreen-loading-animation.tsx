import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components"

const FullscreenLoadingAnimationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: max-content;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const FullscreenLoadingAnimation = () => (
    <FullscreenLoadingAnimationContainer>
        <CircularProgress color="success" size={30}/>
    </FullscreenLoadingAnimationContainer>
)

export default FullscreenLoadingAnimation;