import Button from '@mui/material/Button';
import * as React from 'react';
import {primaryButtonStyle} from "./buttonStyles";


function PrimaryButton({title, callback}){
    return <Button
        variant="contained"
        sx={
            primaryButtonStyle
        }
        onClick = {callback}>
        {title}
    </Button>
}

export default PrimaryButton