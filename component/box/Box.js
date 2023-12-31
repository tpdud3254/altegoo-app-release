import { View } from "react-native";
import { color } from "../../styles";
import RegularText from "../text/RegularText";

export const Box = ({ width, text, textStyle }) => (
    <View
        style={{
            width: width ? width : "25%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 2,
            borderBottomColor: color["input-border"],
            marginTop: 2,
        }}
    >
        <RegularText
            style={{
                width: "90%",
                fontSize: 19,
                paddingTop: 8,
                paddingBottom: 16,
                color: color["page-black-text"],
                ...textStyle,
            }}
        >
            {text}
        </RegularText>
    </View>
);
