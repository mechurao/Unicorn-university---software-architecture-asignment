import * as React from 'react';
import { secondaryButtonStyle} from "./buttonStyles";
import AppButton from "./appButton";


function SecondaryButton({title, callback, width, height}){
    return <AppButton
        title={title}
        callback={callback}
        style={secondaryButtonStyle}
        width={width}
        height={height}>
    </AppButton>
}

export default SecondaryButton