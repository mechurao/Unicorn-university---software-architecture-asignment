import Button from '@mui/material/Button';
import * as React from 'react';
import { secondaryButtonStyle} from "./buttonStyles";


function SecondaryButton({title, callback}){
    return <Button
        variant="contained"
        sx={
            secondaryButtonStyle
        }
        onClick = {callback}>
        {title}
    </Button>
}

export default SecondaryButton