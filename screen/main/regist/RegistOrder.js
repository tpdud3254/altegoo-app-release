import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import MediumText from "../../../component/text/MediumText";
import { color } from "../../../styles";
import RegistContext from "../../../context/RegistContext";
import { REGIST_NAV } from "../../../constant";
import Layout from "../../../component/layout/Layout";
import { Image, View } from "react-native";
import RegularText from "../../../component/text/RegularText";
import SelectBox from "../../../component/selectBox/SelectBox";
import UserContext from "../../../context/UserContext";
import { PopupWithButtons } from "../../../component/PopupWithButtons";
import { Box } from "../../../component/box/Box";

const LastOrder = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20;
`;

const Item = styled.View`
    margin-bottom: 35px;
    padding-bottom: ${(props) => (props.bottomSpace ? props.bottomSpace : 0)}px;
`;
const Wrapper = styled.View``;
const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const OptionContainer = styled.TouchableOpacity`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: 75px;
    padding: ${(props) => (!props.width ? "0px" : "0px 15px")};
    align-items: center;
    flex-direction: row;
    justify-content: center;
    border-radius: 15px;
    background-color: ${(props) =>
        props.selected
            ? color["option-selected-background"]
            : color["option-unselected-background"]};
    border: 1px
        ${(props) =>
            props.selected
                ? color["option-selected-border"]
                : color["option-unselected-border"]};
`;
const OptionTitle = styled.View`
    width: 80%;
    padding: 0px 20px;
