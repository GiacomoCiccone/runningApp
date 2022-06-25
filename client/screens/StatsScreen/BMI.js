import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useSelector } from "react-redux";
import Spacing from "../../components/Spacing";
import { useTheme } from "../../providers/theme.provider";
import { calcBMI } from "../../utils";

const BMI = () => {
    const theme = useTheme();
    const userHeight = useSelector((state) => state.user.userInfo.height);
    const userWeight = useSelector((state) => state.user.userInfo.weight);

    const [BMI, setBMI] = React.useState(0);
    const [label, setLabel] = React.useState("");

    React.useEffect(() => {
        const { BMI, label } = calcBMI(userWeight, userHeight);
        setBMI(BMI);
        setLabel(label);
    }, [userHeight, userWeight]);

    return (
        <RN.View>
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                colors={["#dfe64e", "#31d2c4"]}
                style={{ height: 40, borderRadius: theme.rounded.full }}
            >
                <RN.View
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: 6,
                        backgroundColor: theme.colors.primary,
                        left: `${(Math.min(BMI, 40) / 40) * 100}%`,
                        transform: [{ translateX: -4 }],
                    }}
                />
            </LinearGradient>

            <Spacing horizontal size="xl" />

            <Paper.Text
                style={{
                    fontSize: theme.fontSize["3xl"],
                    fontFamily: "Rubik-Medium",
                    textAlign: "center",
                    color: theme.colors.primary,
                }}
            >
                {BMI.toFixed(2)}
            </Paper.Text>

            <Spacing horizontal size="sm" />
            <Paper.Text
                style={{ fontSize: theme.fontSize.sm, textAlign: "center" }}
            >
                Il tuo indice di massa corporea è classificato come{" "}
                {
                    <Paper.Text style={{ color: theme.colors.primary }}>
                        {label}
                    </Paper.Text>
                }
            </Paper.Text>
        </RN.View>
    );
};

export default BMI;
