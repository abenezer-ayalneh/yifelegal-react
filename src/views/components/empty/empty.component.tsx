import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components"
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const EmptyComponentContainer = styled.div`
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

const EmptyComponent = () => {
    const {t} = useTranslation()
    return (
        <EmptyComponentContainer>
            <Typography variant={"h4"}>
                {t("empty")}
            </Typography>
        </EmptyComponentContainer>
    )
}

export default EmptyComponent;