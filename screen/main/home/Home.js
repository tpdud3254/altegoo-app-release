import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import { ORDINARY } from "../../../constant";
import axios from "axios";
import { SERVER } from "../../../server";
import {
    getAsyncStorageToken,
    numberWithComma,
    showError,
} from "../../../utils";
import HeaderLeft from "../../../component/HeaderLeft";
import HeaderRight from "../../../component/HeaderRight";
import OrderList from "../orders/OrderList";
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styled from "styled-components/native";
import PlainText from "../../../component/text/PlainText";
import TitleText from "../../../component/text/TitleText";
import SubTitleText from "../../../component/text/SubTitleText";
import MainLayout from "../../../component/layout/MainLayout";
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { theme } from "../../../styles";
import HorizontalDivider from "../../../component/divider/HorizontalDivider";

const Banners = styled.View``;
const Banner = styled.View`
    align-items: center;
    justify-content: center;
    background-color: grey;
    height: 70px;
`;

const Container = styled(MainLayout)``;
const Greeting = styled.View`
    margin-bottom: 5px;
`;
const Point = styled.View`
    flex-direction: row;
    align-items: center;
`;
const RegistButtons = styled.View`
    margin-top: 15px;
    background-color: #ffffffaa;
    border-radius: 5px;
    align-items: center;
`;
const Regist = styled.View`
    align-items: center;
    margin-top: 13px;
    margin-bottom: 13px;
`;

const RegistButton = styled.TouchableOpacity`
    margin-top: 5px;
    background-color: ${theme.boxColor};
    flex-direction: row;
    align-items: center;
    width: 250px;
    justify-content: center;
    padding: 5px 0px;
    border-radius: 3px;
`;

const Notification = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
    width: 380px;
    border: 1px solid
        ${(props) =>
            props.order
                ? theme.btnPointColor + "aa"
                : props.event
                ? "#ef5285" + "aa"
                : theme.darkFontColor + "aa"};
    background-color: #ffffffaa;
`;
const NotiWrapper = styled.View`
    padding-left: 10px;
    border-left-width: 0px;
`;
const NotiIcon = styled.View`
    background-color: ${(props) =>
        props.order
            ? theme.btnPointColor
            : props.event
            ? "#ef5285" + "aa"
            : theme.darkFontColor};
    padding: 3px;
    justify-content: center;
`;
const NotiTitle = styled.View``;
const NotiText = styled.View``;

const Notifications = styled(RegistButtons)`
    background-color: transparent;
