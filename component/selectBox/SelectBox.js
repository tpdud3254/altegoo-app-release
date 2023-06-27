import {
    View,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import MediumText from "../text/MediumText";
import { color } from "../../styles";
import { Fragment, useState } from "react";
import RegularText from "../text/RegularText";

import HorizontalDivider from "../divider/HorizontalDivider";

const Container = styled.View`
    z-index: 100;
`;
const OptionsContainer = styled.View`
    z-index: 100;
    width: 100%;
    height: ${(props) => props.height - 200}px;
    position: absolute;
    align-items: center;
    justify-content: center;
`;
const Options = styled.View`
    width: 90%;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: white;
`;

const Option = styled.TouchableOpacity`
    align-items: center;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
`;

function SelectBox({ title, titleProps, onSelect, data }) {
    const { height: windowHeight } = useWindowDimensions();
    const [showOptions, setShowOptions] = useState(false);
    const [selected, setSelected] = useState(-1);

    const show = () => {
        setShowOptions(true);
    };

    const hide = () => {
        setShowOptions(false);
    };

    const clickOption = (index) => {
        onSelect(index);
        setSelected(index);
        hide();
    };

    return (
        <TouchableWithoutFeedback onPress={hide}>
            <Container>
                <MediumText
                    {...titleProps}
                    style={{
                        fontSize: 17,
                        color: color["page-grey-text"],
                        ...titleProps?.style,
                    }}
                >
                    {title}
                </MediumText>
                <TouchableOpacity
                    onPress={show}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 2,
                        borderBottomColor: color["input-border"],
                    }}
                >
                    <RegularText
                        style={{
                            width: "90%",
                            fontSize: 19,
                            paddingTop: 8,
                            paddingBottom: 16,
                            color:
                                selected < 0
                                    ? color["page-lightgrey-text"]
                                    : color["page-black-text"],
                        }}
                    >
                        {selected < 0 ? "선택하세요." : data[selected]}
                    </RegularText>
                    <View
                        style={{
                            width: "10%",
                            alignItems: "flex-end",
                            paddingTop: 8,
                            paddingRight: 2,
                            paddingBottom: 16,
                        }}
                    >
                        <Image
                            source={require(`../../assets/images/icons/allow_down.png`)}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </View>
                </TouchableOpacity>
                {showOptions ? (
                    <OptionsContainer height={windowHeight}>
                        <Options
                            style={{
                                shadowColor: "#00000044",
                                shadowOffset: {
                                    width: 1,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 20,
                            }}
                        >
                            {data.map((value, index) => (
                                <Fragment key={index}>
                                    <Option onPress={() => clickOption(index)}>
                                        <RegularText
                                            style={{
                                                color: color["page-dark-text"],
                                            }}
                                        >
                                            {value}
                                        </RegularText>
                                    </Option>
                                    {index < data.length - 1 ? (
                                        <HorizontalDivider
                                            color={color["box-border"] + "55"}
                                            width="90%"
                                        />
                                    ) : null}
                                </Fragment>
                            ))}
                        </Options>
                    </OptionsContainer>
                ) : null}
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default SelectBox;
