import Button from '@mui/material/Button';
import * as React from 'react';
function AppButton({style, title, callback, width, height, inputType}){
    if(width){style.width = width}
    if(height){style.height = height}


    return <Button
        variant="contained"
        sx={
            style
        }
        onClick = {callback}
        type={inputType || "button"}
    >
        {title}
    </Button>
}

export default AppButton;