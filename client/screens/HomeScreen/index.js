import * as React from 'react';
import * as RN from 'react-native';

//redux
import { useSelector } from "react-redux";

const HomeScreen = ({navigation}) => {

    const {userInfo} = useSelector(state => state.user)

    React.useEffect(() => {
        if(!userInfo.gender) {
            navigation.replace('CompleteRegistration')
        }
    }, [userInfo])

    return (
        <RN.View style={{flex: 1, backgroundColor: 'red'}}>
            
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({})

export default HomeScreen;
