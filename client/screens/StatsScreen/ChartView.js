import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { useTheme } from "../../providers/theme.provider";
import { hexToRgbA } from "../../utils";
import Spacing from "../../components/Spacing";
import { CHART_LABELS } from "../../utils/constants";
import Chart from "./Chart";
import ChartIndicator from "./ChartIndicator";

const ChartView = () => {
    const theme = useTheme();

    const statistics = useSelector(
        (state) => state.statistics.trackingStatistics
    );
    
    const [chartWidth, setChartWidth] = React.useState(0);
    const [dataDistance, setDataDistance] = React.useState(Array(7).fill(0));
    const [dataCalories, setDataCalories] = React.useState(Array(7).fill(0));
    const scrollX = React.useRef(new RN.Animated.Value(0)).current;
    
    const onLayout = React.useCallback((e) => {
        setChartWidth(e.nativeEvent.layout.width);
    }, []);

    React.useEffect(() => {
        if (!statistics) {
            setDataDistance(Array(7).fill(0))
            setDataCalories(Array(7).fill(0))
        } else {
            let dataDistance = []
            let dataCalories = []
            for(let i = 1; i <= 7; i++) {
                dataDistance[i - 1] = statistics.find(day => day._id === i)?.countDistance.toFixed(2) || "0.00"
                dataCalories[i - 1] = statistics.find(day => day._id === i)?.countCalories.toFixed(0) || "0"
            }

            setDataDistance(dataDistance);
            setDataCalories(dataCalories);
        }
    }, [statistics])

    return (
        <RN.View onLayout={onLayout}>
            <RN.Animated.ScrollView
                onScroll={RN.Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <RN.View>
                    <Paper.Text
                        style={{
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Calorie - Ultima settimana (kcal)
                    </Paper.Text>

                    <Spacing horizontal size="lg" />

                    <Chart width={chartWidth} datasets={dataCalories} />

                
                </RN.View>
                <RN.View>
                    <Paper.Text
                        style={{
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        Distanza percorsa - Ultima settimana (km)
                    </Paper.Text>

                    <Spacing horizontal size="lg" />

                    <Chart width={chartWidth} datasets={dataDistance} />
                    
                </RN.View>
            </RN.Animated.ScrollView>

            <Spacing horizontal size="sm" />

            <RN.View style={{ flexDirection: "row", justifyContent: "center" }}>
            <ChartIndicator scrollX={scrollX} inputRange={[0, chartWidth]} outputRange={[0, 12]} />
                <Spacing size="xs" />
                
                
                <ChartIndicator scrollX={scrollX} inputRange={[0, chartWidth]} outputRange={[-12, 0]} />
            </RN.View>
        </RN.View>
    );
};

export default ChartView;