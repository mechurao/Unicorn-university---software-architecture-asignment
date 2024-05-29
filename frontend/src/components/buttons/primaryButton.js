import * as React from 'react';
import AppButton from "./appButton";

function PrimaryButton({ title, callback, width, height }) {
    return (
        <AppButton
            title={title}
            callback={callback}
            primary={true}
            width={width}
            height={height}
        />
    );
}

export default PrimaryButton;
