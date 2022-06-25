import * as React from "react";

import * as RN from "react-native";
import * as Paper from "react-native-paper";

//redux
import { useDispatch, useSelector } from "react-redux";


import { useTheme } from "../../providers/theme.provider";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppHeader from "../../components/AppHeader";
import SnackBar from "../../components/SnackBar";
import { RESET_HISTORY, RESET_HISTORY_ERROR } from "../../redux/actions";
import { getHistory } from "../../redux/actions/historyActions";

const History = ({ navigation }) => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userInfo._id);
    const token = useSelector((state) => state.user.authToken);
    const historyLoading = useSelector((state) => state.history.isLoading);
    const historyError = useSelector((state) => state.history.error);
    const history = useSelector((state) => state.history.history);
    const historyFinished = useSelector((state) => state.history.finished);

    const [page, setPage] = React.useState(0);
    const [widthContainer, setWidthContainer] = React.useState(0);

    const resetError = React.useCallback(() => {
        dispatch({ type: RESET_HISTORY_ERROR });
    }, []);

    const changePage = React.useCallback(() => {
        setPage((page) => page + 1);
    }, []);

    const fetchHistory = React.useCallback(() => {
        console.log(historyFinished);
        if (!historyFinished)
            dispatch(getHistory(userId, token, page, changePage));
    }, [userId, token, page, historyFinished]);

    React.useEffect(() => {
        dispatch({ type: RESET_HISTORY })   //on first render reset the history
        fetchHistory();
        return () => dispatch({ type: RESET_HISTORY });
    }, []);

    return (
        <RN.SafeAreaView style={styles.safeContainer}>
            <AppHeader title="Storico" />

            {historyLoading && (
                <Paper.ProgressBar indeterminate style={styles.progressBar} />
            )}

            <SnackBar
                visible={historyError}
                onDismiss={resetError}
                action={{
                    label: "ok",
                    onPress: resetError,
                }}
                type="error"
            >
                {historyError}
            </SnackBar>

            <RN.View
                onLayout={(e) => setWidthContainer(e.nativeEvent.layout.width)}
                style={[
                    styles.contentContainer,
                    { marginHorizontal: theme.spacing.lg, flex: 1 },
                ]}
            >
                <RN.FlatList
                    ListEmptyComponent={<RN.View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>

                        <Paper.Text>
                            Nessun attività...
                        </Paper.Text>

                    </RN.View>}
                    keyExtractor={(item) => item._id}
                    data={history}
                    numColumns={3}
                    onEndReached={fetchHistory}
                    onEndReachedThreshold={0.1}
                    renderItem={({item}) => (
                        <Paper.TouchableRipple
                            onPress={() => navigation.navigate('HistoryEntry', {trackingSession: item})}
                            rippleColor={"#0000001A"}
                            style={{
                                width:
                                    widthContainer / 3 - theme.spacing.xs * 2,
                                height:
                                    widthContainer / 3 - theme.spacing.xs * 2,
                                margin: theme.spacing.xs,
                                borderRadius: theme.roundness,
                                backgroundColor: theme.colors["primary-shades"]["700"],
                            }}
                        >
                            <RN.View>
                            <Icon
                                name="run"
                                size={widthContainer / 3 - theme.spacing.xs * 2}
                                color={theme.colors["primary-shades"]["300"]}
                            />
                            
                            <RN.View style={{position: 'absolute', padding: theme.spacing.xs, alignItems: 'center', backgroundColor: "#000", flexDirection: 'row', borderRadius: theme.roundness, bottom: theme.spacing.xs, left: theme.spacing.xs}}>
                            <Icon
                                name="calendar"
                                color={theme.colors.grey}
                                size={theme.fontSize.xs}
                            />

                            <RN.View style={{width: 1, backgroundColor: theme.colors.grey, marginHorizontal: theme.spacing.xs, height: '100%'}} />

                            <Paper.Text style={{fontSize: theme.fontSize.xs, color: theme.colors.grey}}>
                                {new Date(item.startDate).toLocaleDateString('it-IT')}
                            </Paper.Text>
                            </RN.View>
                            </RN.View>
                           
                        </Paper.TouchableRipple>
                    )}
                ></RN.FlatList>
            </RN.View>
        </RN.SafeAreaView>
    );
};

const styles = RN.StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    contentContainer: {
        marginTop: 70,
    },
    progressBar: {
        position: 'absolute'
    }
});

export default History;
