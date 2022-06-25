import * as RN from "react-native";
import * as Images from "../assets/images";

//Simple logo component for the app
const Logo = () => {
    return (
        <RN.View style={{ flex: 1 }}>
            <RN.Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                source={Images.Logo}
            />
        </RN.View>
    );
};

export default Logo;
