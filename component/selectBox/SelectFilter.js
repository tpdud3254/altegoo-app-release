import { Image, TouchableWithoutFeedback, ScrollView } from "react-native";
import styled from "styled-components/native";
import MediumText from "../text/MediumText";
import { color } from "../../styles";
import { Fragment, useEffect, useState } from "react";
import RegularText from "../text/RegularText";
import HorizontalDivider from "../divider/HorizontalDivider";
import { shadowProps } from "../Shadow";
import { SelectPopup } from "./SelectPopup";

const Container = styled.View``;

const Select = styled.TouchableOpacity`
    background-color: #f4f4f4;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 9px 10px 9px 17px;
    border-radius: 10px;
    width: ${(props) => (props.width ? props.width : "110px")};
`;

const OptionsContainer = styled.View`
    width: 100%;
    align-items: center;
`;
const Options = styled.View`
    width: 90%;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: white;
    max-height: 500px;
`;

const Option = styled.TouchableOpacity`
    align-items: center;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
`;

function SelectFilter({ onSelect, data, width, selectedIndex }) {
    const [showOptions, setShowOptions] = useState(false);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        if (selectedIndex) setSelected(selectedIndex);
    }, [selectedIndex]);

    const show = () => {
        setShowOptions(true);
    };

    const hide = () => {
        setShowOptions(false);
    };

    const clickOption = (index) => {
        hide();
        onSelect(index);
        setSelected(index);
    };

    return (
        <TouchableWithoutFeedback onPress={hide}>
            <Container>
                <Select onPress={data.length > 0 ? show : null} width={width}>
                    <MediumText
                        style={{
                            fontSize: 15,
                        }}
                    >
                        {data[selected]}
                    </MediumText>
                    <Image
                        source={require("../../assets/images/icons/allow_down.png")}
                        style={{ width: 21, height: 12 }}
                    />
                </Select>
                <SelectPopup
                    visible={showOptions}
                    onTouchOutside={hide}
                    onClick={hide}
                >
                    <OptionsContainer>
                        <Options style={shadowProps}>
                            <ScrollView
                                style={{
                                    width: "100%",
                                }}
                                contentContainerStyle={{
                                    alignItems: "center",
                                }}
                            >
                                {data.map((value, index) => (
                                    <Fragment key={index}>
                                        <Option
                                            onPress={() => clickOption(index)}
                                        >
                                            <RegularText
                                                style={{
                                                    color: color[
                                                        "page-dark-text"
                                                    ],
                                                }}
                                            >
                                                {value}
                                            </RegularText>
                                        </Option>
                                        {index < data.length - 1 ? (
                                            <HorizontalDivider
                                                color={
                                                    color["box-border"] + "55"
                                                }
                                                width="90%"
                                            />
                                        ) : null}
                                    </Fragment>
                                ))}
                            </ScrollView>
                        </Options>
                    </OptionsContainer>
                </SelectPopup>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default SelectFilter;
