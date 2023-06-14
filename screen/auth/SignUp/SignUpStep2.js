import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import MediumText from "../../../component/text/MediumText";
import { Image, TouchableOpacity } from "react-native";
import UserContext from "../../../context/UserContext";
import DefaultLayout from "../../../component/layout/DefaultLayout";

import { color } from "../../../styles";

import Toast from "react-native-toast-message";
import { Modal, Portal, Provider } from "react-native-paper";
import SubTitleText from "../../../component/text/SubTitleText";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../component/button/Button";

const Container = styled.View`
    flex: 1;
`;

const MapContainer = styled.View`
    margin-top: 10px;
    width: 100%;
    min-height: 450px;
    justify-content: center;
    align-items: center;
`;

const Map = styled.View`
    width: 364px;
    height: 482px;
`;

const MapButton = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    background-color: #ffffffbb;
    padding: 5px;
    border-radius: 5px;
`;
const GuideTextContainer = styled.View`
    width: 100%;
    align-items: center;
`;

const modalStyle = {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: "center",
};
const ModalTop = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
`;
const ModalTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;
const modalTitleStyle = { marginLeft: 5, marginRight: 5 };
const modalSubTitleStyle = { fontSize: 22, marginBottom: 3 };
const modalTextStyle = { marginBottom: 20, color: color.darkGrey };

const imageSize = {
    //실제 이미지 크기
    1: [231, 190],
    2: [113, 197],
    3: [396, 631],
    4: [415, 504],
    5: [294, 445],
    6: [492, 576],
};

