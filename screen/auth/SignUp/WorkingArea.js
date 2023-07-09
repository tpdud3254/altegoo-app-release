import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import UserContext from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../../styles";
import { COMPANY, DRIVER, NORMAL, SIGNUP_NAV } from "../../../constant";
import AuthLayout from "../../../component/layout/AuthLayout";
import RegularText from "../../../component/text/RegularText";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Image, View } from "react-native";

const Container = styled.View``;
const Table = styled.View`
    width: 100%;
    margin-top: 10px;
    border-top-width: 1px;
    border-top-color: ${color["input-border"]};
    border-bottom-width: 1px;
    border-bottom-color: ${color["input-border"]};
`;
const Row = styled.View`
    width: 100%;
    flex-direction: row;
`;
const Area = styled.View`
    width: 20%;
    background-color: ${color["box-color-background"]};
    border-bottom-width: ${(props) => (props.lastIndex ? 0 : 1)}px;
    border-bottom-color: ${color["input-border"]};
    justify-content: center;
    padding-left: 3px;
`;
const AreaDetail = styled.View`
    width: 75%;
    border-bottom-width: ${(props) => (props.lastIndex ? 0 : 1)}px;
    border-bottom-color: ${color["input-border"]};
`;

const AreaDetailText = styled.View`
    padding-top: 18px;
    padding-bottom: 18px;
    border-bottom-width: ${(props) => (props.lastIndex ? 0 : 1)}px;
    border-bottom-color: ${color["input-border"]};
`;
const Space = styled.View`
    width: 5%;
`;

const AreaButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
`;
const areaObj = {
    서울: ["서울 전체"],
    경기: [
        "경기 전체",
        "경기 북서부",
        "경기 북동부",
        "경기 남서부",
        "경기 남동부",
    ],
    인천: ["인천 전체"],
};

const areaDetailObj = {
    경기: [
        "김포시 / 부천시 / 파주시 /\n고양시 / 동두천시 / 연천군",
        "의정부시 / 양주시 / 구리시 /\n남양주시 / 포천시 / 가평군",
        "광명시 / 시흥시 / 안산시 / 안양시 /\n과천시 / 의왕시 / 군포시 / 수원시 /\n오산시 / 화성시 / 평택시",
        "성남시 / 하남시 / 광주시 / 용인시 /\n안성시 / 이천시 / 여주시 / 양평군",
    ],
};

function WorkingArea() {
    const navigation = useNavigation();
    const { info, setInfo } = useContext(UserContext);
    const [selected, setSelected] = useState([]);

    const onNext = () => {
        // if (type === "") {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "회원 유형을 선택해 주세요.",
        //     });
        //     return;
        // }
        // const data = {
        //     userType: type,
        // };
        // setInfo(data);
        // navigation.navigate("SignUpStep1");
        const curNavIndex = SIGNUP_NAV[info.userType].indexOf("WorkingArea");
        navigation.navigate(SIGNUP_NAV[info.userType][curNavIndex + 1]);
    };

    const isExist = (cur) =>
        selected.find(
            (element) => element[0] === cur[0] && element[1] === cur[1]
        );

    const select = (areaIndex, detailIndex) => {
        const cur = [areaIndex, detailIndex];

        if (isExist(cur)) {
            const remove = selected.filter(
                (element) => !(element[0] === cur[0] && element[1] === cur[1])
            );
            setSelected(remove);
            return;
        }

        const prev = selected;

        setSelected([...prev, cur]);
    };

    console.log("seleted : ", selected);

    return (
        <AuthLayout
            bottomButtonProps={{
                title: "다음으로",
                onPress: onNext,
            }}
        >
            <Container>
                <RegularText>지역을 선택하세요.</RegularText>
                <Table>
                    {Object.keys(areaObj).map((area, areaIndex) => (
                        <Row key={areaIndex}>
                            <Area
                                lastIndex={
                                    areaIndex ===
                                    Object.keys(areaObj).length - 1
                                }
                            >
                                <RegularText>{area}</RegularText>
                            </Area>
                            <Space />
                            <AreaDetail
                                lastIndex={
                                    areaIndex ===
                                    Object.keys(areaObj).length - 1
                                }
                            >
                                {areaObj[area].map((detail, detailIndex) => (
                                    <AreaDetailText
                                        key={detailIndex}
                                        lastIndex={
                                            detailIndex ===
                                            areaObj[area].length - 1
                                        }
                                    >
                                        <AreaButton
                                            onPress={() =>
                                                select(areaIndex, detailIndex)
                                            }
                                        >
                                            <View>
                                                <RegularText
                                                    style={{
                                                        color: isExist([
                                                            areaIndex,
                                                            detailIndex,
                                                        ])
                                                            ? color[
                                                                  "page-color-text"
                                                              ]
                                                            : color[
                                                                  "page-black-text"
                                                              ],
                                                    }}
                                                >
                                                    {detail}
                                                </RegularText>
                                                {areaDetailObj[area] &&
                                                detailIndex > 0 ? (
                                                    <RegularText
                                                        style={{
                                                            color: isExist([
                                                                areaIndex,
                                                                detailIndex,
                                                            ])
                                                                ? color[
                                                                      "page-black-text"
                                                                  ]
                                                                : color[
                                                                      "page-grey-text"
                                                                  ],
                                                        }}
                                                    >
                                                        {
                                                            areaDetailObj[area][
                                                                detailIndex - 1
                                                            ]
                                                        }
                                                    </RegularText>
                                                ) : null}
                                            </View>
                                            <Image
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                                source={
                                                    isExist([
                                                        areaIndex,
                                                        detailIndex,
                                                    ])
                                                        ? require("../../../assets/images/icons/check_circle_ON.png")
                                                        : require("../../../assets/images/icons/check_circle_OFF.png")
                                                }
                                            />
                                        </AreaButton>
                                    </AreaDetailText>
                                ))}
                            </AreaDetail>
                        </Row>
                    ))}
                </Table>
            </Container>
        </AuthLayout>
    );
}

export default WorkingArea;
