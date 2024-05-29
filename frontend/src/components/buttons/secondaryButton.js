import * as React from 'react';
import AppButton from "./appButton";

function SecondaryButton({ title, callback, width, height }) {
    return (
        <AppButton
            title={title}
            callback={callback}
            primary={false}
            width={width}
            height={height}
        />
    );
}

export default SecondaryButton;
