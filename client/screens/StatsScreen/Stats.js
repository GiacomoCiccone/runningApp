import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RESET_STATISTICS_ERROR } from "../../actions";
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";
import StatsContainer from "./StatsContainer";
import BMI from "./BMI";
import { useFocusEffect } from "@react-navigation/native";
import { getStats } from "../../actions/userActions";
import SnackBar from "../../components/SnackBar";
import ChartView from "./ChartView";
import Records from "./Records";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stats = ({ navigation }) => {
    const theme = useTheme();

    const userInfo = useSelector((state) => state.user.userInfo);
    const token = useSelector((state) => state.user.authToken);
    const statsError = useSelector((state) => state.statistics.error);
    const statisticsLoading = useSelector(
        (state) => state.statistics.isLoading
    );

    const dispatch = useDispatch();

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_STATISTICS_ERROR });
    }, []);

    useFocusEffect(React.useCallback(() => {}, []));

    const fetchStats = React.useCallback(() => {
        dispatch(getStats(userInfo._id, token));
    }, [userInfo, token]);

    React.useEffect(() => {
        fetchStats();
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            {statisticsLoading && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}

            <SnackBar
                visible={statsError}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {statsError}
            </SnackBar>

            <RN.View
                style={{
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper.Text
                    style={{
                        fontFamily: "Rubik-Medium",
                        fontSize: theme.fontSize.xl,
                    }}
                >
                    Progressi
                </Paper.Text>
            </RN.View>

            <RN.ScrollView
                refreshControl={
                    <RN.RefreshControl
                    title="Trascina per ricaricare..."
                    titleColor={theme.colors.text}
                    progressBackgroundColor={theme.colors.primary}
                    colors={['white']}
                    tintColor={['white']}
                    refreshing={statisticsLoading}
                    onRefresh={fetchStats}
                    />
                }
                style={{ flex: 1 }}
            >
                <StatsContainer>
                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.base,
                        }}
                    >
                        IMC
                    </Paper.Text>

                    <Spacing horizontal size="xl" />

                    <BMI />
                </StatsContainer>

                <StatsContainer>
                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.base,
                        }}
                    >
                        Statistiche
                    </Paper.Text>

                    <Spacing horizontal size="xl" />

                    <ChartView />
                </StatsContainer>

                <Spacing horizontal size="xl" />

                <Records />

                <StatsContainer style={{ padding: 0 }}>
                    <RN.TouchableWithoutFeedback
                        onPress={() => navigation.navigate("History")}
                    >
                        <RN.View style={{ flex: 1, padding: theme.spacing.lg }}>
                            <Paper.Text
                                style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: theme.fontSize.base,
                                }}
                            >
                                Storico
                            </Paper.Text>

                            <Spacing horizontal size="xl" />

                            <RN.View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Paper.Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                    }}
                                >
                                    Visualizza lo storico delle tue attività
                                </Paper.Text>

                                <Icon
                                    name="chevron-right"
                                    size={20}
                                    color={theme.colors.text}
                                />
                            </RN.View>
                        </RN.View>
                    </RN.TouchableWithoutFeedback>
                </StatsContainer>
            </RN.ScrollView>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    progressBar: {
        position: 'absolute'
    },
});

export default Stats;
