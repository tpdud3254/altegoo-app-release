import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { color } from "../styles";
import SubTitleText from "../component/text/SubTitleText";
import UserContext from "../context/UserContext";
import { Modal, Portal, Provider } from "react-native-paper";
import MediumText from "../component/text/MediumText";

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const Actions = styled.View`
    flex: 0.35;
    padding: 0px 30px;
    align-items: center;
    justify-content: space-around;
`;

const TakePhotoBtn = styled.TouchableOpacity`
    width: 90px;
    height: 90px;
    border-radius: 90px;
    border: 4px solid ${color.btnAccent + "55"};
    justify-content: center;
    align-items: center;
`;

const CloseBtn = styled.TouchableOpacity`
    top: 20px;
    left: 20px;
    background-color: #00000055;
    align-self: flex-start;
    border-radius: 100px;
`;

const PhotoActions = styled(Actions)`
    flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
    background-color: ${color.btnDefault};
    padding: 20px 20px;
    border-radius: 10px;
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
const modalTitleStyle = { marginLeft: 5, marginRight: 5, fontSize: 20 };

const LicenseExample = styled.View`
    align-items: center;
    margin: 10px 0px;
`;

function TakePhoto({ navigation, route }) {
    const camera = useRef();
    const [granted, setGranted] = useState(false);
    const [mediaLibraryGranted, setMediaLibraryGranted] = useState(false);
    const [takenPhoto, setTakenPhoto] = useState("");
    const [cameraType] = useState(Camera.Constants.Type.back);
    const [cameraReady, setCameraReady] = useState(false);
    const { info, setInfo } = useContext(UserContext);
    const [showExample, setShowExample] = useState(true);

    const hideModal = () => setShowExample(false);

    const getCameraPermissions = async () => {
        const { granted } = await Camera.requestCameraPermissionsAsync(
            setGranted(granted)
        );

        if (granted) {
            setGranted(granted);
        }
    };

    const getMediaLibraryPermissions = async () => {
        const { granted } = await MediaLibrary.requestPermissionsAsync();

        if (granted) {
            setMediaLibraryGranted(granted);
        }
    };

    useEffect(() => {
        getCameraPermissions();
        getMediaLibraryPermissions();
    }, []);

    const onCameraReady = () => setCameraReady(true);

    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 0.5,
                exif: true,
            });

            setTakenPhoto(uri);
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.saveToLibraryAsync(uri);
        }
    };

    const onDismiss = () => setTakenPhoto("");

    const onUpload = () => {
        const newData =
            route?.params?.type === "vehicle"
                ? { vehiclePermissionUrl: takenPhoto }
                : { licenseUrl: takenPhoto };
        setInfo({ ...newData, ...info });

        navigation.navigate("SignUpStep1");
    };

    const isFocusd = useIsFocused();

    const PriceModal = () => (
        <Portal>
            <Modal
                visible={showExample}
                onDismiss={hideModal}
                contentContainerStyle={modalStyle}
            >
                <ModalTop>
                    <Ionicons name="close" size={30} color="white" />
                    <ModalTitle>
                        <Ionicons
                            name="alert-circle-outline"
                            size={20}
                            color={color.sub.yellow}
                        />
                        <SubTitleText style={modalTitleStyle}>
                            사진 예시
                        </SubTitleText>
                        <Ionicons
                            name="alert-circle-outline"
                            size={20}
                            color={color.sub.yellow}
                        />
                    </ModalTitle>
                    <TouchableOpacity
                        style={{ marginTop: -10, marginRight: -10 }}
                        onPress={hideModal}
                    >
                        <Ionicons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </ModalTop>
                <MediumText>다음과 같이 촬영해주세요.</MediumText>

                <LicenseExample>
                    <Image
                        style={{
                            resizeMode: "contain",
                            width: 300,
                            height: 400,
                            borderColor: "#dddddd",
                            borderWidth: 1,
                        }}
                        source={require(`../assets/images/license.png`)}
                    />
                </LicenseExample>
            </Modal>
        </Portal>
    );

    return (
        <Container>
            <Provider>
                <PriceModal />
                {isFocusd ? <StatusBar hidden={true} /> : null}
                {isFocusd ? (
                    granted && mediaLibraryGranted ? (
                        takenPhoto === "" ? (
                            <Camera
                                style={{ flex: 1 }}
                                type={cameraType}
                                ref={camera}
                                onCameraReady={onCameraReady}
                                autoFocus="on"
                            >
                                <CloseBtn
                                    onPress={() =>
                                        navigation.navigate("SignUpStep1")
                                    }
                                >
                                    <Ionicons
                                        name="close"
                                        color="white"
                                        size={40}
                                    />
                                </CloseBtn>
                            </Camera>
                        ) : (
                            <Image
                                source={{ uri: takenPhoto }}
                                style={{ flex: 1 }}
                            />
                        )
                    ) : null
                ) : null}

                {granted ? (
                    takenPhoto === "" ? (
                        <Actions>
                            <TakePhotoBtn onPress={takePhoto}>
                                <Ionicons
                                    name="camera"
                                    size={50}
                                    color={color.main}
                                />
                            </TakePhotoBtn>
                        </Actions>
                    ) : (
                        <PhotoActions>
                            <PhotoAction onPress={onDismiss}>
                                <SubTitleText style={{ color: "white" }}>
                                    재촬영
                                </SubTitleText>
                            </PhotoAction>
                            <PhotoAction
                                onPress={onUpload}
                                style={{ backgroundColor: color.sub.blue }}
                            >
                                <SubTitleText style={{ color: "white" }}>
                                    저장
                                </SubTitleText>
                            </PhotoAction>
                        </PhotoActions>
                    )
                ) : null}
            </Provider>
        </Container>
    );
}

TakePhoto.propTypes = {};
export default TakePhoto;
