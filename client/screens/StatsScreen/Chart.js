import * as React from "react";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "../../providers/theme.provider";
import { hexToRgbA } from "../../utils";
import { CHART_LABELS } from "../../utils/constants";

const ChartView = ({ width, datasets }) => {
    const theme = useTheme();

    return (
        <BarChart
            data={{
                labels: CHART_LABELS,
                datasets: [
                    {
                        data: datasets,
                    },
                ],
            }}
            width={width}
            height={220}
            withHorizontalLabels={false}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            withInnerLines={false}
            chartConfig={{
                backgroundColor: theme.colors.backgroundElevation,
                backgroundGradientFrom: theme.colors.backgroundElevation,
                backgroundGradientTo: theme.colors.backgroundElevation,
                barRadius: theme.roundness,
                fillShadowGradient: theme.colors.primary,
                fillShadowGradientOpacity: 1,
                fillShadowGradientToOpacity: 0.5,
                color: (opacity = 1) =>
                    hexToRgbA(theme.colors.primary, opacity),
                propsForLabels: {
                    fontSize: theme.fontSize.sm,
                    fontFamily: "Rubik-Medium",
                },
            }}
            style={{
                paddingRight: 0,
            }}
        />
    );
};

export default ChartView;
