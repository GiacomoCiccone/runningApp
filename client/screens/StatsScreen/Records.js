import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { useTheme } from "../../providers/theme.provider";
import { hexToRgbA, msToHMS } from "../../utils";
import Spacing from "../../components/Spacing";
import StatsContainer from "./StatsContainer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Records = ({ width }) => {
    const theme = useTheme();

    const records = useSelector((state) => state.statistics.userRecords);

    return (
        <RN.View>
            <RN.View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <StatsContainer
                    style={{ marginRight: theme.spacing.xs, flex: 1, marginVertical: theme.spacing.xs }}
                >
                    <Spacing horizontal size="md" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Record velocità
                    </Paper.Text>

                    <Spacing horizontal size="md" />

                    <Icon
                        name="speedometer"
                        size={30}
                        color={theme.colors["primary-shades"]['300']}
                    />

                    <Spacing horizontal size="sm" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.xl,
                        }}
                    >
                        {records?.maxSpeed.toFixed(2) || "0.00"}{" "}
                        <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                            km/h
                        </Paper.Text>
                    </Paper.Text>

                    <Spacing horizontal size="md" />
                </StatsContainer>

                <StatsContainer
                    style={{ marginLeft: theme.spacing.xs, flex: 1, marginVertical: theme.spacing.xs }}
                >
                    <Spacing horizontal size="md" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Record Distanza
                    </Paper.Text>

                    <Spacing horizontal size="md" />

                    <Icon
                        name="highway"
                        size={30}
                        color={theme.colors["primary-shades"]['300']}
                    />

                    <Spacing horizontal size="sm" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.xl,
                        }}
                    >
                        {records?._maxDistance.toFixed(2) || "0.00"}{" "}
                        <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                            km
                        </Paper.Text>
                    </Paper.Text>

                    <Spacing horizontal size="md" />
                </StatsContainer>
            </RN.View>

            <RN.View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <StatsContainer
                    style={{ marginRight: theme.spacing.xs, flex: 1, marginVertical: theme.spacing.xs }}
                >
                    <Spacing horizontal size="md" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Record Calorie
                    </Paper.Text>

                    <Spacing horizontal size="md" />

                    <Icon
                        name="fire"
                        size={30}
                        color={theme.colors["primary-shades"]['300']}
                    />

                    <Spacing horizontal size="sm" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.xl,
                        }}
                    >
                        {records?.maxCalories.toFixed(0) || "0"}{" "}
                        <Paper.Text style={{ fontSize: theme.fontSize.xs }}>
                            kcal
                        </Paper.Text>
                    </Paper.Text>

                    <Spacing horizontal size="md" />
                </StatsContainer>

                <StatsContainer
                    style={{ marginLeft: theme.spacing.xs, flex: 1, marginVertical: theme.spacing.xs }}
                >
                    <Spacing horizontal size="md" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Record Durata
                    </Paper.Text>

                    <Spacing horizontal size="md" />

                    <Icon
                        name="clock"
                        size={30}
                        color={theme.colors["primary-shades"]['300']}
                    />

                    <Spacing horizontal size="sm" />

                    <Paper.Text
                        style={{
                            fontFamily: "Rubik-Medium",
                            fontSize: theme.fontSize.xl,
                        }}
                    >
                        { msToHMS(records?.maxTime || 0) }
                    </Paper.Text>

                    <Spacing horizontal size="md" />
                </StatsContainer>
            </RN.View>
        </RN.View>
    );
};

export default Records;