`;
function Home({ navigation }) {
    const { info } = useContext(UserContext);
    const [point, setPoint] = useState(0);

    useEffect(() => {
        if (info.userType !== ORDINARY) {
            navigation.setOptions({
                headerRight: () => <HeaderRight />,
            });
        }
        getPoint(); //포인트가져오기
    }, []);

    const getPoint = async () => {
        axios
            .get(SERVER + "/users/point", {
                headers: {
                    auth: await getAsyncStorageToken(),
                },
            })
            .then(({ data }) => {
                const {
                    result,
                    data: { point },
                } = data;
                console.log("result: ", result);
                console.log("point: ", point);

                if (info.userType !== ORDINARY) {
                    navigation.setOptions({
                        headerLeft: () => (
                            <HeaderLeft
                                onPress={goToPoint}
                                name={info.name}
                                point={point?.curPoint}
                            />
                        ),
                    });
                } else {
                    setPoint(point?.curPoint);
                }
            })
            .catch((error) => {
                showError(error);
            })
            .finally(() => {});
    };

    const goToPoint = () => {
        navigation.navigate("SettingNavigator", { screen: "PointNavigator" });
    };

    return (
        <>
            {info.userType === ORDINARY ? (
                <View style={{ flex: 1 }}>
                    <Banners>
                        <Banner>
                            <PlainText style={{ color: "white" }}>
                                배너
                            </PlainText>
                        </Banner>
                    </Banners>
                    <View
                        style={{
                            flex: 1.7,
                        }}
                    >
                        <Container>
                            <Greeting>
                                <PlainText style={{ fontSize: 25 }}>
                                    안녕하세요! 최진욱님.
                                </PlainText>
                            </Greeting>
                            <Point>
                                <FontAwesome5
                                    name="coins"
                                    color="#777"
                                    size={22}
                                />
                                <SubTitleText
                                    style={{ fontSize: 20, color: theme.main }}
                                >
                                    {" " + numberWithComma(point)}AP
                                </SubTitleText>
                            </Point>
                            <RegistButtons>
                                <Regist>
                                    <SubTitleText
                                        style={{
                                            textAlign: "center",
                                            lineHeight: 25,
                                            fontSize: 21,
                                        }}
                                    >
                                        작업 등록만 진행하셔도{"\n"}포인트가
                                        지급됩니다.
                                    </SubTitleText>
                                    <RegistButton>
                                        <PlainText
                                            style={{
                                                color: "white",
                                                fontSize: 22,
                                            }}
                                        >
                                            작업등록 하러가기
                                        </PlainText>
                                        <MaterialIcons
                                            name="keyboard-arrow-right"
                                            size={30}
                                            color="white"
                                        />
                                    </RegistButton>
                                </Regist>
                                <HorizontalDivider
                                    color={theme.boxColor}
                                    width="95%"
                                />
                                <Regist>
                                    <SubTitleText
                                        style={{
                                            textAlign: "center",
                                            lineHeight: 25,
                                            fontSize: 21,
                                        }}
                                    >
                                        긴급!! 긴급!! 전체 기사님들께{"\n"}
                                        요청이 바로 전송됩니다!!
                                    </SubTitleText>

                                    <TouchableOpacity
                                        style={{
                                            marginTop: 5,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: 250,
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: theme.main,
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                width: "25%",
                                                borderBottomLeftRadius: 3,
                                                borderTopLeftRadius: 3,
                                                alignItems: "center",
                                            }}
                                        >
                                            <PlainText
                                                style={{
                                                    color: "white",
                                                    fontSize: 22,
                                                }}
                                            >
                                                긴급
                                            </PlainText>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                backgroundColor:
                                                    theme.darkFontColor,
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                width: "75%",
                                                borderBottomRightRadius: 3,
                                                borderTopRightRadius: 3,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <PlainText
                                                style={{
                                                    color: "white",
                                                    fontSize: 22,
                                                }}
                                            >
                                                119 작업등록
                                            </PlainText>
                                            <MaterialIcons
                                                name="keyboard-arrow-right"
                                                size={30}
                                                color="white"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </Regist>
                            </RegistButtons>
                        </Container>
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {false ? (
                            <ScrollView
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={refreshing}
                            //         onRefresh={onRefresh}
                            //     />
                            // }
                            >
                                <TouchableWithoutFeedback>
                                    <Notifications>
                                        <Notification order>
                                            <NotiIcon order>
                                                <SubTitleText
                                                    style={{
                                                        fontSize: 18,
                                                        color: "white",
                                                    }}
                                                >
                                                    알림
                                                </SubTitleText>
                                            </NotiIcon>
                                            <NotiWrapper order>
                                                <NotiTitle>
                                                    <PlainText
                                                        numberOfLines={1}
                                                        style={{
                                                            color: "#777",
                                                        }}
                                                    >
                                                        스카이 / 올림(4층) /
                                                        추가 1시간 당
                                                    </PlainText>
                                                </NotiTitle>

                                                <NotiText>
                                                    <PlainText
                                                        style={{
                                                            fontSize: 21,
                                                        }}
                                                        numberOfLines={1}
                                                    >
                                                        작업 예약이 완료
                                                        되었습니다.
                                                    </PlainText>
                                                </NotiText>
                                            </NotiWrapper>
                                        </Notification>
                                        <Notification>
                                            <NotiIcon>
                                                <SubTitleText
                                                    style={{
                                                        fontSize: 18,
                                                        color: "white",
                                                    }}
                                                >
                                                    공지
                                                </SubTitleText>
                                            </NotiIcon>
                                            <NotiWrapper>
                                                <NotiTitle>
                                                    <PlainText
                                                        numberOfLines={1}
                                                        style={{
                                                            color: "#777",
                                                        }}
                                                    >
                                                        스카이 / 올림(4층) /
                                                        추가 1시간 당
                                                    </PlainText>
                                                </NotiTitle>

                                                <NotiText>
                                                    <PlainText
                                                        style={{
                                                            fontSize: 21,
                                                        }}
                                                        numberOfLines={1}
                                                    >
                                                        작업 예약이 완료
                                                        되었습니다.
                                                    </PlainText>
                                                </NotiText>
                                            </NotiWrapper>
                                        </Notification>
                                        <Notification event>
                                            <NotiIcon event>
                                                <SubTitleText
                                                    style={{
                                                        fontSize: 18,
                                                        color: "white",
                                                    }}
                                                >
                                                    이벤트
                                                </SubTitleText>
                                            </NotiIcon>
                                            <NotiWrapper>
                                                <NotiTitle>
                                                    <PlainText
                                                        numberOfLines={1}
                                                        style={{
                                                            color: "#777",
                                                        }}
                                                    >
                                                        스카이 / 올림(4층) /
                                                        추가 1시간 당
                                                    </PlainText>
                                                </NotiTitle>

                                                <NotiText>
                                                    <PlainText
                                                        style={{
                                                            fontSize: 21,
                                                        }}
                                                        numberOfLines={1}
                                                    >
                                                        작업 예약이 완료
                                                        되었습니다.
                                                    </PlainText>
                                                </NotiText>
                                            </NotiWrapper>
                                        </Notification>
                                    </Notifications>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: -20,
                                }}
                            >
                                <AntDesign
                                    name="closecircle"
                                    size={30}
                                    color="#777"
                                    style={{ marginBottom: 5 }}
                                />
                                <PlainText>새로운 알림이 없습니다.</PlainText>
                            </View>
                        )}
                    </View>
                </View>
            ) : (
                <OrderList />
            )}
        </>
    );
}

export default Home;
