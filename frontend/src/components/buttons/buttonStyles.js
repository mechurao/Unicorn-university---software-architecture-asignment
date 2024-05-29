import {appColor} from "../../values/colors";

const buttonStyles = {
    borderRadius: '20px',
    width: '500px' ,
    height: '40px',
    fontSize: '15px'
};


export  const primaryButtonStyle = {
    ...buttonStyles,
    backgroundColor:appColor,
    color: 'white',
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