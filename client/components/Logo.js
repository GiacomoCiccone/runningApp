import * as React from 'react';
import * as RN from 'react-native';
import * as Images from '../assets/images';

const Logo = () => {
    return (
        <RN.View style={{flex: 1}}>
        <RN.Image style={{width: "100%", height: "100%"}} resizeMode='contain' source={Images.Logo} />
        </RN.View>
            
    );
}

export default Logo;
