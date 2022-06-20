import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import * as Moti from "moti";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//redux
import { useSelector } from "react-redux";
import { useTheme } from "../providers/theme.provider.js";
import { LinearGradient } from "expo-linear-gradient";


import Spacing from "../components/Spacing.js";
import {
    ThunderIcon,
    ThunderIconOutlineDark,
    ThunderIconOutlineWhite,
} from "../assets/images/index.js";
import ToucableRipple from "./ToucableRipple.js";



const Tab = ({route, index, descriptors, navigation, state}) => {

    const theme = useTheme()

    const { options } = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

    const isFocused = state.index === index;

    const iconColor = isFocused
        ? theme.colors.primary
        : theme.colors.text;
    const iconSize = 27;
    let icon;
    if (route.name === "Map") {
        const source = isFocused
            ? ThunderIcon
            : theme.dark
            ? ThunderIconOutlineWhite
            : ThunderIconOutlineDark;
        icon = (
            <RN.View style={styles.iconImageWrapper}>
                <RN.Image
                    style={styles.iconImage}
                    source={source}
                />
            </RN.View>
        );
    }
    if (route.name === "Stats") {
        const iconName = isFocused
            ? "chart-box"
            : "chart-box-outline";
        icon = (
            <Icon
                name={iconName}
                color={iconColor}
                size={iconSize}
            />
        );
    }
    if (route.name === "Profile") {
        const iconName = isFocused
            ? "account-circle"
            : "account-circle-outline";
        icon = (
            <Icon
                name={iconName}
                color={iconColor}
                size={iconSize}
            />
        );
    }

    const onPress = () => {
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
                name: route.name,
                merge: true,
            });
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: "tabLongPress",
            target: route.key,
        });
    };

    return (
        <RN.View style={styles.touchableWrapper}>
            <ToucableRipple
                accessibilityRole="button"
                accessibilityState={
                    isFocused ? { selected: true } : {}
                }
                accessibilityLabel={
                    options.tabBarAccessibilityLabel
                }
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                left={route.name === "Stats"}
                right={route.name === "Profile"}
            >
                <Moti.MotiView
                    animate={{ scale: isFocused ? 1.07 : 1 }}
                    transition={{
                        type: "timing",
                        delay: 100,
                        duration: 100,
                    }}
                    style={styles.contentWrapper}
                >
                    {icon}
                    <Spacing horizontal size="xs" />
                    <Paper.Text
                        style={{
                            color: isFocused
                                ? theme.colors.primary
                                : theme.colors.text,
                            fontSize: theme.fontSize["2xs"],
                        }}
                    >
                        {label}
                    </Paper.Text>

                    {options.tabBarBadge && (
                        <RN.View
                            style={[
                                styles.badgeWrapper,
                                {
                                    backgroundColor:
                                        theme.colors
                                            .notification,
                                    borderRadius:
                                        theme.rounded.full,
                                },
                            ]}
                        >
                            <Paper.Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={{
                                    color: "white",
                                    fontFamily: "Rubik-Medium",
                                    fontSize:
                                        theme.fontSize["2xs"],
                                }}
                            >
                                {options.tabBarBadge}
                            </Paper.Text>
                        </RN.View>
                    )}
                </Moti.MotiView>
            </ToucableRipple>
        </RN.View>
    );
}

const TabBar = ({ state, descriptors, navigation, theme }) => {

    const startDate = useSelector(state => state.trackingSession.startDate)

    return (
        <>
        {!startDate && <>
            <LinearGradient
                style={styles.tabBarGradient}
                start={{ x: 1.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={["black", "transparent"]}
            />
            <RN.View
                style={[
                    styles.tabBarContainer,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                {state.routes.map((route, index) => <Tab key={route.name} route={route} index={index} descriptors={descriptors} navigation={navigation} state={state}/>)}
            </RN.View>
        </>}
        </>
        
    );
};

const styles = RN.StyleSheet.create({
    tabBarGradient: {
        height: 70,
        backgroundColor: "transparent",
        position: 'absolute',
        bottom: 0,
        width: "100%",
    },
    tabBarContainer: {
        height: 60,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconImageWrapper: { width: 27, height: 27, padding: 1 },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    touchableWrapper: {
        flex: 1,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    contentWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    badgeWrapper: {
        padding: 2,
        minWidth: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 27,
        top: -5,
    },
});

export default TabBar;
