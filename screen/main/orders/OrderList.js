import React, { useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import BoldText from "../../../component/text/BoldText";
import RegularText from "../../../component/text/RegularText";
import MediumText from "../../../component/text/MediumText";
import { Notification } from "../../../component/Notification";
import { color } from "../../../styles";
import Layout from "../../../component/layout/Layout";

const HeaderContainer = styled.View`
    background-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px 20px 20px 20px;
    border-bottom-color: ${color["image-area-background"]};
    border-bottom-width: 1px;
`;

const HaederWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    width: 110px;
`;

const Select = styled.TouchableOpacity`
    background-color: #f4f4f4;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 9px 10px 9px 17px;
    border-radius: 10px;
    width: 110px;
`;
function OrderList({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            header: () => <Header />,
        });
    });

    const Header = () => {
        return (
            <HeaderContainer>
                <HaederWrapper>
                    <Image
                        source={require("../../../assets/images/icons/bullet_tri.png")}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <BoldText style={{ fontSize: 16 }}>
                        1건
                        <RegularText style={{ fontSize: 16 }}>
                            {" "}
                            예정
                        </RegularText>
                    </BoldText>
                </HaederWrapper>
                <HaederWrapper style={{ justifyContent: "center" }}>
                    <Select>
                        <MediumText
                            style={{
                                fontSize: 15,
                            }}
                        >
                            전체 기간
                        </MediumText>
                        <Image
                            source={require("../../../assets/images/icons/allow_down.png")}
                            style={{ width: 21, height: 12 }}
                        />
                    </Select>
                </HaederWrapper>
                <HaederWrapper style={{ justifyContent: "flex-end" }}>
                    <Notification />
                </HaederWrapper>
            </HeaderContainer>
        );
    };

    return <Layout></Layout>;
}

OrderList.propTypes = {};
export default OrderList;