`;

const VEHICLE = ["사다리차", "스카이차"];
const DIRECTION = ["내림", "올림", "양사"];
const DIRECTION_IMAGE = [
    {
        on: require(`../../../assets/images/icons/icon_lift_down_ON.png`),
        off: require(`../../../assets/images/icons/icon_lift_down_OFF.png`),
    },
    {
        on: require(`../../../assets/images/icons/icon_lift_up_ON.png`),
        off: require(`../../../assets/images/icons/icon_lift_up_OFF.png`),
    },
    {
        on: require(`../../../assets/images/icons/icon_lift_both_ON.png`),
        off: require(`../../../assets/images/icons/icon_lift_both_OFF.png`),
    },
];
const FLOOR = [];
const VOLUME = {
    물량: ["1톤 이하 (단품)", "1톤 ~ 5톤", "5톤", "6톤", "7.5톤", "10톤"],
    시간: ["1시간", "추가 1시간 당", "반나절", "하루"],
};

function RegistOrder({ navigation }) {
    const { info, setInfo } = useContext(UserContext);
    const { registInfo, setRegistInfo } = useContext(RegistContext);
    const [vehicleType, setVehicleType] = useState(1);
    const [direction, setDirection] = useState(0);
    const [floor, setFloor] = useState(0);
    const [downFloor, setDownFloor] = useState(0);
    const [upFloor, setUpFloor] = useState(0);
    const [volume, setVolume] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [time, setTime] = useState(0);

    const [price, setPrice] = useState(0);

    const [isPopupShown, setIsPopupShown] = useState(false);
    const [lastOrder, setLastOrder] = useState(false);

    useEffect(() => {
        for (let index = 2; index < 19; index++) {
            FLOOR.push(`${index}층`);
        }
    }, []);

    useEffect(() => {
        if (lastOrder) {
            setIsPopupShown(true);
        }
    }, [lastOrder]);

    const cancelLastOrder = () => {
        setIsPopupShown(false);
        setLastOrder(false);
    };

    const getLastOrder = () => {
        setIsPopupShown(false);
        console.log("get last order");
    };

    const onNextStep = () => {
        // if (cur !== 0) {
        //     Toast.show({
        //         type: "errorToast",
        //         props: "모든 작업 유형 선택을 완료해주세요.",
        //     });
        //     return;
        // }

        // setRegistInfo({
        //     vehicleType: vehicleType === 1 ? "사다리" : "스카이",
        //     upDown:
        //         upDown === "up" ? "올림" : upDown === "down" ? "내림" : "양사",
        //     bothType: both,
        // });

        navigation.navigate(REGIST_NAV[1]);
    };

    const Checkbox = ({ checked }) => {
        return (
            <Image
                source={
                    checked
                        ? require("../../../assets/images/icons/Check_ON.png")
                        : require("../../../assets/images/icons/Check_OFF.png")
                }
                resizeMode="contain"
                style={{ width: 24, height: 24, marginRight: 10 }}
            />
        );
    };

    const ItemTitle = ({ title }) => {
        return (
            <RegularText style={{ fontSize: 20, marginBottom: 15 }}>
                {title}
            </RegularText>
        );
    };

    const Option = ({ selected, width, children, onPress }) => {
        let radio = require(`../../../assets/images/icons/Radio_ON.png`);

        if (!selected)
            radio = require(`../../../assets/images/icons/Radio_OFF.png`);

        return (
            <OptionContainer
                selected={selected}
                width={width}
                onPress={onPress}
            >
                <Image
                    source={radio}
                    resizeMode="contain"
                    style={{ width: 25 }}
                />
                <OptionTitle>{children}</OptionTitle>
            </OptionContainer>
        );
    };

    // const gopay = () => {
    //     let curPoint = 0;
    //     const data = {
    //         application_id: PAYMENT_APP_ID,
    //         price: price - curPoint,
    //         order_name: VEHICLE[vehicleType - 1] + " 이용비 결제",
    //         order_id: info.userId + "_" + Date.now(),
    //         user: {
    //             username: info.userName,
    //             phone: info.phone,
    //         },
    //         curPoint,
    //         pointId: 126,
    //     };
    //     navigation.navigate("Payment", { data });
    // };

    return (
        <Layout
            kakaoBtnShown={true}
            bottomButtonProps={{
                onPress: onNextStep,
                title: `예상 운임 ${price}AP 확인`,
                // disabled: true,
            }}
        >
            <LastOrder onPress={() => setLastOrder((prev) => !prev)}>
                <Checkbox checked={lastOrder} />
                <RegularText>지난 오더 불러오기</RegularText>
            </LastOrder>
            <Item>
                <ItemTitle title="1. 어떤 작업이 필요한가요?" />
                <Wrapper>
                    <Row>
                        {VEHICLE.map((value, index) => (
                            <Option
                                key={index}
                                width="48%"
                                selected={index + 1 === vehicleType}
                                onPress={() => setVehicleType(index + 1)}
                            >
                                <MediumText
                                    style={{
                                        color:
                                            index + 1 === vehicleType
                                                ? color.main
                                                : color["page-black-text"],
                                    }}
                                >
                                    {value}
                                </MediumText>
                            </Option>
                        ))}
                    </Row>
                </Wrapper>
            </Item>
            {vehicleType === 1 ? (
                <>
                    <Item>
                        <ItemTitle title="2. 올리시나요, 내리시나요?" />
                        <Wrapper>
                            {DIRECTION.map((value, index) => (
                                <View
                                    key={index}
                                    style={{
                                        marginBottom:
                                            index + 1 === DIRECTION.length
                                                ? 0
                                                : 13,
                                    }}
                                >
                                    <Option
                                        selected={index + 1 === direction}
                                        onPress={() => setDirection(index + 1)}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MediumText
                                                style={{
                                                    color:
                                                        index + 1 === direction
                                                            ? color.main
                                                            : color[
                                                                  "page-black-text"
                                                              ],
                                                }}
                                            >
                                                {value}
                                            </MediumText>
                                            <Image
                                                source={
                                                    index + 1 === direction
                                                        ? DIRECTION_IMAGE[index]
                                                              .on
                                                        : DIRECTION_IMAGE[index]
                                                              .off
                                                }
                                                style={{
                                                    width: 13,
                                                    height: 20,
                                                    marginLeft: 8,
                                                }}
                                            />
                                        </View>
                                    </Option>
                                </View>
                            ))}
                        </Wrapper>
                    </Item>
                    <Item>
                        <ItemTitle title="3. 작업의 높이는 어떻게 되나요?" />
                        {direction !== 3 ? (
                            <Wrapper>
                                <SelectBox
                                    placeholder="층 수 선택"
                                    data={FLOOR}
                                    onSelect={(index) => setFloor(index + 2)}
                                />
                            </Wrapper>
                        ) : (
                            <Wrapper>
                                <View style={{ marginBottom: 20 }}>
                                    <Row>
                                        <Box text="내림" />
                                        <SelectBox
                                            width="71%"
                                            placeholder="층 수 선택"
                                            data={FLOOR}
                                            onSelect={(index) =>
                                                setDownFloor(index + 2)
                                            }
                                        />
                                    </Row>
                                </View>
                                <Row>
                                    <Box text="올림" />
                                    <SelectBox
                                        width="71%"
                                        placeholder="층 수 선택"
                                        data={FLOOR}
                                        onSelect={(index) =>
                                            setUpFloor(index + 2)
                                        }
                                    />
                                </Row>
                            </Wrapper>
                        )}
                    </Item>
                    <Item bottomSpace="40">
                        <ItemTitle title="4. 작업의 물량 혹은 시간은 어떻게 되나요?" />
                        <Wrapper>
                            <Row>
                                <SelectBox
                                    width="25%"
                                    placeholder="선택"
                                    data={Object.keys(VOLUME)}
                                    onSelect={(index) =>
                                        setVolume(Object.keys(VOLUME)[index])
                                    }
                                />
                                <SelectBox
                                    width="71%"
                                    placeholder={
                                        volume.length > 0
                                            ? `${volume} 선택`
                                            : "물량 또는 시간을 선택하세요."
                                    }
                                    data={
                                        volume.length > 0 ? VOLUME[volume] : []
                                    }
                                    onSelect={(index) =>
                                        volume === "물량"
                                            ? setQuantity(index + 1)
                                            : setTime(index + 1)
                                    }
                                />
                            </Row>
                        </Wrapper>
                    </Item>
                </>
            ) : (
                <>
                    <Item>
                        <ItemTitle title="2. 작업의 높이는 어떻게 되나요?" />
                        <Wrapper>
                            <SelectBox
                                placeholder="층 수 선택"
                                data={FLOOR}
                                onSelect={(index) => setFloor(index + 2)}
                            />
                        </Wrapper>
                    </Item>
                    <Item>
                        <ItemTitle title="3. 작업 시간은 어느정도 예상하시나요?" />
                        <Wrapper>
                            <Row>
                                <SelectBox
                                    placeholder="시간 선택"
                                    data={VOLUME["시간"]}
                                    onSelect={(index) => setTime(index + 1)}
                                />
                            </Row>
                        </Wrapper>
                    </Item>
                </>
            )}
            <PopupWithButtons
                visible={isPopupShown}
                onTouchOutside={cancelLastOrder}
                onClick={getLastOrder}
            >
                <RegularText
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        lineHeight: 30,
                        paddingTop: 15,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 25,
                    }}
                >
                    지난 번에 진행했던{"\n"}내용을 불러옵니다.
                </RegularText>
            </PopupWithButtons>
        </Layout>
    );
}

export default RegistOrder;
