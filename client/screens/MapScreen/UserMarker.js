import * as React from "react";
import * as RN from "react-native";

import * as Svg from "react-native-svg";

import { LocationArrow } from "../../assets/images";
import { useTheme } from "../../providers/theme.provider";

const MARKER_WIDTH = 50;

const UserMarker = ({ rotation }) => {

    const theme = useTheme()

    return (

        <RN.View style={[styles.markerWrapper, { transform: [{rotateZ: rotation ? `${rotation}deg` : '0deg'}] }]}>
                    <Svg.Svg height={MARKER_WIDTH} width={MARKER_WIDTH}>
  <Svg.Defs>
    <Svg.RadialGradient
      id="grad"
      cx={MARKER_WIDTH / 2}
      cy={MARKER_WIDTH / 2}
      rx={MARKER_WIDTH / 2}
      ry={MARKER_WIDTH / 2}
      fx={MARKER_WIDTH / 2}
      fy={MARKER_WIDTH / 2}
      gradientUnits="userSpaceOnUse"
    >
      <Svg.Stop offset="0" stopColor={theme.colors.primary} stopOpacity="0" />
      <Svg.Stop offset="1" stopColor={theme.colors.primary} stopOpacity="0.2" />
    </Svg.RadialGradient>
  </Svg.Defs>
  <Svg.Ellipse cx={MARKER_WIDTH / 2} cy={MARKER_WIDTH / 2} rx={MARKER_WIDTH / 2} ry={MARKER_WIDTH / 2} fill="url(#grad)" />
</Svg.Svg>
           <RN.Image style={styles.marker} source={LocationArrow} />
        </RN.View>
    );
};

const styles = RN.StyleSheet.create({
    markerWrapper: {
        width: MARKER_WIDTH,
        aspectRatio: 1,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        padding: 7
    },
    marker:{width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', transform: [{translateY: -3}]}
});

export default UserMarker;
