import * as React from 'react';
import {primaryButtonStyle} from "./buttonStyles";
import AppButton from "./appButton";


function PrimaryButton({title, callback, width, height,inputType}){
    return <AppButton
        title={title}
        callback={callback}
        style={primaryButtonStyle}
        width={width}
        height={height}
        inputType={inputType}
    >
    </AppButton>
}

export default PrimaryButton