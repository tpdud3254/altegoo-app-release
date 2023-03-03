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
import axios from "axios";
import { SERVER } from "../server";
import { getAsyncStorageToken } from "../utils";

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
  border: 4px solid ${theme.btnPointColor + "55"};
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
  background-color: ${theme.btnColor};
  padding: 20px 20px;
  border-radius: 10px;
`;
function TakePhoto({ navigation, route }) {
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
    const newData =
      route?.params?.type === "vehicle"
        ? { vehiclePermissionUrl: takenPhoto }
        : { licenseUrl: takenPhoto };
    setInfo({ ...newData, ...info });

    navigation.navigate("SignUpStep1");
  };

  const isFocusd = useIsFocused();

  const uploadFile = async (fileName) => {
    const localUri = fileName;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    console.log(filename, type);
    formData.append("file", { uri: localUri, name: filename, type });

    axios
      .post(
        SERVER + "/users/image",
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            auth: await getAsyncStorageToken(),
          },
          transformRequest: [
            function () {
              return formData;
            },
          ],
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
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
            <TakePhotoBtn onPress={takePhoto}>
              <Ionicons name="camera" size={50} color={theme.main} />
            </TakePhotoBtn>
          </Actions>
        ) : (
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <SubTitleText style={{ color: "white" }}>재촬영</SubTitleText>
            </PhotoAction>
            <PhotoAction
              onPress={onUpload}
              style={{ backgroundColor: theme.sub.blue }}
            >
              <SubTitleText style={{ color: "white" }}>저장</SubTitleText>
            </PhotoAction>
            <PhotoAction onPress={() => uploadFile(takenPhoto)}>
              <SubTitleText style={{ color: "white" }}>전송</SubTitleText>
            </PhotoAction>
            {/* TODO:test code */}
          </PhotoActions>
        )
      ) : null}
    </Container>
  );
}

TakePhoto.propTypes = {};
export default TakePhoto;
