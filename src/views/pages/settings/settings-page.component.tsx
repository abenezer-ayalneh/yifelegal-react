import {Grid} from "@mui/material";
import BigIcon from "../../components/big-icon/big-icon.component";
import Person from "../../../assets/images/person.svg"

const SettingsPage = () => {
    return (
        <Grid container spacing={3} paddingX={5} paddingY={2}>
            <BigIcon image={Person} title={"User Management"} to={"users"}/>
            {/*<BigIcon image={Person} title={"Request Management"}/>*/}
            {/*<BigIcon image={Person} title={"Role Management"}/>*/}
        </Grid>
    )
}

export default SettingsPage