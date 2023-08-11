import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import MediumText from "./text/MediumText";
import { color } from "../styles";

const Option = styled.View`
    background-color: ${color["box-color-background"]};
    align-items: center;
    justify-content: center;
    border: 1px solid ${color["page-color-text"]};
    border-radius: 19px;
    padding: 4px 11px;
    margin-right: 8px;
`;
export const OptionScroll = ({ data }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {data.map((text, index) => (
                    <Option key={index}>
                        <MediumText
                            style={{
                                fontSize: 16,
                                color: color["page-color-text"],
                            }}
                        >
                            {text}
                        </MediumText>
                    </Option>
                ))}
            </ScrollView>
        </View>
    );
};
