import {appColor} from "../../values/colors";

const buttonStyles = {
borderRadius:'20px',
    width: '500px'


};

export  const primaryButtonStyle = {
    ...buttonStyles,
    backgroundColor:appColor
}

export const secondaryButtonStyle = {
    ...buttonStyles,
    backgroundColor: "white",
    border:`1px solid ${appColor}`,
    color: appColor,
    '&:hover': {
        border: `2px solid ${appColor}`,
        backgroundColor: "white"
    }
}