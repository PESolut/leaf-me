import React from 'react';
import {Image} from 'react-native'
import ButtonIcon from '../assets/back-button.png'

// button should be dynamically rendered based on a STATE;
// this state when TRUE would be when appopriate...

const BackButton = () => {
    return (
        <Image
        style={{height: 60, width: 80}}
        source={ButtonIcon}
        />
    );
};

export default BackButton;