import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import PlainText from "../../../component/text/PlainText";
import Checkbox from "expo-checkbox";
import { theme } from "../../../styles";

function Setting() {
    const [check, setCheck] = useState(true);
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    width: "100%",
                    paddingTop: 30,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
            >
                <PlainText>작업알림 설정</PlainText>
                <Checkbox
                    style={{ width: 30, height: 30 }}
                    value={check}
                    onValueChange={setCheck}
                    color={check ? theme.btnPointColor : undefined}
                />
            </View>
        </View>
    );
}

Setting.propTypes = {};
export default Setting;
