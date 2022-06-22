import * as React from "react";
import * as RN from "react-native";
import * as Paper from "react-native-paper";
import * as Moti from 'moti'

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTheme } from "../../providers/theme.provider";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spacing from "../../components/Spacing";

const DetailEntry = ({ destination, label, value, id }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const userIsLoading = useSelector((state) => state.user.isLoading);
    const userError = useSelector((state) => state.user.error);
    const updated = useSelector(state => state.user.updated?.includes(id))

    return (
        <>
            <RN.TouchableWithoutFeedback
                disabled={userIsLoading || userError}
                onPress={() => navigation.navigate(destination)}
            >
                <RN.View style={styles.container}>
                    <Paper.Text style={{ fontSize: theme.fontSize.base }}>
                        {label}
                    </Paper.Text>

                    <Moti.MotiText from={{color: theme.colors.grey}} animate={{color: updated ? theme.colors.success : theme.colors.grey}}
                        style={{
                            fontFamily: 'Rubik-Regular',
                            fontSize: theme.fontSize.sm,
                        }}
                    >
                        {value}
                        <Icon name="chevron-right" color={theme.colors.text} />
                    </Moti.MotiText>
                </RN.View>
            </RN.TouchableWithoutFeedback>
            <Spacing horizontal size="xl" />
        </>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default DetailEntry;
