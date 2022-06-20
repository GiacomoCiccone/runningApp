import * as React from "react";
import * as RN from "react-native";
import * as Moti from 'moti'
import * as Paper from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "react-native-slide-to-unlock";
import { useTheme } from "../../providers/theme.provider";

const SlideToUnlock = ({setUnlocked}) => {

    const theme = useTheme()

    return (
        <Moti.MotiView
            from={{ translateY: 100 }}
            animate={{ translateY: 0 }}
            transition={{ type: "timing" }}
            exit={{ translateY: 100 }}
            exitTransition={{
                type: "timing",
            }}
        >
            <Slider
                childrenContainer={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onEndReached={() => {
                    setUnlocked(true);
                }}
                containerStyle={{
                    margin: 8,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.rounded.xl,
                    paddingHorizontal: theme.spacing.sm,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    width: 300,
                    ...theme.shadowBox.lg
                }}
                sliderElement={
                    <RN.View
                        style={{
                            backgroundColor: theme.colors.text,
                            width: 50,
                            height: 35,
                            borderRadius: theme.rounded.xl,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Icon
                            name="chevron-triple-right"
                            size={30}
                            color={theme.colors.background}
                        />
                    </RN.View>
                }
            >
                <Paper.Text
                    style={{
                        fontFamily: "Rubik-Medium",
                    }}
                >
                    Scorri per sbloccare
                </Paper.Text>
            </Slider>
        </Moti.MotiView>
    );
};

export default SlideToUnlock;
