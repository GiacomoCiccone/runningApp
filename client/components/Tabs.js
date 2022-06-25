import { Tabs as PaperTabs, TabScreen } from "react-native-paper-tabs";
import { useTheme } from "../providers/theme.provider";

//tabs view
//always passing labels, icons and screens as arrays of same length
//if no icons needed, just pass empty string
const Tabs = ({ labels, icons, screens, ...props }) => {
    const theme = useTheme();

    if (!labels || !icons || !screens) throw Error("Provide Tabs data");
    if (
        labels.length !== icons.length ||
        labels.length !== screens.length ||
        screens.length !== icons.length
    )
        throw Error("Provide data for each tab screen.");

    return (
        <PaperTabs
            uppercase={false}
            style={[
                {
                    backgroundColor: theme.colors.background,
                    ...theme.shadowBox.none,
                },
                props.style,
            ]}
            dark={theme.dark}
            theme={theme}
            {...props}
        >
            {labels?.length > 0 &&
                labels.map((label, i) => (
                    <TabScreen key={label} label={label} icon={icons[i]}>
                        {screens[i]}
                    </TabScreen>
                ))}
        </PaperTabs>
    );
};

export default Tabs;
