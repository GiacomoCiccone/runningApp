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
                    backgroundColor: theme.colors.text,
                    borderRadius: theme.rounded.full,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    width: 300,
                    ...theme.shadowBox.lg
                }}
                sliderElement={
                    <RN.View
                        style={{
                            backgroundColor: theme.colors.background,
                            width: 60,
                            height: 60,
                            borderRadius: theme.rounded.full,
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                    >
                        <Icon
                            name="chevron-triple-right"
                            size={30}
                            color={theme.colors.text}
                        />
                    </RN.View>
                }
            >
                <Paper.Text
                    style={{
                        color: theme.colors.background,
                        fontFamily: "Rubik-Medium",
                    }}
                >
                    Scorri per sbloccare
                </Paper.Text>
            </Slider>
    );
};

export default SlideToUnlock;
