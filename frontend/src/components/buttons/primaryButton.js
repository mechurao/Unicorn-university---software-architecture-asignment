import * as React from 'react';
import {primaryButtonStyle} from "./buttonStyles";
import AppButton from "./appButton";


function PrimaryButton({title, callback, width, height}){
    return <AppButton
        title={title}
        callback={callback}
        style={primaryButtonStyle}
        width={width}
        height={height}>
    </AppButton>
}

export default PrimaryButton