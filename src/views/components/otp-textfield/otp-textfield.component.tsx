import {Grid} from "@mui/material";
import {ChangeEvent} from "react";

const OTPTextField = (): JSX.Element => {
    const handleFocusChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        if (index < 6) {
            // Focus next node
            let nextNode: HTMLInputElement | null = document.getElementById((index + 1).toString()) as HTMLInputElement
            if (nextNode !== null && event.target.value !== '') {
                nextNode.focus()
                nextNode.select()
            }
        } else {
            // Un-focus the node
            let currentNode: HTMLElement | null = document.getElementById((index).toString())
            if (currentNode !== null && event.target.value !== '') {
                currentNode.blur()
            }
        }
    }
    return (
        <Grid container direction={"row"} columnSpacing={1}>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 1)} id={"1"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 2)} id={"2"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 3)} id={"3"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 4)} id={"4"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 5)} id={"5"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
            <Grid item width={"45px"}>
                <input maxLength={1} required onChange={(event) => handleFocusChange(event, 6)} id={"6"} style={{textAlign: "center"}} type={"number"} className={"form-control"}/>
            </Grid>
        </Grid>
    )
}

export default OTPTextField;