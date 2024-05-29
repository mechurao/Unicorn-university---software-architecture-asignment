import * as React from 'react';
import styled from 'styled-components';
import { appColor } from "../../values/colors";

const Button = styled.button`
    border-radius: 20px;
    width: ${props => props.width || '500px'};
    height: ${props => props.height || '40px'};
    font-size: 15px;
    background-color: ${props => props.primary ? appColor : 'white'};
    color: ${props => props.primary ? 'white' : appColor};
    border: ${props => props.primary ? 'none' : `1px solid ${appColor}`};
    &:hover {
        border: ${props => props.primary ? 'none' : `2px solid ${appColor}`};
        background-color: ${props => props.primary ? appColor : 'white'};
    }
`;

function AppButton({ title, callback, primary, width, height }) {
    return (
        <Button onClick={callback} primary={primary} width={width} height={height}>
            {title}
        </Button>
    );
}

export default AppButton;
