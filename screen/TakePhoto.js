import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Image, StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { theme } from "../styles";
import SubTitleText from "../component/text/SubTitleText";
import UserContext from "../context/UserContext";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 30px;
  align-items: center;
  justify-content: space-around;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  border: 2px solid rgba(255, 255, 255, 0.8);
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
  background-color: ${theme.btnColor};
  padding: 20px 20px;
  border-radius: 10px;
`;
function TakePhoto({ navigation }) {
  const camera = useRef();
  const [granted, setGranted] = useState(false);
  const [mediaLibraryGranted, setMediaLibraryGranted] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraType] = useState(Camera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const { info, setInfo } = useContext(UserContext);

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
        quality: 1,
        exif: true,
      });

      setTakenPhoto(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.saveToLibraryAsync(uri);
    }
  };

  const onDismiss = () => setTakenPhoto("");

  const onUpload = () => {
    const newData = { licenseUrl: takenPhoto };
    setInfo({ ...newData, ...info });

    navigation.navigate("SignUpStep1");
  };

  const isFocusd = useIsFocused();
  return (
    <Container>
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
              <CloseBtn onPress={() => navigation.navigate("SignUpStep1")}>
                <Ionicons name="close" color="white" size={40} />
              </CloseBtn>
            </Camera>
          ) : (
            <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
          )
        ) : null
      ) : null}

      {granted ? (
        takenPhoto === "" ? (
          <Actions>
            <TakePhotoBtn onPress={takePhoto} />
          </Actions>
        ) : (
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <SubTitleText style={{ fontSize: 25 }}>다시 찍기</SubTitleText>
            </PhotoAction>
            <PhotoAction onPress={onUpload}>
              <SubTitleText style={{ fontSize: 25 }}>저장 하기</SubTitleText>
            </PhotoAction>
          </PhotoActions>
        )
      ) : null}
    </Container>
  );
}

TakePhoto.propTypes = {};
export default TakePhoto;
