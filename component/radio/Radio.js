import { Image } from "react-native";
import styled from "styled-components/native";
import MediumText from "../text/MediumText";
import { color } from "../../styles";

const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 75px;
    width: ${(props) => (props.width ? props.width : "48%")};
    padding-left: 10px;
    margin-bottom: 15px;
    border-radius: 12px;
    background-color: ${(props) =>
        props.selected
            ? color["option-selected-background"]
            : color["option-unselected-background"]};
    border: 1px solid
        ${(props) =>
            props.selected
                ? color["option-selected-border"]
                : color["option-unselected-border"]};
`;
export const Radio = ({ selected, onSelect, value, width }) => {
    return (
        <Container onPress={onSelect} selected={selected} width={width}>
            <Image
                source={
                    selected
                        ? require("../../assets/images/icons/Radio_ON.png")
                        : require("../../assets/images/icons/Radio_OFF.png")
                }
                style={{ width: 28, height: 28, marginRight: 10 }}
            />
            <MediumText
                style={{
                    color: selected
                        ? color["page-color-text"]
                        : color["page-black-text"],
                    maxWidth: "72%",
                }}
            >
                {value}
            </MediumText>
        </Container>
    );
};
