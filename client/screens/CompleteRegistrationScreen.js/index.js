import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../components/Logo";
import { useTheme } from "../../providers/theme.provider";
import GenderScreen from "./GenderScreen";
import HeightScreen from "./HeightScreen";
import ProgerssBar from "./ProgerssBar";
import WeightScreen from "./WeightScreen";

import SnackBar from "../../components/SnackBar";
import { RESET_ERROR_USER } from "../../redux/actions";
import { updateAction } from "../../redux/actions/userActions";

const CompleteRegistrationScreen = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [gender, setGender] = React.useState("male");
    const [weight, setWeight] = React.useState(70);
    const [height, setHeight] = React.useState(170);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [scrollViewLenght, setScrollViewLenght] = React.useState(0);
    const offsetX = React.useRef(new RN.Animated.Value(0)).current;
    const scrollViewRef = React.useRef();

    const goNext = React.useCallback(() => {
        setTimeout(() => {
            setCurrentPage((currentPage) => currentPage + 1);
        }, 100);
    }, []);

    const onScrollHandler = RN.Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { x: offsetX },
                },
            },
        ],
        { useNativeDriver: false }
    );

    const onLayoutHandler = React.useCallback(
        (e) => setScrollViewLenght(e.nativeEvent.layout.width),
        []
    );

    const resetError = React.useCallback(() => {
        setCurrentPage(0);
        dispatch({ type: RESET_ERROR_USER });
    }, []);

    React.useEffect(() => {
        scrollViewRef.current.scrollTo({
            x: currentPage * scrollViewLenght,
            y: 0,
            animated: true,
        });
    }, [currentPage, scrollViewLenght]);

    React.useEffect(() => {
        if (currentPage > 2) {
            const body = {
                gender,
                weight,
                height,
            };
            dispatch(updateAction(body, user.userInfo._id, user.authToken));
        }
    }, [currentPage]);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            {currentPage <= 2 && <ProgerssBar currentPage={currentPage} />}

            {currentPage > 2 && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}

            <SnackBar
                visible={user.error}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {user.error}
            </SnackBar>

            {/* Logo */}
            <RN.View style={styles.logoContainer}>
                <RN.View style={styles.logoWrapper}>
                    <Logo />
                </RN.View>
            </RN.View>

            <RN.View
                style={[
                    styles.tabsContainer,
                    { marginHorizontal: theme.spacing.lg },
                ]}
            >
                {/* The various sub-screen are inside this flatlist */}
                <RN.Animated.ScrollView
                    ref={scrollViewRef}
                    onScroll={onScrollHandler}
                    onLayout={onLayoutHandler}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    scrollEnabled={false}
                >
                    <RN.View style={{ flex: 1, width: scrollViewLenght }}>
                        <GenderScreen
                            gender={gender}
                            setGender={setGender}
                            goNext={goNext}
                        />
                    </RN.View>

                    <RN.View style={{ flex: 1, width: scrollViewLenght }}>
                        {currentPage === 1 && (
                            <RN.ScrollView>
                                <WeightScreen
                                    weight={weight}
                                    setWeight={setWeight}
                                    goNext={goNext}
                                />
                            </RN.ScrollView>
                        )}
                    </RN.View>

                    <RN.View style={{ flex: 1, width: scrollViewLenght }}>
                        {currentPage === 2 && (
                            <HeightScreen
                                height={height}
                                setHeight={setHeight}
                                goNext={goNext}
                            />
                        )}
                    </RN.View>
                </RN.Animated.ScrollView>
            </RN.View>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    progressBar: {
        position: "absolute",
    },
    logoContainer: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
    },
    logoWrapper: {
        width: 85,
        height: 85,
    },
    tabsContainer: {
        flex: 0.8,
    },
});

export default CompleteRegistrationScreen;
