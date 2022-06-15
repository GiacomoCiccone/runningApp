import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import { useTheme } from "../providers/theme.provider";

const segmentLengthTenth = 30;
const segmentLenght = 20;
const segmentThickness = 3;
const segmentSpacing = 5;
const snapSegment = segmentThickness + 2 * segmentSpacing;
const rulerDimension = 70;
const markerLenght = 50;
const markerThickness = 5;

const Segment = React.memo(({ item, horizontal, tenth }) => {
    const theme = useTheme();

    if (horizontal)
        return (
            <RN.View
                style={{
                    width: snapSegment,
                    height: rulerDimension,
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <RN.View
                    style={{
                        opacity: tenth ? 1 : 0.5,
                        backgroundColor: theme.colors.grey,
                        width: segmentThickness,
                        height: tenth ? segmentLengthTenth : segmentLenght,
                        borderRadius: theme.rounded.lg,
                    }}
                />

                {tenth && (
                    <RN.View
                        style={{
                            position: "absolute",
                            alignItems: "center",
                            top: 20,
                            width: 35,
                        }}
                    >
                        <Paper.Text
                            style={{
                                fontSize: theme.fontSize.xs,
                                color: theme.colors.grey,
                            }}
                        >
                            {item.value}
                        </Paper.Text>
                    </RN.View>
                )}
            </RN.View>
        );

    return (
        <RN.View
            style={{
                width: rulerDimension,
                height: snapSegment,
                justifyContent: "flex-end",
                alignItems: "flex-end",
            }}
        >
            <RN.View
                style={{
                    opacity: tenth ? 1 : 0.5,
                        backgroundColor: theme.colors.grey,
                    width: tenth ? segmentLengthTenth : segmentLenght,
                    height: segmentThickness,
                    borderRadius: theme.rounded.lg,
                }}
            />

            {tenth && (
                <RN.View
                    style={{
                        position: "absolute",
                        alignItems: "center",
                        top: snapSegment * 0.3,
                        left: 0,
                        width: 35,
                    }}
                >
                    <Paper.Text
                        style={{
                            fontSize: theme.fontSize.xs,
                            color: theme.colors.grey,
                        }}
                    >
                        {item.value}
                    </Paper.Text>
                </RN.View>
            )}
        </RN.View>
    );
});

const Picker = ({
    min = 0,
    max = 100,
    precision = 0,
    horizontal = false,
    defaultValue = min,
    onChange,
    unit
}) => {
    if (precision < 0 || precision > 2)
        throw Error("Precision must be in 0..2");
    if (min > max) throw Error("Enter a valid range");
    if (defaultValue > max || defaultValue < min)
        throw Error("Enter a valid default value in min..max");

    const theme = useTheme();

    const [data, setData] = React.useState([]); //data of the picker as {id, value}
    const [scrollViewLength, setScrollViewLength] = React.useState(0); //dimension of the scrollview
    const [textDimension, setTextDimension] = React.useState(50); //dimension of the text container
    const scrollViewRef = React.useRef();
    const textRef = React.useRef();

    //bigger when vertical
    React.useEffect(() => {
        if (horizontal) setTextDimension(50);
        else setTextDimension(60);
    }, [horizontal]);

    React.useEffect(() => {
        const decimalPrecision = parseInt(
            "1".concat(Array(precision).fill(0).join(""))
        ); //convert precision to a 10* like number
        const interval = max - min;

        if (interval * decimalPrecision > 10000)
            throw Error("Too much items to render.");

        const data = Array(interval * decimalPrecision)
            .fill()
            .map((_, i) => {
                return {
                    id: i,
                    value:
                        precision > 0
                            ? (i / decimalPrecision + min).toFixed(precision)
                            : i / decimalPrecision + min,
                };
            });
        data.push({
            id: data.length,
            value: max,
        });
        setData(data);
    }, [min, max, precision]);

    //move the scroll to the default value
    React.useEffect(() => {
        if (data.length > 0 && scrollViewRef && scrollViewRef.current) {
            const indexDefault = data.find(
                (item) => item.value == defaultValue
            ).id;

            if (indexDefault > 0) {
                scrollViewRef.current.scrollToIndex({
                    index: indexDefault,
                    animated: true,
                });

                onChange(data[indexDefault].value);
            }
        }
    }, [defaultValue, data]);

    //on scroll end update value
    const onScrollEndHandler = React.useCallback(
        (e) => {
            if (data.length > 0 && scrollViewLength > 0 && textRef && textRef.current) {
                const scrollViewContentLenght =
                    e.nativeEvent.contentSize[horizontal ? "width" : "height"];

                const scrollOffset =
                    e.nativeEvent.contentOffset[horizontal ? "x" : "y"];
                    const current = Math.floor(
                        (scrollOffset /
                            (scrollViewContentLenght -
                                (scrollViewLength))) *
                            data.length
                    )


                let newValue = data.find((item) => item.id === current)?.value;

                if (newValue !== 0 && !newValue) newValue = max;

                textRef.current.setNativeProps({
                    text: newValue.toString(),
                });

                onChange(newValue);
            }
        },
        [horizontal, scrollViewLength, data]
    );
    
    //update textinput
    const onScrollHandler = React.useCallback(
        (e) => {
            if (data.length > 0 && scrollViewLength > 0 && textRef && textRef.current) {
                const scrollViewContentLenght =
                    e.nativeEvent.contentSize[horizontal ? "width" : "height"];

                const scrollOffset =
                    e.nativeEvent.contentOffset[horizontal ? "x" : "y"];
                    const current = Math.floor(
                        (scrollOffset /
                            (scrollViewContentLenght -
                                (scrollViewLength))) *
                            data.length
                    )

                let newValue = data.find((item) => item.id === current)?.value;

                if (newValue !== 0 && !newValue) newValue = max;

                textRef.current.setNativeProps({
                    text: newValue.toString(),
                });
            }
        },
        [horizontal, scrollViewLength, data]
    );

    const onLayoutHandler = React.useCallback(
        (e) => {
            setScrollViewLength(
                e.nativeEvent.layout[horizontal ? "width" : "height"]
            );
        },
        [horizontal]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: snapSegment,
            offset: snapSegment * index,
            index,
        }),
        []
    );

    const renderItem = React.useCallback(
        ({ item }) => {
            const tenth = item.id % 10 === 0;
            return (
                <Segment tenth={tenth} item={item} horizontal={horizontal} />
            );
        },
        [horizontal]
    );

    return (
        <RN.View
            style={{
                width: horizontal ? "100%" : rulerDimension + textDimension,
                height: !horizontal ? "100%" : rulerDimension + textDimension,
                flexDirection: !horizontal ? "row-reverse" : "column",
            }}
        >
            <RN.FlatList
                ref={scrollViewRef}
                horizontal={horizontal}
                contentContainerStyle={{
                    paddingHorizontal: horizontal ? scrollViewLength / 2 : 0,
                    paddingRight: horizontal
                        ? scrollViewLength / 2 - snapSegment
                        : 0,
                    paddingVertical: !horizontal ? scrollViewLength / 2 : 0,
                    paddingBottom: !horizontal
                        ? scrollViewLength / 2 - snapSegment
                        : 0,
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                onLayout={onLayoutHandler}
                onScroll={onScrollHandler}
                onMomentumScrollEnd={onScrollEndHandler}
                getItemLayout={getItemLayout}
                decelerationRate="normal"
                snapToOffsets={Array(data.length)
                    .fill(0)
                    .map((_, i) => i * snapSegment)}
                fadingEdgeLength={300}
                overScrollMode="never"
                keyExtractor={(item) => item.id}
                data={data}
                renderItem={renderItem}
                scrollEventThrottle={16}
                maxToRenderPerBatch={30}
            />

            <RN.View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    width: !horizontal ? textDimension : null,
                    height: horizontal ? textDimension : null,
                    top: !horizontal ? 10 : null
                }}
            >
                <RN.TextInput
                    style={{
                        fontFamily: "Rubik-Bold",
                        fontSize: theme.fontSize["2xl"],
                        color: theme.colors.primary,
                    }}
                    ref={textRef}
                    defaultValue={defaultValue.toString()}
                />
                <Paper.Text
                    style={{
                        fontSize: theme.fontSize["xs"],
                        color: theme.colors.primary,
                    }}
                >
                    {"  "}{unit}
                </Paper.Text>
            </RN.View>

            <RN.View
                style={{
                    backgroundColor: theme.colors.primary,
                    width: horizontal ? markerThickness : markerLenght,
                    height: !horizontal ? markerThickness : markerLenght,
                    top: !horizontal
                        ? (scrollViewLength) / 2 + snapSegment - segmentThickness / 2 - markerThickness / 2
                        : null,
                    left: horizontal
                        ? (scrollViewLength) / 2 + markerThickness / 2 + segmentThickness / 2
                        : null,
                    position: "absolute",
                    borderRadius: theme.rounded.lg,
                    ...theme.shadowBox.default,
                }}
            />
        </RN.View>
    );
};

export default Picker;
