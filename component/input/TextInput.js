import {
    TextInput as Input,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import MediumText from "../text/MediumText";
import { color } from "../../styles";
import { useEffect, useRef, useState } from "react";

const Container = styled.View``;

function TextInput(props) {
    const input = useRef();
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (isFocused) input?.current?.focus();
    }, [isFocused]);

    const clickReset = () => {
        props.onReset();
    };

    return (
        <Container>
            <MediumText
                {...props.titleProps}
                style={{
                    fontSize: 17,
                    color: color["page-grey-text"],
                    ...props.titleProps?.style,
                }}
            >
                {props.title}
            </MediumText>
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 2,
                    borderBottomColor: isFocused
                        ? color["input-focus-border"]
                        : color["input-border"],
                }}
            >
                <Input
                    ref={input}
                    {...props}
                    cursorColor={color["page-lightgrey-text"]}
                    style={{
                        width: "90%",
                        fontSize: 19,
                        color: color["page-black-text"],
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        paddingTop: 8,
                        paddingBottom: 16,
                        ...props.style,
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <TouchableOpacity
                    onPress={clickReset}
                    style={{
                        width: "10%",
                        alignItems: "flex-end",
                        paddingTop: 8,
                        paddingRight: 2,
                        paddingBottom: 16,
                        display:
                            props.value && props.value.length > 0
                                ? null
                                : "none",
                    }}
                >
                    <Image
                        source={require(`../../assets/images/icons/btn_del_s.png`)}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </Container>
    );
}

export default TextInput;