function SignUpStep2() {
    const [adjustedImage, setAdjustedImage] = useState({}); //조정된 이미지 크기
    const [imageResized, setImageResized] = useState(false); //이미지 resize 여부
    const [helpVisible, setHelpVisible] = useState(false);
    const [regionArr, setRegionArr] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const { info, setInfo } = useContext(UserContext);
    const navigation = useNavigation();

    console.log(info);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={showModal}
                    style={{ marginRight: 10 }}
                >
                    <Ionicons
                        name="help-circle-outline"
                        size={35}
                        color={color.darkGrey}
                    />
                </TouchableOpacity>
            ),
        });
        const firstImageWidth = 180;

        let widthArr = [];

        for (let i = 0; i < 6; i++) {
            const width =
                (firstImageWidth * imageSize[i + 1][0]) / imageSize[3][0];
            widthArr.push(width);
        }

        let height = [];

        widthArr.map((value, index) => {
            const size =
                (imageSize[index + 1][1] * value) / imageSize[index + 1][0];

            height.push(size);
        });

        const adjustedObj = { width: widthArr, height: height };

        setAdjustedImage(adjustedObj);
        setImageResized(true);
    }, []);

    const showModal = () => setHelpVisible(true);
    const hideModal = () => setHelpVisible(false);

    const onNextStep = () => {
        const workRegion = [];

        regionArr.map((value, index) => {
            if (value) {
                workRegion.push(index + 1);
            }
        });

        if (workRegion.length < 1) {
            Toast.show({
                type: "errorToast",
                props: "작업 지역을 선택해주세요.",
            });

            return;
        }
        setInfo({ workRegion, ...info });

        navigation.navigate("SignUpStep3");
    };

    const onPress = (index) => {
        const prevArr = [...regionArr];

        prevArr[index] = !prevArr[index];

        setRegionArr(prevArr);
    };

    const HelpModal = () => (
        <Portal>
            <Modal
                visible={helpVisible}
                onDismiss={hideModal}
                contentContainerStyle={modalStyle}
            >
                <ModalTop>
                    <Ionicons name="close" size={30} color="white" />
                    <ModalTitle>
                        <Ionicons
                            name="alert-circle-outline"
                            size={30}
                            color={color.main}
                        />
                        <SubTitleText style={modalTitleStyle}>
                            작업 지역 안내
                        </SubTitleText>
                        <Ionicons
                            name="alert-circle-outline"
                            size={30}
                            color={color.main}
                        />
                    </ModalTitle>
                    <TouchableOpacity
                        style={{ marginRight: -10 }}
                        onPress={hideModal}
                    >
                        <Ionicons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </ModalTop>
                <MediumText style={modalSubTitleStyle}>
                    [경기 북서부]
                </MediumText>
                <MediumText style={modalTextStyle}>
                    김포시 / 부천시 / 파주시 / 고양시 / 동두천시 / 연천군
                </MediumText>
                <MediumText style={modalSubTitleStyle}>
                    [경기 북동부]
                </MediumText>
                <MediumText style={modalTextStyle}>
                    의정부시 / 양주시 / 구리시 / 남양주시 / 포천시 / 가평군
                </MediumText>
                <MediumText style={modalSubTitleStyle}>
                    [경기 남서부]
                </MediumText>
                <MediumText style={modalTextStyle}>
                    광명시 / 시흥시 / 안산시 / 안양시 / 과천시 / 의왕시 / 군포시
                    / 수원시 / 오산시 / 화성시 / 평택시
                </MediumText>
                <MediumText style={modalSubTitleStyle}>
                    [경기 남동부]
                </MediumText>
                <MediumText style={modalTextStyle}>
                    성남시 / 하남시 / 광주시 / 용인시 / 안성시 / 이천시 / 여주시
                    / 양평군
                </MediumText>
            </Modal>
        </Portal>
    );
    return (
        <DefaultLayout>
            <Provider>
                <HelpModal />
                <Container>
                    <MapContainer>
                        {imageResized ? (
                            <Map>
                                <MapButton
                                    style={{
                                        top: 238,
                                        left: 100,
                                    }}
                                    onPress={() => {
                                        onPress(0);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        서울시
                                    </MediumText>
                                </MapButton>
                                <Image //서울
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[0],
                                        height: adjustedImage.height[0],
                                        position: "absolute",
                                        top: 206,
                                        left: 75,
                                    }}
                                    source={
                                        regionArr[0]
                                            ? require(`../../../assets/images/map/selected1.png`)
                                            : require(`../../../assets/images/map/unselected1.png`)
                                    }
                                />
                                <MapButton
                                    style={{
                                        top: 259,
                                        left: 15,
                                    }}
                                    onPress={() => {
                                        onPress(1);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        인천시
                                    </MediumText>
                                </MapButton>
                                <Image //인천
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[1],
                                        height: adjustedImage.height[1],
                                        position: "absolute",
                                        top: 229,
                                        left: 21,
                                    }}
                                    source={
                                        regionArr[1]
                                            ? require(`../../../assets/images/map/selected2.png`)
                                            : require(`../../../assets/images/map/unselected2.png`)
                                    }
                                />
                                <MapButton
                                    style={{
                                        top: 150,
                                        left: 10,
                                    }}
                                    onPress={() => {
                                        onPress(2);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        경기 북서부
                                    </MediumText>
                                </MapButton>
                                <Image //북서부
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[2],
                                        height: adjustedImage.height[2],
                                        position: "absolute",
                                        left: 2,
                                        top: -1,
                                    }}
                                    source={
                                        regionArr[2]
                                            ? require(`../../../assets/images/map/selected3.png`)
                                            : require(`../../../assets/images/map/unselected3.png`)
                                    }
                                />
                                <MapButton
                                    style={{
                                        top: 160,
                                        left: 160,
                                    }}
                                    onPress={() => {
                                        onPress(3);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        경기 북동부
                                    </MediumText>
                                </MapButton>
                                <Image //북동부
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[3],
                                        height: adjustedImage.height[3],
                                        position: "absolute",
                                        left: 110,
                                        top: 37,
                                    }}
                                    source={
                                        regionArr[3]
                                            ? require(`../../../assets/images/map/selected4.png`)
                                            : require(`../../../assets/images/map/unselected4.png`)
                                    }
                                />
                                <MapButton
                                    style={{
                                        top: 357,
                                        left: 61,
                                    }}
                                    onPress={() => {
                                        onPress(4);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        경기 남서부
                                    </MediumText>
                                </MapButton>
                                <Image //남서부
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[4],
                                        height: adjustedImage.height[4],
                                        position: "absolute",
                                        top: 276,
                                        left: 41,
                                    }}
                                    source={
                                        regionArr[4]
                                            ? require(`../../../assets/images/map/selected5.png`)
                                            : require(`../../../assets/images/map/unselected5.png`)
                                    }
                                />
                                <MapButton
                                    style={{
                                        top: 318,
                                        left: 200,
                                    }}
                                    onPress={() => {
                                        onPress(5);
                                    }}
                                >
                                    <MediumText style={{ fontSize: 20 }}>
                                        경기 남동부
                                    </MediumText>
                                </MapButton>
                                <Image //남동부
                                    style={{
                                        resizeMode: "contain",
                                        width: adjustedImage.width[5],
                                        height: adjustedImage.height[5],
                                        position: "absolute",
                                        top: 218,
                                        left: 140,
                                    }}
                                    source={
                                        regionArr[5]
                                            ? require(`../../../assets/images/map/selected6.png`)
                                            : require(`../../../assets/images/map/unselected6.png`)
                                    }
                                />
                            </Map>
                        ) : null}
                    </MapContainer>
                    <GuideTextContainer>
                        <MediumText
                            style={{
                                fontSize: 20,
                                color: color.darkGrey,
                            }}
                        >
                            작업지역은 언제든지 추가, 제거 및 변경이 가능합니다.
                            {"\n"}
                            작업을 희망하시는 위치를 선택해 주세요.
                        </MediumText>
                    </GuideTextContainer>
                </Container>
                <Button text="다음으로" onPress={onNextStep} type="accent" />
            </Provider>
        </DefaultLayout>
    );
}

export default SignUpStep2;
